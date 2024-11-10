import { LoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';

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
                        <div>
                            <h2>{selectedTrail.title}</h2>
                            <p>{selectedTrail.description || 'No description available.'}</p>
                            {/* You can add more details as needed */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default GoogleMapView;
