import { LoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import Legend from '../trails/Legend';

function GoogleMapView({ trails }) { 
    const [selectedTrail, setSelectedTrail] = useState(null);

    const containerStyle = {
        width: '100%',
        height: '70vh'
    };

    const centerCoordinates = { //Manila
        lat: 14.42972,
        lng: 120.93667
    };
    const handleMarkerClick = (trail) => {
        console.log("Marker clicked:", trail); 
        setSelectedTrail(trail); // Set the selected trail
    };

    const handleCloseInfoWindow = () => {
        setSelectedTrail(null); // Close the info window
    };

    return (
        <div>
            <GoogleMap 
                mapContainerStyle={containerStyle}
                center={centerCoordinates}
                options={{ mapId: '153fc44cfd5b457b' }}
                zoom={8}

            >
                {/* Check if trails is defined and has items before mapping */}
                {Array.isArray(trails) && trails.length > 0 ? (
                    trails.map((trail) => (
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
                    // Optional: You can add a message when there are no trails
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
                                <Legend trailClass={selectedTrail.trailClass} difficultyLevel={selectedTrail.difficultyLevel}/>
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
