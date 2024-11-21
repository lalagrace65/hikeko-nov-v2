const express = require('express');
const User = require('../../models/User');
const { requireRole } = require('../../middleware/auth');

const router = express.Router();

// PUT route to update user's avatar
router.put('/profile/avatar',requireRole(['user']), async (req, res) => {
    const { avatar } = req.body; // Avatar URL from request body
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.avatar = avatar; // Set the new avatar URL
        await user.save();

        res.status(200).json({ message: 'Avatar updated successfully', avatar: user.avatar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;