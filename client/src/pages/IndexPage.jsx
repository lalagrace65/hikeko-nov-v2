
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
                    className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-full max-w-md sm:max-w-2xl"
                    style={{ zIndex: 10 }}
                >
                    <div className="flex items-center gap-3 p-5 bg-white text-gray-600 border border-gray-300 rounded-full shadow-xl h-[10vh]">
                        <MdLocationSearching className="w-10 h-10 text-primary" />
                        <input
                            type="text"
                            placeholder="Search for mountains..."
                            className="flex-1 outline-none"
                        />
                    </div>
                </div>
            </div>
            
            <h1 className="flex mt-20 text-2xl md:text-3xl lg:text-4xl font-bold justify-center text-primary">Find Your Perfect Hike</h1>
            <h3 className="flex mt-6 laptop:text-md justify-center text-center ">
                Set out on a journey suitable to your preferences. 
                Whether you seek breathtaking landscapes or challenging terrains, HikeKo offers hikes for every adventurer.</h3>
            {/*<FeaturedPackage />*/}
            <FeaturedPackage /> 
            <div className="md:px-40 lg:px-120">
                <Advertisement />
                <MoreAbout />
            </div>
        </div>
    );
}