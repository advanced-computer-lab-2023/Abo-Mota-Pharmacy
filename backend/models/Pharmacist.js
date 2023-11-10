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
	nationalId: {
		data: Buffer,
		contentType: String,
	},
	workingLicense: Buffer,
	pharmacyDegree: Buffer,
	registrationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
},{ toJSON: { virtuals: true } });


const options = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
  };
  
  pharmacistSchema.virtual("formattedDob").get(function () {
	return new Intl.DateTimeFormat("en-US", options).format(this.dob);
  });

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;