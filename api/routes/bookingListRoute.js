// routes/bookingListRoute.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Adjust the path as needed
const { requireRole } = require('../middleware/auth');

// GET route to retrieve the list of bookings
router.get('/booking-list', requireRole(['admin']), async (req, res) => {
  try {
    const adminId = req.userData.id; // Get admin ID from decoded JWT token
    
    // Find bookings that match the logged-in admin's ID in the travelAgency field
    const bookings = await Booking.find({ travelAgency: adminId });
    
    // Respond with the filtered bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Server error fetching booking data." });
  }
});

module.exports = router;