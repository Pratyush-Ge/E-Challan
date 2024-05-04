const mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
  aadharNumber: String,
  violationDate: { type: Date, default: Date.now },
  violationType: String,
  penaltyAmount: Number
});

const Challan = mongoose.model('Challan', challanSchema);

module.exports = Challan;
