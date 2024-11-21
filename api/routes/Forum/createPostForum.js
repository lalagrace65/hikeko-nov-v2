const express = require('express');
const router = express.Router();
const ForumPost = require('../../models/ForumPost');
const Notification = require('../../models/Notification');
const { requireRole } = require('../../middleware/auth');

// POST endpoint to create a new forum post
router.post('/createForumPost', requireRole(['user']), async (req, res) => {
  console.log('Creating a new forum post');

  try {
    const { 
      title,
      body,
      uploadPic,
    } = req.body;
    
    // Create a new forum post
    const newPost = new ForumPost({
      title,
      body,
      uploadPic,
      userId: req.userId,
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
      { $inc: { likes: 1 } },  // Increment the likes by 1
      { new: true }
    );
    res.json({ likes: post.likes });  // Send only the likes value
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

// Route to add a comment to a post
router.post('/commentPost/:postId', async (req, res) => {
  const { postId } = req.params;
  const { comment, userId } = req.body; // Extract comment and userId from the request body

  try {
    // Find the forum post
    const forumPost = await ForumPost.findById(postId);
    if (!forumPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Debugging: Log the post owner and commenter info
    console.log('Post Owner userId:', forumPost.userId);
    console.log('Comment Creator userId:', userId);
    // Add the new comment
    const newComment = {
      comment,
      userId, // Include userId in the comment
      date: new Date(),
    };
    forumPost.comments.push(newComment);
    // Save the updated post
    await forumPost.save();

   // Get the user's full name from req.user (ensure req.user is populated)
   const userFullName = req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Anonymous';

   // Debugging: Log the user's full name
   console.log('User Full Name:', userFullName);
    
   // Create a notification for the post owner (if the commenter is not the owner)
   if (forumPost.userId.toString() !== userId) { // Avoid notifying the owner if they commented
    const notification = new Notification({
      userId: forumPost.userId, // The owner of the post
      message: `${userFullName} commented on your post: ${forumPost.title}`,
      isRead: false,
    });
    console.log('Saving Notification for userId:', forumPost.userId.toString());
    await notification.save();
    
  }

    res.status(200).json({ comments: forumPost.comments });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// this is to get ALL the posts and see it on the forum page
router.get('/getForumPosts', async (req, res) => {
  try {
    const posts = await ForumPost.find()
    .populate('userId', 'firstName avatar')
    .populate('comments.userId', 'firstName avatar')  // Populate comment user info
    .sort({ dateCreated: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});


module.exports = router;
