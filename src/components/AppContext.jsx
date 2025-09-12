import {createContext} from "react";

export const Entry = {
  location: "",
  watchId: "",
  unknown1: "",
  unknown2: "",
  lat: "",
  lng: "",
  description: ""
};

export const AppContext = createContext({
  /** @type [Entry] */
  data: [],
  /** @type [Entry] */
  filteredData: [],
  bounds: [[0, 0], [0, 0]],
  search: "",
  setSearch: (search = "") => search && undefined
});