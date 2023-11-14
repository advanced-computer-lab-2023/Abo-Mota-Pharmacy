const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/PharmacyAdmin");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateOTP = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, OTP_SENDER_MAIL } = process.env;

// initial testing complete, needs further edge cases tested
const registerPatient = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;
		const lowerCaseUser = username.toLowerCase();

		// 1. Check if the user already exists
		const userExists = await Patient.findOne({ $or: [{ username: lowerCaseUser }, { nationalId }, { email }] });
		if (userExists) {
			throw new Error("User with these credentials already exists");
		}

		// 2. Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 3. Create a new user instance and save it
		const newPatient = await Patient.create({
			...req.body,
			password: hashedPassword,
			username: lowerCaseUser
		});

		const token = jwt.sign(
			{
				username: username,
				userType: "patient",
			},
			JWT_SECRET,
			{ expiresIn: 86400 } //expires after 1 day
		);
		return res
			// .cookie("jwt", token, { httpOnly: true, maxAge: 86400 * 1000, secure: false, path: "/" })
			.status(200)
			.json({ newPatient, token: "Bearer " + token });
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

const registerPharmacist = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const lowerCaseUser = username.toLowerCase();

		const pharmacistExists = await Pharmacist.findOne({
			$and: [
				{ $or: [{ username: lowerCaseUser }, { email }] },
				{ registrationStatus: { $in: ["approved", "pending"] } },
			],
		});

		if (pharmacistExists) {
			throw new Error("Pharmacist with these credentials already exists");
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const nationalId = {
			data: req.files.nationalId[0].buffer,
			contentType: req.files.nationalId[0].mimetype,
		};
		const workingLicense = {
			data: req.files.workingLicense[0].buffer,
			contentType: req.files.workingLicense[0].mimetype,
		};
		const pharmacyDegree = {
			data: req.files.pharmacyDegree[0].buffer,
			contentType: req.files.pharmacyDegree[0].mimetype,
		};

		const newPharmacist = await Pharmacist.create({
			...req.body,
			password: hashedPassword,
			username : lowerCaseUser,
			nationalId,
			workingLicense,
			pharmacyDegree,
		});

		const token = jwt.sign(
			{
				username: username,
				userType: "pharmacist",
			},
			JWT_SECRET,
			{ expiresIn: 86400 } //expires after 1 day
		);

		return res
			// .cookie("jwt", token, { httpOnly: true, maxAge: 86400 * 1000, secure: false, path: "/" })
			.status(200)
			.json({ newPharmacist, token: "Bearer " + token });
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	const patientExists = await Patient.findOne({ username: username.toLowerCase() });
	const pharmacistExists = await Pharmacist.findOne({ username: username.toLowerCase() });
	const adminExists = await Admin.findOne({ username: username.toLowerCase() });

	if (!patientExists && !pharmacistExists && !adminExists) {
		return res.status(404).json({
			message: "Invalid Username",
		});
	}

	let dbUserPass;
	let userType;
	if (patientExists){
		dbUserPass = patientExists.password;
		userType = "patient";
	} else if (pharmacistExists) {
		dbUserPass = pharmacistExists.password;
		userType = "pharmacist";
	} else{
		dbUserPass = adminExists.password;
		userType = "admin";
	}

	bcrypt.compare(password, dbUserPass).then((isCorrect) => {
		//correct creds => create jwt token
		if (isCorrect) {
			const payload = {
				username: username,
				userType: userType,
			};
			//create the token
			jwt.sign(
				payload,
				JWT_SECRET,
				{ expiresIn: 86400 }, //expires after 1 day
				(err, token) => {
					if (err) return res.json({ message: err });

					return res
						.cookie("jwt", token, {
							httpOnly: true,
							maxAge: 86400 * 1000,
							secure: false,
							path: "/",
						})
						.status(200)
						.json({
							message: "Success",
							token: "Bearer " + token,
							userType: userType, //use to redirect to correct homepage
						});
				}
			);
		} else {
			return res.status(404).json({
				message: "Invalid Password!",
			});
		}
	});
};

const logout = (req, res) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({ message: "Logged Out Successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const sendOtp = async (email) => {
	try {
		if (!email) {
			throw new Error("Email is required");
		}
		// clear old requests
		await Otp.deleteOne({ email });
		const generatedOtp = await generateOTP();
		// send email
		const mailOptions = {
			from: OTP_SENDER_MAIL,
			to: email,
			subject: "Your Password Reset Code",
			html: `<p>Here is your requested OTP</p>
		<p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOtp}</b></p>
		<p>This code <b>expires in 5 minutes</b>.</p>`,
		};
		await sendEmail(mailOptions);
		// save otp in DB
		const hashedOtp = await bcrypt.hash(generatedOtp, saltRounds);
		const newOtp = await Otp.create({
			email,
			otp: hashedOtp,
			createdAt: Date.now(),
			expiresAt: Date.now() + 5 * 60 * 1000,
		});
		return newOtp;
	} catch (error) {
		throw error;
	}
};

const requestOtp = async (req, res) => {
	try {
		const { email } = req.body;
		const patient = await Patient.findOne({ email });
		const pharmacist = await Pharmacist.findOne({ email });
		const admin = await Admin.findOne({ email });
		if (!patient && !pharmacist && !admin) {
			throw new Error("This user does not exist");
		}
		const createdOtp = await sendOtp(email);
		res.status(200).json(createdOtp);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const verifyOtp = async ({ email, otp }) => {
	try {
		if (!email || !otp) {
			throw Error("Provide email and OTP");
		}
		// check the OTP exists
		const otpExists = await Otp.findOne({ email });
		if (!otpExists) {
			throw Error("No OTP records found");
		}
		// Checking if OTP is expired
		const { expiresAt } = otpExists;
		if (expiresAt < Date.now()) {
			await Otp.deleteOne({ email });
			throw Error("OTP has expired. Request a new one");
		}
		const hashedOtp = otpExists.otp;
		const otpMatch = await bcrypt.compare(otp, hashedOtp);
		return otpMatch;
	} catch (error) {
		throw error;
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email, otp, newPassword } = req.body;
		if (!newPassword) {
			throw Error("Input a new password");
		}
		const validOtp = await verifyOtp({ email, otp });
		if (!validOtp) {
			throw Error("Incorrect or missing credentials");
		}
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		let updateResult = null;
		// Update the password for the admin, patient, or doctor
		if (await Admin.findOne({ email })) {
			updateResult = await Admin.updateOne({ email }, { password: hashedPassword });
		} else if (await Patient.findOne({ email })) {
			updateResult = await Patient.updateOne({ email }, { password: hashedPassword });
		} else if (await Pharmacist.findOne({ email })) {
			updateResult = await Pharmacist.updateOne({ email }, { password: hashedPassword });
		} else {
			throw new Error("This user doesn't exist");
		}
		// Check if the update operation was successful
		if (updateResult && updateResult.modifiedCount === 1) {
			res.status(200).json({ updateResult });
		} else {
			throw new Error("Failed to update password");
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteOtp = async (email) => {
	try {
		await Otp.deleteOne({ email });
	} catch (error) {
		throw error;
	}
};

module.exports = {
	registerPatient,
	registerPharmacist,
	login,
	logout,
	forgotPassword,
	requestOtp,
};
