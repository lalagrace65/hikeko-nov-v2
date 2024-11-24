// In your backend (e.g., Express.js)
const express = require('express');
const mongoose = require('mongoose');
const Subscription = require('../../models/Subscription');
const Activity = require('../../models/Activity');

const router = express.Router();

router.post('/premiumSubscription', async (req, res) => {
  try {
    const { 
      subscriptionPlan, 
      subscriptionStartDate, 
      subscriptionEndDate,
       proof, 
       renewalStatus,
       termsAccepted
      } = req.body;

      // Capture visitor's IP address
    const visitorIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Create a new subscription object
    const newSubscription = new Subscription({
      subscriptionPlan,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus: 'Active', // Initially set to Active
      renewalStatus,
      proof, 
      termsAccepted, 
      paymentHistory: [], // Can be updated later with payment history details
    });

    // Save the subscription to the database
    const savedSubscription = await newSubscription.save();

    // Normalize IP (optional)
    const normalizedIp = visitorIp.replace(/^.*:/, ''); // Strips IPv6 prefix for simplicity

      // Log activity if no recent duplicate exists
      await Activity.create({
        user: null,
        description: `Visitor from IP ${normalizedIp} subscribed to the ${subscriptionPlan} plan.`,
        type: 'Subscription',
        ip: normalizedIp,
      });

    // Fetch the most recent activity for the visitor
    const recentActivity = await Activity.findOne({ ip: normalizedIp })
      .sort({ createdAt: -1 })
      .select('description type createdAt')
      .lean();

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
