const express = require('express');
const User = require('../../models/User.js');
const Subscription = require('../../models/Subscription.js'); // Import Subscription model

const router = express.Router();

// Admin registration route
router.post('/admin-register', async (req, res) => {
    const { 
        firstName, 
        lastName, 
        contactNo, 
        email, // Use email field for admin registration
        businessName,
        businessAddress,
        businessType,
        businessBranch,
        businessContactNo,
        birCertificate,
        birCertificateDocu,
        dtiPermitDocu,
        termsAccepted,
        businessPermitDocu,
        mayorsPermitDocu,
        incrementingId,
        subscriptionPlan,
        subscriptionId
    } = req.body;

    try {
        // Basic field validation for admin registration
        if (!firstName || !lastName || !contactNo || !email || !businessName || !businessAddress || !businessType || !businessContactNo || !subscriptionId) {
            return res.status(422).json({ message: 'All fields are required for admin registration' });
        }

        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Check if subscriptionId is valid
        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(400).json({ error: 'Invalid subscription ID.' });
        }

        // Create new admin user
        const userDoc = await User.create({
            firstName,
            lastName,
            contactNo,
            role: 'admin',
            email, // Use email for the admin as well
            subscriptionId,
            subscriptionPlan,
            businessName,
            businessAddress,
            businessType,
            businessBranch,
            businessContactNo,
            birCertificate,
            incrementingId,
            termsAccepted,
            birCertificateDocu: birCertificateDocu?.link || [],
            dtiPermitDocu: dtiPermitDocu?.link || [],
            businessPermitDocu: businessPermitDocu?.link || [],
            mayorsPermitDocu: mayorsPermitDocu?.link || [],
            status: 'Pending Verification',
        });


        // Log the temporary password for the newly created user
        console.log(`Temporary Password for ${userDoc.firstName} ${userDoc.lastName}: ${userDoc.plainTempPassword}`);

        res.json(userDoc);
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(422).json({ message: 'Error creating admin user', error: e.message });
    }
});


module.exports = router;
