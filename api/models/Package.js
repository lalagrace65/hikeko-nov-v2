const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true },
});

const packageSchema = mongoose.Schema({
    travelAgency: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trails'},
    packages: { type: [String], required: true},
    additionalPackages: { type: String, required: false},
    exclusions: {type: String, required: false},
    pickupLocation: {type: String, required: false},
    price: {type: String, required: true},
    paymentOptions: {type: String, required: true},
    extraInfo: {type: String, required: false},
    dpPolicy: {type: String, required: false},
    coordinatorName: {type: String, required: true},   
    checkIn: timeSchema,   
    checkOut: timeSchema, 
    maxGuests: String,
    images: [String],
    date: { type: Date, required: true },        
    dateCreated: { type: Date, required: true },
    status: { type: String, enum: ['upcoming','ongoing', 'ended'], default: null },
    isArchived: { type: Boolean, default: false },
    archivedTimestamp: { type: Date, required: false },   
});

const PackageModel = mongoose.model('Package', packageSchema);

module.exports = PackageModel;
