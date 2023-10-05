const express= require('express');
const router = express.Router();
const {getMedicines,addMedicine,editMedicine} = require('../controller/pharmacistController'); 

router.get('/medicine',getMedicines );

router.post('/medicine',addMedicine );

router.patch('/medicine',editMedicine );

module.exports = router;

