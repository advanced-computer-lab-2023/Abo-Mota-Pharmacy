const express= require('express');
const router = express.Router();
const {getMedicines, getPatient} = require('../controller/patientController');

const authorize = require("../middlewares/authorization");

router.get('/',authorize,getPatient);

router.get('/medicines' , authorize,getMedicines);


module.exports = router;







