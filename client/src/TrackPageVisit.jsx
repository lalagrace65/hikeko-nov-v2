import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from './Url';


const TrackPageVisit = () => {

    const location = useLocation();
  useEffect(() => {
    const trackVisit = async () => {
      // Get the session ID from cookies (or generate a new one if it doesn't exist)
      let sessionId = Cookies.get('sessionId');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2); // Generate a random session ID
        Cookies.set('sessionId', sessionId, { expires: 7 }); // Set the cookie to last 7 days
      }

      const page = location.pathname; // Get the current page URL from the location object
      const userAgent = navigator.userAgent; // Get the user's browser and device info

      // Send data to the backend
      try {
        await axios.post(`${baseUrl}/api/track-visit`, {
          sessionId,
          page,
          userAgent,
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [location]); // Empty dependency array ensures it only runs once when the component mounts

  return null; // This component doesn't render anything
};

export default TrackPageVisit;