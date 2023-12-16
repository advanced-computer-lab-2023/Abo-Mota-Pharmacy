require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

// express app
const app = express();
const pharmacistRouter = require("./routes/pharmacistRouter");
const adminRouter = require("./routes/adminRouter");
const patientRouter = require("./routes/patientRouter");
const guestRouter = require("./routes/guestRouter");
const stripeRouter = require("./routes/stripeRouter");
const commonRouter = require("./routes/common");

const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

// added for socket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

// keeping track of online users
const activeUsers = {};

io.on("connection", (socket) => {
  console.log("Connection success");

  socket.on("user_connected", (userId) => {
    console.log("User connected:", userId);
    activeUsers[userId] = socket.id;
  });

  //----------Notifications-------------//

  socket.on("send_notification_stock", ({receiver, content}) => {
    const receiverSocket = activeUsers[receiver]; // get receiver socket id from activeUsers list
    socket.to(receiverSocket).emit("receive_notification_stock", {content});
  });

});

const MongoURI = process.env.MONGO_URI;

// mongo connection string
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(express.static(process.env.STATIC_DIR));
app.use(bodyParser.json());


// routes
app.use("/pharmaApi/patient", patientRouter);
app.use("/pharmaApi/pharmacist", pharmacistRouter);
app.use("/pharmaApi/admin", adminRouter);
app.use("/pharmaApi/guest", guestRouter);
app.use("/pharmaApi/stripe", stripeRouter);
app.use("/pharmaApi/common", commonRouter);

// listen for requests
// listen for requests

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

server.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

