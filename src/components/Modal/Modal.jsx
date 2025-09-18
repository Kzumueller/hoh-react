import {FaXmark} from "react-icons/fa6";
import "./Modal.css";

export const Modal = (
  {
    children = <></>,
    open = false,
    onCancel = () => {},
    title = "",
    footer = []
  }
) => {

  if (!open) return null;

  return <>
    <div className="modal__bg" />
    <div className="modal__container">
      <div className="modal__content">
        <div className="modal__closerRow">
          <div className="modal__closer" onClick={onCancel}>
            <FaXmark className="icon"/>
          </div>
        </div>
        {title && <div className="modal__header">{title}</div>}
        <div className="modal__body">{children}</div>
        {footer.length > 0 && <div className="modal__footer">
          {footer.map(button => button)}
        </div>}
      </div>
    </div>
  </>;
};
