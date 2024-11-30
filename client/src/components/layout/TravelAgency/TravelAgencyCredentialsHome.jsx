import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import CredForm from '@/components/forms/CredForm';

export default function TravelAgencyCredentialsHome() {
  //material tailwind
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="relative w-full min-h-screen flex flex-col ">
      {/* Cover photo and form */}
      <div className="relative flex-grow">
        {/* Cover photo */}
        <div className="relative h-[600px] w-full">
          <img
            src="sicapoo.jpg"
            alt="Travel Curator Image"
            className="absolute inset-0 w-full h-full object-cover"
            priority="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
      </div>

      {/* Floating Text */}
      <div className="absolute top-[6%] px-8 z-10 lg:px-60">
        <h1 className="text-4xl font-bold mb-2 text-white">
          Boost your revenue with Us!
        </h1>
        <p className="text-lg mb-4 text-white">
          Sign up now and start earning more with HikeKo.
        </p>
      </div>
      {/* Form Container */}
      <div className="absolute top-[12%] lg:top-[15%] flex z-10 w-full px-4 sm:px-8 lg:px-60">
          <div className="bg-white p-7 rounded-lg shadow-lg" style={{ width: '500px', minHeight: '500px' }}>
            <h2 className="text-2xl font-semibold mb-4">
              Ready to grow your business?
            </h2>
              <CredForm />
          </div>
      </div>

        {/* New Opportunities Section */}
        <div className="bg-white p-8 text-center mt-40 mx-auto max-w-4xl relative">
          <Typography className="text-4xl md:5xl lg:text-6xl font-semibold text-primary">Bring new opportunities</Typography>
          <p className="text-xl mt-10">
            Expand your horizons and explore new business opportunities with HikeKo. Join us today and be part of something big!
          </p>
        </div>

      {/* Three Cards in a Row */}
      <div className="flex flex-col lg:flex-row justify-center mt-10 lg:space-x-8 space-y-6 lg:space-y-0 mb-20">
        {/* Card 1 */}
        <Card className="mt-6 w-full lg:w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="hat.png" className="h-40 w-40" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Connect With Hikers
            </Typography>
            <Typography align="center">
              Adding your business to the platform connects you with hikers worldwide, 
              helps manage bookings seamlessly, and strengthens your visibility in the hiking community.
            </Typography>
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="mt-6 w-full lg:w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="key.png" className="h-40 w-40" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Unlock Revenue
            </Typography>
            <Typography align="center">
              Reach more hikers and start earning additional 
              revenue by showcasing your business and services through our platform.
            </Typography>
          </CardBody>
        </Card>

        {/* Card 3 */}
        <Card className="mt-6 w-full lg:w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="bag.png" className="h-40 w-40" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Build Stronger Connections
            </Typography>
            <Typography align="center">
              Our platform lets you showcase your packages, 
              manage bookings, and stay in touch with hikers—ensuring a seamless experience 
              from inquiry to adventure.
            </Typography>
          </CardBody>
        </Card>
      </div>

    </div>
  );
}
