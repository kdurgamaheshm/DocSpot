import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role === 'doctor') {
        navigate('/app/doctor-dashboard');
      } else {
        navigate('/app/dashboard');
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Login to DocSpot</h2>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-white">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-white">Password</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
            <p className="text-center text-white mt-2">
              Don’t have an account?{' '}
              <NavLink to="/register" className="text-green-400 hover:underline">
                Register
              </NavLink>
            </p>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
