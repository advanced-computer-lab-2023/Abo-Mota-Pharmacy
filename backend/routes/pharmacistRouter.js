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

router.get("/", authorize, getPharmacist);

router.get("/medicine", authorize, getMedicines);

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/medicine", upload.fields([
	{name: "medicineImage", maxCount: 1}
]), authorize, validateMedicine, addMedicine);

router.patch("/medicine/:name", authorize, editMedicine);

module.exports = router;
