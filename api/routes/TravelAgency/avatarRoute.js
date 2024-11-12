const express = require('express');
const TravelAgencyAvatar = require('../../models/TravelAgencyAvatar');

const router = express.Router();

router.post('/settings/addSystemLogo', async (req, res) => {
    console.log('Received data:', req.body); 

    try {
        const { avatar } = req.body;

        // Check data format before creating
        if (!avatar || !avatar.length) {
            throw new Error('SystemSettingsLogo is missing or empty');
        }

        const systemDoc = await TravelAgencyAvatar.create({ 
            avatar 
        });
        console.log('Created document:', systemDoc);
        res.json(systemDoc);
    } catch (error) {
        console.error('Error in addSystemLogo route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get the current
router.get('/settings/getSystemLogo', async (req, res) => {
    try {
        const systemDoc = await TravelAgencyAvatar.findOne({});
        res.json(systemDoc || { avatar: null });
    } catch (error) {
        console.error('Error in getSystemLogo route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;