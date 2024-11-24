const express = require('express');
const requestIp = require('request-ip');
const VisitLog = require('../models/VisitLog');  // Import the Visit model
const router = express.Router();

router.post('/track-visit', async (req, res) => {
  const clientIp = requestIp.getClientIp(req); // Get the real IP address of the client
  const { sessionId, page, userAgent } = req.body;

  console.log('Received Visit Data:', { sessionId, page, userAgent, ipAddress: clientIp });
  
  try {
    // Create a new visit record
    const visit = new VisitLog({
      sessionId,
      page,
      userAgent,
      ipAddress: clientIp,
      timestamp: new Date(),
    });

    // Save the visit data to MongoDB
    await visit.save();
    
    // Respond with success
    res.status(200).send({ message: 'Visit tracked successfully' });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).send({ message: 'Error tracking visit' });
  }
});

module.exports = router;