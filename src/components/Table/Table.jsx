import {use, useMemo} from "react";
import {AppContext} from "../AppContext.jsx";
import "./Table.css";
import {YoutubeLink} from "../YoutubeLink/YoutubeLink.jsx";
import {useTranslation} from "react-i18next";

export const Table = () => {
  const { t } = useTranslation();
  const appContext = use(AppContext);

  const data = useMemo(
    () => appContext
      .data
      .filter((entry) => Object.values(entry)
        .some(value => value.toLowerCase().includes(appContext.search.toLowerCase())
        )
      ),
    [appContext.data, appContext.search]
  )

  return <table className="table">
    <thead>
    <tr className="table__header">
      <th>{t("Location")}</th>
      <th>YouTube</th>
      <th>Lat</th>
      <th>lng</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody style={{maxHeight: 500, overflow: "scroll"}}>
    {data.map(entry => <tr>
      <td className="table__cell">{entry.location}</td>
      <td className="table__cell"><YoutubeLink watchId={entry.watchId}></YoutubeLink></td>
      <td className="table__cell">{entry.lat}</td>
      <td className="table__cell">{entry.lng}</td>
      <td className="table__cell">{entry.description}</td>
    </tr>)}
    </tbody>
  </table>;
};