const Medicines = require('../models/Medicine');

const getMedicines = async (req, res) => {
    try {
      const medicines = await Medicines.find();
  
  
      res.status(200).json(medicines);
    }
    catch (error)
     {
      res.status(500).json({ error: 'Failed to fetch medicines' });
     }
};

module.exports = {
    getMedicines
};