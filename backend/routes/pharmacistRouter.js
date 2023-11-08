const express = require("express");
const router = express.Router();
const {
	getPharmacist,
	getMedicines,
	addMedicine,
	editMedicine,
} = require("../controller/pharmacistController");

const validateMedicine = require("../middlewares/validateMedicineMiddleware");

const authorize = require("../middlewares/authorization");

router.get("/", getPharmacist);

router.get("/medicine", getMedicines);

router.post("/medicine", validateMedicine, addMedicine);

router.patch("/medicine/:name", editMedicine);

module.exports = router;
