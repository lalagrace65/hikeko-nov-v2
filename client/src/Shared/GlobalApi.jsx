import { baseUrl } from '@/Url';
import axios from 'axios';

const getGooglePlace = (category, radius, lat, lng) => {
    console.log("Category:", category, "Radius:", radius, "Lat:", lat, "Lng:", lng);
    return axios.get(`${baseUrl}/api/google-place?` + 
        'category=' + category + 
        '&radius=' + radius + 
        '&lat=' + lat + 
        '&lng=' + lng);
};

export default {
    getGooglePlace,
};