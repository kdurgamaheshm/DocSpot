const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const userController = require('../controllers/UserController');

// Get list of doctors (User role)
router.get('/doctors', authenticateToken, authorizeRoles('User'), userController.getDoctors);

module.exports = router;
