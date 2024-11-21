const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const { bcryptSalt } = require('../middleware/auth');

const router = express.Router();

// Register route for regular users only
router.post('/register', async (req, res) => {
    const { 
        firstName, 
        lastName, 
        email, 
        password,
        confirmPassword, 
        address, 
        contactNo, 
        emergencyContactNo, 
        dateOfBirth,
        avatar, 
    } = req.body;

    try {
        // Basic field validation for user registration
        if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !contactNo || !emergencyContactNo || !dateOfBirth) {
            return res.status(422).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        // Create new regular user
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            address,
            contactNo,
            emergencyContactNo,
            dateOfBirth,
            role: 'user',
            avatar
        });

        res.json(userDoc);
    } catch (e) {
        res.status(422).json({ message: 'Error creating user', error: e.message });
    }
});

module.exports = router;
