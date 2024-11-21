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
    }
    return (
        <div className="mt-20 py-4 px-4 w-full sm:px-6 md:px-60 flex justify-between">
            <div className="text-center">
                <h4 className="mb-4 text-4xl font-bold text-primary">
                    OUR COMMITMMENT
                </h4>
                <p className="mb-8 font-normal text-black text-lg">
                    At HikeKo, we are dedicated to redefining the hiking experience. 
                    Our mission is to offer a seamless and enjoyable outdoor adventure for all hikers. 
                    We take pride in our team of experienced guides and our commitment to providing exceptional services. 
                    Join us to create unforgettable memories in the great outdoors.
                </p>
            </div>       
        </div>
    );
  }