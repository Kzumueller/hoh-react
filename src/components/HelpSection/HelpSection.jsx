import {FaQuestionCircle} from "react-icons/fa";
import "./HelpSection.css";
import {useMemo, useState} from "react";
import {Modal} from "../Modal/Modal.jsx";
import {useTranslation} from "react-i18next";

export const HelpSection = () => {
  const { t } = useTranslation()
  const [helpModalOpen, setHelpModalOpen] = useState(false)

  /** @type number */
  const iframeWidth = useMemo(() => window.screen.availWidth * .5, [])
  /** @type number */
  const iframeHeight = useMemo(() => (iframeWidth / 16) * 9, [iframeWidth])

  return <>
    <Modal
      open={helpModalOpen}
      title={t("About this marketplace")}
      onCancel={() => setHelpModalOpen(false)}
    >
      <div>{t("hoh_description")}</div>

      <a href="https://heroes-of-hyperinflation.net/" target="_blank">https://heroes-of-hyperinflation.net/</a>

      <iframe
        width={iframeWidth}
        height={iframeHeight}
        src="https://www.youtube.com/embed/CHiUGQM04hw"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Modal>

    <div className="row">
      <FaQuestionCircle className="icon helpSection__icon" onClick={() => setHelpModalOpen(true)}/>
    </div>
  </>;
};
