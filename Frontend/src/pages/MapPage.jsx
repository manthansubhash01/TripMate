import React, { useState } from "react";
import MapFlyTo from "../components/MapFlyTo";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "../components/Searchbar";
import Map from "../components/Map";
import AutoComplete from "../components/AutoComplete";

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]); 

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim().length > 3) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          setLocation([lat, lon]); 
          setMapCenter([lat, lon]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  return (
    <div className="realtive">
      <div className="absolute m-5 z-50">
        <SearchBar onSearch={handleSearch} />
      </div>

      <MapContainer
        center={mapCenter}
        zoom={2}
        style={{ height: "92.5vh", width: "100vw", zIndex: 0 }}
        scrollWheelZoom={true}
        minZoom={2}
        maxZoom={20}
        worldCopyJump={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="w-screen h-auto"
        />

        {location && <MapFlyTo position={location} />}

        {location && (
          <Marker position={location}>
            <Popup>{`Location: ${location[0]}, ${location[1]}`}</Popup>
          </Marker>
        )}
      </MapContainer>
        {/* <div style={{ width: "100%", height: "100vh" }}></div> */}
        {/* <AutoComplete />

        <Map /> */}
    </div>
  );
};

export default MapPage;