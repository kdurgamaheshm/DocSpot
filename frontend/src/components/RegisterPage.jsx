import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    phone: ''
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
      await register(
          formData.username,
          formData.email,
          formData.password,
          formData.role,
          formData.phone
      );
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
      <div className="min-h-screen w-full flex flex-col bg-white items-center justify-start px-5 pt-20 pz-15">

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white h-16 flex items-center px-6 shadow-md">
          <div className="text-2xl font-bold cursor-pointer">
            🩺 DocSpot
          </div>
        </header>

        {/* Registration Form */}
        <div className="w-full max-w-md p-6 mt-4 bg-white rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-5 text-green-700 text-center">
            Create an Account
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Username</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
              <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 9876543210"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2 border rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Role</label>
              <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{' '}
            <NavLink to="/login" className="text-green-600 hover:underline font-medium">
              Login
            </NavLink>
          </p>
        </div>
      </div>
  );
};

export default RegisterPage;
