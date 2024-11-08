const express = require('express');
const { requireRole } = require('../middleware/auth'); // Adjust path as needed

const router = express.Router();

// User dashboard route
router.get('/user-dashboard', requireRole('user'), (req, res) => {
    res.json({ message: 'Welcome, User!' });
});

module.exports = router;