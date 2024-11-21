import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function Partners() {
  return (
    <div className="flex justify-center items-center py-4 px-4 w-full sm:px-6 md:px-60">
      <div className="w-full max-w-[100rem] flex items-center justify-center gap-10">
        {/* Image on the Right */}
        <div className="w-[40rem] p-10 flex justify-center items-center">
          <img
            src="praisedTA.jpg"
            alt="About Hikeko"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        
        {/* Text on the Left */}
        
      </div>
    </div>
  );
}
