import React, { useEffect, useState,useMemo } from 'react'
import Map, { Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import {features} from '../../static/data/chicago-parks.json'
import CardHorizontal from '../cards/CardHorizontal';

// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Mapa(props) {
  useEffect(()=>{
    // console.log(features);
  },[])

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
    features.map((city, index) => (
      <>
      
        <Marker 
          className="maker-map"
          key={`marker-${index}`}
          longitude={city.geometry.coordinates[0]}
          latitude={city.geometry.coordinates[1]}
          anchor="right"
          
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >    
        </Marker>
        <Marker 
          className="maker-map--title"
          key={`marker-${index}`}
          longitude={city.geometry.coordinates[0]}
          latitude={city.geometry.coordinates[1]}
          anchor="center"
          
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >    
        <div className='bg-white-default w-fit h-fit rounded-10 p-2'>
          gola
          </div>
        </Marker>
        
      </>
      )),
    []
  );

       
  return (
    <div className='map-box' >
      <Map
          mapboxAccessToken={process.env.API_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -87.637596,
            latitude: 41.940403,
            zoom: 10,
          }}
      mapStyle="mapbox://styles/mapbox/streets-v11">
       <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
     
        {pins}

        {popupInfo && (
          <Popup
            className='transparent'
            anchor="center"
            longitude={Number(popupInfo.geometry.coordinates[0])}
            latitude={Number(popupInfo.geometry.coordinates[1])}
            onClose={() => setPopupInfo(null)}
          >
            
            <CardHorizontal/>
            
            {/* <img width="100%" src={popupInfo.image} /> */}
          </Popup>
        )}
    </Map>
    </div>
  )
}
