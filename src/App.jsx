import "./App.css";
import {AppContextProvider} from "./components/AppContextProvider.jsx";
import {Logo} from "./components/Logo/Logo.jsx";
import {Table} from "./components/Table/Table.jsx";
import {SearchBar} from "./components/SearchBar/SearchBar.jsx";
import {MainMap} from "./components/Map/MainMap.jsx";

export const App = () =>
  <AppContextProvider>
    <Logo/>
    <SearchBar/>
    <MainMap />
    {/*<Table/>*/}
  </AppContextProvider>;
