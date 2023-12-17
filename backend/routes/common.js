const express = require("express");
const { sendEmailNotif, getNotifications, sendNotification, getLoggedIn } = require("../controller/commonController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/notifications", authorize, getNotifications);

router.post("/notification", authorize, sendNotification);

router.post('/send-email', authorize, sendEmailNotif);

router.get("/loggedIn", authorize, getLoggedIn);


module.exports = router;
