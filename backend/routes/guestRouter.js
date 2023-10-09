const express = require("express");
const { registerPatient, registerPharmacist } = require("../controller/guestController");

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", registerPatient);

// register a guest as doctor
router.post("/registerPharmacist", registerPharmacist);

module.exports = router;
