const medicineValidationSchema = require("../validations/validateMedicineSchema");

const validateMedicine = async (req, res, next) => {
	const { error } = await medicineValidationSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

module.exports = validateMedicine;
