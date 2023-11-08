const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getApplications,
  addAdmin,
  deleteAdmin,
  deletePatient,
  deletePharmacist,
  getPatients,
  getPatient,
  getPharmacist,
  getPharmacists,
  getApplication,
  handleApplication,
} = require("../controller/adminController");


    //to be added in routes after log in page added
const authorize = require("../middlewares/authorization");
router.get("/medicines", getMedicines);

router.get("/applications", getApplications);


router.get("/applications/:id", getApplication);

router.patch("/applications/:id", handleApplication);

router.get("/patients", getPatients);

router.get("/patients/:id", getPatient);

router.get("/pharmacists", getPharmacists);

router.get("/pharmacists/:id", getPharmacist);

router.post("/admins", addAdmin);

router.delete("/patients", deletePatient);

router.delete("/pharmacists", deletePharmacist);

module.exports = router;
