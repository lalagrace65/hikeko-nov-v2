const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');
const { requireRole } = require('../../middleware/auth');

router.get('/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.userId });
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