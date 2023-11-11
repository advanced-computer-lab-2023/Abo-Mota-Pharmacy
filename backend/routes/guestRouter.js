const express = require("express");
const { registerPatient, registerPharmacist, login, logout } = require("../controller/guestController");
const multer = require('multer');

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", registerPatient);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// register a guest as doctor
router.post("/registerPharmacist", upload.fields([
    {name: "pharmacyDegree", maxCount: 1},
    {name: "workingLicense", maxCount: 1},
]), registerPharmacist);

router.post("/login" , login);
router.post("/logout", logout);

module.exports = router;
