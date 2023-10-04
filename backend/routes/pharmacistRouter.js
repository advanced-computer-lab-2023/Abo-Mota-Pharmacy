const express= require('express');
const router = express.Router();
const {getMedicines,addMedicine,editMedicines} = require('../controller/pharmasictController'); 

router.get('/medicine',getMedicines );

router.post('/medicine',addMedicine );

router.patch('/medicine', editMedicines);

modules.export = router;

