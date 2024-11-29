const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // Reference to the user
  date: { type: Date, default: Date.now },
});

const ForumPostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    uploadPic: [{ type: String }],
    userAvatar: { type: String },
    avatar: { type: String },
    tags: [{ type: String }],
    likes: [{type: String, default: [] } ],
    dateCreated: { type: Date, required: true },
    comments: [CommentSchema],
  });

// Create the model
const ForumPostModel = mongoose.model('ForumPost', ForumPostSchema);

// Export the model
module.exports = ForumPostModel;