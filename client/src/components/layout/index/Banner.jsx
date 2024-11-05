import React from 'react';
import { MdLocationSearching } from "react-icons/md";
import { CarouselDefault } from './Slider';

const Banner = () => {
    return (
        <div className="relative w-full h-[70vh] overflow-hidden">
            <img
                src="scenery1.png"
                alt="Travel Banner"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
                style={{ objectPosition: '50% 60%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
            
            {/* Main Content */}
            <div className="absolute inset-0 flex flex-col justify-center text-white"
                style={{
                    padding: '20px',         
                    marginLeft: '160px',      
                    borderRadius: '8px',
                    maxWidth: '600px',      
                }}>

                <h1 className="text-3xl font-bold">Discover your next hiking adventure,</h1>
                <h1 className="text-3xl font-bold">your journey starts here</h1>
                
                {/* Search bar */}
                <div className='mt-4 items-center shadow-2xl'>    
                    <div className="flex gap-3 mt-4 p-3 text-gray-600 bg-white" 
                         style={{
                            borderRadius: '16px',
                            width: '600px',
                            }}>
                        <MdLocationSearching className='w-12 h-16 ml-1 text-primary' />
                        <input type="text" placeholder="Seach for places..." />
                    </div>
                </div>
            </div>

            {/* Image Slider */}
            <div className="relative inset-0 transform"
                style={{ marginLeft: '940px', marginTop: '35px' }}
            >
                <CarouselDefault className="rounded-xl w-full "/>
            </div>
        </div>
    );
};

export default Banner;
