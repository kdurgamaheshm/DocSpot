import React, { useState, useContext } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData.username, formData.email, formData.password, formData.role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className=" flex items-center justify-centermax-w-md mx-auto mt-8 p-6 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-black text-2xl font-semibold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="User" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">User</option>
            <option value="Doctor"className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">Doctor</option>
            <option value="Admin"className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Register
        </button>
        <NavLink to="/login" className="text-black" >
          Login
        </NavLink>
      </form>
    </div>
  );
};

export default RegisterPage;
