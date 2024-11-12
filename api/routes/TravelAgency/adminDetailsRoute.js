const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TravelAgencySignUp = require('../../models/TravelAgencySignUp');
const { requireRole } = require('../../middleware/auth');

const router = express.Router();

// GET admin details
router.get('/admin-details', requireRole(['admin']), async (req, res) => {
    try {
        const adminId = req.userData.id; // Get admin ID from the verified token

        // Fetch the required details from the TravelAgencySignUp model
        const adminDetails = await TravelAgencySignUp.findById(adminId).select(
            'ownerFirstName ownerLastName businessEmail ownerMobileNum businessName businessAddress businessType businessBranch businessContactNo birCertificateDocu dtiPermitDocu businessPermitDocu mayorsPermitDocu subscriptionId'
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

// PUT endpoint to set a new password
router.put('/admin-details/set-password', requireRole(['admin']), async (req, res) => {
    const { newPassword } = req.body;
    const adminId = req.userData.id; // Get admin ID from the verified token

    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password and clear temporary password fields
        await TravelAgencySignUp.findByIdAndUpdate(adminId, {
            password: hashedPassword,
            temporaryPassword: null,
            temporaryPasswordExpiry: null
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
