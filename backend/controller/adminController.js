const Medicines = require('../models/Medicine');
const PharmacyAdmin = require('../models/PharmacyAdmin');
const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');


// View Doctor Application Info
const getApplicationInfo = async (req, res) => {
    
}

const getPharmacist = async (req, res) => {
  try {
    const { username } = req.params;

    const pharmacist = await Pharmacist.findOne({ username });

    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }

    res.status(200).json(pharmacist);
  } catch (error) {
    console.error('Error fetching pharmacist:', error);
    res.status(500).json({ error: 'Failed to fetch pharmacist' });
  }
};



const getPatient = async (req,res)=>{
  try {
    const { username } = req.params;

    const pharmacist = await Patient.findOne({ username });

    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }

    res.status(200).json(pharmacist);
  } catch (error) {
    console.error('Error fetching pharmacist:', error);
    res.status(500).json({ error: 'Failed to fetch pharmacist' });
  }
}

//View a list of all medicines
const getMedicines = async (req,res)=>{
    try {
        const medicines = await Medicines.find();
    
        // Check if there are no medicines in the database
        if (!medicines || medicines.length === 0) {
          return res.status(404).json({ error: 'No medicines found' });
        }
    
        res.status(200).json(medicines);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch medicines' });
      }
}


// Add an Admin
const addAdmin = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    
    const existingUsername = await PharmacyAdmin.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already in use' });
    }

   
    const existingEmail = await PharmacyAdmin.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

   
    const newAdmin = new PharmacyAdmin({ name, email, username, password });

    // Save the new admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Failed to add admin' });
  }
};


const deleteAdmin = async (req, res) => {
    try{
        const {username}= req.body;

        const deletionResult = await PharmacyAdmin.deleteOne({ username });

    if (deletionResult.deletedCount === 1) {
     
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      
      res.status(500).json({ error: 'Failed to delete admin' });
    }
    }
    catch(error)
    {
        res.status(500).json({error:'failed to delete admin'});
    }
}

// Delete a specific Patient
const deletePatient = async (req, res) => {
    try{
        const {username}= req.body;

        const deletionResult = await Patient.deleteOne({ username });

    if (deletionResult.deletedCount === 1) {
      
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      
      res.status(500).json({ error: 'Failed to delete admin' });
    }
    }
    catch(error)
    {
        res.status(500).json({error:'failed to delete admin'});
    }
}

// Delete a specific Doctor
const deletePharmacist = async (req, res) => {
    try{
        const {username}= req.body;

        const deletionResult = await Pharmacist.deleteOne({ username });

    if (deletionResult.deletedCount === 1) {
      
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete admin' });
    }
    }
    catch(error)
    {
        res.status(500).json({error:'failed to delete admin'});
    }
}


module.exports={
    getMedicines,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deletePharmacist,
    getPatient,
    getPharmacist
}
