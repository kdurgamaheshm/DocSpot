import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const AppointmentHistory = () => {
  const { authToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bookings/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const sorted = (response.data || []).sort(
          (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setBookings(sorted);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const handleNewBooking = () => fetchBookings();
    window.addEventListener('appointment-booked', handleNewBooking);
    return () => {
      window.removeEventListener('appointment-booked', handleNewBooking);
    };
  }, [authToken]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 md:px-10 text-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
            My Appointment History
          </h1>

          {loading ? (
              <p className="text-center text-lg text-gray-700">Loading appointments...</p>
          ) : error ? (
              <p className="text-center text-red-600">{error}</p>
          ) : bookings.length === 0 ? (
              <p className="text-center text-gray-600">
                You haven't booked any appointments yet.
              </p>
          ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all p-5"
                    >
                      <h2 className="text-lg font-bold text-green-700 mb-1">
                        🩺 Doctor: {booking.doctor?.username || 'N/A'}
                      </h2>
                      <p className="text-gray-700 mb-1">
                        <strong>Specialization:</strong>{' '}
                        {booking.doctor?.specialization || 'General'}
                      </p>
                      <p className="text-gray-800 mb-1">
                        <strong>Date:</strong>{' '}
                        {booking.appointmentDate
                            ? new Date(booking.appointmentDate).toLocaleDateString()
                            : 'N/A'}
                      </p>
                      <p className="text-gray-800 mb-3">
                        <strong>Time:</strong> {booking.appointmentTime || 'N/A'}
                      </p>

                      <span
                          className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                              booking.status === 'Confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'Cancelled'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                  {booking.status || 'Pending'}
                </span>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default AppointmentHistory;
