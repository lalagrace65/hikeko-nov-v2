import React, { createContext, useState } from "react";
import { LoadScript } from '@react-google-maps/api';

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null); // Initialize state

  return (
    <LoadScript
        googleMapsApiKey={"AIzaSyBm4BzQu1OZU5qB77IpAqr-lt21E21ctvU"}
        mapId={'16b2c61749498632'}
    >
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        {children}
      </UserLocationContext.Provider>
    </LoadScript>
  );
};