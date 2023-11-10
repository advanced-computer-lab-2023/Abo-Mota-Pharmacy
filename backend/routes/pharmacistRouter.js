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

router.get("/", authorize,getPharmacist);

router.get("/medicine", authorize,getMedicines);

router.post("/medicine", authorize,validateMedicine, addMedicine);

router.patch("/medicine/:name", authorize,editMedicine);

module.exports = router;
