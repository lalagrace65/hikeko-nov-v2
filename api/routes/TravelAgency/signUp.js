const mongoose = require('mongoose');
const express = require('express');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');


const router = express.Router();

// POST request for signup
router.post('/signup', async (req,res) => {
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
      contactNumber,
      termsAccepted,
      birCertificatePhoto,
      dtiPermitPhoto,
      businessPermitPhoto,
      mayorsPermitPhoto,
    } = req.body;

    // Basic input validation
    if (!businessEmail || !termsAccepted || !ownerFirstName || !ownerLastName || !businessName || !businessAddress || !businessType || !contactNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create the new sign-up entry
    const signUp = await TravelAgencySignUp.create({
      ownerFirstName,
      ownerLastName,
      businessEmail,
      ownerMobileNum,
      birCertificate,
      businessName,
      businessAddress,
      businessType,
      businessBranch,
      contactNumber,
      termsAccepted,
      birCertificatePhoto,
      dtiPermitPhoto,
      businessPermitPhoto,
      mayorsPermitPhoto,
    });
    
    return res.json({ signUp, message: 'Verification email sent!' });
  } catch (error) {
    console.error('Error creating signup:', error);
    return res.status(500).json({ error: error.message || 'Failed to create signup' });
  }
});

module.exports = router;
