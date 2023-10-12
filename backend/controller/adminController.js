const Medicines = require("../models/Medicine");
const PharmacyAdmin = require("../models/PharmacyAdmin");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// View all Pharmacist Applications
const getApplications = async (req, res) => {
    try{
        const applications = await Pharmacist.find({registrationStatus : "pending"});
        res.status(200).json(applications);
    }
    catch (error){
        res.status(500).json({error: "No applications found", message: error});
    }
}

// View a single application
const getApplication = async (req, res) => {
	try {
	} catch (error) {}
};

const getPharmacists = async (req, res) => {
	try {
		const pharmacists = await Pharmacist.find();
		res.status(200).json(pharmacists);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPharmacist = async (req, res) => {
	try {
		const { id } = req.params;
		const pharmacist = await Pharmacist.findById(id);
		if (!pharmacist) throw error;
		res.status(200).json(pharmacist);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all patients
const getPatients = async (req, res) => {
	try {
		const patients = await Patient.find({});
		res.status(200).json(patients );
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get single patient
const getPatient = async (req, res) => {
	try {
		const { id } = req.params;

		const patient = await Patient.findOne({ _id: id });

		if (!patient) {
			return res.status(404).json({ error: error.message });
		}

		res.status(200).json({ message: patient });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// View a list of all medicines
const getMedicines = async (req, res) => {
	try {
		const medicines = await Medicines.find({});

		if (!medicines || medicines.length === 0) {
			return res.status(404).json({ error: error.message });
		}
		res.status(200).json(medicines);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch medicines" });
	}
};

// Add an Admin
const addAdmin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUsername = await PharmacyAdmin.findOne({ username });

		if (existingUsername) {
			return res.status(400).json({ error: "Username is already in use" });
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newAdmin = new PharmacyAdmin({  username, password: hashedPassword });

		// Save the new admin to the database
		await newAdmin.save();

		res.status(201).json({ message: "Admin created successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to add admin" });
	}
};

const deleteAdmin = async (req, res) => {
	try {
		// const { id } = req.params;
		// const filter = { _id: id };
		const { username } = req.body;
		const filter = { username};
		const admin = await PharmacyAdmin.findOne(filter);
    console.log(filter);
		if (!admin) {
			throw new Error('Admin not found');
		}

		const deletedAdminResponse = await PharmacyAdmin.deleteOne(filter);
		res.status(200).json(deletedAdminResponse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Patient - tested initially
const deletePatient = async (req, res) => {
	try {
		const { username } = req.body;
		const filter = { username };
		const patient = await Patient.findOne(filter);
    
		if (!patient) {
			throw new Error("Patient not found");
		}
    
		const deletedPatientResponse = await Patient.deleteOne(filter);
		res.status(200).json(deletedPatientResponse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Doctor
const deletePharmacist = async (req, res) => {
	try {
		
		const { username } = req.body;
		const filter = { username: username, registrationStatus: "approved" };
		const pharmacist = await Pharmacist.findOne(filter);

		if (!pharmacist) {
			throw new Error("Doctor not found");
		}

		const deletedPharmacistResponse = await Pharmacist.deleteOne(filter);
		res.status(200).json(deletedPharmacistResponse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
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
	getApplication,
};
