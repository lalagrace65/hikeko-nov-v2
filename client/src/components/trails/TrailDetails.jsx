import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';
import { Carousel } from "@material-tailwind/react";
import Legend from './Legend';
import GuidelinesToHiking from './GuidelinesToHiking';
import { Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';

function TrailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trail, setTrail] = useState(null);
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState(null); // State to store authenticated user information

  useEffect(() => {
    // Fetch authenticated user info
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/book/auth/user`, { withCredentials: true });
        console.log('Fetched user info:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

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

  function formatCurrency(amount, currency = 'PHP') {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency,
    }).format(amount);
} 

  const handleBookNow = (packageId) => {
    console.log('Current user state:', user);
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    if (user.role !== 'user') {
      console.log('User role is not valid for booking:', user.role);
      alert('Only users with a valid account can book packages.');
      return;
    }
    console.log('Navigating to booking page with package ID:', packageId);
    navigate(`/bookings/packages/${packageId}`); // Navigate to booking page
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

    // Helper function to format time (hours and minutes) to 12-hour format
const formatTime = (hours, minutes) => {
  if (hours == null || minutes == null) return "N/A";
  
  // Convert hours to 12-hour format
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};
// Function to format both checkIn and checkOut times
const formatBookingTime = (checkIn, checkOut) => {
  const formattedCheckIn = formatTime(checkIn?.hours, checkIn?.minutes);
  const formattedCheckOut = formatTime(checkOut?.hours, checkOut?.minutes);

  return `${formattedCheckIn} - ${formattedCheckOut}`;
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
    <div className="justify-between items-center mb-4">
      <div>
        <Button></Button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Packages</h2>
      {packages.length > 0 ? (
        <div className="grid gap-4">
          {packages.map(pkg => (
            <div key={pkg._id} className="border rounded p-4 shadow flex flex-row space-x-4">
              {/* Left Section: Package Details */}
              <div className="flex-1">
                {/* Travel Agency Logo, Name, and Price */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    {pkg.travelAgency && pkg.travelAgency.logo ? (
                      <img
                        src={pkg.travelAgency.logo}
                        alt={`${pkg.travelAgency.businessName} Logo`}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full" /> // Placeholder for logo if none exists
                    )}
                    <Typography variant="h4" >{pkg.travelAgency?.businessName}</Typography>
                  </div>
                  
                  {/* Price */}
                  <Typography variant='h3' className="text-right">
                    {formatCurrency(pkg.price, 'PHP')}
                  </Typography>
                </div>

                <p>Date: {formatDate(pkg.date)}</p>
                <p>Estimated Time: {formatBookingTime(pkg.checkIn, pkg.checkOut)}</p>
                <p>Max Joiners: {pkg.maxGuests}</p>
                <div>
                  <h4 className="text-lg mb-2">Package Inclusions:</h4>
                  <ul className="list-disc pl-5">
                    {pkg.packages && pkg.packages.length > 0 ? (
                      pkg.packages.map((inclusion, idx) => (
                        <li key={idx} className="mb-1">{inclusion}</li>
                      ))
                    ) : (
                      <p>No inclusions available.</p>
                    )}
                  </ul>
                </div>
                <Button
                  onClick={() => {
                      if (!user) {
                          toast.error('Login or Register an Account to Book');
                          navigate('/login'); // Redirect to login if no user is logged in
                      } else if (user.role === 'user') {
                          handleBookNow(pkg._id); // Proceed with booking if the user is authorized
                      }
                  }}
                  className='mt-4 bg-primary text-white hover:bg-primary/90'
              >
                  Book Now
              </Button>


              </div>

              {/* Right Section: Carousel for Package Images */}
              <div className="w-72 h-auto">
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
