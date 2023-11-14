const Medicine = require("../models/Medicine");
const Patient = require("../models/Patient");
const Order = require("../models/Order");
const ClinicPatient = require("../models/ClinicPatient");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getPatient = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({ username })
			.populate({
				path: "cart",
				populate: {
					path: "medicine",
					model: "Medicine",
				},
			})
			.populate("healthPackage.package");
		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMedicines = async (req, res) => {
	try {
		const medicines = await Medicine.find();
		res.status(200).json(medicines);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getOrders = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({ username });
		const orders = await Order.find({ patient: patient._id });

		if (!orders) throw new Error("You haven't made any orders yet");
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const cancelOrder = async (req, res) => {
	try {
		const { orderId } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		const order = await Order.findOne({ _id: orderId });
		if (!order) throw new Error("This order does not exist");

		const updatedPatient = await Patient.findByIdAndUpdate(
			loggedIn._id,
			{ $inc: { wallet: order.totalPrice } },
			{ new: true }
		);

		const updatedMedicines = order.medicines.map(async (medicine) => {
			const dbMedicine = await Medicine.findOne({ name: medicine.name });

			const updatedMedicine = await Medicine.updateOne(
				{ _id: dbMedicine._id },
				{
					sales: dbMedicine.sales - medicine.quantity,
					quantity: dbMedicine.quantity + medicine.quantity,
				}
			);
		});

		const updatedOrder = await Order.updateOne({ _id: orderId }, { status: "cancelled" });

		res.status(200).json({ updatedOrder, updatedPatient });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//Payment should be done before
const createOrder = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({ username });
		const clinicPatientExists = await Patient.findOne({ username }).populate(
			"healthPackage.package"
		);

		const { medicines } = req.body;

		let totalPrice = 0;

		medicines.forEach((medicine) => {
			totalPrice += medicine.price * medicine.quantity;
		});

		if (
			clinicPatientExists &&
			(clinicPatientExists.healthPackage.status === "subscribed" ||
				clinicPatientExists.healthPackage.status === "unsubscribed")
		) {
			totalPrice *= 1 - clinicPatientExists.healthPackage.pharmacyDiscount;
		}

		const updatedMedicines = medicines.map(async (medicine) => {
			console.log("med", medicine);
			const dbMedicine = await Medicine.findOne({ name: medicine.name });

			if (!dbMedicine) throw new Error("This medicine does not exist");

			const updatedMedicine = await Medicine.updateOne(
				{ _id: dbMedicine._id },
				{
					sales: dbMedicine.sales + medicine.quantity,
					quantity: dbMedicine.quantity - medicine.quantity,
				}
			);
		});

		const order = await Order.create({
			medicines,
			date: new Date(),
			patient: patient._id,
			totalPrice,
		});

		const updatedPatient = await Patient.updateOne({ username }, { cart: [] });

		res.status(200).json({ order, updatedMedicines });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const addToCart = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({ username }).populate({
			path: "cart",
			populate: {
				path: "medicine",
				model: "Medicine",
			},
		});

		console.log(patient);
		const name = req.body.name;
		const medicine = await Medicine.findOne({ name });

		if (!medicine) throw new Error("This medicine does not exist");
		if (medicine.quantity === 0) {
			throw new Error("Not enough medicine in stock");
		}

		const existingCartItem = patient.cart.find((item) => item.medicine._id.equals(medicine._id));

		if (existingCartItem) {
			existingCartItem.quantity += 1;
		} else {
			patient.cart.push({ medicine, quantity: 1 });
		}
		await patient.save();
		res.status(200).json({ patient });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const removeFromCart = async (req, res) => {
	try {
		const { name, quantity } = req.body;

		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username }).populate({
			path: "cart",
			populate: {
				path: "medicine",
				model: "Medicine",
			},
		});

		const cart = loggedIn.cart;
		console.log("CART", cart);

		const updatedCart = cart
			.map((item) => {
				if (item.medicine.name === name) {
					// Convert the Mongoose document to a plain JavaScript object
					const itemObject = item.toObject();
					return { ...itemObject, quantity: itemObject.quantity - quantity };
				}
				return item;
			})
			.filter((item) => item.quantity > 0);

		console.log("UPDATED", updatedCart);

		const updatedPatient = await Patient.updateOne({ username }, { cart: updatedCart });
		res.status(200).json({ updatedPatient });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const addDeliveryAddress = async (req, res) => {
	try {
		const { username } = req.userData;
		const { apartmentNumber, streetName, city } = req.body;

		const loggedIn = await Patient.findOne({ username });

		loggedIn.deliveryAddresses.some((address) => {
			if (
				address.apartmentNumber === apartmentNumber &&
				address.streetName === streetName &&
				address.city === city
			) {
				throw new Error("This address already exists");
			}
		});


		await Patient.updateOne(
			{ username },
			{
				deliveryAddresses: [...loggedIn.deliveryAddresses, { apartmentNumber, streetName, city }],
			}
		);

		res.status(200).json({ message: "Delivery address added successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const payByWallet = async (req, res) => {
	try {
		const { deductible } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		if (loggedIn.wallet < deductible) {
			return res.status(500).json({ message: "Insufficient funds" });
		}

		const updatedPatient = await Patient.findByIdAndUpdate(
			loggedIn._id,
			{ $inc: { wallet: -deductible } },
			{ new: true }
		);

		res.status(200).json({ message: "Payment is successful", patient: updatedPatient });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;

		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
		if (!isMatch) {
			throw new Error("Old Password is incorrect");
		}
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		const updatedUser = await Patient.updateOne(
			{ _id: loggedIn._id },
			{ password: hashedPassword }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPatient,
	getMedicines,
	getOrders,
	cancelOrder,
	createOrder,
	removeFromCart,
	addToCart,
	addDeliveryAddress,
	payByWallet,
	changePassword,
};
