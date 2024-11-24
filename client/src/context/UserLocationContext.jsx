import React, { createContext, useState } from "react";
import { LoadScript } from '@react-google-maps/api';

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null); // Initialize state

  return (
    <LoadScript
        googleMapsApiKey={"AIzaSyAIWvAQBPApZHXoF3Ma_stP6uLoEz-umeo"}
        mapId={'11f3b47a4deca79e'}
    >
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        {children}
      </UserLocationContext.Provider>
    </LoadScript>
  );
};