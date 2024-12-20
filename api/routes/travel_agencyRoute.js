const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { bcryptSalt } = require('../middleware/auth'); 
const { requireRole } = require('../middleware/auth');
const { jwtSecret } = require('../middleware/auth');
const Activity = require('../models/Activity');
const Subscription = require('../models/Subscription');

const router = express.Router();

router.post('/create-staff', requireRole(['admin']), async (req, res) => {
    console.log('Received request:', req.body); // Log the request body

    const { firstName, lastName, email, password, address, contactNo } = req.body;
    const { token } = req.cookies;  

    // Verify the JWT token to get the admin's user data
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: 'Unauthorized' });
        }

        try {
            const admin = await User.findById(userData.id);
            if (!admin) {
                console.log('Admin not found');
                return res.status(404).json({ message: "Admin not found" });
            }

            console.log('Admin data:', admin);

            // Fetch subscription plan
            const subscriptionPlan = admin.subscriptionId ? await Subscription.findById(admin.subscriptionId) : { plan: 'Basic' };
            console.log('Admin subscription plan:', subscriptionPlan);

            // Get staff count and staff limit based on the plan
            const staffCount = await User.countDocuments({ adminId: userData.id, role: 'staff' });
            console.log('Current staff count:', staffCount);

            const staffLimit = subscriptionPlan.plan === 'Premium' ? 5 : 3;
            console.log('Staff limit for current subscription plan:', staffLimit);

            // Check if staff count exceeds the limit based on the plan
            if (staffCount >= staffLimit) {
                console.log('Staff limit reached for this plan');
                return res.status(400).json({
                    message: `Staff limit reached for the ${subscriptionPlan.plan} plan. Upgrade your plan to add more staff.`
                });
            }

            // Hash the password and create the new staff user
            const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
            const userDoc = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address,
                contactNo,
                role: 'staff',
                suspended: false,
                adminId: userData.id // Save the admin's ID who created the staff
            });

            // Log success
            console.log('Created user:', userDoc);

            const activityLog = new Activity({
                user: userData.id,
                description: `Staff member ${firstName} ${lastName} created with email ${email} by admin.`,
                type: 'User Registration',
            });

            await activityLog.save();
            console.log('Activity logged successfully');

            res.json(userDoc);
        } catch (e) {
            console.error('Error creating staff:', e); // Log any errors during the staff creation process
            res.status(422).json(e);
        }
    });
});

// Get current staff count and limit based on subscription plan
router.get('/getStaffCount', async (req, res) => {
    console.log('Received staff count request');
    try {
        const { adminId } = req.query;
        console.log('Fetching staff count for adminId:', adminId);

        const admin = await User.findById(adminId);
        if (!admin) {
            console.log('Admin not found');
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log('Admin data:', admin);

        // Fetch subscription plan
        const subscriptionPlan = admin.subscriptionId ? await Subscription.findById(admin.subscriptionId) : { plan: 'Basic' };
        console.log('Admin subscription plan:', subscriptionPlan);

        // Get staff count and staff limit based on the plan
        const staffCount = await User.countDocuments({ adminId: adminId, role: 'staff' });
        console.log('Current staff count:', staffCount);

        const staffLimit = subscriptionPlan.plan === 'Premium' ? 5 : 3;
        console.log('Staff limit for current subscription plan:', staffLimit);

        res.status(200).json({
            staffCount,
            subscriptionPlan: subscriptionPlan.plan,
            staffLimit,  // Include the limit for staff
        });
    } catch (error) {
        console.error('Error fetching staff count:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/create-staff', requireRole(['admin', 'staff']), async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            // Find staff where adminId matches the logged-in admin's ID
            const getStaff = await User.find({ role: 'staff', adminId: userData.id });
            res.json(getStaff);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching staff', error: error.message });
        }
    });
});

// Suspend Staff
router.put('/create-staff/suspend/:id', async (req, res) => {
    try {
        const staff = await User.findByIdAndUpdate(req.params.id, { suspended: true }, { new: true });
        res.status(200).json(staff);
    } catch (error) {
        console.error('Error suspending staff account:', error);
        res.status(500).json({ message: 'Error suspending staff account' });
    }
});


// Retrieve Staff
router.put('/create-staff/retrieve/:id', async (req, res) => {
    try {
        const staff = await User.findByIdAndUpdate(req.params.id, { suspended: false }, { new: true });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving staff account' });
    }
});

router.delete('/create-staff/:id', requireRole(['admin']), async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Attempting to delete staff with ID: ${id}`);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid staff ID format');
            return res.status(400).json({ message: 'Invalid staff ID format' });
        }

        const userDoc = await User.findById(id);

        if (!userDoc) {
            console.log('Staff not found');
            return res.status(404).json({ message: 'Staff not found' });
        }

        await User.findByIdAndDelete(id);

        console.log(`Staff with ID: ${id} deleted successfully`);
        res.json({ message: 'Staff deleted successfully' });
    } catch (err) {
        console.error('Error deleting staff:', err);
        res.status(500).json({ message: 'Error deleting staff', error: err.message });
    }
});

router.get('/admin-dashboard', requireRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

router.get('/staff-dashboard', requireRole(['admin','staff']), (req, res) => {
    res.json({ message: 'Welcome!' });
});

module.exports = router;