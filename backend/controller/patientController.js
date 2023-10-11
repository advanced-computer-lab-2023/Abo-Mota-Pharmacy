const Medicine = require("../models/Medicine");

const getPatient = async (req, res) => {
	try {
		const patient = await Patient.findOne({}).populate("healthPackage.package");
		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMedicines = async (req, res) => {
	try {
		const medicines = await Medicine.find();
		res.status(200).json(medicines);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPatient,
	getMedicines,
};
