import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'


function Markers({trail}) {
  return (
    <div>
        <MarkerF 
            position={trail.coordinates} // Updated to use centerCoordinates
            icon={{
                url: '/marker.png',
                scaledSize: {
                    width: 100,
                    height: 100,
                }
            }}
        >
            
        </MarkerF>
    </div>
  )
}

export default Markers;