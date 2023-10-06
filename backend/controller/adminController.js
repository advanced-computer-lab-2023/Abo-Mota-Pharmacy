const Medicines = require('../models/Medicine');
const PharmacyAdmin = require('../models/PharmacyAdmin');
const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');


// View all Pharmacist Applications
const getApplications = async (req, res) => {
    try{
        const applications = await Pharmacist.find({registrationStatus : "pending"});
        res.status(200).json({applications: applications});
    }
    catch (error){
        res.status(500).json({error: "No applications found", message: error});
    }
}

// View a single application
const getApplication = async (req, res) => {
    try {
      
    } catch (error) {
      
    }
}

const getPharmacists = async (req, res) => {
    try {
      const pharmacists = await Pharmacist.find();
      res.status(200).json(pharmacists);
    } catch (error) {
      res.status(500).json({error: 'not found'});
    }
}

const getPharmacist = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacist = await Pharmacist.findById(id);
    if(!pharmacist)
      throw error;
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pharmacist'});
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    
    res.status(200).json({patients: patients});
  } catch (error) {
    res.status(500).json({error: "Could not retrieve patients"});
  }
}

// Get single patient
const getPatient = async (req,res)=>{
  try {
    const { id } = req.params;

    const patient = await Patient.findOne({ _id : id });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({message: patient});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient', message: error });
  }
}

// View a list of all medicines
const getMedicines = async (req,res)=>{
    try {
        const medicines = await Medicines.find({});
    
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
    res.status(500).json({ error: 'Failed to add admin' });
  }
};


const deleteAdmin = async (req, res) => {
    try{
        const {id} = req.params;

        const deletionResult = await PharmacyAdmin.deleteOne({ _id: id});

        res.status(200).json({ message: 'Admin deleted successfully' });
    
    }
    catch(error)
    {
        res.status(500).json({error:'failed to delete admin'});
    }
}

// Delete a specific Patient
const deletePatient = async (req, res) => {
    try{
        const {id}= req.params;
        const deletionResult = await Patient.deleteOne({ _id: id});
        res.status(200).json({message:'successfully deleted'});
    }
    catch(error)
    {
        res.status(500).json({error:'failed to delete admin'});
    }
}

// Delete a specific Doctor
const deletePharmacist = async (req, res) => {
    try{
        const {id}= req.params;
        const deletionResult = await Pharmacist.deleteOne({ _id: id});
        res.status(200).json({message:'successfully deleted'});
    }
    catch(error)
    {
      res.status(500).json({error:'failed to delete admin'});
    }
}


module.exports={
    getMedicines,
    getApplications,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deletePharmacist,
    getPatient,
    getPharmacist,
    getPatients,
    getPharmacists,
    getApplication
}
