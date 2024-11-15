const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

const CounterSchema = new mongoose.Schema({
  role: { type: String, unique: true }, // e.g., 'user', 'admin', or 'staff'
  count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', CounterSchema);

const UserSchema = new mongoose.Schema({
  incrementingId: { type: String, unique: true }, 
  firstName: String,
  lastName: String,
  email: { type: String, sparse: true },  // Ensure the email is unique and can be null if needed
  password: String,
  confirmPassword: String,
  address: String,
  contactNo: String,
  emergencyContactNo: String,
  dateOfBirth: Date,
  avatar: { type: String },
  role: { type: String, enum: ['user', 'admin', 'staff'], default: 'user' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  suspended: { type: Boolean, default: false },

  // Admin-specific fields (optional for non-admins)
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  businessName: { type: String },
  businessAddress: { type: String },
  businessType: { type: String },
  businessBranch: { type: String },
  businessContactNo: { type: String },
  birCertificate: { type: String },
  birCertificateDocu: [{ type: String }],
  dtiPermitDocu: [{ type: String }],
  businessPermitDocu: [{ type: String }],
  mayorsPermitDocu: [{ type: String }],
  termsAccepted: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending Verification', 'Approved', 'Rejected'], default: 'Pending Verification' },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },

  // Temporary password for first-time login
  temporaryPassword: { type: String, unique: true },
  temporaryPasswordExpiry: { type: Date },
}, { timestamps: true });

// Pre-save hook to handle temp password creation for new admins
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Define prefixes based on role
    const rolePrefixes = {
      admin: 'admin',
      user: 'user',
      staff: 'staff'
    };

    try {
      // Find counter and increment count for the user's role
      const counter = await Counter.findOneAndUpdate(
        { role: this.role },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      const count = counter.count;

      // Format incrementingId with role prefix and zero-padded counter
      const prefix = rolePrefixes[this.role] || 'user';
      this.incrementingId = `${prefix}${String(count).padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }

    // Handle temporary password for new admins
    if (this.role === 'admin' && !this.temporaryPassword) {
      const tempPassword = uniqid();
      this.plainTempPassword = tempPassword;
      this.temporaryPassword = await bcrypt.hash(tempPassword, 10);
      this.temporaryPasswordExpiry = Date.now() + 24 * 60 * 60 * 1000;
    }

    // Ensure email is assigned for admins
    if (this.role === 'admin' && !this.email) {
      return next(new Error("Admin must have an email assigned"));
    }
  }

  next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;