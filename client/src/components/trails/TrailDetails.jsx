import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';


function TrailDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [trail, setTrail] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchTrailData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/trails?id=${id}`);
        setTrail(response.data);
      } catch (error) {
        console.error('Error fetching trail details:', error);
      }
    };
    fetchTrailData();
  }, [id]);

  useEffect(() => {
    const fetchPackages = async () => {
        if (trail) {
            try {
                const response = await axios.get(`${baseUrl}/api/trails/${trail._id}/packages`);
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        }
    };
    fetchPackages();
}, [trail]);

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options); // Format as "November 1, 2024"
};

  if (!trail) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="relative">
          {/* Background image with overlay */}
          <img
            src={trail.trailImages[0]}
            alt={trail.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          {/* Floating text overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-end p-6">
            <div>
              <h1 className="text-4xl font-bold text-white">{trail.title}</h1>
              <div className="flex items-center gap-2 mt-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Trail Class: {trail.trailClass}
              </span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Difficulty Level: {trail.difficultyLevel}/9
              </span>
            </div>
              <p className="text-lg text-white mt-2">{trail.trailLocation}</p>
            </div>
          </div>
        </div>
        
        {/* Trail details and description in two columns */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Column for Trail Details */}
          <div className="md:w-1/2">
            <p className="text-lg mb-2">Trail Class: {trail.trailClass}</p>
            <p className="text-lg mb-2">Difficulty Level: {trail.difficultyLevel}/9</p>
            <p className="text-lg mb-2">Elevation: {trail.elevation} MASL</p>
            <p className="text-lg mb-2">Location: {trail.trailLocation}</p>
          </div>
          
          {/* Right Column for Description */}
          <div className="md:w-1/2">
            <p className="text-lg text-justify">{trail.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Packages</h2>
        {packages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {packages.map(pkg => (
                    <div key={pkg._id} className="border rounded p-4 shadow">
                        <h3 className="text-lg font-semibold mb-2"></h3>
                        <p>Travel Agency: {pkg.travelAgency.name}</p>
                        <p>Price: {pkg.price}</p>
                        <p>Date: {formatDate(pkg.date)}</p>
                        <p>Payment Options: {pkg.paymentOptions}</p>
                        <p>Extra Info: {pkg.extraInfo}</p>
                        <p>Max Guests: {pkg.maxGuests}</p>
                        
                        {/* {pkg.packages.join(", ")} */}
                        <Button onClick={() => navigate(`/bookings/packages/${pkg._id}`)}
                          className="mt-4 bg-blue-500
                           text-white py-2 px-4 
                           rounded hover:bg-blue-600"
                        >
                          Book Now
                        </Button>
                    </div>
                ))}
        </div>
        ) : (
            <p>No packages available for this trail.</p>
        )}
      </div>
    </>
  );
}

export default TrailDetail;
