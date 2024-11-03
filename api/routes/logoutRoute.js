const express = require('express');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }).json({ message: 'Logged out' });
});

module.exports = router;