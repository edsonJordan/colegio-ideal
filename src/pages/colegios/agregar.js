import React, { useState,useEffect, useRef }  from "react"
import Select from 'react-select'
import { Country, State }  from 'country-state-city';
import axios from "axios";
import GlobalContextProvider from "../../context/GlobalContextProvider";
import { Footer, Header } from "../../components";
import marker_map from "../../static/svg/marker_map.svg"
import Map, { Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl } from "react-map-gl";
    import "mapbox-gl/dist/mapbox-gl.css";

    
import FormRegisterSchool from "../../components/forms/FormRegisterSchool";
const  Agregar = ()=> {

  return (
    <main className="main">       
        <GlobalContextProvider>
          <Header/>
        </GlobalContextProvider>  
        {/* <a onClick={submitRest} >Enviar rest</a> */}
        <section>
            <div className="section__image--portada agregar">
                <h1 className="title--h5">Agregar colegio</h1>
            </div>
        </section>
        <GlobalContextProvider>
            <FormRegisterSchool/>
        </GlobalContextProvider>        
    <Footer/>
    </main>
  )
}
export default Agregar

