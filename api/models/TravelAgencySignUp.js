const mongoose = require('mongoose');

const TravelAgencySignUpSchema = new mongoose.Schema({
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
  
}, { timestamps: true });


const TravelAgencySignUpModel = mongoose.model('TravelAgencySignUp', TravelAgencySignUpSchema);

module.exports = TravelAgencySignUpModel;