// In your backend (e.g., Express.js)
const express = require('express');
const mongoose = require('mongoose');
const Subscription = require('../../models/Subscription');
const Activity = require('../../models/Activity');

const router = express.Router();

router.post('/basicSubscription', async (req, res) => {
  try {
    const { 
        subscriptionPlan, 
        subscriptionStartDate, 
        subscriptionEndDate,
        renewalStatus,
        termsAccepted,
    } = req.body;

    // Capture visitor's IP address
    const visitorIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Create a new subscription object
    const newSubscription = new Subscription({
      subscriptionPlan,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus: 'Active', 
      renewalStatus,
      termsAccepted,
    });

    // Save the subscription to the database
    const savedSubscription = await newSubscription.save();

// Normalize IP (optional)
const normalizedIp = visitorIp.replace(/^.*:/, ''); // Strips IPv6 prefix for simplicity

// Log activity if no recent duplicate exists
const activity = await Activity.create({
  user: null,
  description: `Visitor from IP ${normalizedIp} subscribed to the ${subscriptionPlan} plan.`,
  type: 'Subscription',
  ip: normalizedIp,
});
console.log('Activity created:', activity); 

// Fetch the most recent activity for the visitor
const recentActivity = await Activity.findOne({ ip: normalizedIp })
  .sort({ createdAt: -1 })
  .select('description type createdAt')
  .lean();

  console.log('Recent Activity:', recentActivity);

    // Respond with the saved subscription
    res.status(200).json({
      message: 'Subscription created successfully',
      subscription: savedSubscription,
      subscriptionId: savedSubscription._id,
      recentActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating subscription' });
  }
});

module.exports = router;
