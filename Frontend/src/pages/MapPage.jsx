import React, { useState } from "react";
import MapFlyTo from "../components/MapFlyTo";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "../components/Searchbar";
import Map from "../components/Map";
import AutoComplete from "../components/AutoComplete";

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 0]);

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
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <div className="absolute top-20 left-4 right-4 sm:top-24 sm:left-5 sm:right-auto z-[1000] max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>

      <MapContainer
        center={mapCenter}
        zoom={3}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        scrollWheelZoom={true}
        minZoom={2}
        maxZoom={19}
        worldCopyJump={true}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <ZoomControl position="bottomright" />

        {location && <MapFlyTo position={location} />}

        {location && (
          <Marker position={location}>
            <Popup>{`Location: ${location[0]}, ${location[1]}`}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
