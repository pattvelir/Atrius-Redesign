import React from "react";
import { node } from "prop-types";
import NavToggle from "../NavToggle/NavToggle.jsx";
// import "./mobile-menu.scss";

const propTypes = { children: node };

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu js-mobile-menu">
      <NavToggle />
      <div className="mobile-menu__drop-down js-mobile-menu-content">
        <div className="mobile-menu__inner-container">{props.children}</div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = propTypes;
export default MobileMenu;
