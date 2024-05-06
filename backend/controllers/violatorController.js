const Violator = require('../models/violatorModel');

const addViolator = async (req, res) => {
  try {
    const { aadharNumber, name, address, phone, email } = req.body;
    const newViolator = new Violator({ aadharNumber, name, address, phone, email });
    await newViolator.save();
    res.status(201).json(newViolator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getViolatorDetails = async (req, res) => {
  try {
    const { aadharNumber } = req.params;
    const violator = await Violator.findOne({ aadharNumber });
    if (violator) {
      res.status(200).json(violator);
    } else {
      res.status(404).json({ message: 'Violator not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addViolator, getViolatorDetails };
