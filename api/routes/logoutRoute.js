const express = require('express');
const cors = require('cors');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).send({ message: 'Logged out' });

});

module.exports = router;