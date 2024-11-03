const mongoose = require('mongoose');

// Define the schema
const featureSchema = new mongoose.Schema({
    titleText_1: { type: String },
    description_1: { type: String },
    bannerImage_1: [{ type: String }],
    titleText_2: { type: String },
    description_2: { type: String },
    bannerImage_2: [{ type: String }],
    titleText_3: { type: String },
    description_3: { type: String },
    bannerImage_3: [{ type: String }],
});

// Create the model
const FeatureModel = mongoose.model('Feature', featureSchema);

// Export the model
module.exports = FeatureModel;