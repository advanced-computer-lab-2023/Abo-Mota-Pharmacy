const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/PharmacyAdmin")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const {JWT_SECRET}  = process.env;

// initial testing complete, needs further edge cases tested
const registerPatient = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;
		// 1. Check if the user already exists
		const userExists = await Patient.findOne({ $or: [{ username }, { nationalId }, { email }] });
		if (userExists) {
			throw new Error("User with these credentials already exists");
		}

		// 2. Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 3. Create a new user instance and save it
		const newPatient = await Patient.create({
			...req.body,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{
				username: username,
				userType: "patient"
			},
			JWT_SECRET,
			{expiresIn: 86400}, //expires after 1 day
			
		)
		return res.cookie('jwt', token, {httpOnly: true, maxAge: 86400 * 1000, secure: false, path: '/' })
					.status(200).json({newPatient, token: "Bearer " + token});
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

const registerPharmacist = async (req, res) => {
	try {
		const { username, password, email } = req.body;

		const pharmacistExists = await Pharmacist.findOne({
			$and: [
				{ $or: [{ username }, { email }] },
				{ registrationStatus: { $in: ["approved", "pending"] } },
			],
		});

		if (pharmacistExists) {
			throw new Error("Pharmacist with these credentials already exists");
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const nationalId = {
			data: req.files.nationalId[0].buffer,
			contentType: req.files.nationalId[0].mimetype
		}
		const workingLicense = {
			data: req.files.workingLicense[0].buffer,
			contentType: req.files.workingLicense[0].mimetype
		}
		const pharmacyDegree = {
			data: req.files.pharmacyDegree[0].buffer,
			contentType: req.files.pharmacyDegree[0].mimetype
		}

		const newPharmacist = await Pharmacist.create({
			...req.body,
			password: hashedPassword,
			nationalId,
			workingLicense,
			pharmacyDegree
		});

		const token = jwt.sign(
			{
				username: username,
				userType: "pharmacist"
			},
			JWT_SECRET,
			{expiresIn: 86400}, //expires after 1 day
			
		)

		return res.cookie('jwt', token, {httpOnly: true, maxAge: 86400 * 1000, secure: false, path: '/' })
				.status(200).json({newPharmacist, token: "Bearer " + token});
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

const login = async (req, res)  => {
    const {username, password} = req.body;

    const patientExists = await Patient.findOne({username: username});
    const pharmacistExists = await Pharmacist.findOne({username: username});
    const adminExists = await Admin.findOne({username: username});

    if(!patientExists && !pharmacistExists && !adminExists){
        return res.status(404).json({
            message: "Invalid Username"
        })
    }

    let dbUserPass;
	let userType;
    if(patientExists){
		dbUserPass = patientExists.password;
		userType = "patient"

	}
    else if(pharmacistExists){
		dbUserPass = pharmacistExists.password;
		userType = "pharmacist"
	}
    else{
		dbUserPass = adminExists.password;
		userType = "admin"
	}

    bcrypt.compare(password, dbUserPass)
    .then( isCorrect => {
        //correct creds => create jwt token 
        if(isCorrect){
            const payload = {
                username: username,
				userType: userType
            }
            //create the token
            jwt.sign(
                payload,
                JWT_SECRET,
                {expiresIn: 86400}, //expires after 1 day
                (err, token) => {
                    if(err) 
                        return res.json({message: err})

                    return res.cookie('jwt', token, {httpOnly: true, maxAge: 86400 * 1000, secure: false, path: '/' })
						.status(200).json({
                        message: "Success",
                        token: "Bearer " + token,
						userType: userType //use to redirect to correct homepage
                    })
                }
            )
        } else {
            return res.status(404).json({
                message: "Invalid Password!"
            })
        }
    })
    
}

const logout = (req,res) => {
    try{
        res.clearCookie('jwt');
        res.status(200).json({message: "Logged Out Successfully"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
	registerPatient,
	registerPharmacist,
	login,
	logout
};
