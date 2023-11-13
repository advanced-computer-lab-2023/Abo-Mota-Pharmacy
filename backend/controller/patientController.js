const Medicine = require("../models/Medicine");
const Patient = require("../models/Patient");
const Order = require("../models/Order")

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
		const order = await Order.findOne({_id: orderId})
		if(!order)
			throw new Error("This order does not exist");
		const updatedOrder = await Order.updateOne({_id: orderId}, {status: "cancelled"});

		res.status(200).json({updatedOrder})
	}catch(error){
		res.status(500).json({ error: error.message });
	}
	
};

const addOrder = async (req, res) => {
	try{
		const username = req.userData.username;
		const patient = await Patient.find({username});

		const { medicines, date } = req.body

		const order = await Order.create({medicines, date, patient: patient._id});

		res.status(200).json({order});
		
	}catch(error){
		res.status(500).json({ error: error.message });

	}
};

const addToCart = async (req, res) => {
	try{
		const username = req.userData.username;
		const patient = await Patient.find({username});
		const name = req.body.name;
		const medicine = await Medicine.find({name});
		const existingCartItem = patient.cart.find((item) => item.medicine._id===medicine._id);
		if(exisitingCartItem){
			exisitingCartItem.quantity+=1;
		}
		else{
			patient.cart.push({medicine, quantity: 1});
		}
		await patient.save();
		res.status(200).send(existingCartItem);
		
	} catch(error){
		res.status(500).json({ error: error.message });
	}
}

const removeFromCart = async (req, res) => {
	try{

		const {medicineId} = req.body;

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
					return {...item, quantity: item.quantity - 1}
			})
		}
		
		const updatedPatient = await Patient.updateOne({...loggedIn, cart: updatedCart});

	}catch(error){
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getPatient,
	getMedicines,
	getOrders,
	cancelOrder,
	addOrder,
	removeFromCart,
	addToCart
};
