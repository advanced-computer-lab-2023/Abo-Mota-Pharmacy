const express= require('express');
const router = express.Router();
const {getMedicines, getPatient} = require('../controller/patientController');

const authorize = require("../middlewares/authorization");

router.get('/',getPatient);

router.get('/medicines' , getMedicines);


module.exports = router;







