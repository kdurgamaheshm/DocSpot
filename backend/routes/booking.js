const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const bookingController = require('../controllers/BookingController');

// Create a booking (User)
router.post('/', authenticateToken, authorizeRoles('User'), bookingController.createBooking);

router.get('/user', authenticateToken, authorizeRoles('User'), bookingController.getUserBookings);

router.get('/doctor', authenticateToken, authorizeRoles('Doctor'), bookingController.getDoctorBookings);

router.put('/:id/status', authenticateToken, authorizeRoles('Admin', 'Doctor'), bookingController.updateBookingStatus);

module.exports = router;
