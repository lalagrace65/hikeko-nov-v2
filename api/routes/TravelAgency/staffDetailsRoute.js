const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { requireRole } = require('../../middleware/auth');

const router = express.Router();

// Get admin details
router.get('/staff-details', requireRole(['staff']), async (req, res) => {
    try {
        const staffId = req.userData.id; // Get admin ID from the verified token

        // Fetch the required details from the TravelAgencySignUpModel
        const staffDetails = await User.findById(staffId).select(
            'incrementingId firstName lastName email contactNo avatar'
            
        )
        console.log('staffDetails:', staffDetails);

        if (!staffDetails) {
            return res.status(404).json({ message: 'staff details not found' });
        }

        res.json(staffDetails);
    } catch (error) {
        console.error('Error fetching staff details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// PUT endpoint to set a new password
router.put('/staff-details/set-password', requireRole(['staff']), async (req, res) => {
    console.log("Incoming request to set-password");
    console.log("Request body:", req.body);
    console.log("staff ID from token:", req.userData.id);

    const { newPassword } = req.body;
    const staffId = req.userData.id;

    if (!newPassword || newPassword.length < 8) {
        console.log("Validation failed for newPassword");
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("Hashed password:", hashedPassword);

        // Update the admin's password
        const updateResult = await User.findByIdAndUpdate(staffId, {
            password: hashedPassword,
        });

        if (!updateResult) {
            console.log("No user found with given staffId");
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log("Password updated successfully for staff ID:", staffId);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Add or update system logo (avatar)
router.post('/staff-details/settings/addSystemLogo', requireRole(['staff']), async (req, res) => {
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
router.get('/staff-details/settings/getSystemLogo', requireRole(['staff']), async (req, res) => {
    try {
        const systemDoc = await User.findOne({});
        res.json(systemDoc || { avatar: null });
    } catch (error) {
        console.error('Error in getSystemLogo route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
