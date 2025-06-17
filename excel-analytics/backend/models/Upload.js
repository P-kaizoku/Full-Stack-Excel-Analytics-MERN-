const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  uploadDate: { type: Date, default: Date.now },
  xAxis: String,
  yAxis: String,
  chartType: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
