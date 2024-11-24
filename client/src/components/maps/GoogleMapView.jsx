import { LoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from "@material-tailwind/react";
import Legend from '../trails/Legend';
import { MdLocationSearching } from "react-icons/md";
import { PiMountainsThin } from "react-icons/pi";

function GoogleMapView({ trails }) {
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [filter, setFilter] = useState("");
    const [filteredTrails, setFilteredTrails] = useState(trails);
    const [suggestions, setSuggestions] = useState([]);
    const [centerCoordinates, setCenterCoordinates] = useState({
        lat: 16.205, // Manila
        lng: 121.429,
    });

    const inputRef = useRef(null); // Reference for the input field

    const containerStyle = {
        width: '100%',
        height: '70vh',
    };

    // Filter trails based on user input
    useEffect(() => {
        const processedFilter = filter.toLowerCase().replace(/\./g, ""); // Remove periods and convert to lowercase
        const matchingTrails = trails.filter((trail) =>
            trail.title.toLowerCase().replace(/\./g, "").includes(processedFilter)
        );
        setFilteredTrails(matchingTrails);

        // Update suggestions for the dropdown (limit to 5)
        if (filter) {
            setSuggestions(
                trails
                    .filter((trail) =>
                        trail.title.toLowerCase().replace(/\./g, "").includes(processedFilter)
                    )
                    .slice(0, 5) // Limit to 5 suggestions
            );
        } else {
            setSuggestions([]);
        }

        // Automatically center map on the first matching trail
        if (matchingTrails.length === 1) {
            const firstTrail = matchingTrails[0];
            if (firstTrail.coordinates?.lat && firstTrail.coordinates?.lng) {
                setCenterCoordinates({
                    lat: firstTrail.coordinates.lat,
                    lng: firstTrail.coordinates.lng,
                });
            }
        }
    }, [filter, trails]);

    const handleMarkerClick = (trail) => {
        setSelectedTrail(trail); // Set the selected trail
    };

    const handleCloseInfoWindow = () => {
        setSelectedTrail(null); // Close the info window
    };

    const handleSuggestionClick = (suggestion) => {
        setFilter(suggestion.title); // Set the clicked suggestion's title as the filter
        setSuggestions([]); // Clear suggestions after selection
    };

    // Close suggestions when clicking outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSuggestions([]); // Clear suggestions
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="relative py-4 px-4 flex items-center gap-3">
                <MdLocationSearching className="w-8 h-8 text-primary" />
                <div ref={inputRef} className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search Mountain Name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border rounded w-full outline-none"
                    />
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
