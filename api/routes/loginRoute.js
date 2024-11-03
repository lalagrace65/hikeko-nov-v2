const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret } = require('../middleware/auth'); 

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                {
                    email: userDoc.email,
                    id: userDoc._id,
                    name: userDoc.name,
                    role: userDoc.role
                },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                        email: userDoc.email,
                        id: userDoc._id,
                        name: userDoc.name,
                        role: userDoc.role
                    });
                }
            );
        } else {
            res.status(422).json('Incorrect password');
        }
    } else {
        res.status(404).json('User not found');
    }
});

module.exports = router;