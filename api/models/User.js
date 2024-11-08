const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    contactNo: String,
    emergencyContactNo: String,
    dateOfBirth: Date,
    role: { type: String, enum: ['user', 'admin', 'staff'] },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    suspended: { type: Boolean, default: false } 
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
