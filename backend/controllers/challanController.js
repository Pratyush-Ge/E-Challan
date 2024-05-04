const Challan = require('../models/challanModel');

const generateChallanReceipt = async (req, res) => {
  try {
    const { aadharNumber, violationType, penaltyAmount } = req.body;
    const newChallan = new Challan({ aadharNumber, violationType, penaltyAmount });
    await newChallan.save();
    res.status(201).json(newChallan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchChallan = async (req, res) => {
  try {
    const { aadharNumber } = req.params;
    const challans = await Challan.find({ aadharNumber });
    res.status(200).json(challans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateChallanReceipt, fetchChallan };
