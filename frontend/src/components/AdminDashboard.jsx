import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalDoctors: 0, totalUsers: 0, totalAppointments: 0 });
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reportData, setReportData] = useState([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, docs, usrs, appts, report] = await Promise.all([
          axios.get('/api/user', { withCredentials: true }),
          axios.get('/api/user/doctors', { withCredentials: true }),
          axios.get('/api/bookings/user', { withCredentials: true }), // or /api/admin/users
          axios.get('/api/admin/appointments', { withCredentials: true }),
          axios.get('/api/admin/report-data', { withCredentials: true }),
        ]);

        setStats(s.data);
        setDoctors(docs.data);
        setUsers(usrs.data);
        setAppointments(appts.data);
        setReportData(report.data);
      } catch (err) {
        console.error('Admin dashboard error:', err);
      }
    };
    fetchData();
  }, []);

  // Approve or delete actions
  const handleApproveDoctor = async id => {
    await axios.put(`/api/admin/doctors/${id}/approve`, {}, { withCredentials: true });
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
  };
  const handleDeleteDoctor = async id => {
    await axios.delete(`/api/admin/doctors/${id}`, { withCredentials: true });
    setDoctors(prev => prev.filter(d => d.id !== id));
  };
  const handleDeleteUser = async id => {
    await axios.delete(`/auth/users/${id}`, { withCredentials: true });
    setUsers(prev => prev.filter(u => u.id !== id));
  };
  const handleLogout = () => {
    // Add your logout logic
    console.log('Logged out');
  };

  return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">Admin Dashboard</h1>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Doctors" value={stats.totalDoctors} color="blue" />
          <StatCard title="Total Users" value={stats.totalUsers} color="green" />
          <StatCard title="Total Appointments" value={stats.totalAppointments} color="orange" />
        </section>

        {/* Doctors Table */}
        <DataTable
            title="Manage Doctors"
            columns={['Name', 'Specialization', 'Status', 'Actions']}
            data={doctors}
            renderRow={doc => (
                <>
                  <td className="border px-4 py-2">{doc.name}</td>
                  <td className="border px-4 py-2">{doc.specialization}</td>
                  <td className="border px-4 py-2">{doc.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    {doc.status !== 'Approved' && (
                        <button onClick={() => handleApproveDoctor(doc.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                          Approve
                        </button>
                    )}
                    <button onClick={() => handleDeleteDoctor(doc.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </>
            )}
        />

        {/* Users Table */}
        <DataTable
            title="Manage Users"
            columns={['Name', 'Email', 'Actions']}
            data={users}
            renderRow={user => (
                <>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </>
            )}
        />

        {/* Appointments Table */}
        <DataTable
            title="Appointments Overview"
            columns={['User', 'Doctor', 'Date & Time', 'Status']}
            data={appointments}
            renderRow={appt => (
                <>
                  <td className="border px-4 py-2">{appt.userName}</td>
                  <td className="border px-4 py-2">{appt.doctorName}</td>
                  <td className="border px-4 py-2">{new Date(appt.datetime).toLocaleString()}</td>
                  <td className="border px-4 py-2">{appt.status}</td>
                </>
            )}
        />

        {/* Reports Chart */}
        <section className="mb-10 text-black">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports & Analytics</h2>
          <div className="bg-white rounded-xl shadow p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#3498db" />
                <Bar dataKey="activeUsers" fill="#2ecc71" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Logout Button */}
        <div className="text-center">
          <button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-lg shadow">
            Logout
          </button>
        </div>
      </div>
  );
};

export default AdminDashboard;

// --- Helper Components ---
const StatCard = ({ title, value, color }) => (
    <div className={`bg-${color}-500 text-white p-6 rounded-xl shadow-md`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl">{value}</p>
    </div>
);

const DataTable = ({ title, columns, data, renderRow }) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto bg-white text-black rounded-xl shadow">
        <table className="min-w-full table-auto border">
          <thead className="bg-green-100">
          <tr>
            {columns.map(col => (
                <th key={col} className="px-4 py-2 border">{col}</th>
            ))}
          </tr>
          </thead>
          <tbody className="text-center">
          {data.map(item => (
              <tr key={item.id}>{renderRow(item)}</tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
);


