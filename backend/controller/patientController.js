const Medicines = require('../models/Medicine');

const getMedicines = async (req, res) => {
    try {
      const medicines = await Medicines.find();
  
      // Check if there are no medicines in the database
      if (!medicines || medicines.length === 0) {
        return res.status(404).json({ error: 'No medicines found' });
      }
  
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      res.status(500).json({ error: 'Failed to fetch medicines' });
    }
};

module.exports = {
    getMedicines
};