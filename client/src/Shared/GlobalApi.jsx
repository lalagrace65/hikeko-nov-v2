import axios from 'axios';

const getGooglePlace = (category, radius, lat, lng) => {
    return axios.get('/api/google-place?' + 
        'category=' + category + 
        '&radius=' + radius + 
        '&lat=' + lat + 
        '&lng=' + lng);
};

export default {
    getGooglePlace,
};