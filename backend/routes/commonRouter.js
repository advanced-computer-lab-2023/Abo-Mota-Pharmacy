const express = require("express");
const Pharmacist = require("../models/Pharmacist");
const Message = require("../models/Message");
// const { sendMessage, getMessages, getLoggedIn, sendEmailNotif, getNotifications, sendNotification, getRecipient, getContactedUsers, nil } = require("../controllers/commonController");
const { sendMessage, getMessages, getContactedUsers, getLoggedIn, getContact, nil,  sendEmailNotif, getNotifications, sendNotification, getUser } = require("../controller/commonController");
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
  // await Message.create({ content: "Hello", sender: "000000000000000000000000", recipient: "000000000000000000000000", date: new Date() });
});

router.post("/nil", authorize, nil);
module.exports = router;

// assume the new model is:

/*
  Pharmacist => Patient

  {
    sender: actual pharmacist id
    senderAlias: 'PharmaService' id => 0x12
    recipient: actual patient id
    content: message
    date: date
  }

  ----

  Patient => Pharmacist

  {
    sender: patient_id
    senderAlias: patient_id
    recipient: PharmaService id => 0x12
    content: message
    date: date
  }
*/