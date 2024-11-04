import { baseUrl } from '@/Url';
import axios from 'axios';

const getGooglePlace = (category, radius, lat, lng) => {
    return axios.get(`${baseUrl}/api/google-place?` + 
        'category=' + category + 
        '&radius=' + radius + 
        '&lat=' + lat + 
        '&lng=' + lng);
};

export default {
    getGooglePlace,
};