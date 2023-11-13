const Medicine = require("../models/Medicine");
const Patient = require("../models/Patient");
const Order = require("../models/Order");
const ClinicPatient = require("../models/ClinicPatient");

const getPatient = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({username}).populate("healthPackage.package");
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
	try{
		const username = req.userData.username;
		const patient = await Patient.find({username});
		const orders = await Order.find({patient: patient._id});
		if(!orders)
			throw new Error("You haven't made any orders yet");
		res.status(200).json(orders);
	} catch(error) {
		res.status(500).json({ error: error.message });
	}
}

const cancelOrder = async (req, res) => {
	try{
		const {orderId} = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({username})

		const order = await Order.findOne({_id: orderId})
		if(!order)
			throw new Error("This order does not exist");
		

		const updatedPatient = await Patient.findByIdAndUpdate(
			loggedIn._id,
			{ $inc: { wallet: order.totalPrice } },
			{ new: true }
		);
		
		const updatedOrder = await Order.updateOne({_id: orderId}, {status: "cancelled"});


		res.status(200).json({updatedOrder, updatedPatient})
	}catch(error){
		res.status(500).json({ error: error.message });
	}
	
};


//Payment should be done before
const createOrder = async (req, res) => {
	try{
		const username = req.userData.username;
		const patient = await Patient.findOne({username});
		const clinicPatientExists = await Patient.findOne({ username }).populate("healthPackage.package");

		let totalPrice = 0;

		medicines.forEach((medicine) => {
			totalPrice += medicine.price * medicine.quantity;
		});

		if(clinicPatientExists && (clinicPatientExists.healthPackage.status.equals('subscribed') || clinicPatientExists.healthPackage.status.equals('unsubscribed'))){
			totalPrice *= (1 - clinicPatientExists.healthPackage.pharmacyDiscount);
		}

		const { medicines} = req.body
		
		const updatedMedicines = medicines.map(async (medicine) => {
			const dBMedicine = await Medicine.findOne({name: medicine.name});
			const updatedMedicine = await Medicine.updateOne({_id: dBMedicine._id},{sales: dBMedicine.sales + medicine.quantity , quantity: dBMedicine.quantity - medicine.quantity});
		})
		const order = await Order.create({medicines, date: new Date (), patient: patient._id, totalPrice});

		res.status(200).json({order, updatedMedicines});
		
	}catch(error){
		res.status(500).json({ error: error.message });

	}
};

const addToCart = async (req, res) => {
	try{
		const username = req.userData.username;
		const patient = await Patient.findOne({username}).populate("");
		const name = req.body.name;
		const medicine = await Medicine.findOne({name});

		if(!medicine)
			throw new Error("This medicine does not exist")
		if(medicine.quantity === 0){
			throw new Error("Not enough medicine in stock");
		}

		const existingCartItem = patient.cart.find((item) => item.medicine._id===medicine._id);

		if(existingCartItem){
			existingCartItem.quantity+=1;
		}
		else{
			patient.cart.push({medicine, quantity: 1});
		}
		await patient.save();
		res.status(200).json({cart: patient.cart});
		
	} catch(error){
		res.status(500).json({ error: error.message });
	}
}

const removeFromCart = async (req, res) => {
	try{

		const {medicineId, quantity} = req.body;

		const username = req.userData.username;
		const loggedIn = await Patient.findOne({username});

		const cart = loggedIn.cart;

		const existingCartItem = cart.find((item) => item.medicine._id === medicineId && item.quantity === 1);

		let updatedCart;
		if(existingCartItem){
			updatedCart = cart.filter((item) => item.medicine._id !== existingCartItem._id);
		}else{
			updatedCart = cart.map((item) => {
				if(item.medicine._id === medicineId)
					return {...item, quantity: item.quantity - quantity}
			})
		}
		
		const updatedPatient = await Patient.updateOne({_id: loggedIn._id},{cart: updatedCart});

		res.status(200).json({updatedPatient});

	}catch(error){
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getPatient,
	getMedicines,
	getOrders,
	cancelOrder,
	createOrder,
	removeFromCart,
	addToCart
};
