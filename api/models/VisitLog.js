const mongoose = require('mongoose');

// Define schema for storing visit logs
const visitLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true }, // Store session ID for anonymous users
  page: { type: String, required: true }, // URL of the visited page
  userAgent: { type: String, required: true }, // User's browser and device information
  ipAddress: { type: String, required: true }, // User's IP address
  timestamp: { type: Date, default: Date.now }, // Time of visit
});

const VisitLog = mongoose.model('VisitLog', visitLogSchema);

module.exports = VisitLog;