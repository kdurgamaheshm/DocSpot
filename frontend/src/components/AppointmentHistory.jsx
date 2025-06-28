import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const AppointmentHistory = () => {
  const { authToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/booking/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const sorted = (response.data || []).sort(
          (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );
      setBookings(sorted);
    } catch (err) {
      setError('⚠️ Failed to load appointments. Please try again.');
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
      <div className="flex items-center justify-center max-h-screen bg-gradient-to-br from-blue-200 to-blue-200 py-10 px-4 md:px-8 text-black">
        <div className="max-h-screen mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
            My Appointment History
          </h1>

          {loading ? (
              <p className="text-center text-lg text-black-600">Loading appointments...</p>
          ) : error ? (
              <p className="text-center text-red-500">{error}</p>
          ) : bookings.length === 0 ? (
              <p className="text-center text-black-500">You haven't booked any appointments yet.</p>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black border-black">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white border text-black border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition-all"
                    >
                      <h2 className="text-lg font-semibold text-blue-700 mb-2">
                        Doctor: {booking.doctor?.username || 'N/A'}
                      </h2>
                      <p className="text-black-700 ">
                        <strong>Date:</strong>{' '}
                        {booking.appointmentDate
                            ? new Date(booking.appointmentDate).toLocaleDateString()
                            : 'N/A'}
                      </p>
                      <p className="text-black-700">
                        <strong>Time:</strong> {booking.appointmentTime || 'N/A'}
                      </p>
                      <div className="mt-3 text-black">
                  <span
                      className={`inline-block px-3 py-1 text-sm rounded-full font-medium text-black ${
                          booking.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    Status: {booking.status || 'Pending'}
                  </span>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default AppointmentHistory;
