const express = require("express");
const {
	registerPatient,
	registerPharmacist,
	login,
	logout,
	requestOtp,
	forgotPassword,
} = require("../controller/guestController");
const multer = require("multer");

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", registerPatient);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// register a guest as doctor
router.post(
	"/registerPharmacist",
	upload.fields([
		{ name: "nationalId", maxCount: 1 },
		{ name: "pharmacyDegree", maxCount: 1 },
		{ name: "workingLicense", maxCount: 1 },
	]),
	registerPharmacist
);

router.post("/login", login);
router.post("/logout", logout);

// request new otp for password reset
router.post("/otp", requestOtp);

// verify user submitted otp
router.post("/forgotPassword", forgotPassword);

module.exports = router;
