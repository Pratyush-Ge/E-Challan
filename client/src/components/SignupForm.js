import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Img from '../assets/bg.jpg';
import BASE_API from '../api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [areaOfOperation, setAreaOfOperation] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordMinLength = 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (password.length < passwordMinLength) {
      setPasswordError(`Password must be at least ${passwordMinLength} characters long`);
      return;
    }

    try {
      await axios.post(`${BASE_API}/signup`, { name, email, password, areaOfOperation });
      toast.success("Signed up successfully")
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex w-screen flex-wrap text-slate-800">

      <div className="relative hidden h-screen select-none flex-col justify-center text-center md:flex md:w-1/2">
        <img src={Img} alt="background" className="object-cover w-full h-full" />
        <div className="m-auto text-white text-4xl font-bold absolute z-10">
          Welcome to the E-challan Management System
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="flex w-full flex-col md:w-1/2 bg-blue-100 h-screen">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight text-black">Personnel Registration</p>
          <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="text" id="login-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Name" />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
              </div>
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="text" id="area-of-operation" value={areaOfOperation} onChange={(e) => setAreaOfOperation(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Area of operation" />
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
              </div>
            </div>
            <p className="text-gray-600 mt-2">Already signed up? <Link to="/login" className="text-blue-600">Login</Link></p>
            <button type="submit" className="mt-6 rounded-lg bg-amber-500 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
