const mongoose = require('mongoose');
const express = require('express');
const User = require('../../models/User');
const Subscription = require('../../models/Subscription');
const Activity = require('../../models/Activity');

const router = express.Router();

// POST request for signup
router.post('/admin-register', async (req,res) => {
  console.log('Received signup data:', req.body);
  try {
   
    // Parse the request body
    const {
      firstName, 
      lastName, 
      contactNo, 
      email, 
      termsAccepted,
      birCertificate,
      businessType,
      businessBranch,
      businessContactNo,
      businessName, 
      businessAddress,
      birCertificateDocu,
      dtiPermitDocu,
      businessPermitDocu,
      mayorsPermitDocu,
      incrementingId,
      subscriptionPlan,
      subscriptionId
    } = req.body;

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

    // Create the new sign-up entry
    const signUpData = {
      firstName,
      lastName,
      contactNo,
      role: 'admin',
      email,
      subscriptionId,
      subscriptionPlan,
      birCertificate,
      businessName,
      businessAddress,
      businessType,
      businessBranch,
      businessContactNo,
      termsAccepted,
      incrementingId,
      birCertificateDocu: birCertificateDocu.link || [],
      dtiPermitDocu: dtiPermitDocu.link || [],
      businessPermitDocu: businessPermitDocu.link || [],
      mayorsPermitDocu: mayorsPermitDocu.link || [],
      status: 'Pending Verification',
    };
    // You can choose to exclude sensitive information in the response
    const signUp = await User.create(signUpData);

    // Check if user creation was successful
    if (!signUp._id) {
      return res.status(500).json({ error: 'Failed to create user.' });
    }

    // Log the activity
    const activity = await Activity.create({
      user: signUp._id,  // Reference to the user ID
      description: `User  signed up with email ${email}`,
      type: 'Signup',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });

    
    // Send a temporary password via email or other method
    console.log('Temporary Password for user:', signUp.plainTempPassword);
    // Return a response to the client
    return res.json({ message: 'Verification email sent.', signUpId: signUp._id, activity }); // Send only the ID or essential info
  } catch (error) {
    console.error('Error creating signup:', error);
    return res.status(500).json({ error: error.message || 'Failed to create signup' });
  }
});
module.exports = router;