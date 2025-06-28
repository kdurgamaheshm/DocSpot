import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Sample data for demonstration
  const [stats, setStats] = useState({
    totalDoctors: 25,
    totalUsers: 100,
    totalAppointments: 200,
  });

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', status: 'Approved' },
    { id: 2, name: 'Dr. Jones', specialization: 'Dermatology', status: 'Pending' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, user: 'John Doe', doctor: 'Dr. Smith', datetime: '2024-07-01 10:00', status: 'Confirmed' },
    { id: 2, user: 'Jane Smith', doctor: 'Dr. Jones', datetime: '2024-07-05 14:00', status: 'Pending' },
  ]);

  const [reportData, setReportData] = useState([
    { name: 'Week 1', appointments: 40, activeUsers: 30 },
    { name: 'Week 2', appointments: 50, activeUsers: 35 },
    { name: 'Week 3', appointments: 45, activeUsers: 40 },
    { name: 'Week 4', appointments: 60, activeUsers: 50 },
  ]);

  const handleApproveDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: 'Approved' } : doc))
    );
  };

  const handleDeleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = () => {
    alert('Logged out');
    // Implement logout logic
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Total Stats</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#3498db', color: 'white', borderRadius: '8px' }}>
            <h3>Total Doctors</h3>
            <p>{stats.totalDoctors}</p>
          </div>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#2ecc71', color: 'white', borderRadius: '8px' }}>
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#e67e22', color: 'white', borderRadius: '8px' }}>
            <h3>Total Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Manage Doctors</h2>
        <input
          type="text"
          placeholder="Search by name, email, or specialization"
          // Implement search logic if needed
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.status}</td>
                <td>
                  {doc.status !== 'Approved' && (
                    <button onClick={() => handleApproveDoctor(doc.id)}>Approve</button>
                  )}
                  <button onClick={() => handleDeleteDoctor(doc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Appointments Overview</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.user}</td>
                <td>{appt.doctor}</td>
                <td>{appt.datetime}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Reports & Analytics</h2>
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
      </section>

      <section>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </div>
  );
};

export default AdminDashboard;
