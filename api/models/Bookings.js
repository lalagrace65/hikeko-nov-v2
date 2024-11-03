// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  joinerName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  pickupLocation: { type: String },
  age: { type: String },
  sex: { type: String, enum: ['Male', 'Female', 'Other'] },
  homeAddress: { type: String },
  emergencyContactPerson: { type: String },
  emergencyContactNumber: { type: String },
  medicalCondition: { type: Boolean, default: false },
  conditionDetails: { type: String },
  proofOfPayment: { type: String },
  termsAccepted: { type: Boolean, required: true },
  trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trails' },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  referenceCode: { type: String },
});

module.exports = mongoose.model('Booking', BookingSchema);
