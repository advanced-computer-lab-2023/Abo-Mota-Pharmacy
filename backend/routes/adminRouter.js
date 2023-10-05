const express = require('express');
const router = express.Router();
const {getMedicines,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deletePharmacist,
getPatient,
getPharmacist} = require('../controller/adminController');


router.get('/medicines', getMedicines);

router.get('/application', getApplicationInfo);

router.get('/patient',getPatient);

router.get('/pharmacist',getPharmacist);

router.post('/addAdmin', addAdmin);

router.delete('/deleteAdmin', deleteAdmin);

router.delete('/deletePatient', deletePatient);

router.delete('/deletePharmacist', deletePharmacist);


module.exports= router;

