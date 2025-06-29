import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username || '', email: user.email || '' });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/auth/update-profile', formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      alert('Profile updated!');
      navigate('/app/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 tpx-4">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Edit Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Username</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-green-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-green-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
              />
            </div>
            <div className="text-center">
              <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProfile;
