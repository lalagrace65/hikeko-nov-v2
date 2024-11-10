const mongoose = require('mongoose');
const express = require('express');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const User = require('../../models/User');

const router = express.Router();

router.get('/api/travelAgency/settings', async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            console.log("User not authenticated:", req.user);
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        const travelAgencySettings = await TravelAgencySignUp.findOne({ travelAgency: req.user.id });
        if (!travelAgencySettings) {
            return res.status(404).json({ message: 'Travel agency settings not found' });
        }
        res.json(travelAgencySettings);
    } catch (error) {
        console.error('Error fetching travel agency settings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;