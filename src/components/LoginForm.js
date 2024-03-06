import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordError('Invalid email or password');
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto my-8 text-white">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mb-4 border rounded-md text-black" />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mb-4 border rounded-md text-black" />
      {passwordError && <p className="text-red-500">{passwordError}</p>}

      <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-amber-500 rounded-md hover:bg-gray-300 hover:text-black">Login</button>
    </form>
  );
};

export default LoginForm;
  