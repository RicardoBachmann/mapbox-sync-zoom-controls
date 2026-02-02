import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const mapRef = useRef(); // map instance (lifecycle)
  const mapContainerRef = useRef(); // containers html el to create the map
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const initialCenter = [-60.17795, -6.82434];
  const initialZoom = 5;
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
    });

    mapRef.current.on("move", () => {
      const mapZoom = mapRef.current.getZoom();

      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="zoom-bar"> Zoom:{zoom.toFixed(2)}</div>
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default App;
