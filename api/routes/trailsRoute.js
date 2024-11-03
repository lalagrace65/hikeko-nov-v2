const express = require('express');
const router = express.Router();
const Trails = require('../models/Trails');

// Route to get trail by ID or all trails for customers
router.get('/trails', async (req, res) => {
    console.log('GET /trails called');
    try {
        const { id } = req.query; // Extract id from query params
        if (id) {
            const trail = await Trails.findById(id);
            if (!trail) {
                return res.status(404).json({ message: 'Trail not found' });
            }
            return res.json(trail);
        }
        // If no ID is provided, fetch all trails
        const trails = await Trails.find();
        res.json(trails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get trail by ID specifically for admin packages
router.get('/trails/adminPackage/:id', async (req, res) => {
    
    try {
        const { id } = req.params; // Extract id from params
        const trail = await Trails.findById(id);
        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }
        res.json(trail);
    } catch (error) {
        console.error('Error fetching trail data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Additional admin routes can be added here

module.exports = router;
