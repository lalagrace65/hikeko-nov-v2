const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret, requireRole } = require('../middleware/auth'); // Adjust path as needed

const router = express.Router();

// Profile route
router.get('/profile',  async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const userData = jwt.verify(token, jwtSecret);
            const user = await User.findById(userData.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { 
                firstName,
                lastName,
                address,
                contactNo,
                emergencyContactNo,
                dateOfBirth, 
                email,
                rewardPoints,  
                incrementingId,
                _id, 
                role,
                avatar
             } = user;

            return res.json({
                firstName,
                lastName,
                address,
                contactNo,
                emergencyContactNo,
                dateOfBirth,
                email,
                rewardPoints,
                incrementingId,
                _id, 
                role,
                avatar 
            });

        } catch (err) {
            console.error("Error verifying token or fetching user:", err);
            return res.status(401).json({ message: "Unauthorized" }); // Token verification error
        }
    } else {
        return res.status(401).json({ message: "No token provided" }); // No token found
    }
});

router.put('/profile/update',  async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const userData = jwt.verify(token, jwtSecret);

        // Extract fields from the request body to update
        const updates = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            contactNo: req.body.contactNo,
            emergencyContactNo: req.body.emergencyContactNo,
            dateOfBirth: req.body.dateOfBirth,
            avatar: req.body.avatar,
        };

        // Filter out undefined fields (optional)
        Object.keys(updates).forEach(key => {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        });

        // Find user and update fields
        const updatedUser = await User.findByIdAndUpdate(
            userData.id,
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
