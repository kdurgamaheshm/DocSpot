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
        setError('⚠️ You must be logged in to view appointments.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/bookings/user', {
          withCredentials: true,
        });

        const sorted = (res.data || []).sort(
            (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
        );

        setAppointments(sorted);
      } catch (err) {
        setError(err.response?.data?.message || ' Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading || !user) {
    return (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-blue-600">Loading appointments...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
    );
  }

  if (appointments.length === 0) {
    return (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-gray-600">No appointments found.</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            My Appointments
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-auto border-collapse border border-gray-300 text-black">
              <thead className="bg-green-200 text-gray-800">
              <tr>
                <th className="px-4 py-3 border border-gray-300 text-left">Doctor</th>
                <th className="px-4 py-3 border border-gray-300 text-left">Specialization</th>
                <th className="px-4 py-3 border border-gray-300 text-left">Date</th>
                <th className="px-4 py-3 border border-gray-300 text-left">Time</th>
                <th className="px-4 py-3 border border-gray-300 text-left">Status</th>
              </tr>
              </thead>
              <tbody className="text-gray-800">
              {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-green-50 transition-colors">
                    <td className="px-4 py-2 border border-gray-300">
                      {appt.doctor?.username || 'N/A'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appt.doctor?.specialization || 'General'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appt.appointmentDate
                          ? new Date(appt.appointmentDate).toLocaleDateString()
                          : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appt.appointmentTime
                          ? appt.appointmentTime
                          : appt.appointmentDate
                              ? new Date(appt.appointmentDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                              : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
      </div>
  );
};

export default Appointments;
