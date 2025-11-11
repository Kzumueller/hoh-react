import {useCallback, useEffect, useMemo, useState} from "react";
import {parse} from "csv-parse/browser/esm";
import {AppContext} from "./AppContext.jsx";

const csvURL = "https://www.h-o-h.net/data.csv"

const columns = [
  "location",
  "watchId",
  "unknown1",
  "unknown2",
  "lat",
  "lng",
  "description"
];

const boundsOffset = .007

export const AppContextProvider = ({children}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    const response = await fetch(csvURL, {method: "GET"});
    const csv = await response.text();

    parse(
      csv.trimEnd(),
      {delimiter: ";", bom: true, encoding: "utf-8", columns},
      (error, data) => {
        if (error) console.error(error);

        setData(data ?? []);
      });
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  /** applies search to entries' properties */
  const filteredData = useMemo(() => data
    .filter((entry) => Object.values(entry)
      .some(value => value.toLowerCase().includes(search.toLowerCase())
      )
    ), [data, search]);

  const bounds = useMemo(() => {
    if(filteredData?.length === 0) return [[0, 0], [0, 0]]

    let maxLat = -90;
    let minLat = 90;
    let maxLng = -180;
    let minLng = 180;

    for(const entry of filteredData) {
      minLat = Math.min(entry.lat, minLat)
      minLng = Math.min(entry.lng, minLng)
      maxLat = Math.max(entry.lat, maxLat)
      maxLng = Math.max(entry.lng, maxLng)

    }

    return [[minLng - boundsOffset, minLat - boundsOffset], [maxLng + boundsOffset, maxLat + boundsOffset]]
  }, [filteredData]);

  const value = useMemo(() => ({
    data,
    filteredData,
    bounds,
    search,
    setSearch
  }), [data, filteredData, bounds, search]);

  return <AppContext value={value}>{children}</AppContext>;
};