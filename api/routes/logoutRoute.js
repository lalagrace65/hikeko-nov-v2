const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    const token = jwt.sign({_id: req.user._id}, process.env.JWT_SECRET, {expiresIn: '0ms'});
    // res.cookie('user_token', 'null', {maxAge: -1, httpOnly: true, sameSite : "None", secure: true});
    // res.cookie('user_tokens', 'null', {maxAge: -1, httpOnly: true, sameSite : "None", secure: true});
    res.clearCookie('user_token', {
      httpOnly: true,
      secure: true, 
      sameSite: 'None', 
    });
});

module.exports = router;
