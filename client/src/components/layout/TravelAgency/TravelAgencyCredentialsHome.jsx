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
    <div className="relative min-h-screen flex flex-col ">
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
      <div className="absolute top-[6%] z-10 ml-60 mr-60">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Boost your revenue with Us!
          </h1>
          <p className="text-lg mb-4 text-white">
            Sign up now and start earning more with HikeKo.
          </p>
        </div>
      {/* Form Container */}
      <div className="absolute top-[15%] z-10 ml-60 mr-60">
          <div className="bg-white p-7 rounded-lg shadow-lg" style={{ width: '500px', minHeight: '500px' }}>
            <h2 className="text-2xl font-semibold mb-4">
              Ready to grow your business?
            </h2>
              <CredForm />
          </div>
        </div>

      {/* New Opportunities Section */}
      <div className="bg-white p-8 text-center mt-40 mx-auto max-w-4xl relative">
        <Typography className="text-6xl font-semibold text-primary">Brings new opportunities</Typography>
        <p className="text-xl mt-10">
          Expand your horizons and explore new business opportunities with HikeKo. Join us today and be part of something big!
        </p>
      </div>

      {/* Three Cards in a Row */}
      <div className="flex justify-center mt-10 space-x-8"> {/* Flexbox container for 3 cards */}
        {/* Card 1 */}
        <Card className="mt-6 w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="hat.png" className='h-40 w-40'/>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Connect With Hikers
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="mt-6 w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="key.png" className='h-40 w-40'/>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              UI/UX Review Check
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
        </Card>
        {/* Card 3 */}
        <Card className="mt-6 w-96 shadow-none">
          <CardBody className="flex flex-col items-center justify-center">
            <img src="bag.png" className='h-40 w-40'/>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              UI/UX Review Check
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
