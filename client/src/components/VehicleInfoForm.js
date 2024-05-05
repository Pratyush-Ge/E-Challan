import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_API from '../api';


const VehicleInfoForm = () => {
  const { aadharNumber } = useParams(); 
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_API}/addVehicle`, {
        aadharNumber,
        vehicleNumber,
        vehicleType,
      });
      toast.success('Vehicle details added successfully');
      navigate(`/receipt/${aadharNumber}`);
    } catch (error) {
      alert('Failed to add vehicle details');
    }
  };

  return (
    <div className="lg:w-3/5 max-w-md mx-2 my-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="lg:text-2xl font-bold mb-4 text-center">Add Vehicle Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Number:</label>
          <input 
            type="text" 
            value={vehicleNumber} 
            onChange={(e) => setVehicleNumber(e.target.value)} 
            required 
            pattern="[A-Za-z]{2}\s?[0-9]{1,2}\s?[A-Za-z]{0,3}\s?[0-9]{4}" 
            placeholder='AAXXAAXXXX (A-Alphabet, X-Number)'
            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type:</label>
          <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VehicleInfoForm;
