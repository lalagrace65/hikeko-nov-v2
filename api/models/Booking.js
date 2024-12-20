const mongoose = require('mongoose');
const uniqid = require('uniqid');


const BookingSchema = new mongoose.Schema({
    joinerName:{type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: String, required: true},
    pickupLocation: {type: String},
    age: {type: String, required: true},
    sex: {type: String, required: true},
    homeAddress: {type: String, required: true},
    emergencyContactPerson: {type: String, required: true},
    emergencyContactNumber: {type: String, required: true},
    medicalCondition: {type: Boolean, required: true},
    conditionDetails: {type: String, required: false},
    proofOfPayment: [{type: String, required: true}],
    paymentType: {type: String, required: true},
    termsAccepted: {type: Boolean, required: true},
    referenceCode: { type: String, unique: true },
    rewardPointsRedeemed: { type: Number, default: 0 },
    earnedPoints: { type: Number, default: 0 },
    finalBookingAmount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    travelAgency: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }, // Link to Package model
    paymentStatus: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Refunded'], 
      default: 'Pending' 
    },
    companions: [{ // New field for companions
      name: { type: String },
      age: { type: String}
    }],
  }, 
{timestamps: true}
);
// Pre-save hook to generate unique reference code
BookingSchema.pre('save', function (next) {
    if (!this.referenceCode) {
      this.referenceCode = uniqid.time('BOOKREF'); // Generates a unique code with prefix 'BOOK-'
    }
    next();
  });
  
// Create the model
const BookingModel = mongoose.model('Booking', BookingSchema);

// Export the model
module.exports = BookingModel;