import React from "react";
import { node } from "prop-types";
import NavToggle from "../NavToggle/NavToggle.jsx";
import Button from "../Button/Button.jsx";

const propTypes = { children: node };

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu js-mobile-menu">
      <div className="mobile-menu__controls">
        <div>
          <Button
            btnType="link"
            btnColor="light"
            iconLeft="left-arrow"
            as="button"
            className="mobile-menu__back"
          >
            Menu
          </Button>
        </div>
        <div>
          <NavToggle />
        </div>
      </div>
      <div className="mobile-menu__drop-down js-mobile-menu-content">
        <div className="mobile-menu__inner-container">{props.children}</div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = propTypes;
export default MobileMenu;
