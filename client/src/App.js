import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ViolatorInfo from './components/ViolatorInfo';
import VehicleInfoForm from './components/VehicleInfoForm';
import Receipt from './components/ChallanReceipt';
import ViolatorDetails from './components/ViolatorDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="gradient-bg min-h-screen flex flex-col justify-center items-center">
      <span className="rounded-full bg-gray-900 px-3 py-1 font-medium text-white absolute z-50 top-2">E-challan</span>

        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/violator" element={<ViolatorInfo />} />
          <Route path="/receipt/:aadharNumber" element={<Receipt />} />
          <Route path="/violatorDetails/:aadharNumber" element={<ViolatorDetails />} />
          <Route path="/vehicle/:aadharNumber" element={<VehicleInfoForm />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
