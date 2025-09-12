import {Map, Marker, Popup} from "maplibre-gl";
import {use, useLayoutEffect} from "react";
import {AppContext} from "../AppContext.jsx";

import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import "../YoutubeLink/YoutubeLink.css";

import style from "./style.json";

/** @type Map */
let map;

export const MainMap = () => {
  const {filteredData, bounds} = use(AppContext);

  useLayoutEffect(() => {
    map = new Map({
      container: "mapContainer", // container id
      style,
      center: [11.6, 48.3], // starting position [lng, lat]
      zoom: 8 // starting zoom
    });

    map.on('zoom', () => console.log(map.getZoom(), map.getCenter()))

    return () => map?.remove?.();
  }, []);

  useLayoutEffect(() => {
    const markers = [];

    filteredData.forEach(entry => {
      markers.push(new Marker()
        .setLngLat([Number(entry.lng), Number(entry.lat)])
        .setPopup(new Popup({ className: "map__popup" })
          .setHTML(`
            <div>${entry.lat} / ${entry.lng}</div>
            <a href="https://youtube.com/watch?v=${entry.watchId}" target="_blank" class="youtube">Video</a>
            <div>${entry.description}</div>
            `)
          .setMaxWidth("300px")
        )
        .addTo(map));
    });

    return () => markers.forEach(marker => marker.remove())
  }, [filteredData]);

  useLayoutEffect(() => {
    map.fitBounds(bounds)
  }, [bounds])

  return <div id="mapContainer"/>;
};