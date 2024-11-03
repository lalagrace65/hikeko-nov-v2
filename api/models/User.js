const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    contactNo: String,
    role: { type: String, enum: ['user', 'admin', 'staff'] },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
