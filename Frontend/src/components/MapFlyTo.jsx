import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapFlyTo = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, {
        duration: 5,
      });
    }
  }, [position, map]);

  return null;
};

export default MapFlyTo;
