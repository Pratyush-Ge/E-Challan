const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  areaOfOperation: String 
});

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;
