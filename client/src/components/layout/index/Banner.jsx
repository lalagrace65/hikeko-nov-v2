import { Typography } from "@material-tailwind/react";
import React from "react";
import { MdLocationSearching } from "react-icons/md";

const Banner = () => {
    return (
        <div className="relative w-full h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
            <img
                src="scenery1.png"
                alt="Travel Banner"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
                style={{ objectPosition: "50% 60%" }}
            />
            <div class="absolute inset-0 bg-black/50 opacity-20"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-2 sm:px-4 lg:px-6">
                <Typography className="text-2xl laptop:text-6xl font-bold text-center">
                    Discover your next hiking adventure
                </Typography>
            </div>
        </div>
    );
};

export default Banner;
