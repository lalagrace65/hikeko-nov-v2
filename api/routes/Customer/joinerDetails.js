const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../middleware/auth');
const Booking = require('../../models/Booking.js');
const {createBooking} = require('../../controller/bookingController');
//this is for public
const router = express.Router();

router.post('/booking', createBooking, async (req, res) => {
    console.log('Received booking:', req.body); 
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
     } = req.body;

    let userData;
    // Check for userData based on your authentication strategy
    const token = req.headers['authorization']; // Example for token-based auth
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).send('Unauthorized: Invalid token');
            }
            userData = decoded; // Set userData from decoded token
        });
    }

    try {
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
            packageId,
            // If you want to include user data in the booking
            userId: userData ? userData.id : null, // Example of adding user ID
        });

        res.json(bookingDoc);
    } catch (e) {
        console.error('Error creating booking:', e.message); 
        res.status(422).json(e);
    }
});


module.exports = router;