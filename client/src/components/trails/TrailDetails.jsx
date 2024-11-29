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
import { IoArrowBackCircleOutline } from "react-icons/io5";
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

const packageNames = {
  vanTransfer: 'Van Transfer',
  registrationFee: 'Registration Fee',
  coordinatorFee: "Coordinator's Fee",
  tourGuideFee: 'Tour Guide Fee',
  environmentalFee: 'Environmental Fee',
  parkingFee: 'Parking Fee',
  bagTag: 'Bag Tag',
  driverFee: "Driver's Fee",
  droneService: 'Drone Shot Service',
}; 

// Function to format both checkIn and checkOut times
const formatBookingTime = (checkIn, checkOut) => {
  const formattedCheckIn = formatTime(checkIn?.hours, checkIn?.minutes);
  const formattedCheckOut = formatTime(checkOut?.hours, checkOut?.minutes);

  return `${formattedCheckIn} - ${formattedCheckOut}`;
};

const handleBack = () => {
  navigate(-1);
};

  if (!trail) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 m-0 p-8 min-h-screen max-w-full overflow-hidden">
      {/* Left Column: Trail Details */}
      <div className="max-w-full lg:w-[600px]">
        <div className="flex flex-col">
          <Carousel
            className="rounded-xl "
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all ${
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
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      {trail.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Legend
                        trailClass={trail.trailClass}
                        difficultyLevel={trail.difficultyLevel}
                      />
                    </div>
                    <p className="text-lg text-white mt-2">{trail.trailLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
  
          <div className="mt-4 sm:text-sm lg:text-lg text-justify">
            <p className="mb-4">{trail.description}</p>
            <GuidelinesToHiking />
          </div>
        </div>
      </div>
  
      {/* Right Column: Packages */}
      <div className="max-w-full lg:col-span-2 p-4 ">
        <div className="justify-between items-center mb-4">
          <div
            className="flex items-center space-x-2 flex-row mb-4"
            onClick={handleBack}
          >
            <IoArrowBackCircleOutline className="text-4xl text-primary cursor-pointer" />
            <div className="flex text-primary font-semibold text-xl cursor-pointer">
              Back
            </div>
          </div>
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="border rounded p-4 shadow flex flex-col lg:flex-row"
                >
                  {/* Left Section: Package Details */}
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2">
                      {/* Avatar and Business Name */}
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        {pkg.travelAgency && pkg.travelAgency.avatar ? (
                          <img
                            src={pkg.travelAgency.avatar}
                            alt={`${pkg.travelAgency.businessName} Logo`}
                            className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-12 h-12 lg:w-20 lg:h-20 bg-gray-200 rounded-full" />
                        )}
                        <Typography
                          variant="h4"
                          className="flex-shrink-0 whitespace-nowrap"
                        >
                          {pkg.travelAgency?.businessName}
                        </Typography>
                      </div>

                      {/* Price */}
                      <Typography
                        variant="h3"
                        className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0 lg:mr-5"
                      >
                        {formatCurrency(pkg.price, "PHP")}
                      </Typography>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
                    <div className="flex flex-row gap-1">
                      <p className="font-semibold">Event Date:</p>
                      <p>{formatDate(pkg.date)}</p>
                    </div>
                    <p>
                      Estimated Time: {formatBookingTime(pkg.checkIn, pkg.checkOut)}
                    </p>
                    <p>
                      Booking Count: {pkg.bookingCount}/{pkg.maxGuests}
                    </p>
                    <div>
                      <h4 className="text-lg mb-2">Package Inclusions:</h4>
                      <ul className="list-none pl-5">
                        {pkg.packages && pkg.packages.length > 0 ? (
                          pkg.packages.map((inclusion, idx) => (
                            <li key={idx} className="mb-1">
                              <span className="mr-2">✔</span>
                              {packageNames[inclusion] || inclusion}
                            </li>
                          ))
                        ) : (
                          <p>No inclusions available.</p>
                        )}
                      </ul>
                    </div>
                    <Button
                      onClick={() => {
                        if (!user) {
                          toast.error("Login or Register an Account to Book");
                          navigate("/login");
                        } else if (user.role === "user") {
                          handleBookNow(pkg._id);
                        }
                      }}
                      className="mt-4 bg-primary text-white hover:bg-primary/90"
                    >
                      Book Now
                    </Button>
                  </div>
  
                  {/* Right Section: Carousel for Package Images */}
                  <div className="w-full lg:w-[600px] h-80">
                    {pkg.packageImages && pkg.packageImages.length > 0 ? (
                      <Carousel
                        className="rounded-xl mt-4"
                        navigation={({ setActiveIndex, activeIndex, length }) => (
                          <div className="absolute bottom-2 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                              <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                                  activeIndex === i
                                    ? "w-8 bg-blue-500"
                                    : "w-4 bg-blue-200"
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
                            className="w-full h-full object-cover rounded"
                          />
                        ))}
                      </Carousel>
                    ) : (
                      <p className="mt-4 text-gray-500">
                        No images available for this package.
                      </p>
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