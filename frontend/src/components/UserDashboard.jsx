
import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  // Sample data for demonstration; in real app, fetch from API
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Smith', datetime: '2024-07-01 10:00', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Jones', datetime: '2024-07-05 14:00', status: 'Pending' },
  ];

  return (
    <div className="container mx-auto p-6 text-black flex items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-600">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="bg-white rounded-lg shadow p-4">
                <p className="font-semibold text-gray-900">Doctor: {appt.doctor}</p>
                <p className="text-gray-700">Date & Time: {appt.datetime}</p>
                <p className="text-gray-700">Status: {appt.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8 text-black">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/app/edit-profile"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Edit Profile
          </Link>
          <Link
            to="/app/change-password"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Change Password
          </Link>
          <Link
            to="/app/appointments"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            View Appointments
          </Link>
          <Link
            to="/app/book-appointment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
