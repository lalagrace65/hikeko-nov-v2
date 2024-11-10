const mongoose = require('mongoose');
const express = require('express');
const Booking = require('../../models/Booking.js');

const router = express.Router();

router.get('/joiner/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: 'packageId',
                populate: [
                    {
                        path: 'trailId', // Populate trailId
                        select: 'title', // Select only the title field from the trailId
                    },
                    {
                        path: 'travelAgency', // Populate travelAgency
                        select: 'name', // Select only the name field from the travelAgency
                    },
                ],
            });        
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

module.exports = router;