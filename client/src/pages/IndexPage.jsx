
import { Advertisement } from "@/components/layout/index/Advertisement";
import Banner from "@/components/layout/index/Banner";
import { FeaturedPackage } from "@/components/layout/index/FeaturedPackage";
import { MoreAbout } from "@/components/layout/index/MoreAbout";
import { useEffect } from "react";

export default function IndexPage() {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="mx-auto">
            <Banner />
            <h1 className="flex mt-10 text-4xl font-bold justify-center text-primary">Find Your Perfect Hike</h1>
            <h3 className="flex mt-6 text-lg justify-center">
                Set out on a journey suitable to your preferences. 
                Whether you seek breathtaking landscapes or challenging terrains, HikeKo offers hikes for every adventurer.</h3>
            {/*<FeaturedPackage />*/}
            <FeaturedPackage /> 
            <div className="ml-60 mr-60">
                <Advertisement />
                <MoreAbout />
            </div>
        </div>
    );
}