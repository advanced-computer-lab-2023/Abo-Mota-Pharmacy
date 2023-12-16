const Medicine = require("../models/Medicine");
const Pharmacist = require("../models/Pharmacist");
const SalesReport = require("../models/SalesReport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getPharmacist = async (req, res) => {
  try {
    const username = req.userData.username;
    const pharmacist = await Pharmacist.findOne({ username });
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
    const {
      name,
      description,
      price,
      activeIngredients,
      quantity,
      medicinalUse,
      isOverTheCounter,
    } = req.body;
    const medicineImage = {
      data: req.files.medicineImage[0].buffer,
      contentType: req.files.medicineImage[0].mimetype,
    };
    const newMedicine = {
      name,
      description,
      price,
      activeIngredients,
      quantity,
      medicinalUse,
      medicineImage,
      isOverTheCounter,
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
    const oldMedicine = await Medicine.findOne({ name });
    let medicineImage = oldMedicine.medicineImage;
    if (req.files.medicineImage) {
      medicineImage = {
        data: req.files.medicineImage[0].buffer,
        contentType: req.files.medicineImage[0].mimetype,
      };
    }
    const updatedMedicine = await Medicine.updateOne(
      { name: name },
      { medicineImage, ...req.body }
    );

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

const getSalesReports = async (req, res) => {
  try {
    // const { medicineId } = req.body;
    const salesReport = await SalesReport.find().populate("medicineId");
    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const username = req.userData.username;
    const loggedIn = await Pharmacist.findOne({ username });

    const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
    if (!isMatch) {
      throw new Error("Old Password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await Pharmacist.updateOne(
      { _id: loggedIn._id },
      { password: hashedPassword }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewWallet = async (req, res) => {
  try {
    const username = req.userData.username;
    const loggedIn = await Pharmacist.findOne({ username });

    res.status(200).json({ wallet: loggedIn.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const archiveMedicine = async (req, res) => {
  try {
    const { medicineName } = req.body;

    const medicine = await Medicine.updateOne({ name: medicineName }, { status: "archived" });

    res.status(200).json({ medicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unarchiveMedicine = async (req, res) => {
  try {
    const { medicineName } = req.body;

    const medicine = await Medicine.updateOne({ name: medicineName }, { status: "unarchived" });

    res.status(200).json({ medicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPharmacist,
  getMedicines,
  addMedicine,
  editMedicine,
  getSalesReports,
  changePassword,
  viewWallet,
  archiveMedicine,
  unarchiveMedicine,
};
