const Booking = require('../models/Booking');
const User = require('../models/User');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { doctor, appointmentDate } = req.body;
    const user = req.user.id;

    if (!doctor || !appointmentDate) {
      return res.status(400).json({ message: 'Doctor and appointment date are required' });
    }

    const doctorUser = await User.findOne({ _id: doctor, role: 'Doctor' });
    if (!doctorUser) {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    const booking = new Booking({ user, doctor, appointmentDate });
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bookings for logged-in user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('doctor', 'username email specialization');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bookings for doctor
exports.getDoctorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ doctor: req.user.id }).populate('user', 'username email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
