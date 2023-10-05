const Medicine = require('../models/Medicine');

const getMedicines = async (req, res) => {
  try {
      const medicines = await Medicine.find();
      res.status(200).json(medicines); // Send medicines as JSON response
  }
  catch (error) {
    console.error('Error editing medicine:', error);
    res.status(500).json({ error: 'Failed to get medicine' });
  }
     
};

const addMedicine = async (req, res) => {
    try {
      const { name, description, price, activeIngredients, availableQuantity } = req.body;
  
      const newMedicine = new Medicine({
        name,
        description,
        price,
        activeIngredients,
        availableQuantity,
      });
  
      
      await newMedicine.save();
  
      res.status(201).json(newMedicine); 
    } catch (error) {
      console.error('Error adding medicine:', error);
      res.status(500).json({ error: 'Failed to add medicine' });
    }
  };
  

  const editMedicine = async (req, res) => {
    try {
      const { _id, name, description, price, activeIngredients, quantity } = req.body;
  
      // Check if the '_id' field is provided and valid
      if (!_id) {
        return res.status(400).json({ error: 'Invalid medicine ID' });
      }
  
      const updatedMedicine = await Medicine.findByIdAndUpdate(
        _id,
        {
          name,
          description,
          price,
          activeIngredients,
          quantity
        },
        { new: true } // To return the updated document
      );
  
      // Check if the medicine was found and updated
      if (!updatedMedicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      if (updatedMedicine.nModified === 0) {
        return res.json({ message: 'Medicine not updated with new values' });
      }
      
      res.json({ message: 'Medicine updated successfully', updatedMedicine });
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit medicine' });
    }
  };
  

   
module.exports = {getMedicines, addMedicine,editMedicine};





