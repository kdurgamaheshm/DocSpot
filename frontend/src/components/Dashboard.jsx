import React from 'react';

const Dashboard = () => {
  const appointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2024-07-01', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-07-05', time: '2:00 PM' },
  ];

  return (
      <div className="space-y-6">
        {/* Title */}
        <div className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-green-200 p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Total Appointments</h2>
            <p className="text-3xl font-bold">{appointments.length}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Upcoming</h2>
            <p className="text-3xl font-bold">{appointments.length}</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Upcoming Appointments List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Appointments</h2>
          {appointments.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
              <ul className="space-y-4">
                {appointments.map((appt) => (
                    <li
                        key={appt.id}
                        className="border-l-4 border-green-500 bg-white p-4 shadow rounded-md hover:shadow-md transition-all"
                    >
                      <p className="text-lg font-medium text-gray-800">
                        <span className="text-green-700 font-bold">Doctor:</span> {appt.doctor}
                      </p>
                      <p className="text-gray-600"><strong>Date:</strong> {appt.date}</p>
                      <p className="text-gray-600"><strong>Time:</strong> {appt.time}</p>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
};

export default Dashboard;
