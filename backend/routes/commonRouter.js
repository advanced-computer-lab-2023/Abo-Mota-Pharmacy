const express = require("express");
const Pharmacist = require("../models/Pharmacist");
const Message = require("../models/Message");

const {
  sendMessage,
  getMessages,
  getContactedUsers,
  getLoggedIn,
  getContact,
  nil,
  readMessage,
  sendEmailNotif,
  getNotifications,
  sendNotification,
  getUser

} = require("../controller/commonController");

const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization");

router.get("/message", authorize, getMessages);

router.post("/message", authorize, sendMessage);

router.get("/notifications", authorize, getNotifications);

router.post("/notification", authorize, sendNotification);

router.post('/send-email', authorize, sendEmailNotif);

router.get("/user", authorize, getUser);

router.get("/loggedIn", authorize, getLoggedIn);

router.get("/contact", authorize, getContact);

router.get("/contacts", authorize, getContactedUsers);

router.post("/pharmaservice", authorize, async (req, res) => {
  try {
    await Pharmacist.create({ username: "PharmaService", _id: "000000000000000000000000", name: "PharmaService" });
    res.status(200).json({ message: "PharmaService created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/readMessage", authorize, readMessage);

router.post("/nil", authorize, nil);
module.exports = router;

