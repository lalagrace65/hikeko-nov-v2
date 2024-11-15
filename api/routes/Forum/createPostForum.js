const express = require('express');
const router = express.Router();
const ForumPost = require('../../models/ForumPost');
const mongoose = require('mongoose');
const User = require('../../models/User');

// POST endpoint to create a new forum post
router.post('/createForumPost', async (req, res) => {
  console.log('Creating a new forum post');

  try {
    const { 
        title,
        body, 
    } = req.body;
    
    // Create a new forum post
    const newPost = new ForumPost({
      title,
      body,
      dateCreated: new Date(),
    });
    
    // Save to the database
    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

//THIS IS FOR LIKES
router.patch('/likePost/:id', async (req, res) => {
  try {
    const post = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

// this is to get ALL the posts and see it on the forum page
router.get('/getForumPosts', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ dateCreated: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});


module.exports = router;
