const express= require('express');
const router = express.Router();
const {getMedicines} = require('../controller/patientController');

router.get('/medicines' , getMedicines);


module.exports = router;







