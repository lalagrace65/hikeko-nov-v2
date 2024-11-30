const express = require('express');
const router = express.Router();
const Booking = require('../../../models/Booking');
const User = require('../../../models/User');
const { requireRole } = require('../../../middleware/auth');

// Monthly bookings route
router.get('/monthly/bookings', requireRole(['admin']), async (req, res) => {
  try {
    const userId = req.userData.id; // Get the logged-in user's ID from the JWT token

    // Fetch bookings related to the admin's travel agency
    const bookings = await Booking.find({ travelAgency: userId })
      .populate('travelAgency', 'firstName lastName email')
      .exec();

    // Process the bookings data to group by month
    const data = bookings.reduce((acc, booking) => {
      const month = new Date(booking.createdAt).toLocaleString('default', { month: 'short' });
      const existingEntry = acc.find((entry) => entry.month === month);
      if (existingEntry) {
        existingEntry.bookings++;
      } else {
        acc.push({ month, bookings: 1 });
      }
      return acc;
    }, []);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching monthly bookings' });
  }
});

// Daily bookings route
router.get('/daily/bookings', requireRole(['admin']), async (req, res) => {
  try {
    const userId = req.userData.id; // Get the logged-in user's ID from the JWT token

    // Fetch bookings related to the admin's travel agency
    const bookings = await Booking.find({ travelAgency: userId })
      .populate('travelAgency', 'firstName lastName email')
      .exec();

    // Process the bookings data to group by date
    const data = bookings.reduce((acc, booking) => {
      const date = new Date(booking.createdAt).toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.bookings++;
      } else {
        acc.push({ date, bookings: 1 });
      }
      return acc;
    }, []);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching daily bookings' });
  }
});

// Yearly bookings route
router.get('/yearly/bookings', requireRole(['admin']), async (req, res) => {
  try {
    const userId = req.userData.id; // Get the logged-in user's ID from the JWT token

    // Fetch bookings related to the admin's travel agency
    const bookings = await Booking.find({ travelAgency: userId }).exec();

    // Process the bookings data to group by year
    const data = bookings.reduce((acc, booking) => {
      const year = new Date(booking.createdAt).getFullYear();
      const existingEntry = acc.find((entry) => entry.year === year);
      if (existingEntry) {
        existingEntry.bookings++;
      } else {
        acc.push({ year, bookings: 1 });
      }
      return acc;
    }, []);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching yearly bookings' });
  }
});

module.exports = router;
