require("dotenv").config();
const express = require("express");

// express app
const app = express();
const patientRouter = require("./routes/patient");
const pharmacistRouter = require("./routes/doctor");
const adminRouter = require("./routes/admin");


// routes
app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

