import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Img from '../assets/bg.jpg';
import BASE_API from '../api';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');

    try {
      const response = await axios.post(`${BASE_API}/login`, { email, password });
      if (response.status === 200) {
        toast.success("Logged in successfully")
        navigate('/dashboard');
        localStorage.setItem("email", email);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Wrong credentials")
      } else {
        console.error('Login failed:', error);
      }
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
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight text-black">Personnel Login</p>
          <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
              </div>
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
              </div>
            </div>
            <p className="text-gray-600 mt-2">New User? <Link to="/" className="text-blue-600">Signup</Link></p>
            <button type="submit" className="mt-6 rounded-lg bg-amber-500 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
