import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

function AdminTrailDetails() {
  const { id } = useParams(); // Get trail ID from the URL
  const [trail, setTrail] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchTrailData = async () => {
      try {
        const response = await axios.get(`/api/trails/adminPackage/${id}`);
        setTrail(response.data);
      } catch (error) {
        console.error('Error fetching trail details:', error);
      }
    };

    fetchTrailData();
  }, [id]);

  const handlePackageCreated = (newPackage) => {
    setPackages((prevPackages) => [...prevPackages, newPackage]); // Add the new package to the list
  };
  
  if (!trail) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{trail.title}</h1>
      <img
        src={trail.trailImages[0]}
        alt={trail.title}
        className="w-full h-[300px] object-cover rounded-lg mb-4"
      />
      <p className="text-lg">Trail Class: {trail.trailClass}</p>
      <p className="text-lg">Difficulty Level: {trail.difficultyLevel}/9</p>
      <p className="text-lg">Elevation: {trail.elevation} MASL</p>
      <p className="text-lg">Location: {trail.trailLocation} </p>
      <p className="text-lg mt-4 text-justify">{trail.description}</p>
      {/* Add any additional fields you'd like to display here */}
    
    <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Created Packages</h2>
          {packages.length > 0 ? (
            <ul className="space-y-4">
              {packages.map((pkg) => (
                <li key={pkg.id} className="p-4 border rounded">
                  <p><strong>Price:</strong> {pkg.price}</p>
                  <p><strong>Extra Info:</strong> {pkg.extraInfo}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No packages found for this trail.</p>
          )}
        </div>

    </div>
  );
}

export default AdminTrailDetails;