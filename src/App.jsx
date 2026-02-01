import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const mapRef = useRef(); // map instance (lifecycle)
  const mapContainerRef = useRef(); // containers html el to create the map
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-60.17795, -6.82434],
      zoom: 5,
      style: "mapbox://styles/mapbox/satellite-v9",
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default App;
