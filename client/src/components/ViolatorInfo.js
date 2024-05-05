import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_API from '../api';


const ViolatorInfo = () => {
  const [aadharNumber, setAadharNumberInput] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (aadharNumber.length !== 12) {
      toast.error('Aadhar number should be 12 digits');
      return;
    }
    if (phone.length !== 10) {
      toast.error('Phone number should be 10 digits');
      return;
    }
    try {
      await axios.post(`${BASE_API}/addViolator`, {aadharNumber, name, address, phone});
      toast.success('Violator details added successfully');
      navigate(`/vehicle/${aadharNumber}`);
    } catch (error) {
      toast.error('Failed to add violator details');
    }
  };

  return (
    <div className="w-2/3 max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Violator Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Number:</label>
          <input type="text" value={aadharNumber} onChange={(e) => setAadharNumberInput(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
      </form>
    </div>
  );
};

export default ViolatorInfo;
