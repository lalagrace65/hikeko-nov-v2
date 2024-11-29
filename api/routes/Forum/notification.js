const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');
const { requireRole } = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcryptSalt = 10; 
const jwtSecret = 'wsdfghjkqisoaklfksld';

router.get('/notifications', async (req, res) => {
    let userId = ''; 
    const token = req.cookies.token;

    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
          console.log('JWT verification error:', err);
          return res.status(403).json({ message: 'Token expired or invalid'});
      }
      userId = userData.id;

    });
      if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const notifications = await Notification.find({ userId: userId })
        .populate('userId', 'avatar')

      console.log('Notifications:', notifications);
      res.json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Failed to fetch notifications' });
    }
  });
  
  // Route to mark notification as read
  router.patch('/notifications/markAsRead/:id', async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      notification.isRead = true;
      await notification.save();
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Failed to mark notification as read' });
    }
  });
  

module.exports = router;