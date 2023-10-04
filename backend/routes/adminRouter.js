const express = require('express');
const router = express.Router;
const {getMedicines,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deleteDoctor} = require('../controller/adminController');


router.get('/medicines', getMedicines);
router.get('/application', getApplicationInfo);
router.post('/addAdmin', addAdmin);
router.delete('/deleteAdmin', deleteAdmin);
router.delete('/deleteAdmin', deletePatient);
router.delete('/deleteDoctor', deleteDoctor);


module.exports= router;

