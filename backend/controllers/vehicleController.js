const Vehicle = require('../models/vehicleModel');

const addVehicle = async (req, res) => {
  try {
    const { aadharNumber, vehicleNumber, vehicleType } = req.body;
    const newVehicle = new Vehicle({ aadharNumber, vehicleNumber, vehicleType });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchVehicleDetails = async (req, res) => {
  try {
    const { aadharNumber } = req.params;
    const vehicles = await Vehicle.find({ aadharNumber });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addVehicle, fetchVehicleDetails };
