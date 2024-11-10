const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const { jwtSecret } = require('../../middleware/auth');
const router = express.Router();

router.post('/travelAgencyLogin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email });

    const userDoc = await TravelAgencySignUp.findOne({ businessEmail: email });
    if (!userDoc) {
        console.log('User not found'); // Log when user is not found
        return res.status(404).json('User not found');
    }

    if (userDoc.status !== 'Approved') {
        console.log('Account not approved'); // Log when account is not approved
        return res.status(403).json('Account not approved');
    }
    const now = new Date();
    let passOk = false;

    // Check temporary password if not expired, else check permanent password
    if (userDoc.temporaryPassword && userDoc.temporaryPasswordExpiry > now) {
        console.log('Checking temporary password'); 
        passOk = await bcrypt.compare(password, userDoc.temporaryPassword);
        if (passOk) {
            console.log('Temporary password valid');
            return res.json({ 
                message: 'Login successful. Please change your password.', 
                requiresPasswordChange: true 
            });
        }
    } else {
        console.log('Checking permanent password'); // Log checking of permanent password
        passOk = await bcrypt.compare(password, userDoc.password);    
    }   
    if (!passOk) {
        console.log('Invalid password'); // Log if password is invalid
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
            res.cookie('token', token).json({
                email: userDoc.businessEmail,
                id: userDoc._id,
                role: userDoc.role,
                token,
                requiresPasswordChange: false // already has permanent password
            });
        }
    );
});

module.exports = router;
