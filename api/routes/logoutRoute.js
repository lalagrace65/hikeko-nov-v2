const express = require('express');
const cors = require('cors');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { 
        expires: new Date(0), 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',  // Set secure cookie only for production
        domain: 'https://hikeko-client.vercel.app/',  // Adjust as necessary
        path: '/'
    }).json({ message: 'Logged out' });
    
});

module.exports = router;