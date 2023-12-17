const Medicine = require("../models/Medicine");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Order = require("../models/Order");
const SalesReport = require("../models/SalesReport");
const ClinicPatient = require("../models/ClinicPatient");
const Prescription = require("../models/Prescription");
const HealthPackage = require("../models/HealthPackage");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;

const getPatient = async (req, res) => {
  try {
    console.log(req.userData);
    const username = req.userData.username;
    let patient = await Patient.findOne({ username })
      .populate({
        path: "cart",
        populate: {
          path: "medicine",
          model: "Medicine",
        },
      })
      .populate("healthPackage.package")
      .populate("clinicPatient")
      .populate({
        path: "clinicPatient",
        populate: {
          path: "healthPackage.package",
          model: "HealthPackage",
        },
      });
    if (patient.clinicPatient !== null || patient.clinicPatient !== undefined) {
      const prescriptions = await Prescription.find({
        patient: patient.clinicPatient,
        status: "unfilled",
      }).populate([
        {
          path: "medicines.medicine",
          model: "Medicine",
        },
      ]);
      // console.log(patient);
      patient = patient.toObject();
      patient.prescriptions = prescriptions;
      // patient.prescriptions = prescriptions.map((prescription) => {
      //   // Convert prescription to a plain object if it's a Mongoose document
      //   prescription =
      //     prescription instanceof mongoose.Document ? prescription.toObject() : prescription;
      //   // console.log(prescription);
      //   if (Array.isArray(prescription.medicines)) {
      //     prescription.medicines = prescription.medicines.map((medicineObj) => {
      //       // console.log(medicineObj.medicine);
      //       const medicineClone = medicineObj.medicine;
      //       delete medicineClone.medicineImage;
      //       // console.log(medicineClone);

      //       medicineObj.medicine = medicineClone;

      //       return medicineObj;
      //     });
      //   }
      //   return prescription;
      // });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ status: "unarchived" });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePrescriptionsQuantity = async (req, res) => {
  try {
    const { prescriptionId, medicineId } = req.body;
    const prescription = await Prescription.findOne({ _id: prescriptionId });
    const newMedicines = prescription.medicines.map((medicine) => {
      // console.log(medicine);
      if (medicine.medicine.equals(medicineId)) {
        return { ...medicine.toObject(), quantity: medicine.quantity - 1 };
      }
      return medicine;
    });
    // console.log(newMedicines);
    const updatedPrescription = await Prescription.updateOne(
      { _id: prescriptionId },
      {
        medicines: newMedicines,
      }
    );
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOrders = async (req, res) => {
  try {
    const username = req.userData.username;
    const patient = await Patient.findOne({ username });
    const orders = await Order.find({ patient: patient._id }).sort({ date: -1 });
    if (!orders) throw new Error("You haven't made any orders yet");
    const ordersWithImages = await Promise.all(
      orders.map(async (order) => {
        const formattedDate = order.formattedDate;
        const orderClone = order.toObject();
        orderClone.formattedDate = formattedDate;
        orderClone.medicines = await Promise.all(
          order.medicines.map(async (medicineObj) => {
            const medWithImg = await Medicine.findOne({ name: medicineObj.name });
            medicineObj.medicineImage = medWithImg.medicineImage;
            return medicineObj;
          })
        );
        return orderClone;
      })
    );
    // console.log(ordersWithImages);
    res.status(200).json(ordersWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find();
    console.log(pharmacists);
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username });

    const order = await Order.findOne({ _id: orderId });
    if (!order) throw new Error("This order does not exist");

    const updatedPatient = await Patient.findByIdAndUpdate(
      loggedIn._id,
      { $inc: { wallet: order.totalPrice } },
      { new: true }
    );

    const updatedMedicines = await Promise.all(
      order.medicines.map(async (medicine) => {
        const dbMedicine = await Medicine.findOne({ name: medicine.name });

        const updatedMedicine = await Medicine.updateOne(
          { _id: dbMedicine._id },
          {
            sales: dbMedicine.sales - medicine.quantity,
            quantity: dbMedicine.quantity + medicine.quantity,
          }
        );

        // removing sales report, sprint 3
        // console.log("order", order);
        const removeSalesReport = await SalesReport.deleteOne({
          medicineId: dbMedicine._id,
          sales: medicine.quantity,
          purchaseDate: order.date,
        });
        // console.log("removeSalesReport", removeSalesReport);
      })
    );
    // console.log("updatedMedicines", updatedMedicines);
    const updatedOrder = await Order.updateOne({ _id: orderId }, { status: "cancelled" });

    res.status(200).json({ updatedOrder, updatedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Payment should be done before
const createOrder = async (req, res) => {
  try {
    const username = req.userData.username;
    const patient = await Patient.findOne({ username });
    let clinicPatientExists;
    if (patient.hasOwnProperty("clinicPatient") && patient.clinicPatient !== null) {
      clinicPatientExists = await ClinicPatient.findOne({ _id: patient.clinicPatient }).populate(
        "healthPackage.package"
      );
    }
    const { medicines } = req.body;

    let totalPrice = 0;

    medicines.forEach((medicine) => {
      totalPrice += medicine.price * medicine.quantity;
    });

    if (
      clinicPatientExists &&
      (clinicPatientExists.healthPackage.status === "subscribed" ||
        clinicPatientExists.healthPackage.status === "unsubscribed")
    ) {
      totalPrice *= 1 - clinicPatientExists.healthPackage.pharmacyDiscount;
    }
    const purchaseDate = new Date();
    const updatedMedicines = await Promise.all(
      medicines.map(async (medicine) => {
        const dbMedicine = await Medicine.findOne({ name: medicine.name }).select("-medicineImage");

        if (!dbMedicine) throw new Error("This medicine does not exist");

        const updatedMedicine = await Medicine.updateOne(
          { _id: dbMedicine._id },
          {
            sales: dbMedicine.sales + medicine.quantity,
            quantity: dbMedicine.quantity - medicine.quantity,
          }
        );

        // adding sales report, sprint 3
        const addedSalesReport = await SalesReport.create({
          medicineId: dbMedicine._id,
          sales: medicine.quantity,
          purchaseDate: purchaseDate,
        });
        // const targetDate = new Date(purchaseDate).getDate();
        // const nextDay = new Date(targetDate);
        // nextDay.setDate(targetDate.getDate() + 1);
        // const findSimilarSalesReport = await SalesReport.findOne({
        //   medicineId: dbMedicine._id,
        //   purchaseDate: {
        //     $gte: targetDate,
        //     $lt: nextDay,
        //   },
        // });
        // if (findSimilarSalesReport) {
        //   const updatedSalesReport = await SalesReport.updateOne(
        //     { medicineId: dbMedicine._id, purchaseDate: targetDate },
        //     { sales: findSimilarSalesReport.sales + medicine.quantity }
        //   );
        // } else {
        //   const addedSalesReport = await SalesReport.create({
        //     medicineId: dbMedicine._id,
        //     sales: medicine.quantity,
        //     purchaseDate: targetDate,
        //   });
        // }
      })
    );

    const order = await Order.create({
      medicines,
      date: purchaseDate,
      patient: patient._id,
      totalPrice,
    });

    const updatedPatient = await Patient.updateOne({ username }, { cart: [] });

    let soldOutMedicine = [];
    for (const medicine of medicines) {
      const dbMedicine = await Medicine.findOne({ name: medicine.name }).select("-medicineImage");
      if (dbMedicine && dbMedicine.quantity === 0) {
        soldOutMedicine.push(dbMedicine);
      }
    }

    res.status(200).json({ order, updatedMedicines, soldOutMedicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const username = req.userData.username;
    const patient = await Patient.findOne({ username }).populate({
      path: "cart",
      populate: {
        path: "medicine",
        model: "Medicine",
      },
    });

    const name = req.body.name;
    const medicine = await Medicine.findOne({ name });

    if (!medicine) throw new Error("This medicine does not exist");
    if (medicine.quantity === 0) {
      throw new Error("Not enough medicine in stock");
    }

    const existingCartItem = patient.cart.find((item) => item.medicine._id.equals(medicine._id));

    if (existingCartItem && existingCartItem.quantity < medicine.quantity) {
      existingCartItem.quantity += 1;
    } else if (!existingCartItem) {
      patient.cart.push({ medicine, quantity: 1 });
    } else if (existingCartItem.quantity === medicine.quantity) {
      throw new Error("Not enough medicine in stock");
    }
    await patient.save();
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username }).populate({
      path: "cart",
      populate: {
        path: "medicine",
        model: "Medicine",
      },
    });

    const cart = loggedIn.cart;

    const updatedCart = cart
      .map((item) => {
        if (item.medicine.name === name) {
          // Convert the Mongoose document to a plain JavaScript object
          const itemObject = item.toObject();
          return { ...itemObject, quantity: itemObject.quantity - quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    const updatedPatient = await Patient.updateOne({ username }, { cart: updatedCart });
    res.status(200).json({ updatedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addDeliveryAddress = async (req, res) => {
  try {
    const { username } = req.userData;
    const { apartmentNumber, streetName, city } = req.body;

    const loggedIn = await Patient.findOne({ username });

    loggedIn.deliveryAddresses.some((address) => {
      if (
        address.apartmentNumber === apartmentNumber &&
        address.streetName === streetName &&
        address.city === city
      ) {
        throw new Error("This address already exists");
      }
    });

    await Patient.updateOne(
      { username },
      {
        deliveryAddresses: [...loggedIn.deliveryAddresses, { apartmentNumber, streetName, city }],
      }
    );

    res.status(200).json({ message: "Delivery address added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const payByWallet = async (req, res) => {
  try {
    const { deductible } = req.body;
    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username });

    if (loggedIn.wallet < deductible) {
      return res.status(500).json({ message: "Insufficient funds" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      loggedIn._id,
      { $inc: { wallet: -deductible } },
      { new: true }
    );

    res.status(200).json({ message: "Payment is successful", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username });

    const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
    if (!isMatch) {
      throw new Error("Old Password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await Patient.updateOne(
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
    const loggedIn = await Patient.findOne({ username });

    res.status(200).json({ wallet: loggedIn.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewAlternatives = async (req, res) => {
  try {
    const { medicineName } = req.body;

    const selectedMedicine = await Medicine.findOne({ name: medicineName });

    const mainActiveIngredient = selectedMedicine.activeIngredients[0];

    const alternatives = await Medicine.find({
      "activeIngredients.0": mainActiveIngredient,
      status: "unarchived",
      quantity: { $gt: 0 },
    });

    if (alternatives.length === 0) {
      throw new Error("There are no available alternatives");
    }

    res.status(200).json({ alternatives });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const linkWithClinic = async (req, res) => {
  try {
    const { username, password } = req.body;
    const clinicPatient = await ClinicPatient.findOne({ username });
    if (!clinicPatient) {
      throw new Error("Clinic patient not found");
    }
    const isMatch = await bcrypt.compare(password, clinicPatient.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    const pharmacyUsername = req.userData.username;

    const updatedPatient = await Patient.updateOne(
      { username: pharmacyUsername },
      { clinicPatient: clinicPatient._id }
    );
    const loggedInPatient = await Patient.findOne({ username: pharmacyUsername });
    const updatedClinicPatient = await ClinicPatient.updateOne(
      { username: username },
      { pharmacyPatient: loggedInPatient._id }
    );

    res.status(200).json({ message: updatedClinicPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getPatient,
  getMedicines,
  getOrders,
  getPharmacists,
  cancelOrder,
  createOrder,
  removeFromCart,
  addToCart,
  addDeliveryAddress,
  payByWallet,
  changePassword,
  viewWallet,
  viewAlternatives,
  linkWithClinic,
  updatePrescriptionsQuantity,
};
