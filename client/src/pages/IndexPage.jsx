// Import necessary components and dependencies
import { Advertisement } from "@/components/layout/index/Advertisement";
import Banner from "@/components/layout/index/Banner";
import { FeaturedPackage } from "@/components/layout/index/FeaturedPackage";
import { MoreAbout } from "@/components/layout/index/MoreAbout";
import { useEffect, useRef, useState } from "react";
import { MdLocationSearching } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PiMountainsThin } from "react-icons/pi";
import axios from "axios";

export default function IndexPage() {
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [trailMap, setTrailMap] = useState({}); // Mapping of trail titles to trail data
    const [suggestions, setSuggestions] = useState([]); // State for search suggestions
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown container

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);

        // Fetch trails and create a map of titles to their data
        const fetchTrails = async () => {
            try {
                const response = await axios.get("/api/trails"); // Adjust endpoint as needed
                const trails = response.data;

                // Map trail titles (cleaned) to their data
                const trailDataMap = trails.reduce((map, trail) => {
                    const cleanedTitle = trail.title.replace(/[.]/g, "").toLowerCase(); // Remove dots
                    map[cleanedTitle] = {
                        id: trail._id,
                        title: trail.title,
                        trailClass: trail.trailClass,
                        difficultyLevel: trail.difficultyLevel,
                    };
                    return map;
                }, {});
                setTrailMap(trailDataMap);
            } catch (error) {
                console.error("Error fetching trails", error);
            }
        };

        fetchTrails();
    }, []);

    // Close the dropdown if the user clicks outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Handle search input change and update suggestions
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            const cleanedQuery = query.replace(/[.]/g, "").toLowerCase();
            const matches = Object.values(trailMap)
                .filter(({ title }) =>
                    title.toLowerCase().replace(/[.]/g, "").includes(cleanedQuery)
                )
                .slice(0, 5); // Limit suggestions to 5

            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            const cleanedQuery = searchQuery.replace(/[.]/g, "").toLowerCase();
            const match = trailMap[cleanedQuery];

            if (match) {
                navigate(`/trails/${match.id}`); // Navigate to matched trail
            } else {
                alert("Trail not found. Please try a different search.");
            }
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (trail) => {
        setSearchQuery(trail.title); // Set search query to the clicked suggestion
        setSuggestions([]); // Clear suggestions
        navigate(`/trails/${trail.id}`); // Navigate to the trail details page
    };

    return (
        <div className="mx-auto mb-40">
            <div className="relative">
                {/* Banner */}
                <Banner />

                {/* Search Bar */}
                <div
                    className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 px-4 w-full max-w-md sm:max-w-xl lg:max-w-4xl"
                    style={{ zIndex: 10 }}
                >
                    <div className="relative">
                        <div className="flex items-center gap-3 p-5 bg-white text-gray-600 border border-gray-300 rounded-full shadow-xl sm:h-[6vh] md:h-[6vh] lg:h-[8vh]">
                            <MdLocationSearching className="w-8 h-8 text-primary" />
                            {/* Search input */}
                            <form onSubmit={handleSearchSubmit} className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Search for mountains..."
                                    className="flex-1 outline-none"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </div>

                        {/* Suggestions Dropdown */}
                        {suggestions.length > 0 && (
                            <div
                                ref={dropdownRef} // Attach ref to the dropdown
                                className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg z-20"
                            >
                                {suggestions.map((trail, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleSuggestionClick(trail)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <PiMountainsThin className="w-8 h-8 text-primary opacity-80"/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-orange-700 opacity-90">{trail.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    Trail Class: {trail.trailClass} | Difficulty: {trail.difficultyLevel}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <h1 className="flex mt-20 text-2xl md:text-3xl lg:text-4xl font-bold justify-center text-primary">Find Your Perfect Hike</h1>
            <h3 className="flex mt-6 px-4 md:px-6 lg:px-60 text-base md:text-md lg:text-lg justify-center text-center ">
                Set out on a journey suitable to your preferences.
                Whether you seek breathtaking landscapes or challenging terrains
            </h3>

            <div className="md:px-16">
                <FeaturedPackage />
            </div>
            <div className="px-4 sm:px-6 md:px-60 ">
                <Advertisement />
                <MoreAbout />
            </div>
        </div>
    );
}
