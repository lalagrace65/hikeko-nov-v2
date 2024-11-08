const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const { bcryptSalt } = require('../middleware/auth'); 

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { 
        firstName, 
        lastName, 
        email, 
        password, 
        address, 
        contactNo, 
        emergencyContactNo, 
        dateOfBirth, 
        role
    } = req.body;
    console.log('Incoming registration:', { firstName, lastName, address, 
                contactNo, emergencyContactNo, dateOfBirth, email, role }); // Log request data
    try {
        // Basic field and role validation
        if (!firstName || !lastName || !email || !password || !address || !contactNo || !emergencyContactNo || !dateOfBirth ) {
            return res.status(422).json({ message: 'All fields are required with a valid role' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        // Create new user
        const userDoc = await User.create({ 
            firstName, lastName, address, 
            contactNo, emergencyContactNo, dateOfBirth, 
            email, password: hashedPassword, role: 'user' });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json({ message: 'Error creating user', error: e.message });
    }
});

module.exports = router;
