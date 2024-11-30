const express = require('express');
const cors = require('cors');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }).json({ message: 'Logged out' });
});

module.exports = router;