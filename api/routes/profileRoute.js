const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret } = require('../middleware/auth'); // Adjust path as needed

const router = express.Router();

// Profile route
router.get('/profile', async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const userData = jwt.verify(token, jwtSecret);
            const user = await User.findById(userData.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { firstName, email, _id, role } = user;
            return res.json({ firstName, email, _id, role });
        } catch (err) {
            console.error("Error verifying token or fetching user:", err);
            return res.status(401).json({ message: "Unauthorized" }); // Token verification error
        }
    } else {
        return res.status(401).json({ message: "No token provided" }); // No token found
    }
});

module.exports = router;
