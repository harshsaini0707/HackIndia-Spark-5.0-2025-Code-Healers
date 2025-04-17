import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + '/user/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      
      navigate('/');
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-100 flex justify-center items-center  px-4">
      <div className="w-full h-72 flex flex-col px-10 max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800"> Login</h1>
        <p className="text-sm text-center text-gray-500 mt-1">Please enter your credentials</p>

        <div className="mt-6 flex flex-col gap-4 px-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mt-4 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            
          </div>

<div className='text-center' onClick={()=>navigate("/signup")}>New User? <span className='underline  text-blue-500'>Signup</span></div>
<div className='mb-24'>
          <button
            onClick={handleLogin}
            className="w-full mt-6 mb-20 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            Login
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
