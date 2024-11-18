const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../middleware/auth');
const Booking = require('../../models/Booking.js');
const Package = require('../../models/Package');
const User = require('../../models/User.js');

// Router for public routes
const router = express.Router();

router.post('/booking', async (req, res) => {
    const { 
        joinerName, 
        email, 
        contactNumber,
        pickupLocation,
        age, 
        sex, 
        homeAddress, 
        emergencyContactPerson,
        emergencyContactNumber, 
        medicalCondition, 
        conditionDetails, 
        proofOfPayment, 
        paymentType, 
        termsAccepted, 
        packageId 
    } = req.body;

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token is required');
    }

    let userData;
    try {
        userData = jwt.verify(token, jwtSecret);
        console.log('Decoded token data:', userData); // Debugging log
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).send('Unauthorized: Invalid token');
    }

    if (!userData || !userData.id) {
        return res.status(401).send('Unauthorized: User ID missing in token');
    }

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
        return res.status(400).send('Invalid Package ID');
    }

    try {
        const packageDoc = await Package.findById(packageId).populate('travelAgency', 'businessName');
        if (!packageDoc || !packageDoc.travelAgency) {
            return res.status(404).send('Package not found or travelAgency not associated.');
        }

        const travelAgencyId = packageDoc.travelAgency._id;

        // Create the booking
        const bookingDoc = await Booking.create({
            joinerName, 
            email, 
            contactNumber, 
            pickupLocation, 
            age, 
            sex, 
            homeAddress,
            emergencyContactPerson, 
            emergencyContactNumber, 
            medicalCondition,
            conditionDetails, 
            proofOfPayment, 
            paymentType, 
            termsAccepted,
            travelAgency: travelAgencyId, 
            userId: userData.id,
            packageId, 
        });

        // Calculate reward points (e.g., 1 point for every $10 of the package price)
        const rewardPointsEarned = Math.floor(packageDoc.price / 20); // Adjust rate as needed

        // Update user's reward points
        await User.findByIdAndUpdate(
            userData.id,
            { $inc: { rewardPoints: rewardPointsEarned } },
            { new: true }
        );

        res.json({ 
            booking: bookingDoc, 
            message: `Booking successful! You earned ${rewardPointsEarned} reward points.`,
        });
    } catch (e) {
        console.error('Error creating booking:', e.message);
        res.status(500).json({ message: 'Error creating booking', error: e.message });
    }
});


module.exports = router;
