
import { AboutContents } from "@/components/layout/about/AboutContents";
import Partners from "@/components/layout/about/Partners";
import { PricingCard } from "@/components/layout/about/SubscriptionCard";
import { useEffect } from "react";

export default function AboutPage() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#pricing") {
            const element = document.getElementById("pricing");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, []);
    return (
        <div>
            <div className="flex justify-center items-center bg-aboutColor p-20">
                <h5 className="text-white font-bold text-5xl">DISCOVER THE WONDERS OF NATURE WITH HIKEKO</h5>
            </div>
            <AboutContents />
            <div className="text-center p-2">
                <h4 className="mt-10 mb-2 text-4xl font-bold text-primary">
                    OUR HIKING PARTNER
                </h4>
            </div>
            <Partners />
            {/* Container with responsive margin */}
            <div className="flex flex-col lg:flex-row justify-between items-center mx-4 lg:mx-60 mt-10 gap-10 bg-profileContainer p-10 rounded-md">
                {/* Left Side - Basic Plan */}
                <div className="w-full lg:w-1/2 max-w-lg text-left">
                    <h1 className="text-xl font-bold mb-4">
                        Basic Plan
                        <br />
                        "Get Started with Our Basic Plan!"
                    </h1>
                    <div className="text-sm">
                        <span className="block mb-4">
                            <span className="text-primary font-medium">Reach New Heights with Ease:</span> Begin showcasing your hiking events on Hikeko with our affordable Basic Plan. 
                            Connect with adventurers looking for memorable trails and grow your visibility.
                        </span>
                        <span className="block mb-4">
                            <span className="text-primary font-medium">Easy Event Promotion:</span> Perfect for organizers who want an effective, straightforward way to promote their events. 
                            Share details, dates, and contact info, and start reaching outdoor enthusiasts now!
                        </span>
                        <span className="block">
                            <span className="text-primary font-medium">Your Gateway to Nature Lovers:</span> Step into the Hikeko community and let nature lovers discover your hiking events effortlessly!
                        </span>
                    </div>
    
                    {/* Left Side - Premium Plan */}
                    <h1 className="mt-4 text-xl font-bold mb-4">
                        Premium Plan
                        <br />
                        "Unlock Maximum Visibility with Our Premium Plan!"
                    </h1>
                    <div className="text-sm">
                        <span className="block mb-4">
                            <span className="text-primary font-medium">Unleash the Full Power of Hikeko:</span> Take your events to the next level with our Premium Plan. Enjoy priority placement, featured listings, and enhanced promotional tools for maximum reach.
                        </span>
                        <span className="block mb-4">
                            <span className="text-primary font-medium">Exclusive Exposure & Tools:</span> Get exclusive access to advanced features, including priority listings, targeted marketing, and a dedicated support team to boost your event success.
                        </span>
                        <span className="block mb-4">
                            <span className="text-primary font-medium">Stand Out and Expand Your Reach:</span> Attract larger audiences with our premium features, and watch your events become top choices for adventurers everywhere!
                        </span>
                    </div>
                </div>
    
                {/* Right Side - Pricing Card */}
                <div id="pricing" className="flex-shrink-0 w-full lg:w-auto">
                    <PricingCard />
                </div>
            </div>
        </div>
    );
   
}