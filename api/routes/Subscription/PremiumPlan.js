// In your backend (e.g., Express.js)
const express = require('express');
const mongoose = require('mongoose');
const Subscription = require('../../models/Subscription');

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
    
    // Create a new subscription object
    const newSubscription = new Subscription({
      subscriptionPlan,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus: 'Active', // Initially set to Active
      renewalStatus,
      proof, 
      paymentHistory: [],
      termsAccepted, 
    });

    // Save the subscription to the database
    const savedSubscription = await newSubscription.save();

    // Respond with the saved subscription
    res.status(200).json({
      message: 'Subscription created successfully',
      subscription: savedSubscription,
      subscriptionId: savedSubscription._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating subscription' });
  }
});

module.exports = router;
