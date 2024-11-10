const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../middleware/auth');
const Booking = require('../../models/Booking.js');
const Package = require('../../models/Package'); // Make sure to import the Package model
const { createBooking } = require('../../controller/bookingController');

// Router for public routes
const router = express.Router();

router.post('/booking', async (req, res) => {
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
        packageId
    } = req.body;

    let userData;

    // Token authentication
    const token = req.headers['authorization']; // Get token from headers
    if (token) {
        try {
            userData = await new Promise((resolve, reject) => {
                jwt.verify(token, jwtSecret, (err, decoded) => {
                    if (err) {
                        reject('Unauthorized: Invalid token');
                    }
                    resolve(decoded);
                });
            });
        } catch (err) {
            return res.status(401).send(err);
        }
    }

    if (!packageId) {
        return res.status(400).send('Package ID is required');
    }

    try {
        // Fetch package and populate the travelAgency reference
        const packageDoc = await Package.findById(packageId).populate('travelAgency');

        if (!packageDoc || !packageDoc.travelAgency) {
            return res.status(404).send('Package not found or travelAgency not associated.');
        }

        const travelAgencyId = packageDoc.travelAgency._id;  // Get the travel agency ID from the populated package

        // Now create the booking document with the correct travelAgencyId
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
            travelAgency: travelAgencyId,  // Set the travelAgency from populated package
            packageId,
            userId: userData ? userData.id : null, // Add user ID from token (if available)
        });

        res.json(bookingDoc);
    } catch (e) {
        console.error('Error creating booking:', e.message);
        res.status(422).json(e);
    }
});

module.exports = router;
