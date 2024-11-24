const express = require('express');
const router = express.Router();
const Booking = require('../../../models/Booking');

router.get('/monthly/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('travelAgency', 'firstName lastName email')
      .exec();
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
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;