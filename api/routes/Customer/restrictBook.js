const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { requireRole } = require('../../middleware/auth');

// Fetch authenticated user details
router.get('/book/auth/user', requireRole(['user', 'admin', 'staff']), async (req, res) => {
    try {
        // Fetch user by ID stored in the token payload
        const user = await User.findById(req.userData.id).select('-password -temporaryPassword');
        
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;