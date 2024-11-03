const mongoose = require('mongoose');
const express = require('express');
const Booking = require('../../models/Booking.js');

const router = express.Router();

router.get('/joiner/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

module.exports = router;