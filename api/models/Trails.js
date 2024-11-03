const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    properties: { type: Object },
    price: { type: Number, required: true },
    trailClass: { type: Number, required: true },
    difficultyLevel: { type: Number, required: true },
    elevation: { type: Number, required: true },
    trailImages: [{ type: String }],
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }]
}, {
    timestamps: true,
});

// Create the model
const TrailsModel = mongoose.model('Trails', TrailSchema);

// Export the model
module.exports = TrailsModel;