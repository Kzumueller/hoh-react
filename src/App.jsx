import "./App.css";
import {AppContextProvider} from "./components/AppContextProvider.jsx";
import {Logo} from "./components/Logo/Logo.jsx";
import {SearchBar} from "./components/SearchBar/SearchBar.jsx";
import {MainMap} from "./components/Map/MainMap.jsx";
import {HelpSection} from "./components/HelpSection/HelpSection.jsx";

export const App = () =>
  <AppContextProvider>
    <div className="row row--headerBar">
      <Logo/>
      <HelpSection/>
    </div>
    <div className="row">
        <SearchBar/>
    </div>
    <MainMap />
  </AppContextProvider>;
