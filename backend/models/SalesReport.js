const mongoose = require("mongoose");
const { Schema } = mongoose;
const salesReportSchema = new mongoose.Schema({
  medicineId: {
    type: Schema.Types.ObjectId,
    ref: "Medicine",
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  sales: {
    type: Number,
    default: 0,
  },
  // Add other related information fields here
});

const SalesReport = mongoose.model("SalesReport", salesReportSchema);

module.exports = SalesReport;
