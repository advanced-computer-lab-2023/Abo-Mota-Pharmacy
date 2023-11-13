const express= require('express');
const router = express.Router();
const {getMedicines, getPatient, getOrders, cancelOrder, createOrder, removeFromCart, addToCart, addDeliveryAddress, payByWallet } = require('../controller/patientController');

const authorize = require("../middlewares/authorization");

router.get('/',authorize,getPatient);

router.get('/medicines' , authorize, getMedicines);

router.post("/medicines" , authorize, addToCart);

router.delete(`/medicines` , authorize, removeFromCart);

router.get('/orders' , authorize, getOrders);

router.patch('/cancelOrder', authorize, cancelOrder);

router.post('/createOrder', authorize, createOrder);

router.delete('/removeFromCart', authorize, removeFromCart);

router.patch('/addDeliveryAddress', authorize, addDeliveryAddress);

router.patch('/payByWallet', authorize, payByWallet);

module.exports = router;







