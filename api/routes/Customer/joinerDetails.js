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
        packageId, 
        rewardPointsRedeemed 
    } = req.body;

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token is required');
    }

    let userData;
    try {
        userData = jwt.verify(token, jwtSecret);
    } catch (err) {
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

        const userDoc = await User.findById(userData.id);
        if (!userDoc) {
            return res.status(404).send('User not found.');
        }

        const travelAgencyId = packageDoc.travelAgency._id;

        // Validate reward points
        const packagePrice = packageDoc.price;
        let finalPrice = packagePrice;

        if (rewardPointsRedeemed > 0) {
            if (rewardPointsRedeemed > userDoc.rewardPoints) {
                return res.status(400).send('Insufficient reward points.');
            }

            if (rewardPointsRedeemed > packagePrice) {
                return res.status(400).send('Redeemed points cannot exceed package price.');
            }

            // Deduct points from the total price
            finalPrice -= rewardPointsRedeemed;

            // Deduct points from the user's account
            await User.findByIdAndUpdate(
                userData.id,
                { $inc: { rewardPoints: -rewardPointsRedeemed } },
                { new: true }
            );
        }

        // Require proof of payment only if points don't cover full price
        if (finalPrice > 0 && proofOfPayment.length === 0) {
            return res.status(400).send('Proof of payment is required if points do not cover full price.');
        }

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
            rewardPointsRedeemed, 
            finalBookingAmount: finalPrice, 
        });

        // Calculate reward points earned (if applicable)
        const rewardPointsEarned = Math.floor(packagePrice / 50); // Adjust rate as needed
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
