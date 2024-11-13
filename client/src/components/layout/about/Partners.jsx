import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function Partners() {
  return (
    <div className="flex justify-center items-center mt-20 mx-60 bg-profileContainer">
      <div className="w-full max-w-[100rem] flex flex-row-reverse items-center justify-center gap-10">
        {/* Image on the Right */}
        <div className="w-[40rem] p-10 flex justify-center items-center">
          <img
            src="praisedTA.jpg"
            alt="About Hikeko"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        
        {/* Text on the Left */}
        <div className="text-center">
          <h4 className="mb-2 text-4xl font-bold text-primary">
            INTRODUCING OUR HIKING PARTNER
          </h4>
        </div>
      </div>
    </div>
  );
}
