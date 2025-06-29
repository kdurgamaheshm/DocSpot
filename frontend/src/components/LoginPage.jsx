import React, { useState, useContext, useEffect } from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const role = user.role?.toLowerCase();
      if (role === 'doctor') {
        navigate('/app/doctor-dashboard');
      } else if (role === 'admin') {
        navigate('/app/admin-dashboard');
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
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (


        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Login to DocSpot</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-white font-semibold rounded-lg transition ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-gray-600 mt-2">
              Don’t have an account?{' '}
              <NavLink to="/register" className="text-green-500 hover:underline">
                Register
              </NavLink>
            </p>
          </form>
          <div className="flex-1 flex flex-col w-full md:ml-64">
            Header
            <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white h-16 flex items-center justify-between px-6 shadow-md">
              <div
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => navigate('/app/dashboard')}
              >
                🩺DocSpot
              </div>

            </header>


          </div>

        </div>



  );
};

export default LoginPage;
