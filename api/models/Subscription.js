const mongoose = require('mongoose');
const uniqid = require('uniqid');


const SubscriptionSchema = new mongoose.Schema({
    subscriptionPlan: {
        type: String,
        enum: ['Basic', 'Premium'],
        required: true,
      },
      subscriptionStartDate: {
        type: Date,
        required: true, // The date when the subscription starts
      },
      subscriptionEndDate: {
        type: Date,
        required: true, // The date when the subscription expires
      },
      subscriptionStatus: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled', 'Pending Renewal'],
        default: 'Active', // Current status of the subscription
      },
      renewalStatus: {
        type: Boolean,
        default: true, // Indicates whether the subscription will auto-renew
      },
      proof: [{type: String, required: true}],
      nextBillingDate: {
        type: Date, // Date of the next payment for renewal
      },
      paymentHistory: [{
        paymentDate: { type: Date },
        amountPaid: { type: Number },
        paymentStatus: { type: String, enum: ['Success', 'Failed'], required: true },
      }],
      termsAccepted: {
        type: Boolean,
        required: true,
      }
  }, { timestamps: true });
  
  // Pre-save hook to generate unique reference code for the booking
  SubscriptionSchema.pre('save', function (next) {
      if (!this.referenceCode) {
          this.referenceCode = uniqid.time('BOOKREF'); // Generates a unique code with prefix 'BOOK-'
      }
      next();
  });

  
// Create the model
const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

// Export the model
module.exports = SubscriptionModel;