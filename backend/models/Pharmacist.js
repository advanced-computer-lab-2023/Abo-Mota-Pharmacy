const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacistSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	dob: Date,
	rate: Number,
	affiliation: String,
	educationalBackground: String,
	nationalId: String,
	workingLicense: Buffer,
	pharmacyDegree: Buffer,
	registrationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;