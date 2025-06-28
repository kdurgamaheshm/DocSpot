const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const bookingController = require('../controllers/BookingController');

// Create a booking (User)
router.post('/', authenticateToken, authorizeRoles('User'), bookingController.createBooking);

// Get bookings for logged-in user (User)
router.get('/user', authenticateToken, authorizeRoles('User'), bookingController.getUserBookings);

// Get bookings for doctor (Doctor)
router.get('/doctor', authenticateToken, authorizeRoles('Doctor'), bookingController.getDoctorBookings);

// Update booking status (Admin, Doctor)
router.put('/:id/status', authenticateToken, authorizeRoles('Admin', 'Doctor'), bookingController.updateBookingStatus);

module.exports = router;
