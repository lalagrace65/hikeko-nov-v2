const mongoose = require('mongoose');
const uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

const TravelAgencySignUpSchema = new mongoose.Schema({
  subscriptionId: {type: mongoose.Schema.Types.ObjectId, ref:'Subscription'},
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  ownerMobileNum: { type: String, required: true },
  birCertificate: { type: String, required: true },
  businessName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  businessBranch: { type: String, required: true },
  businessContactNo: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  birCertificateDocu: [{ type: String, required: true }],
  dtiPermitDocu: [{ type: String, required: true }],
  businessPermitDocu: [{ type: String, required: true }],
  mayorsPermitDocu: [{ type: String, required: true }],
  status: { 
    type: String, 
    enum: ['Pending Verification', 'Approved', 'Rejected'], 
    default: 'Pending Verification' 
  },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  temporaryPassword: { type: String, unique: true  }, 
  temporaryPasswordExpiry: { type: Date }, // Expiry date for temp password
  password: { type: String }, // Permanent password after they change it
  role: { type: String, enum: ['admin', 'staff'], default: 'admin' },
}, { timestamps: true });

// Pre-save hook to generate unique reference code
TravelAgencySignUpSchema.pre('save', async function (next) {
  if (!this.temporaryPassword) {
    const tempPassword = uniqid();
    this.plainTempPassword = tempPassword; // Save plain text password
    this.temporaryPassword = await bcrypt.hash(tempPassword, 10); 
    this.temporaryPasswordExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
  }
  next();
});

const TravelAgencySignUpModel = mongoose.model('TravelAgencySignUp', TravelAgencySignUpSchema);

module.exports = TravelAgencySignUpModel;