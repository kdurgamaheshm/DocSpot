const User = require('../models/User');

// Get list of doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'Doctor' }).select('_id username email');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
