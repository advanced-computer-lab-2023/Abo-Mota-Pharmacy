const Medicine = require("../models/Medicine");
const Pharmacist = require("../models/Pharmacist");
const getPharmacist = async (req, res) => {
	try {
		const pharmacist = await Pharmacist.findOne({}).select("-password");
		res.status(200).json(pharmacist);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const getMedicines = async (req, res) => {
	try {
		const medicines = await Medicine.find();
		res.status(200).json(medicines);
	} catch (error) {
		console.error("Error editing medicine:", error);
		res.status(500).json({ error: error.message });
	}
};

const addMedicine = async (req, res) => {
	try {
		const { name, description, price, activeIngredients, quantity, medicinalUse} = req.body;
		const medicineImage = {
			data: req.files.medicineImage[0].buffer,
			contentType: req.files.medicineImage[0].mimetype
		}
		const newMedicine = {
			name,
			description,
			price,
			activeIngredients,
			quantity,
			medicinalUse,
			medicineImage
		};

		const medicine = await Medicine.findOne({ name });
		if (medicine) {
			return res.status(500).json({ error: "medicine already exists" });
		}

		const returnedMedicine = await Medicine.create(newMedicine);

		res.status(200).json(returnedMedicine);
	} catch (error) {
		console.error("Error adding medicine:", error);
		res.status(500).json({ error: error.message });
	}
};

const editMedicine = async (req, res) => {
	try {
		const { name } = req.params;
		const oldMedicine = await Medicine.findOne({name});
		let medicineImage = oldMedicine.medicineImage;
		if(req.files.medicineImage){
			medicineImage = {
				data: req.files.medicineImage[0].buffer,
				contentType: req.files.medicineImage[0].mimetype
			}
		}
		const updatedMedicine = await Medicine.updateOne({ name: name }, { medicineImage, ...req.body });

		// Check if the medicine was found and updated
		if (!updatedMedicine) {
			return res.status(404).json({ error: "Medicine not found" });
		}
		if (updatedMedicine.modifiedCount === 0) {
			return res.status(500).json({ error: "Medicine not updated with new values" });
		}

		res.json({ updatedMedicine });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPharmacist,
	getMedicines,
	addMedicine,
	editMedicine,
};
