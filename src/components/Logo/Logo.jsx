import {FaArrowRight, FaEuroSign, FaExplosion, FaStore} from "react-icons/fa6";
import {memo} from "react";
import "./Logo.css";

export const Logo = memo(() => <>
  <div className="logo__container">
    <div className="row">
      <FaEuroSign className="logo"/>
      <FaArrowRight className="logo__arrow"/>
      <FaExplosion className="logo"/>
    </div>
    <div className="logo__name">
      Heroes of Hyperinflation
    </div>
  </div>
</>);