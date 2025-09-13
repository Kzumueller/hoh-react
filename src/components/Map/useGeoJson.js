import {use, useMemo} from "react";
import {AppContext} from "../AppContext.jsx";

export const useGeoJson = () => {
    const {data} = use(AppContext);

    return useMemo(() => ({
        type: 'geojson',
        data: {
            type: "FeatureCollection",
            features: data.map(entry => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [entry.lng, entry.lat]
                },
                properties: entry
            }))
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
    }), [data])
}