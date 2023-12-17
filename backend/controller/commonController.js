const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');
const Message = require('../models/Message');
const Doctor = require('../models/Doctor');

// TESTING
// PATIENT: DONE
// PHARMACIST: DONE
const getMessages = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;
    const contact = req.query.contact;

    let user;

    if (userType.toLowerCase() === 'patient')
      user = await Patient.findOne({ username });
    if (userType.toLowerCase() === 'pharmacist') {
      user = await Pharmacist.findOne({ username: 'PharmaService' });
    }

    const messages = await Message.find({
      $or: [
        { sender: user._id, recipient: contact },
        { sender: contact, recipient: user._id }
      ]
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// TESTING
// PATIENT: DONE
// PHARMACIST: DONE
const sendMessage = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;
    const { content, recipient, date } = req.body;

    let sender;
    let message;

    if (userType.toLowerCase() === 'patient') {
      sender = await Patient.findOne({ username });

      message = {
        content,
        sender: sender._id,
        recipient: recipient,
        date,
      }
    }
    if (userType.toLowerCase() === 'pharmacist') {
      sender = await Pharmacist.findOne({ username: 'PharmaService' });
      const actualSender = await Pharmacist.findOne({ username: username });

      message = {
        content,
        sender: sender._id,
        actualSender: actualSender._id,
        recipient: recipient,
        date,
      }
    }

    await Message.create(message);
    res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TESTING
// PATIENT: DONE
// PHARMACIST: DONE

const getContactDetails = async (loggedIn, contactIds, collections) => {
  const details = await Promise.all(contactIds.map(async (contactId) => {

    const latestMessage = await Message.findOne({
      $or: [
        { sender: loggedIn._id, recipient: contactId },
        { sender: contactId, recipient: loggedIn._id }
      ]
    }).sort({ date: -1 }).lean();

    let contactDetails;
    for (const collection of collections) {
      contactDetails = await collection.findById(contactId).lean();
      if (contactDetails) {
        // Found the contact in this collection, break the loop
        break;
      }
    }

    return {
      contact: contactDetails,
      message: latestMessage,
    };
  }));

  return details.sort((a, b) => {
    const dateA = new Date(a.message.date);
    const dateB = new Date(b.message.date);

    // Sort in descending order (newest to oldest)
    return dateB - dateA;
  });
}


const getContactedUsers = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;

    const sameCollection = userType.toLowerCase() === 'patient' ? Patient : Pharmacist;
    const oppositeCollections = userType.toLowerCase() === 'patient' ? [Pharmacist] : [Patient, Doctor];

    let loggedIn;

    if (userType.toLowerCase() === 'patient')
      loggedIn = await sameCollection.findOne({ username });

    if (userType.toLowerCase() === 'pharmacist')
      loggedIn = await sameCollection.findOne({ username: 'PharmaService' });

    // console.log(loggedIn);

    const sentMessages = await Message.find({ sender: loggedIn._id });

    // console.log(sentMessages);

    const receivedMessages = await Message.find({ recipient: loggedIn._id });

    // duplicate-free contacted users
    const recipientIds = [...new Set(sentMessages.map(message => message.recipient.toString()))];
    const senderIds = [...new Set(receivedMessages.map(message => message.sender.toString()))];
    const contactedUserIds = [...new Set([...recipientIds, ...senderIds])];
    const contactedUsers = await getContactDetails(loggedIn, contactedUserIds, oppositeCollections);

    res.status(200).json(contactedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getContact = async (req, res) => {
  try {
    const { userType } = req.userData;
    const { contact } = req.query;
    let contactType;

    let user;
    if (userType.toLowerCase() === 'patient') {
      user = await Pharmacist.findOne({ _id: contact });
      contactType = 'pharmacist';
    }
    if (userType.toLowerCase() === 'pharmacist') {
      user = await Patient.findOne({ _id: contact });
      contactType = 'patient';

      if (!user) {
        user = await Doctor.findOne({ _id: contact });
        contactType = 'doctor';
      }
    }

    res.status(200).json({
      ...user._doc,
      contactType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoggedIn = async (req, res) => {
  try {
    const { username, userType } = req.userData;

    let user;

    if (userType.toLowerCase() === 'patient')
      user = await Patient.findOne({ username });

    if (userType.toLowerCase() === 'pharmacist')
      user = await Pharmacist.findOne({ username: 'PharmaService' });


    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const nil = async (req, res) => {
  res.status(200).json("You just wasted everyone's time");
}

module.exports = {
  getMessages,
  sendMessage,
  getContactedUsers,
  getContact,
  getLoggedIn,
  nil,
};

// Testing chatting

