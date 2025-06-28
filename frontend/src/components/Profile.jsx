import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setError(' Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
        <div className="text-center text-gray-600 mt-10">
           Loading profile...
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center text-red-600 mt-10 font-semibold">
          {error}
        </div>
    );
  }

  if (!user) {
    return (
        <div className="text-center text-gray-500 mt-10">
          No user data available.
        </div>
    );
  }

  return (
      <div className="flex items-center justify-center max-h-screen mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center"> User Profile</h2>
        <div className="space-y-3 text-gray-700 " style={{paddingBottom:'10px'}}>
          <p><strong>Username:</strong> {user.username || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Role:</strong>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {user.role}
          </span>

          </p>
        </div>

          <Link
              to="/app/edit-profile"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
              Edit Profile
          </Link>
      </div>
  );
};

export default Profile;
