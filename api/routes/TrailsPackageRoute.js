const mongoose = require('mongoose');
const express = require('express');

const Package = require('../models/Package.js');
const router = express.Router();

router.get('/trail/adminPackage/:id', async (req, res) => {
    const { id } = req.params; // Trail ID from request parameters
    try {
        const packages = await Package.find({ trailId: id }); // Find packages by trail ID
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages', error: error.message });
    }
});
