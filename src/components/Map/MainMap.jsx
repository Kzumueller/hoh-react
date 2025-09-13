import {Map, Marker, Popup} from "maplibre-gl";
import {use, useLayoutEffect} from "react";
import {AppContext} from "../AppContext.jsx";

import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import "../YoutubeLink/YoutubeLink.css";

import style from "./style.json";
import {useGeoJson} from "./useGeoJson.js";

/** @type Map */
let map;

export const MainMap = () => {
  const {filteredData, data, bounds} = use(AppContext);
  const geoJson = useGeoJson()

  useLayoutEffect(() => {
    map = new Map({
      container: "mapContainer", // container id
      style,
      center: [11.6, 48.3], // starting position [lng, lat]
      zoom: 8 // starting zoom
    });

    return () => map?.remove?.();
  }, []);

  /*useLayoutEffect(() => {
    const markers = [];

    // <img src="https://img.youtube.com/vi/${entry.watchId}/mqdefault.jpg" alt="thumbnail">

    filteredData.forEach(entry => {
      markers.push(new Marker()
        .setLngLat([Number(entry.lng), Number(entry.lat)])
        .setPopup(new Popup({ className: "map__popup" })
          .setHTML(`
            <iframe 
              width="480" 
              height="270" 
              src="https://www.youtube.com/embed/${entry.watchId}" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen 
            ></iframe>
            
            <div style="font-style: italic">Lat ${entry.lat}, Lng ${entry.lng}</div>
            
            <div>${entry.description}</div>
            `)
          .setMaxWidth("500px")
        )
        .addTo(map));
    });

    return () => markers.forEach(marker => marker.remove())
  }, [filteredData]);*/

  useLayoutEffect(() => {
    if(!map) return

    const listener = () => {
      map.addSource('listings', geoJson)

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'listings',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#eee',
          'circle-radius': 30,
          'circle-stroke-width': 3,
          'circle-stroke-color': "blueviolet",
        }
      });


      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'listings',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Noto Sans Regular'],
          'text-size': 15
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'listings',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': 'blueviolet',
          'circle-radius': 10,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      map.on('click', 'clusters', async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        const zoom = await map.getSource('listings').getClusterExpansionZoom(clusterId);
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom
        });
      });

      map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { lat, lng, watchId, description } = e.features[0].properties;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new Popup()
            .setLngLat(coordinates)
            .setHTML(`
            <iframe 
              width="480" 
              height="270" 
              src="https://www.youtube.com/embed/${watchId}" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen 
            ></iframe>
            
            <div style="font-style: italic">Lat ${lat}, Lng ${lng}</div>
            
            <div>${description}</div>
            `)
            .setMaxWidth('500px')
            .addTo(map);
      });


    };

    map.on('load', listener)

    return () => {
      try {
        map.off('load', listener);
        void map.removeLayer('listings')
        void map.removeLayer('cluster-count')
        void map.removeLayer('unclustered-point')
        void map.removeSource('listings')
      } catch (error) {}
    }
  }, [geoJson]);

  useLayoutEffect(() => {
    if(map)
      map.fitBounds(bounds)
  }, [bounds])

  return <div id="mapContainer"/>;
};