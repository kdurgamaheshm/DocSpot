import React from 'react';

const Dashboard = () => {
    const appointments = [
        { id: 1, doctor: 'Dr. Smith', date: '2024-07-01', time: '10:00 AM' },
        { id: 2, doctor: 'Dr. Johnson', date: '2024-07-05', time: '2:00 PM' },
    ];

    return (
        <div className="text-3xl max-h-screen font-bold mb-8 text-center text-green-700 sm:px-10 bg-white-50 ">
            {/* Header */}
            <div className="text-3xl font-bold mb-8 text-center text-green-700 mb-10">
                <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your upcoming appointments and stats.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-5 rounded shadow border-l-4 border-green-500 text-center">
                    <h3 className="text-sm text-gray-500">Total Appointments</h3>
                    <p className="text-2xl font-semibold text-green-700">{appointments.length}</p>
                </div>
                <div className="bg-white p-5 rounded shadow border-l-4 border-blue-500 text-center">
                    <h3 className="text-sm text-gray-500">Upcoming</h3>
                    <p className="text-2xl font-semibold text-blue-600">{appointments.length}</p>
                </div>
                <div className="bg-white p-5 rounded shadow border-l-4 border-yellow-500 text-center">
                    <h3 className="text-sm text-gray-500">Notifications</h3>
                    <p className="text-2xl font-semibold text-yellow-600">0</p>
                </div>
            </div>

            {/* Appointments Section */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                {appointments.length === 0 ? (
                    <p className="text-gray-500">No upcoming appointments.</p>
                ) : (
                    <ul className="space-y-4">
                        {appointments.map((appt) => (
                            <li
                                key={appt.id}
                                className="p-4 rounded border border-gray-200 hover:bg-green-50 transition"
                            >
                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <p className="text-lg font-medium">{appt.doctor}</p>
                                        <p className="text-sm text-gray-500">{appt.date} at {appt.time}</p>
                                    </div>
                                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full self-start mt-2 sm:mt-0">
                    Confirmed
                  </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
