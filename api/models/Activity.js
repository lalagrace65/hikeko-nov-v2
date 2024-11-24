const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Reference to the user who performed the activity
  travelAgency: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  description: { type: String, required: true }, // Description of the activity
  type: { type: String, enum: ["Subscription", "User Registration","Booking", "Login", "Package", "Post" , "Comment", "Signup"], required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp of the activity
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  ip:{type: String},
});

const ActivityModel = mongoose.model("Activity", ActivitySchema);

module.exports = ActivityModel;