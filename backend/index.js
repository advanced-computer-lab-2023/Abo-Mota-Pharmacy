require("dotenv").config();
const express = require("express");

// express app
const app = express();
const pharmacistRouter = require("./routes/pharmacistRouter");
const adminRouter = require("./routes/adminRouter");
const patientRouter = require("./routes/patientRouter");
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
// const bodyParser = require("body-parser");
app.use(express.json());
const MongoURI = process.env.MONGO_URI;

// mongo connection string
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});


// routes
app.use("/pharmaApi/patient", patientRouter);
app.use("/pharmaApi/pharmacist", pharmacistRouter);
app.use("/pharmaApi/admin", adminRouter);

// listen for requests
// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

