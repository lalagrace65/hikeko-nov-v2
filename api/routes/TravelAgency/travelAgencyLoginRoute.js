const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const { jwtSecret } = require('../../middleware/auth');
const router = express.Router();

router.post('/travelAgencyLogin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email });

    try {
        const userDoc = await TravelAgencySignUp.findOne({ businessEmail: email });
        if (!userDoc) {
            console.log('User not found');
            return res.status(404).json('User not found');
        }

        if (userDoc.status !== 'Approved') {
            console.log('Account not approved');
            return res.status(403).json('Account not approved');
        }

        const now = new Date();
        let passOk = false;

        // Check if the temporary password is valid and not expired
        if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
            console.log('Checking temporary password');
            passOk = await bcrypt.compare(password, userDoc.temporaryPassword);
        } else if (userDoc.password) {
            // Check permanent password if temporary password is expired or not in use
            console.log('Checking permanent password');
            passOk = await bcrypt.compare(password, userDoc.password);
        }

        if (!passOk) {
            console.log('Invalid password');
            return res.status(422).json('Invalid email or password');
        }

        // Generate JWT if password is valid
        jwt.sign(
            {
                email: userDoc.businessEmail,
                id: userDoc._id,
                role: userDoc.role
            },
            jwtSecret,
            {},
            (err, token) => {
                if (err) throw err;

                const response = {
                    email: userDoc.businessEmail,
                    id: userDoc._id,
                    role: userDoc.role,
                    token
                };

                // If the user is logging in with a temporary password, require password change
                if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
                    response.requiresPasswordChange = true;
                    console.log('Temporary password in use. Prompting for password change.');
                } else {
                    response.requiresPasswordChange = false;
                    console.log('Login successful with permanent password.');
                }

                res.cookie('token', token).json(response);
            }
        );
    } catch (error) {
        console.error('Error processing login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
