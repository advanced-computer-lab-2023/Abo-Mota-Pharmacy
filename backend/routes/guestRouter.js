const express = require("express");
const { registerPatient, registerPharmacist, login, logout } = require("../controller/guestController");

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", registerPatient);

// register a guest as doctor
router.post("/registerPharmacist", registerPharmacist);

router.post("/login" , login);
router.post("/logout", logout);

module.exports = router;
