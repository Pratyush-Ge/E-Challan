import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await axios.post('http://localhost:5000/signup', { name, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 text-white">
      <label className="block mb-2">Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mb-4 border rounded-md text-black" />

      <label className="block mb-2">Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mb-4 border rounded-md text-black" />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <label className="block mb-2">Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mb-4 border rounded-md text-black" />
      {passwordError && <p className="text-red-500">{passwordError}</p>}

      <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-amber-500 hover:bg-gray-300 hover:text-black rounded-md">Signup</button>

      <p className="mt-4 text-center">Already Signed-Up ? <a href="/login" className="text-amber-500">Login</a></p>
    </form>
  );
};

export default SignupForm;
