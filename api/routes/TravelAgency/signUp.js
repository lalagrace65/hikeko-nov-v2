const mongoose = require('mongoose');
const express = require('express');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const Subscription = require('../../models/Subscription');


const router = express.Router();

// POST request for signup
router.post('/signup', async (req,res) => {
  console.log('Received signup data:', req.body);
  try {
   
    // Parse the request body
    const {
      ownerFirstName,
      ownerLastName,
      businessEmail,
      ownerMobileNum,
      birCertificate,
      businessName,
      businessAddress,
      businessType,
      businessBranch,
      businessContactNo,
      termsAccepted,
      birCertificateDocu,
      dtiPermitDocu,
      businessPermitDocu,
      mayorsPermitDocu,
      subscriptionId
    } = req.body;

    // Basic input validation
    if (!businessEmail || !termsAccepted || !ownerFirstName || !ownerLastName || 
      !businessName || !businessAddress || !businessType || !businessContactNo) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the subscriptionId is valid (exists in Subscription model)
    if (subscriptionId) {
      const subscription = await Subscription.findById(subscriptionId);
      if (!subscription) {
        return res.status(400).json({ error: 'Invalid subscription ID.' });
      }
    }

    // Create the new sign-up entry
    const signUpData = {
      ownerFirstName,
      ownerLastName,
      businessEmail,
      ownerMobileNum,
      birCertificate,
      businessName,
      businessAddress,
      businessType,
      businessBranch,
      businessContactNo,
      termsAccepted,
      birCertificateDocu: birCertificateDocu.link || [],
      dtiPermitDocu: dtiPermitDocu.link || [],
      businessPermitDocu: businessPermitDocu.link || [],
      mayorsPermitDocu: mayorsPermitDocu.link || [],
      subscriptionId
    };
    // You can choose to exclude sensitive information in the response
    const signUp = await TravelAgencySignUp.create(signUpData);

    // Send a temporary password via email or other method
    console.log('Temporary Password for user:', signUp.plainTempPassword);
    // Return a response to the client
    return res.json({ message: 'Verification email sent!', signUpId: signUp._id }); // Send only the ID or essential info
  } catch (error) {
    console.error('Error creating signup:', error);
    return res.status(500).json({ error: error.message || 'Failed to create signup' });
  }
});
module.exports = router;
