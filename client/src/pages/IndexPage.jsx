import { AboutHikeko } from "@/components/layout/index/AboutHikeko";
import Banner from "@/components/layout/index/Banner";
import { FeaturedPackage } from "@/components/layout/index/FeaturedPackage";
import HikingFAQs from "@/components/layout/index/HikingFAQs";

export default function IndexPage() {
    return (
        <div className="mx-auto">
            <Banner />
            <h1 className="flex mt-10 text-4xl font-bold justify-center">Find Your Perfect Hike</h1>
            <h3 className="flex mt-6 text-md justify-center">
                Set out on a journey suitable to your preferences. 
                Whether you seek breathtaking landscapes or challenging terrains, HikeKo offers hikes for every adventurer.</h3>
            <FeaturedPackage />
            <AboutHikeko/>
            <HikingFAQs />
        </div>
    );
}