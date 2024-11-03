const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret } = require('../middleware/auth'); // Adjust path as needed

const router = express.Router();

// Profile route
router.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id, role } = await User.findById(userData.id);
            res.json({ name, email, _id, role });
        });
    } else {
        res.json(null);
    }
});

module.exports = router;