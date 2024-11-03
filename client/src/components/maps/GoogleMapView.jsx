import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import React, { useContext } from 'react';
import { UserLocationContext } from '@/context/UserLocationContext';
import Markers from './Markers';

function GoogleMapView({trailList}) {
    const { userLocation } = useContext(UserLocationContext);
    const containerStyle = {
        width: '100%',
        height: '70vh'
    };
    
    const coordinate = {
        lat: 14.42972,
        lng: 120.93667
    };

    const centerCoordinates = userLocation || coordinate; // Fallback to default coordinates

    return (
        <div>
            <LoadScript
                googleMapsApiKey={"AIzaSyBm4BzQu1OZU5qB77IpAqr-lt21E21ctvU"}
                mapId={'16b2c61749498632'}
            >
                <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center={centerCoordinates}
                    options={{ mapId: '16b2c61749498632' }}
                    zoom={15}
                >
                    <MarkerF
                        position={userLocation}
                        icon={{
                            url: '/marker.png',
                            scaledSize: {
                                width: 50,
                                height: 50,
                            }
                        }}
                    />
                    {trailList.map((item,index) => (
                        <Markers
                            trail={item} 
                            key={index}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default GoogleMapView;