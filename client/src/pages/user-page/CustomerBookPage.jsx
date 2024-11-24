import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCircleInfo } from "react-icons/fa6";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '@/Url';

export default function CustomerBookPage() {
  const { id } = useParams(); 
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [loading, setLoading] = useState(true); // State for loading status
  const [expandedBookingId, setExpandedBookingId] = useState(null); // State to manage expanded booking details

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format as "November 1, 2024"
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/joiner/bookings`); // Make sure this matches your API endpoint
        setBookings(response.data); // Set the bookings from the response
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); // Set loading to false when finished
      }
    };

    fetchBookings();
  }, [id]); // Empty dependency array to run once on mount

  // Function to toggle the visibility of additional booking details
  const toggleDetails = (bookingId) => {
    setExpandedBookingId(prevId => (prevId === bookingId ? null : bookingId));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header Section */}
      <div className="relative w-full text-center bg-gray-100 pb-20">
        {/* Semi-circle Wave Header */}
        <div className="absolute inset-x-0 top-0">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#f3f4f6" 
              fillOpacity="1" 
              d="M0,128 C360,200 1080,200 1440,128 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>
        <Typography 
          variant="h2" 
          color="gray" 
          className="text-4xl font-semibold relative z-10 pt-16"
        >
          My Bookings
        </Typography>
      </div>
  
      {/* Booking Cards */}
      <div className="space-y-6 w-full px-4 md:px-8 mt-16">
        {loading ? (
          <Typography>Loading...</Typography> // Show loading text while fetching
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking?._id || Math.random()} className="w-full">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {booking?.referenceCode || "No Reference Code"}
                  <br />
                  {booking?.packageId?.trailId?.title || "No Trail Title"} &nbsp; &nbsp; booking to &nbsp;
                  {booking?.packageId?.travelAgency?.businessName || "No Business Name"} 
                </Typography>
                <Typography>
                  {booking?.joinerName || "No Joiner Name"} 
                  <br />
                  {booking?.email || "No Email"} 
                </Typography>
                <Typography>
                  {formatDate(booking?.packageId?.date) || "No Date Available"}
                  <br />
                  {booking?.packageId?.price || "No Price Available"}
                </Typography>
  
                {/* Conditionally render additional details */}
                {expandedBookingId === booking?._id && (
                  <div className="mt-4">
                    <Typography className="flex items-center">
                      <FaCircleInfo /> Additional Booking Details:
                    </Typography>
                    <ul className="ml-6 mt-2">
                      {booking?.packageId?.packages?.length > 0 ? (
                        booking.packageId.packages.map((pkg, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">🟠</span> {/* Bullet point */}
                            {pkg || "No Package Name"} {/* Display the package name */}
                          </li>
                        ))
                      ) : (
                        <Typography>No packages available</Typography>
                      )}
                    </ul>
                  </div>
                )}
              </CardBody>
              <CardFooter className="pt-0 flex justify-end">
                <Button onClick={() => toggleDetails(booking?._id)}>
                  {expandedBookingId === booking?._id ? 'Hide Details' : 'Read More'}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography>No bookings available</Typography>
        )}
      </div>
    </div>
  );
  
}
