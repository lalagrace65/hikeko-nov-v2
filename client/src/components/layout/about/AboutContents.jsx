import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";
  
  export function AboutContents() {
    const navigate = useNavigate();
    const handleLearnMore = () => {
      navigate('/about');
    };
  
    return (
      <div className="mt-20 py-4 px-4 w-full sm:px-6 md:px-60 flex flex-col items-center">
        <div className="text-center mb-8">
          <h4 className="text-4xl font-bold text-primary">
            OUR COMMITMENT
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full md:w-3/4">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="font-normal text-black text-lg">
              At HikeKo, we are dedicated to redefining the hiking experience. 
              Our mission is to offer a seamless and enjoyable outdoor adventure for all hikers. 
              We take pride in our team of experienced guides and our commitment to providing exceptional services. 
              Join us to create unforgettable memories in the great outdoors.
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src="Mobile_and_Desktop_Hikeko-removebg-preview.png"
              alt="About Hikeko"
              className="h-[400px] w-[400px] object-cover"
            />
            <Button
                onClick={() => window.open('https://drive.google.com/drive/u/1/folders/1PcFkAKuWAi5pXI-GPOCxvJ-5Fft3hvOJ', '_blank')}
                className="mt-4 bg-primary text-white"
                >
                Download Mobile App
            </Button>
          </div>
        </div>
      </div>
    );
  }
  