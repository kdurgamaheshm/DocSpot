import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);

  const [todaysAppointments, setTodaysAppointments] = useState([
    { id: '1', patient: 'John Doe', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', patient: 'Jane Smith', time: '11:30 AM', status: 'Pending' },
  ]);

  const [availability, setAvailability] = useState([
    { id: 1, date: '2024-07-01', timeSlots: ['09:00 AM', '10:00 AM'] },
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', lastVisit: '2024-06-01' },
    { id: 2, name: 'Jane Smith', lastVisit: '2024-05-15' },
  ]);

  const [appointmentHistory, setAppointmentHistory] = useState([
    { id: 3, patient: 'Alice Brown', date: '2024-06-15', status: 'Completed' },
  ]);

  const [profile, setProfile] = useState({
    name: 'Dr. Mahesh ',
    specialization: 'Diagnostics',
    bio: 'Experienced diagnostician.',
  });

  const [editProfile, setEditProfile] = useState(false);
  const [newAvailabilityDate, setNewAvailabilityDate] = useState('');
  const [newAvailabilityTime, setNewAvailabilityTime] = useState('');

  // Restrict access
  if (!user || user.role !== 'Doctor') {
    return (
        <div className="max-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
          Access Denied: Doctors Only
        </div>
    );
  }

  const handleAddAvailability = () => {
    if (!newAvailabilityDate || !newAvailabilityTime) {
      alert('Please select date and time');
      return;
    }
    setAvailability((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: newAvailabilityDate,
        timeSlots: [newAvailabilityTime],
      },
    ]);
    setNewAvailabilityDate('');
    setNewAvailabilityTime('');
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setTodaysAppointments((prev) =>
          prev.map((appt) =>
              appt.id === id ? { ...appt, status: newStatus } : appt
          )
      );
      alert(' Status updated successfully');
    } catch (err) {
      alert(' Failed to update status');
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-gray-900 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Doctor Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Appointments */}
          <section className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
            {todaysAppointments.length === 0 ? (
                <p>No appointments scheduled for today.</p>
            ) : (
                <table className="table-auto w-full text-sm border">
                  <thead className="bg-blue-100">
                  <tr>
                    <th className="px-2 py-1 text-left">Patient</th>
                    <th className="px-2 py-1 text-left">Time</th>
                    <th className="px-2 py-1 text-left">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {todaysAppointments.map((appt) => (
                      <tr key={appt.id} className="border-t">
                        <td className="px-2 py-1">{appt.patient}</td>
                        <td className="px-2 py-1">{appt.time}</td>
                        <td className="px-2 py-1">
                          <select
                              value={appt.status}
                              onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                              className={`px-2 py-1 border rounded ${
                                  appt.status === 'Confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : appt.status === 'Pending'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : appt.status === 'Cancelled'
                                              ? 'bg-red-100 text-red-800'
                                              : appt.status === 'Completed'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : ''
                              }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
          </section>

          {/* Manage Availability */}
          <section className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold mb-4">Manage Availability</h2>
            <div className="flex flex-col gap-2 mb-4">
              <input
                  type="date"
                  value={newAvailabilityDate}
                  onChange={(e) => setNewAvailabilityDate(e.target.value)}
                  className="border rounded px-2 py-1"
              />
              <input
                  type="time"
                  value={newAvailabilityTime}
                  onChange={(e) => setNewAvailabilityTime(e.target.value)}
                  className="border rounded px-2 py-1"
              />
              <button
                  onClick={handleAddAvailability}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Availability
              </button>
            </div>
            <ul className="list-disc ml-5">
              {availability.map((slot) => (
                  <li key={slot.id}>
                    {slot.date}: {slot.timeSlots.join(', ')}
                  </li>
              ))}
            </ul>
          </section>

          {/* Patient List */}
          <section className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold mb-4">Patient List</h2>
            {patients.length === 0 ? (
                <p>No past patients.</p>
            ) : (
                <ul className="space-y-2">
                  {patients.map((patient) => (
                      <li key={patient.id} className="border p-2 rounded bg-gray-50">
                        {patient.name}
                        <br />
                        <span className="text-sm text-gray-500">
                    Last Visit: {patient.lastVisit}
                  </span>
                      </li>
                  ))}
                </ul>
            )}
          </section>

          {/* Appointment History */}
          <section className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold mb-4">Appointment History</h2>
            {appointmentHistory.length === 0 ? (
                <p>No past appointments.</p>
            ) : (
                <table className="table-auto w-full text-sm border">
                  <thead className="bg-blue-100">
                  <tr>
                    <th className="px-2 py-1 text-left">Patient</th>
                    <th className="px-2 py-1 text-left">Date</th>
                    <th className="px-2 py-1 text-left">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {appointmentHistory.map((appt) => (
                      <tr key={appt.id} className="border-t">
                        <td className="px-2 py-1">{appt.patient}</td>
                        <td className="px-2 py-1">{appt.date}</td>
                        <td className="px-2 py-1">{appt.status}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
          </section>
        </div>

        {/* Profile Section */}
        <section className="mt-8 bg-white rounded-lg shadow p-5 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          {editProfile ? (
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditProfile(false);
                    alert('Profile updated!');
                  }}
                  className="space-y-4"
              >
                <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="border rounded w-full p-2"
                    placeholder="Name"
                />
                <input
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleProfileChange}
                    className="border rounded w-full p-2"
                    placeholder="Specialization"
                />
                <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="border rounded w-full p-2"
                    placeholder="Bio"
                />
                <div className="flex gap-3">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Save
                  </button>
                  <button
                      type="button"
                      onClick={() => setEditProfile(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
          ) : (
              <div className="space-y-2">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Specialization:</strong> {profile.specialization}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
                <button
                    onClick={() => setEditProfile(true)}
                    className="bg-blue-500 text-white px-3 py-1 mt-3 rounded hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              </div>
          )}
        </section>
      </div>
  );
};

export default DoctorDashboard;
