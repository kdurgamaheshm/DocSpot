import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext); // ensure setUser exists if you're updating user
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Fetch appointments based on user role
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user) return;
        const res =
            user.role === 'User'
                ? await axios.get('/api/bookings/user', { withCredentials: true })
                : await axios.get('/api/bookings/doctor', { withCredentials: true });

        setAppointments(res.data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save edited profile
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // You can update this endpoint with your backend route
      const res = await axios.put('/api/auth/profile', formData, {
        withCredentials: true,
      });

      // Optionally update context
      if (res.data && setUser) {
        setUser(res.data);
      }

      alert('✅ Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('❌ Failed to update profile.');
    }
  };

  if (!user) {
    return (
        <div className="text-center mt-10 text-lg text-gray-600">
          ⏳ Loading user data...
        </div>
    );
  }

  return (
      <div className="max-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Profile</h1>
            {!editing && (
                <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
            )}
          </div>

          {/* Profile Form or Display */}
          {editing ? (
              <form onSubmit={handleSave} className="space-y-4 mb-6">
                <div>
                  <label className="block mb-1 font-medium">Username</label>
                  <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                  <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
          ) : (
              <div className="mb-6 space-y-2 text-gray-700">
                <p>
                  <strong>Username:</strong> {formData.username}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
          )}

          {/* Appointments Section */}
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            📅 Appointments
          </h2>

          {loadingAppointments ? (
              <p className="text-gray-500">⏳ Loading appointments...</p>
          ) : appointments.length === 0 ? (
              <p className="text-gray-500">No appointments found.</p>
          ) : (
              <div className="space-y-4">
                {appointments.map((appt) => (
                    <div
                        key={appt._id}
                        className="border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-100 hover:shadow transition duration-300"
                    >
                      <p className="text-gray-800">
                        <strong>Date:</strong>{' '}
                        {new Date(appt.appointmentDate).toLocaleString()}
                      </p>
                      <p className="text-gray-800">
                        <strong>
                          {user.role === 'User' ? 'Doctor' : 'Patient'}:
                        </strong>{' '}
                        {user.role === 'User'
                            ? appt.doctor?.username + ` (${appt.doctor?.email})`
                            : appt.user?.username + ` (${appt.user?.email})`}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                                appt.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : appt.status === 'Cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                    {appt.status}
                  </span>
                      </p>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default ProfilePage;
