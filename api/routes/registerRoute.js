const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const { bcryptSalt } = require('../middleware/auth');
const Activity = require('../models/Activity.js');
const VerificationToken = require('../models/VerificationToken.js');
const jwtSecret = 'wsdfghjkqisoaklfksld';
const jwt = require('jsonwebtoken');


const router = express.Router();

const generateVerificationToken = (user) => {
    if (!user || !user._id) {
        throw new Error("User ID is missing");
    }
    const token = jwt.sign(
        { userId: user._id }, // Payload with user ID
        jwtSecret, // Secret key for signing
        { expiresIn: '1h' } // Token expiration time (1 hour)
    );
    console.log('Generated Token:', token);
    return token;
};

// Register route for regular users only
router.post('/register', async (req, res) => {
    try {
    console.log('Received signup data:');
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

         // Ensure the user document contains a valid _id
         if (!userDoc._id) {
            return res.status(500).json({ message: "User creation failed, no _id available" });
        }

        console.log('User Created:', userDoc);

        // Log the activity: User registration
        const newActivity = new Activity({
            user: userDoc._id,
            description: `${userDoc.firstName} ${userDoc.lastName} registered successfully.`,
            type: 'User Registration',
            createdAt: new Date(),
        });

        // Save the activity log
        await newActivity.save();

        // Generate verification token
        const verificationToken = generateVerificationToken(userDoc);
        console.log('Verification Token:', verificationToken);

        // Store the token in the VerificationToken model (optional)
        const verification = new VerificationToken({
            userId: userDoc._id,
            token: verificationToken,
            expiresAt: Date.now() + 3600000, // 1 hour expiration time
        });

        
        await verification.save();
        res.json({
            message: 'Registration successful. Please verify your email.',
            user: userDoc,
            token: verificationToken, // You can send the token in the response, or send it via email
        }); 
    } catch (e) {
        res.status(422).json({ message: 'Error creating user', error: e.message });
    }
});

router.get('/verify-email', async (req, res) => {
    const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Find the user by ID and update emailVerified
        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { emailVerified: true },
            { new: true }
        );
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        res.redirect('http://localhost:5173/verify-email');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
