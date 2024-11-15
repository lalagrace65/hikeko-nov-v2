import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';
import { Carousel } from "@material-tailwind/react";
import Legend from './Legend';
import GuidelinesToHiking from './GuidelinesToHiking';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (!trail) return <p>Loading...</p>;

  return (
    <div className="flex gap-8 p-8 min-h-screen">
      {/* Left Column: Trail Details */}
      <div className="flex-1 max-w-xl">
        <div className="flex flex-col">
          <Carousel
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {trail.trailImages.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  src={image}
                  alt={`Trail image ${index + 1}`}
                  className="w-full h-full object-cover bg-black bg-opacity-30"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-end p-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white">{trail.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Legend trailClass={trail.trailClass} difficultyLevel={trail.difficultyLevel} />
                    </div>
                    <p className="text-lg text-white mt-2">{trail.trailLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          <div className="mt-4 text-lg text-justify">
            <p>{trail.description}</p>
            <GuidelinesToHiking />
          </div>
        </div>
      </div>

      {/* Right Column: Packages */}
      <div className="w-[900px] flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Packages</h2>
        {packages.length > 0 ? (
          <div className="grid gap-4">
            {packages.map(pkg => (
              <div key={pkg._id} className="border rounded p-4 shadow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                  <p>Travel Agency: {pkg.price}</p>
                  <p>Price: {pkg.price}</p>
                  <p>Date: {formatDate(pkg.date)}</p>
                  <p>Payment Options: {pkg.paymentOptions}</p>
                  <p>Extra Info: {pkg.extraInfo}</p>
                  <p>Max Guests: {pkg.maxGuests}</p>
                </div>
                <div>
                  {/* Carousel for Package Images */}
                  {pkg.packageImages && pkg.packageImages.length > 0 ? (
                    <Carousel
                      className="rounded-xl mt-4"
                      navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-2 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                          {new Array(length).fill("").map((_, i) => (
                            <span
                              key={i}
                              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-blue-500" : "w-4 bg-blue-200"
                              }`}
                              onClick={() => setActiveIndex(i)}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {pkg.packageImages.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Package image ${idx + 1}`}
                          className="w-full h-64 object-cover rounded"
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <p className="mt-4 text-gray-500">No images available for this package.</p>
                  )}
                </div>


                <Button
                  onClick={() => navigate(`/bookings/packages/${pkg._id}`)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
      </div>
    </div>
  );
}

export default TrailDetail;
