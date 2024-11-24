const express = require('express');
const router = express.Router();
const ForumPost = require('../../models/ForumPost');
const Notification = require('../../models/Notification');
const Activity = require('../../models/Activity');
const User = require('../../models/User');
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

    const userId = req.userId; // Assuming `req.userId` holds the logged-in user's ID

    // Fetch user data based on userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userFullName = `${user.firstName || 'Anonymous'} ${user.lastName || ''}`;
    
    // Create a new forum post
    const newPost = new ForumPost({
      title,
      body,
      uploadPic,
      userId: userId,
      dateCreated: new Date(),
    });
    
    // Save to the database
    const savedPost = await newPost.save();
    
     // Log activity
     await Activity.create({
      user: userId,
      description: `${userFullName} created a post: ${title}`,
      type: 'Post',
      createdAt: new Date(),
    });

    // Fetch the most recent activity
    const recentActivity = await Activity.findOne({ user: userId })
    .sort({ createdAt: -1 }) // Sort by most recent
    .select('description type createdAt') // Include only relevant fields
    .lean(); // Use lean to get a plain JS object

    res.status(201).json({post: savedPost, recentActivity});
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

    // Log activity
    const user = await User.findById(userId);  // Ensure user is fetched
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await Activity.create({
      user: userId,
      description: `${user.firstName} ${user.lastName} commented on the post: "${forumPost.title}"`,
      type: 'Comment',
      createdAt: new Date(),
    });

    // Fetch the most recent activity
    const recentActivity = await Activity.findOne({ user: req.userId })
    .sort({ createdAt: -1 }) // Sort by most recent
    .select('description type createdAt') // Include only relevant fields
    .lean(); // Use lean to get a plain JS object

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

  res.status(200).json({ comments: forumPost.comments, recentActivity });
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
