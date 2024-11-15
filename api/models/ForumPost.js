const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    uploadPic: [{ type: String }],
    avatar: { type: String },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },  // For upvotes/downvotes
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    dateCreated: { type: Date, required: true },
  });

// Create the model
const ForumPostModel = mongoose.model('ForumPost', ForumPostSchema);

// Export the model
module.exports = ForumPostModel;