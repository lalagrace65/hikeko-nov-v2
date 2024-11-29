import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrailItem from './TrailItem';
import GoogleMapView from './GoogleMapView';
import { baseUrl } from '@/Url';

export default function TrailList() {
  const [trailData, setTrailData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/trails`);
        console.log('Received trail data:', response.data);
        setTrailData(response.data);
      } catch (error) {
        console.error('Error fetching trail data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <GoogleMapView trails={trailData} />

      <h2 className="text-xl font-bold p-2">Trail List</h2>
      {trailData.length > 0 ? (
        <div className="flex overflow-x-auto gap-2 scrollbar-hide scroll-smooth">
          {trailData.map((trail) => (
            <TrailItem key={trail._id} trail={trail} />
          ))}
        </div>
      ) : (
        <p>No trails found.</p>
      )}
    </div>
  );
}
