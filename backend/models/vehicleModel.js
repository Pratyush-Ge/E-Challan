const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  aadharNumber: String,
  vehicleNumber: String,
  vehicleType: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
