import React,{ useEffect } from "react";
import loadGoogle from "../utils/loadGoogleScript";


const Map = () => {
    useEffect(() => {
        loadGoogle(() => {
            new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 20, lng: 0 },
                zoom: 2,
            })
        })
    },[])

  return (
    <div id="map" style={{ width: "100%", height: "70vh", marginTop: "20px" }}></div>
  )
}

export default Map