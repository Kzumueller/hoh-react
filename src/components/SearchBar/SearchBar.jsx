import {use} from "react";
import {AppContext} from "../AppContext.jsx";
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css"
import {useTranslation} from "react-i18next";
import {FaXmark} from "react-icons/fa6";

export const SearchBar = () => {
  const { t } = useTranslation()
  const {search, setSearch} = use(AppContext);

  return <div className="searchBar row">
    <FaSearch className="icon"/>
    <input
      className="searchBar__input"
      placeholder={t('Search ...')}
      value={search}
      onChange={({target}) => setSearch(target.value)}
    />
    <FaXmark className="icon searchBar__clear" onClick={() => setSearch("")} />
  </div>;
};