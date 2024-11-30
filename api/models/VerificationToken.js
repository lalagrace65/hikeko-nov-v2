const mongoose = require('mongoose');

const VerificationTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, select: false},
    expiresAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
module.exports = VerificationToken;
