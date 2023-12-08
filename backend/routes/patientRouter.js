const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getPatient,
  getOrders,
  cancelOrder,
  createOrder,
  removeFromCart,
  addToCart,
  addDeliveryAddress,
  payByWallet,
  changePassword,
  viewWallet,
  viewAlternatives,
  linkWithClinic,
} = require("../controller/patientController");

const authorize = require("../middlewares/authorization");

router.get("/", authorize, getPatient); //done

router.get("/medicines", authorize, getMedicines); //done

router.post("/addToCart", authorize, addToCart); //done

router.delete(`/removeFromCart`, authorize, removeFromCart); //done

router.get("/orders", authorize, getOrders); //done

router.patch("/cancelOrder", authorize, cancelOrder); //done

router.post("/createOrder", authorize, createOrder); //done

router.patch("/addDeliveryAddress", authorize, addDeliveryAddress); //done

router.patch("/deliveryAddress", authorize, addDeliveryAddress);

router.patch("/payByWallet", authorize, payByWallet); //done

router.patch("/changePassword", authorize, changePassword);

router.get("/wallet", authorize, viewWallet);

router.get("/alternatives", authorize, viewAlternatives);

router.post("/linkWithClinic", authorize, linkWithClinic);

module.exports = router;
