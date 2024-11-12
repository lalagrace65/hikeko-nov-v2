const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
    avatar: { type: String }, 
});

const TravelAgencyAvatarModel = mongoose.model('TravelAgencyAvatar', AvatarSchema);

module.exports = TravelAgencyAvatarModel;
