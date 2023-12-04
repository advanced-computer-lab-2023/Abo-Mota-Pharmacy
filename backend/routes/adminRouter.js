const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getApplications,
  addAdmin,
  deletePatient,
  deletePharmacist,
  getPatients,
  getPatient,
  getPharmacist,
  getPharmacists,
  getApplication,
  handleApplication,
  changePassword,
  getAdmin,
} = require("../controller/adminController");

//to be added in routes after log in page added
const authorize = require("../middlewares/authorization");
router.get("/medicines", authorize, getMedicines);

router.get("/applications", authorize, getApplications);

router.get("/applications/:id", authorize, getApplication);

router.patch("/applications/:id", authorize, handleApplication);

router.get("/patients", authorize, getPatients);

router.get("/patients/:id", authorize, getPatient);

router.get("/pharmacists", authorize, getPharmacists);

router.get("/pharmacists/:id", authorize, getPharmacist);

router.post("/admins", authorize, addAdmin);

router.delete("/patients", authorize, deletePatient);

router.delete("/pharmacists", authorize, deletePharmacist);

router.patch("/changePassword", authorize, changePassword);

router.get("/admin", authorize, getAdmin);

module.exports = router;
