import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/me', {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (err) {
                setError('⚠️ Failed to load user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
                <p className="text-gray-600 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
                <p className="text-red-600 text-lg font-semibold">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
                <p className="text-gray-500 text-lg">No user data available.</p>
            </div>
        );
    }

    return (
            <div className="bg-green-250 shadow-2xl rounded-2xl p-10 w-full max-w-3xl border border-gray-200">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">User Profile</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-lg text-gray-700">

                        <strong>Username:</strong>{' '}
                        <span className="ml-2">{user.username || 'N/A'}</span>


                        <strong>Email:</strong>{' '}
                        <span className="ml-1">{user.email || 'N/A'}</span>

                    <p>
                        <strong>Role:</strong>{' '}
                        <span className="ml-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {user.role}
            </span>
                    </p>
                    <p>
                        <strong>Registered At:</strong>{' '}
                        <span className="ml-2">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
                    </p>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        to="/app/edit-profile"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold shadow-md transition duration-200"
                    >
                         Edit Profile
                    </Link>
                </div>
            </div>

    );
};

export default Profile;
