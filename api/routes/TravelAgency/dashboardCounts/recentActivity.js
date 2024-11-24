const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Activity = require('../../../models/Activity');
const Package = require('../../../models/Package');

router.get('/admin/activities', async (req, res) => {
    const { adminId } = req.query; // Admin ID passed as a query parameter

    if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) {
        return res.status(400).send('Invalid admin ID.');
    }
    console.log('Admin ID:', adminId);

    try {
        // Fetch all package IDs created by this admin
        const adminPackages = await Package.find({ travelAgency: adminId }).select('_id');

        if (!adminPackages.length) {
            return res.status(200).json({ activities: [] }); // Return empty array instead of 404
        }

        const packageIds = adminPackages.map(pkg => pkg._id); // Get the list of package IDs
        console.log('Package IDs:', packageIds);
        // Fetch recent activities related to these packages (filter by packageIds)
        const recentActivities = await Activity.find({
            type: 'Booking',
            travelAgency: adminId, // Filter by booking activities
        })
            .sort({ createdAt: -1 }) // Sort by most recent
            .populate('user', 'firstName lastName email') // Populate user info
            .limit(20); // Fetch up to 20 recent activities
            
            console.log('Query:', Activity.find({
                type: 'Booking',
                travelAgency: adminId,
              }).toString());
              
              console.log('Results:', recentActivities);
              

        res.json({ activities: recentActivities });
    } catch (err) {
        console.error('Error fetching admin activities:', err.message);
        res.status(500).send('Error fetching admin activities.');
    }
});


module.exports = router;
  