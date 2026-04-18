const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const adminAuth = require('../middleware/auth');

// POST /api/bookings (Public for form submission)
router.post('/', bookingController.createBooking);

// GET /api/bookings (Protected for Admin Dashboard only)
router.get('/', adminAuth, bookingController.getAllBookings);

module.exports = router;
