import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VehicleInfoForm = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAadharNumber = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAadhar');
        setAadharNumber(response.data.aadharNumber);
      } catch (error) {
        console.error('Error fetching Aadhar number:', error);
      }
    };

    fetchAadharNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/addVehicle', {
        aadharNumber,
        vehicleNumber,
        vehicleType,
      });
      alert('Vehicle details added successfully');
      navigate('/receipt');
    } catch (error) {
      alert('Failed to add vehicle details');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vehicle Information Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Number:</label>
          <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type:</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
      </form>
    </div>
  );
};

export default VehicleInfoForm;
