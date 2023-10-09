const express= require('express');
const router = express.Router();
const {
    getPharmacist,
    getMedicines,
    addMedicine,
    editMedicine
} = require('../controller/pharmacistController'); 

router.get('/', getPharmacist);

router.get('/medicine',getMedicines );

router.post('/medicine',addMedicine );

router.patch('/medicine/:id',editMedicine );

module.exports = router;

