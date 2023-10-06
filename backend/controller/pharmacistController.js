const Medicine = require('../models/Medicine');

const getMedicines = async (req, res) => {
  try {
      const medicines = await Medicine.find();
      res.status(200).json(medicines); 
  }
  catch (error) {
    console.error('Error editing medicine:', error);
    res.status(500).json({ error: 'Failed to get medicine' });
  }
     
};

const addMedicine = async (req, res) => {
    try {
      const { name, description, price, activeIngredients, quantity } = req.body;
  
      const newMedicine = new Medicine({
        name,
        description,
        price,
        activeIngredients,
        quantity,
      });
      
      const medicine = await Medicine.findOne({name: newMedicine.name});
      if(medicine)
      {
        return res.status(500).json({message:'medicine already exists'});
      }

  
      
      await newMedicine.save();
  
      res.status(201).json(newMedicine); 
    } catch (error) {
      console.error('Error adding medicine:', error);
      res.status(500).json({ error: 'Failed to add medicine' });
    }
  };
  

  const editMedicine = async (req, res) => {
    try {
      const {id} = req.params;
  
      const updatedMedicine = await Medicine.updateOne(
        {_id:id},
        {
          ...req.body
        }       
        );
  
      // Check if the medicine was found and updated
      if (!updatedMedicine){
        return res.status(404).json({ error: 'Medicine not found' });
      }
      if (updatedMedicine.modifiedCount === 0) {
        return res.json({ message: 'Medicine not updated with new values' });
      }
      
      res.json({ message: 'Medicine updated successfully', updatedMedicine });
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit medicine' });
    }
  };
  

   
module.exports = {getMedicines, addMedicine,editMedicine};





