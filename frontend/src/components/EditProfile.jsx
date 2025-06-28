import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        setFormData({
          username: res.data.username || '',
          email: res.data.email || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading profile:', err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/auth/update-profile', formData, {
        withCredentials: true,
      });
      alert(' Profile updated!');
      navigate('/app/profile'); // 👈 redirect back to profile page
    } catch (err) {
      console.error(err);
      alert(' Failed to update profile.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">Username</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-green-400 rounded px-3 py-2 text-black"
                required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-green-400 text-black rounded px-3 py-2"
                required
            />
          </div>
          <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </div>
  );
};

export default EditProfile;
