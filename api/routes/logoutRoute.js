const express = require('express');
const cors = require('cors');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,         // Make sure the cookie can't be accessed from JavaScript
        secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        sameSite: 'None',       // Allow cross-origin requests (if needed)
        expires: new Date(0),  // Set expiration date to the past to remove it
    });

    return res.json({ message: 'Logged out successfully' });
});

module.exports = router;