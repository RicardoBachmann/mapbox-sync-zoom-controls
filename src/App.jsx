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

  const [activeLayerA, setActiveLayerA] = useState(true);
  const [activeLayerB, setActiveLayerB] = useState(true);
  const [activeLayerC, setActiveLayerC] = useState(true);
  const [activeLayerD, setActiveLayerD] = useState(true);

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
      attributionControl: false,
    });
    mapRefB.current = new mapboxgl.Map({
      container: mapContainerRefB.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
      attributionControl: false,
    });
    mapRefC.current = new mapboxgl.Map({
      container: mapContainerRefC.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
      attributionControl: false,
    });
    mapRefD.current = new mapboxgl.Map({
      container: mapContainerRefD.current,
      center: initialCenter,
      zoom: initialZoom,
      style: "mapbox://styles/mapbox/satellite-v9",
      attributionControl: false,
    });

    const setupMaps = () => {
      console.log("All maps loaded - setting up to sync");
      syncMaps(
        mapRefA.current,
        mapRefB.current,
        mapRefC.current,
        mapRefD.current,
      );
    };

    let mapsLoaded = 0;
    const checkAllMapsLoaded = () => {
      mapsLoaded++;
      console.log(`Map ${mapsLoaded}/4 loaded`);
      if (mapsLoaded === 4) {
        setupMaps();
      }
    };

    mapRefA.current.on("load", () => {
      // Source: GeoJSON Placeholder A
      mapRefA.current.addSource("level0-text-source", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: initialCenter,
          },
          properties: {
            text: "LEVEL 0 - OVERVIEW",
          },
        },
      });

      // Layer: placeholder A
      mapRefA.current.addLayer({
        id: "level0-text-layer",
        type: "symbol",
        source: "level0-text-source",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 24,
          visibility: "visible", // initial visible
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      checkAllMapsLoaded();
    });

    mapRefB.current.on("load", () => {
      // Source: GeoJSON Placeholder B
      mapRefB.current.addSource("level1-text-source", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: initialCenter,
          },
          properties: {
            text: "LEVEL 1 - OVERVIEW",
          },
        },
      });

      // Layer: placeholder B
      mapRefB.current.addLayer({
        id: "level1-text-layer",
        type: "symbol",
        source: "level1-text-source",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 24,
          visibility: "visible", // initial visible
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      checkAllMapsLoaded();
    });

    mapRefC.current.on("load", () => {
      // Source: GeoJSON Placeholder C
      mapRefC.current.addSource("level2-text-source", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: initialCenter,
          },
          properties: {
            text: "LEVEL 2 - OVERVIEW",
          },
        },
      });

      // Layer: placeholder C
      mapRefC.current.addLayer({
        id: "level2-text-layer",
        type: "symbol",
        source: "level2-text-source",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 24,
          visibility: "visible", // initial visible
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      checkAllMapsLoaded();
    });

    mapRefD.current.on("load", () => {
      // Source: GeoJSON Placeholder D
      mapRefD.current.addSource("level3-text-source", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: initialCenter,
          },
          properties: {
            text: "LEVEL 3 - OVERVIEW",
          },
        },
      });

      // Layer: placeholder C
      mapRefD.current.addLayer({
        id: "level3-text-layer",
        type: "symbol",
        source: "level3-text-source",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 24,
          visibility: "visible", // initial visible
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      checkAllMapsLoaded();
    });

    mapRefA.current.on("load", checkAllMapsLoaded);
    mapRefB.current.on("load", checkAllMapsLoaded);
    mapRefC.current.on("load", checkAllMapsLoaded);
    mapRefD.current.on("load", checkAllMapsLoaded);

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

  useEffect(() => {
    if (!mapRefA.current) return;
    if (!mapRefA.current.isStyleLoaded()) return;

    if (activeLayerA) {
      mapRefA.current.setLayoutProperty(
        "level0-text-layer",
        "visibility",
        "visible",
      );
    } else {
      mapRefA.current.setLayoutProperty(
        "level0-text-layer",
        "visibility",
        "none",
      );
    }
  }, [activeLayerA]);

  useEffect(() => {
    if (!mapRefB.current) return;
    if (!mapRefB.current.isStyleLoaded()) return;
    if (activeLayerB) {
      mapRefB.current.setLayoutProperty(
        "level1-text-layer",
        "visibility",
        "visible",
      );
    } else {
      mapRefB.current.setLayoutProperty(
        "level1-text-layer",
        "visibility",
        "none",
      );
    }
  }, [activeLayerB]);

  useEffect(() => {
    if (!mapRefC.current) return;
    if (!mapRefC.current.isStyleLoaded()) return;

    if (activeLayerC) {
      mapRefC.current.setLayoutProperty(
        "level2-text-layer",
        "visibility",
        "visible",
      );
    } else {
      mapRefC.current.setLayoutProperty(
        "level2-text-layer",
        "visibility",
        "none",
      );
    }
  }, [activeLayerC]);

  useEffect(() => {
    if (!mapRefD.current) return;
    if (!mapRefD.current.isStyleLoaded()) return;

    if (activeLayerD) {
      mapRefD.current.setLayoutProperty(
        "level3-text-layer",
        "visibility",
        "visible",
      );
    } else {
      mapRefD.current.setLayoutProperty(
        "level3-text-layer",
        "visibility",
        "none",
      );
    }
  }, [activeLayerD]);

  return (
    <>
      <div>
        <button onClick={() => setActiveLayerA(!activeLayerA)}>Level 0</button>
        <button onClick={() => setActiveLayerB(!activeLayerB)}>Level 1</button>
        <button onClick={() => setActiveLayerC(!activeLayerC)}>Level 2</button>
        <button onClick={() => setActiveLayerD(!activeLayerD)}>Level3</button>
      </div>
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
