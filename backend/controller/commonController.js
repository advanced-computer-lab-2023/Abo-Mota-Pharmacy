const Pharmacist = require("../models/Pharmacist");
const Notification = require("../models/Notification");
const PharmacyAdmin = require("../models/PharmacyAdmin");
const Patient = require("../models/Patient");
const sendEmail = require("../utils/sendEmail");

const getNotifications = async (req, res) => {
  try {
    const { username } = req.userData;

    const user = await Pharmacist.findOne({ username });

    const notifications = await Promise.all(
      user.notifications.map(async (notificationId) => {
        return await Notification.findOne({ _id: notificationId });
      })
    );

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmailNotif = async (req, res) => {
  try {
    const { OTP_SENDER_MAIL } = process.env;
    const { email, subject, text } = req.body;

    const mailOptions = {
      from: OTP_SENDER_MAIL,
      to: email,
      subject: subject,
      text: text,
    };

    await sendEmail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
};

const sendNotification = async (req, res) => {
  try {
    const { username, userType } = req.userData;
    const { recipientUsername, recipientType, content } = req.body;

    const recipient = await Pharmacist.findOne({
      username: recipientUsername.toLowerCase(),
    });

    if (!recipient) throw new Error("This recipient does not exist");

    const notification = {
      sender: {
        username: username,
        userType,
      },
      recipient: {
        username: recipientUsername.toLowerCase(),
        userType: recipientType,
      },
      content: content,
      date: Date.now(),
    };

    const savedNotification = await Notification.create(notification);

    //update recipient
    recipient.notifications.push(savedNotification._id);
    await recipient.save();

    res.status(200).json({ message: "Notification sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoggedIn = async (req, res) => {
  try {
    const { username, userType } = req.userData;

    let user;

    if (userType.toLowerCase() === "patient") user = await Patient.findOne({ username });

    if (userType.toLowerCase() === "pharmacist") user = await Pharmacist.findOne({ username });

    if (userType.toLowerCase() === "admin") user = await PharmacyAdmin.findOne({ username });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendEmailNotif,
  getNotifications,
  sendNotification,
  getLoggedIn,
};
