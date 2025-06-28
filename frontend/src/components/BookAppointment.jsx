import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ doctor: '', date: '', time: '' });
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!user) {
      setError('⚠️ You must be logged in to book an appointment.');
      return;
    }

    try {
      const appointmentDate = new Date(`${formData.date}T${formData.time}:00`);
      await axios.post(
          '/api/bookings',
          {
            doctor: formData.doctor,
            appointmentDate,
          },
          { withCredentials: true }
      );

      setMessage('✅ Appointment booked successfully!');
      setFormData({ doctor: '', date: '', time: '' });

      // Trigger global booking event
      window.dispatchEvent(new Event('appointment-booked'));
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to book appointment.');
    }
  };

  if (user?.role === 'Doctor') {
    return (
        <div className="text-red-600 text-center mt-10 text-xl font-semibold">
          🚫 Access Denied: Doctors are not allowed to book appointments.
        </div>
    );
  }

  return (
      <div className=" flex items-center justify-center max-h-screen mx-auto mt-20 bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Book an Appointment</h1>

        {message && <p className="text-green-600 text-center font-medium mb-3">{message}</p>}
        {error && <p className="text-red-600 text-center font-medium mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Doctor</label>
            <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.username}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Time</label>
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
          >
            Book Appointment
          </button>
        </form>
      </div>
  );
};

export default BookAppointment;
