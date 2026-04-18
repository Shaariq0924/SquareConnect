const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

const adminAuth = require('../middleware/auth');

// POST /api/contact (Public for form submission)
router.post('/', contactController.submitContact);

// GET /api/contact (Protected for Admin Dashboard only)
router.get('/', adminAuth, contactController.getAllContacts);

module.exports = router;
