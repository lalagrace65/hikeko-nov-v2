const express = require('express');
const jwt = require('jsonwebtoken');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const { requireRole } = require('../../middleware/auth');

const router = express.Router();

router.get('/admin-details', requireRole(['admin']), async (req, res) => {
    try {
      const adminId = req.userData.id; // Get admin ID from the verified token
  
      // Fetch the required details from the TravelAgencySignUpModel
      const adminDetails = await TravelAgencySignUp.findById(adminId).select(
        'businessName businessEmail businessAddress businessType businessContactNo'
      );
  
      if (!adminDetails) {
        return res.status(404).json({ message: 'Admin details not found' });
      }
  
      res.json(adminDetails);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  module.exports = router;