const express = require("express");
const router = express.Router();
const {
	getPharmacist,
	getMedicines,
	addMedicine,
	editMedicine,
	changePassword,
	viewWallet,
	archiveMedicine,
	unarchiveMedicine,
} = require("../controller/pharmacistController");

const validateMedicine = require("../middlewares/validateMedicineMiddleware");

const authorize = require("../middlewares/authorization");

router.get("/", authorize, getPharmacist);

router.get("/medicine", authorize, getMedicines);

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
	"/medicine",
	upload.fields([{ name: "medicineImage", maxCount: 1 }]),
	authorize,
	validateMedicine,
	addMedicine
);

router.patch(
	"/medicine/:name",
	upload.fields([{ name: "medicineImage", maxCount: 1 }]),
	authorize,
	editMedicine
);

router.patch("/changePassword", authorize, changePassword);

router.get("/wallet", authorize, viewWallet);

router.patch("/archive", authorize, archiveMedicine);

router.patch("/unarchive", authorize, unarchiveMedicine);

module.exports = router;
