const express = require('express');
const Booking = require('../../models/Booking.js');
const { requireRole } = require('../../middleware/auth.js');

const router = express.Router();

// Get bookings for the logged-in user
router.get('/joiner/bookings', requireRole(['user', 'admin']), async (req, res) => {
    try {
        // Extract the user ID from the middleware
        const userId = req.userData.id;

        // Fetch bookings for the logged-in user
        const bookings = await Booking.find({ userId }) // Ensure Booking schema has a userId field
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
