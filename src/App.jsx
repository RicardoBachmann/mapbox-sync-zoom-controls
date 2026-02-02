import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import syncMaps from "@mapbox/mapbox-gl-sync-move";
import "mapbox-gl/dist/mapbox-gl.css";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const mapRefA = useRef(); // map instance (lifecycle)
  const mapRefB = useRef();
  const mapRefC = useRef();
  const mapRefD = useRef();
  const mapContainerRefA = useRef(); // containers html el to create the map
  const mapContainerRefB = useRef();
  const mapContainerRefC = useRef();
  const mapContainerRefD = useRef();
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const initialCenter = [-60.17795, -6.82434];
  const initialZoom = 5;
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRefA.current = new mapboxgl.Map({
      container: mapContainerRefA.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
    });
    mapRefB.current = new mapboxgl.Map({
      container: mapContainerRefB.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
    });
    mapRefC.current = new mapboxgl.Map({
      container: mapContainerRefC.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
    });
    mapRefD.current = new mapboxgl.Map({
      container: mapContainerRefD.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
    });

    mapRefA.current.on("move", () => {
      const mapZoom = mapRefA.current.getZoom();

      setZoom(mapZoom);
    });

    return () => {
      mapRefA.current.remove();
      mapRefB.current.remove();
      mapRefC.current.remove();
      mapRefD.current.remove();
    };
  }, []);

  return (
    <>
      <div id="zoom-bar"> Zoom:{zoom.toFixed(2)}</div>
      <div className="map-container">
        <div id="map-a" ref={mapContainerRefA}></div>
        <div id="map-b" ref={mapContainerRefB}></div>
        <div id="map-c" ref={mapContainerRefC}></div>
        <div id="map-d" ref={mapContainerRefD}></div>
      </div>
    </>
  );
}

export default App;
