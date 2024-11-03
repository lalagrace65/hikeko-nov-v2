import React , { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:4000';

export default function CustomerBookPage() {
  const { id } = useParams(); 
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/joiner/bookings'); // Make sure this matches your API endpoint
        setBookings(response.data); // Set the bookings from the response
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); // Set loading to false when finished
      }
    };

    fetchBookings();
  }, [id]); // Empty dependency array to run once on mount


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
        ) : (
          bookings.map((booking) => (
            <Card key={booking._id} className="w-full">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {booking.joinerName} 
                </Typography>
                <Typography>
                  {booking.email} 
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-end">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
