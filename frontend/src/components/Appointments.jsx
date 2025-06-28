import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setError('You must be logged in to view appointments.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('/api/bookings/user', {
          withCredentials: true,
        });
        const sorted = (response.data || []).sort(
            (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
        );
        setAppointments(sorted);
      } catch (err) {
        setError(err.response?.data?.message || '❌ Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  if (loading) {
    return (
        <div className="text-center py-8 text-blue-600 text-lg">Loading appointments...</div>
    );
  }

  if (error) {
    return (
        <div className="text-center py-6 text-red-600 text-lg">{error}</div>
    );
  }

  if (appointments.length === 0) {
    return (
        <div className="text-center py-6 text-gray-600 text-lg">No appointments found.</div>
    );
  }

  return (
      <div className="flex items-center justify-center max-h-screen mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">My Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-green-200 text-left">
            <tr>
              <th className="px-4 py-3 border text-black border-gray-300">Doctor</th>
              <th className="px-4 py-3 border text-black border-gray-300">Date & Time</th>
              <th className="px-4 py-3 border text-black border-gray-300">Status</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-green-100">
                  <td className="px-4 py-2 border border-gray-300">{appt.doctor?.username || appt.doctor}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(appt.appointmentDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                  <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appt.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800'
                              : appt.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {appt.status}
                  </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Appointments;
