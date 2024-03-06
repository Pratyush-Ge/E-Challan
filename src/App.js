import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ViolatorInfo from './components/ViolatorInfo';
import VehicleInfoForm from './components/VehicleInfoForm';
import Receipt from './components/ChallanReceipt'; 
import './App.css'
import ViolatorDetails from './components/ViolatorDetails';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="gradient-bg min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mt-1 text-white fixed top-0 w-full z-10">E-Challan Management System</h1>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/violator" element={<ViolatorInfo />} />
          <Route path="/vehicle" element={<VehicleInfoForm />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/violatorDetails" element={<ViolatorDetails />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
