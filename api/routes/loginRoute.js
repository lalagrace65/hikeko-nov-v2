const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email });

    try {
        // Try to find the user in the User collection first
        let userDoc = await User.findOne({ email });
        let userType = 'user';

        // If not found in User, try to find in TravelAgencySignUp
        if (!userDoc) {
            userDoc = await User.findOne({ email: email });
        }

        if (!userDoc) {
            return res.status(404).json('User or Travel Agency not found');
        }

        // For travel agencies, ensure account is approved
        if (userType === 'admin' && userDoc.status !== 'Approved') {
            return res.status(403).json('Account not approved');
        }

        // For users, check if account is suspended
        if (userType === 'user' && userDoc.suspended) {
            return res.status(403).json('Account is suspended');
        }

        const now = new Date();
        let passOk = false;

        // Check temporary password if it exists and hasn't expired
        if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
            console.log('Checking temporary password');
            passOk = await bcrypt.compare(password, userDoc.temporaryPassword);
        }

        // If temporary password check fails, check the permanent password
        if (!passOk && userDoc.password) {
            passOk = await bcrypt.compare(password, userDoc.password);
        }

        if (!passOk) {
            return res.status(422).json('Invalid email or password');
        }

        // Set up user-specific payload for JWT
        const payload = {
            email: userType === 'user',
            id: userDoc._id,
            role: userDoc.role
        };

        if (userType === 'user') {
            payload.firstName = userDoc.firstName;
            payload.lastName = userDoc.lastName;
        }

        // Generate JWT token
        jwt.sign(payload, jwtSecret, {}, (err, token) => {
            if (err) throw err;

            const response = {
                email: payload.email,
                id: payload.id,
                role: payload.role,
                token
            };

            // Add requiresPasswordChange to the response if temporary password is used
            if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
                response.requiresPasswordChange = true;
                console.log('Temporary password valid. Requires password change.');
            } else {
                response.requiresPasswordChange = false;
                console.log('Login successful with permanent password.');
            }

            res.cookie('token', token).json(response);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

module.exports = router;
