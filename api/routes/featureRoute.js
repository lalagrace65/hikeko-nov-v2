const mongoose = require('mongoose');
const express = require('express');
const Feature = require('../models/Feature'); 
const { jwtSecret } = require('../middleware/auth'); // Adjust the path as needed

const router = express.Router();

// GET route to retrieve the first feature
router.get('/features', async (req, res) => {
    try {
        const feature = await Feature.findOne(); // Use find() if you want to fetch all features
        if (!feature) {
            return res.status(404).json({ message: 'No feature found' });
        }
        res.json(feature); // Send the feature data as JSON response
    } catch (error) {
        console.error('Error fetching feature:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching feature', error: error.message }); // Send error response
    }
});

// Export the router
module.exports = router;