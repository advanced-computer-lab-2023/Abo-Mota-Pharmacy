const Medicines = require("../models/Medicine");
const PharmacyAdmin = require("../models/PharmacyAdmin");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// View all Pharmacist Applications
const getApplications = async (req, res) => {
	try {
		const applications = await Pharmacist.find({ registrationStatus: "pending" });
		res.status(200).json(applications);
	} catch (error) {
		res.status(500).json({ error: "No applications found", message: error });
	}
};

const handleApplication = async (req, res) => {
	try {
		const { id } = req.params;
		const { registrationStatus } = req.body;
		const filter = { _id: id };
		const update = { registrationStatus };

		if (registrationStatus !== "approved" && registrationStatus !== "rejected") {
			throw new Error("Registration can either be approved or rejected");
		}

		if (registrationStatus === "rejected") {
			const rejectedApplication = await Pharmacist.deleteOne(filter);
			res.status(200).json(rejectedApplication);
		} else {
			const handledApplication = await Pharmacist.updateOne(filter, update);
			if (handledApplication.modifiedCount === 0) {
				throw new Error("Application not found");
			}
			res.status(200).json(handledApplication);
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
};

// View a single application
const getApplication = async (req, res) => {
	try {
	} catch (error) {}
};

const getPharmacists = async (req, res) => {
	try {
		const filter = {
			registrationStatus: "approved",
		};
		const pharmacists = await Pharmacist.find(filter);
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

		res.status(200).json(patients);
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
		res.status(500).json({ error: error.message });
	}
};

// Add an Admin
const addAdmin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUsername = await PharmacyAdmin.findOne({ username: username.toLowerCase() });

		if (existingUsername) {
			return res.status(400).json({ error: "Username is already in use" });
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newAdmin = await PharmacyAdmin.create({
			username: username.toLowerCase(),
			password: hashedPassword,
		});

		// Save the new admin to the database
		// await newAdmin.save();

		res.status(200).json(newAdmin);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Patient - tested initially
const deletePatient = async (req, res) => {
	try {
		const { username } = req.body;
		const filter = { username: username.toLowerCase() };
		const patient = await Patient.findOne(filter);

		if (!patient) {
			throw new Error("Patient not found");
		}
		// const idOfPatient = patient._id;
		// //find and delete appointments
		// const deletedAppointments = await Appointment.deleteMany({ patient: idOfPatient });
		// // find and delete prescriptions
		// const deletedPrescriptions = await Prescription.deleteMany({ patient: idOfPatient });

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
		const filter = { username: username.toLowerCase(), registrationStatus: "approved" };
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

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		console.log(oldPassword+" "+newPassword)
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN DOCTOR ** DONE
		const username = req.userData.username;
		const loggedIn = await PharmacyAdmin.findOne({ username });
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN DOCTOR **

		const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
		if (!isMatch) {
			throw new Error("Old Password is incorrect");
		}
		
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		const updatedUser = await PharmacyAdmin.updateOne(
			{ _id: loggedIn._id },
			{ password: hashedPassword }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getMedicines,
	getApplications,
	addAdmin,
	deletePatient,
	deletePharmacist,
	getPatient,
	getPharmacist,
	getPatients,
	getPharmacists,
	getApplication,
	handleApplication,
	changePassword,
};
