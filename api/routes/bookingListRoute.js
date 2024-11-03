// routes/bookingListRoute.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Adjust the path as needed

// GET route to retrieve the list of bookings
router.get('/booking-list', async (req, res) => {
  try {
    // Find all bookings in the database
    const bookings = await Booking.find({});
    
    // Respond with the retrieved bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Server error fetching booking data." });
  }
});

module.exports = router;
