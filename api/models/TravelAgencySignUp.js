const mongoose = require('mongoose');

const TravelAgencySignUpSchema = new mongoose.Schema({
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  ownerMobileNum: { type: String, required: true },
  birCertificate: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  businessBranch: { type: String, required: true },
  contactNumber: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  birCertificatePhoto: { type: String, required: true },
  dtiPermitPhoto: { type: String, required: true },
  businessPermitPhoto: { type: String, required: true },
  mayorsPermitPhoto: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  
}, { timestamps: true });


const TravelAgencySignUpModel = mongoose.model('TravelAgencySignUp', TravelAgencySignUpSchema);

module.exports = TravelAgencySignUpModel;