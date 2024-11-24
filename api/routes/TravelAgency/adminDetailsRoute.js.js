const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { requireRole } = require('../../middleware/auth');

const router = express.Router();

// Get admin details
router.get('/admin-details', requireRole(['admin']), async (req, res) => {
    try {
        const adminId = req.userData.id; // Get admin ID from the verified token

        // Fetch the required details from the TravelAgencySignUpModel
        const adminDetails = await User.findById(adminId).select(
            'firstName lastName email contactNo businessName businessAddress businessType businessBranch businessContactNo birCertificateDocu dtiPermitDocu businessPermitDocu mayorsPermitDocu subscriptionId'
        )
        .populate({
            path: 'subscriptionId', 
            select: 'subscriptionStartDate subscriptionEndDate subscriptionStatus subscriptionPlan', 
        });

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
        await User.findByIdAndUpdate(adminId, {
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

// Add or update system logo (avatar)
router.post('/admin-details/settings/addSystemLogo', requireRole(['admin']), async (req, res) => {
    console.log('Received data:', req.body); 

    try {
        const { avatar } = req.body;

        // Check data format before creating
        if (!avatar || !avatar.length) {
            throw new Error('SystemSettingsLogo is missing or empty');
        }

        // Check if there's an existing avatar and update it, or create a new one
        let systemDoc = await User.findOne({});
        if (systemDoc) {
            systemDoc.avatar = avatar;
            await systemDoc.save();
        } else {
            systemDoc = await User.create({ avatar });
        }

        console.log('Created or updated system document:', systemDoc);
        res.json(systemDoc);
    } catch (error) {
        console.error('Error in addSystemLogo route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get current system logo (avatar)
router.get('/admin-details/settings/getSystemLogo', requireRole(['admin']), async (req, res) => {
    try {
        const systemDoc = await User.findOne({});
        res.json(systemDoc || { avatar: null });
    } catch (error) {
        console.error('Error in getSystemLogo route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
