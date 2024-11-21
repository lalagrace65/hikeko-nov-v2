
import { Advertisement } from "@/components/layout/index/Advertisement";
import Banner from "@/components/layout/index/Banner";
import { FeaturedPackage } from "@/components/layout/index/FeaturedPackage";
import { MoreAbout } from "@/components/layout/index/MoreAbout";
import { useEffect } from "react";
import { MdLocationSearching } from "react-icons/md";

export default function IndexPage() {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="mx-auto">
            <div className="relative">
                {/* Banner */}
                <Banner />
                {/* Search Bar */}
                <div
                    className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 px-4 w-full max-w-md sm:max-w-xl lg:max-w-4xl"
                    style={{ zIndex: 10 }}
                >
                    <div className="flex items-center gap-3 p-5 bg-white text-gray-600 border border-gray-300 rounded-full shadow-xl sm:h-[6vh] md:h-[6vh] lg:h-[8vh]">
                        <MdLocationSearching className="sm:w-6 md:w-8 lg:w-8 sm:h-6 md:h-8 lg:h-8 text-primary" />
                        <input
                            type="text"
                            placeholder="Search for mountains..."
                            className="flex-1 outline-none"
                        />
                    </div>
                </div>
            </div>
            
            <h1 className="flex mt-20 text-2xl md:text-3xl lg:text-4xl font-bold justify-center text-primary">Find Your Perfect Hike</h1>
            <h3 className="flex mt-6 px-4 md:px-20 sm:text-sm md:text-sm lg:text-lg justify-center text-center ">
                Set out on a journey suitable to your preferences. 
                Whether you seek breathtaking landscapes or challenging terrains, HikeKo offers hikes for every adventurer.</h3>
            {/*<FeaturedPackage />*/}
            <FeaturedPackage /> 
            <div className="px-4 sm:px-6 md:px-60 ">
                <Advertisement />
                <MoreAbout />
            </div>
        </div>
    );
}