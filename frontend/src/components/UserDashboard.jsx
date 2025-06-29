import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { authToken, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/bookings/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });

        const upcoming = (response.data || [])
            .filter((appt) => new Date(appt.appointmentDate) >= new Date())
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

        setAppointments(upcoming);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchAppointments();
    }
  }, [authToken]);

  return (
      <div className="max-h-screen w-full bg-gradient-to-br from-green-100 to-blue-100 py-10 px-4 sm:px-10 text-gray-900">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Welcome{user?.username ? `, ${user.username}` : ''}
          </h1>
          <p className="text-gray-600 text-lg">Manage your appointments and settings with ease.</p>
        </div>

        {/* Appointments Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>

          {loading ? (
              <p className="text-gray-600">Loading appointments...</p>
          ) : error ? (
              <p className="text-red-500">{error}</p>
          ) : appointments.length === 0 ? (
              <p className="text-gray-500">You have no upcoming appointments.</p>
          ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appt) => (
                    <div
                        key={appt._id}
                        className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition"
                    >
                      <p className="font-semibold text-lg text-green-700 mb-1">
                        🩺 Doctor: {appt.doctor?.username || 'N/A'}
                      </p>
                      <p className="text-gray-600 italic mb-2">
                        Specialization: {appt.doctor?.specialization || 'General'}
                      </p>
                      <p className="text-gray-700">
                        Date: {new Date(appt.appointmentDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">
                        Time: {appt.appointmentTime || 'N/A'}
                      </p>
                      <p className="text-sm mt-2">
                  <span
                      className={`inline-block px-3 py-1 rounded-full font-medium ${
                          appt.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appt.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {appt.status}
                  </span>
                      </p>
                    </div>
                ))}
              </div>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
                to="/app/edit-profile"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Edit Profile
            </Link>
            <Link
                to="/app/profile"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              My Profile
            </Link>
            <Link
                to="/app/appointments"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              View All Appointments
            </Link>
            <Link
                to="/app/book-appointment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Book Appointment
            </Link>
          </div>
        </section>
      </div>
  );
};

export default UserDashboard;
