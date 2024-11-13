
import { AboutContents } from "@/components/layout/about/AboutContents";
import Partners from "@/components/layout/about/Partners";
import { PricingCard } from "@/components/layout/about/SubscriptionCard";
import { useEffect } from "react";

export default function AboutPage() {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>
            <div className="flex justify-center items-center bg-aboutColor p-20">
                <h5 className="text-white font-bold text-5xl">DISCOVER THE WONDERS OF NATURE WITH HIKEKO</h5>
            </div>
            <div className="">
                <AboutContents />
                <Partners />
                <PricingCard />
            </div>
        </div>
    )
}