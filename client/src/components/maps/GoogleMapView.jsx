import { LoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from "@material-tailwind/react";
import Legend from '../trails/Legend';
import { MdLocationSearching } from "react-icons/md";
import { PiMountainsThin } from "react-icons/pi";

function GoogleMapView({ trails }) {
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [filter, setFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [trailClassFilter, setTrailClassFilter] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null);
    const [filteredTrails, setFilteredTrails] = useState(trails);
    const [suggestions, setSuggestions] = useState([]);
    const [centerCoordinates, setCenterCoordinates] = useState({
        lat: 16.205, // Manila
        lng: 121.429,
    });

    const inputRef = useRef(null);

    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    // Filter trails based on dropdown selections and search input
    useEffect(() => {
        let filtered = trails;
    
        if (filter) {
            const processedFilter = filter.toLowerCase().replace(/\./g, "");
            filtered = filtered.filter((trail) =>
                trail.title.toLowerCase().replace(/\./g, "").includes(processedFilter)
            );
        }
        if (regionFilter) {
            filtered = filtered.filter((trail) => trail.region === regionFilter);
        }
        if (trailClassFilter) { // Now checking for non-empty value
            filtered = filtered.filter((trail) => trail.trailClass === trailClassFilter);
        }
        if (difficultyFilter) { // Now checking for non-empty value
            filtered = filtered.filter((trail) => trail.difficultyLevel === difficultyFilter);
        }
    
        // Ensure only trails with valid coordinates are displayed
        const validTrails = filtered.filter(
            (trail) => trail.coordinates?.lat && trail.coordinates?.lng
        );
    
        setFilteredTrails(validTrails);
    
        // Update suggestions only when filter is non-empty
        if (filter.trim()) {
            setSuggestions(validTrails.slice(0, 5));
        } else {
            setSuggestions([]); // Clear suggestions if filter is empty
        }
    
        // Center map on the first valid trail if only one remains
        if (validTrails.length === 1) {
            const firstTrail = validTrails[0];
            setCenterCoordinates({
                lat: firstTrail.coordinates.lat,
                lng: firstTrail.coordinates.lng,
            });
        }
    }, [filter, regionFilter, trailClassFilter, difficultyFilter, trails]);
    

    const handleMarkerClick = (trail) => {
        setSelectedTrail(trail);
    };

    const handleCloseInfoWindow = () => {
        setSelectedTrail(null);
    };

    const handleSuggestionClick = (suggestion) => {
        setFilter(suggestion.title);
        setTimeout(() => {
            setSuggestions([]);  // Clear the suggestions dropdown after a brief delay
        }, 50); 
    };

    // Extract unique filter options
    const uniqueRegions = [...new Set(trails.map((trail) => trail.region))];
    const uniqueTrailClasses = [...new Set(trails.map((trail) => trail.trailClass))];
    const uniqueDifficultyLevels = [
        ...new Set(trails.map((trail) => trail.difficultyLevel)),
    ];

    // Close suggestions when clicking outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="relative py-4 px-4 flex gap-3">
                <MdLocationSearching className="w-8 h-8 text-primary" />
                <div ref={inputRef} className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search Mountain Name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border rounded w-full outline-none"
                    />

                     {/* Dropdown Filters */}
                    <div className="flex gap-4 my-4">
                        {/* Region Filter */}
                        <select
                            value={regionFilter || ""}
                            onChange={(e) => setRegionFilter(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">All Regions</option>
                            {uniqueRegions.map((region, index) => (
                                <option key={index} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>

                    {/* Trail Class Filter */}
                    <select
                        value={trailClassFilter || ""}
                        onChange={(e) => setTrailClassFilter(Number(e.target.value))}
                        className="p-2 border rounded"
                    >
                        <option value="">All Trail Classes</option>
                        {uniqueTrailClasses.map((trailClass, index) => (
                            <option key={index} value={trailClass}>
                                Trail Class {trailClass}
                            </option>
                        ))}
                    </select>

                    {/* Difficulty Level Filter */}
                    <select
                        value={difficultyFilter || ""}
                        onChange={(e) => setDifficultyFilter(Number(e.target.value))}
                        className="p-2 border rounded"
                    >
                        <option value="">All Difficulty Levels</option>
                        {uniqueDifficultyLevels.map((level, index) => (
                            <option key={index} value={level}>
                                Difficulty {level}
                            </option>
                        ))}
                    </select>
                </div>
                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white overflow-hidden rounded-xl shadow-lg z-10 top-full mt-1">
                            {suggestions.map((trail, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(trail)}
                                >   
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <PiMountainsThin className="w-8 h-8 text-primary opacity-80"/>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-orange-700 opacity-90">{trail.title}</div>
                                            <div className="text-xs text-gray-500">
                                                Trail Class: {trail.trailClass || "N/A"} | Difficulty: {trail.difficultyLevel || "N/A"}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerCoordinates}
                options={{ mapId: '153fc44cfd5b457b' }}
                zoom={8}
            >
                {/* Map filtered trails */}
                {Array.isArray(filteredTrails) && filteredTrails.length > 0 ? (
                    filteredTrails.map((trail) => (
                        <MarkerF
                            icon={{
                                url: '/marker.png',
                                scaledSize: {
                                    width: 50,
                                    height: 50,
                                }
                            }}
                            key={trail._id}
                            position={{
                                lat: trail.coordinates?.lat || 0,
                                lng: trail.coordinates?.lng || 0
                            }}
                            title={trail.title}
                            onClick={() => handleMarkerClick(trail)} // Handle marker click
                        />
                    ))
                ) : (
                    <div>No trails available</div>
                )}
                {/* Info Window for displaying selected trail details */}
                {selectedTrail && (
                    <InfoWindow
                        position={{
                            lat: selectedTrail.coordinates?.lat || 0,
                            lng: selectedTrail.coordinates?.lng || 0
                        }}
                        onCloseClick={handleCloseInfoWindow} // Handle info window close
                    >
                        <div className="w-85 p-2 bg-white rounded-lg shadow-lg">
                            {/* Image Carousel */}
                            {selectedTrail.trailImages.length > 0 && (
                                <Carousel
                                    className="mb-4"
                                    loop
                                >
                                    {selectedTrail.trailImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Trail image ${index + 1}`}
                                            className="object-cover w-full h-40 md:h-56 lg:h-64 rounded-md"
                                        />
                                    ))}
                                </Carousel>
                            )}
                            {/* Trail Details */}
                            <div className='flex justify-between'>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedTrail.title}</h2>
                                <Legend trailClass={selectedTrail.trailClass} difficultyLevel={selectedTrail.difficultyLevel} />
                            </div>
                            <h3 className="text-md font-semibold text-gray-600 mb-2">{selectedTrail.features}</h3>
                            <p className="text-sm text-gray-500 text-justify">
                                {selectedTrail.description || 'No description available.'}
                            </p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default GoogleMapView;
