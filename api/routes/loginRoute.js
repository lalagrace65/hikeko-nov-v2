
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
        // Fetch the user document
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(404).json('User not found');
        }

        console.log('User document:', userDoc);
        console.log('User role:', userDoc.role);

        // Role-specific validation
        if (userDoc.role === 'admin') {
            console.log('Admin role detected');
            
            // Check account status for admins
            if (userDoc.status !== 'Approved') {
                console.log('Admin account not approved');
                return res.status(401).json('Account not approved. Please contact support.');
            }
            if (!userDoc.emailVerified) {
                console.log('Admin email not verified');
                return res.status(401).json('Email not verified. Please verify your email.');
            }
        } else if (userDoc.role === 'staff') {
            console.log('Staff role detected');
            // Add check for staff account suspension
            if (userDoc.suspended) {
                console.log('Staff account suspended');
                return res.status(403).json('Account is suspended. Please contact support.');
            }
        } else if (userDoc.role === 'user') {
            console.log('User role detected');
            if (userDoc.suspended) {
                console.log('User account suspended');
                return res.status(403).json('Account is suspended. Please contact support.');
            }
        } else {
            console.log('Invalid role detected:', userDoc.role);
            return res.status(403).json('Invalid user role. Access denied.');
        }

        // Password validation
        const now = new Date();
        let passOk = false;

        if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
            passOk = await bcrypt.compare(password, userDoc.temporaryPassword);
        }

        if (!passOk && userDoc.password) {
            passOk = await bcrypt.compare(password, userDoc.password);
        }

        if (!passOk) {
            return res.status(422).json('Invalid email or password');
        }

        // Generate JWT token
        const payload = {
            email: userDoc.email,
            id: userDoc._id,
            role: userDoc.role
        };

        jwt.sign(payload, jwtSecret, {}, (err, token) => {
            if (err) throw err;

            const response = {
                email: payload.email,
                id: payload.id,
                role: payload.role,
                token,
                requiresPasswordChange:
                    userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now
            };

            res.cookie('token', token).json(response);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});


module.exports = router;
