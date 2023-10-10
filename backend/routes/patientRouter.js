const express= require('express');
const router = express.Router();
const {getMedicines, getPatient} = require('../controller/patientController');

router.get('/',getPatient);

router.get('/medicines' , getMedicines);


module.exports = router;







