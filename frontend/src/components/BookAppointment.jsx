import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ doctor: '', date: '', time: '' });
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('/api/user/doctors', { withCredentials: true });
        setDoctors(res.data);
      } catch (err) {
        setError('❌ Failed to load doctors.');
      }
    };

    if (user?.role === 'User' || user?.role === 'Admin') {
      fetchDoctors();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!user) {
      setError('⚠️ You must be logged in to book an appointment.');
      setLoading(false);
      return;
    }

    try {
      const appointmentDate = new Date(`${formData.date}T${formData.time}:00`);

      await axios.post(
          '/api/bookings',
          { doctor: formData.doctor, appointmentDate },
          { withCredentials: true }
      );

      setMessage('✅ Appointment booked successfully!');
      setFormData({ doctor: '', date: '', time: '' });

      window.dispatchEvent(new Event('appointment-booked'));
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role === 'Doctor') {
    return (
        <div className="text-red-600 text-center mt-24 text-xl font-semibold">
          Access Denied: Doctors are not allowed to book appointments.
        </div>
    );
  }

  return (
      <div className="min-h-screen  from-green-50 to-blue-50 flex justify-center items-start px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
            Book an Appointment
          </h1>

          {/* Alerts */}
          {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 text-center px-4 py-3 rounded mb-4">
                {message}
              </div>
          )}
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded mb-4">
                {error}
              </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
              <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a Doctor --</option>
                {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      Dr. {doc.username} ({doc.specialization || 'General'})
                    </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
              <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 font-semibold text-white rounded-lg transition duration-200 ${
                    loading
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default BookAppointment;
