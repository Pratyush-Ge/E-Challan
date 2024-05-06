const mongoose = require('mongoose');

const violatorSchema = new mongoose.Schema({
  pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' },
  aadharNumber: String,
  name: String,
  address: String,
  phone: String,
  email: String
});

const Violator = mongoose.model('Violator', violatorSchema);

module.exports = Violator;
