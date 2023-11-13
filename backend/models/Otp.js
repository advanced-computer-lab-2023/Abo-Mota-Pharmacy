const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
	email: { type: String },
	otp: String,
	createdAt: Date,
	expiresAt: Date,
});

const Otp = mongoose.model("PharmacyOtp", otpSchema);
module.exports = Otp;
