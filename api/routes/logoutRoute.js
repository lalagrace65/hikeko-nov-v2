const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
  // Clear the cookie storing the JWT token
  res.clearCookie('user_token', {
    httpOnly: true, // Ensures the cookie is accessible only by the server
    secure: true,   // Ensures the cookie is sent only over HTTPS
    sameSite: 'None', // Necessary for cross-origin requests
  });

  // Respond with a success message
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
