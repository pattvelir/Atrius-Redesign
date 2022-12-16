import React from "react";
import {} from "prop-types";
const propTypes = {};
const navToggle = (props) => {
  const {} = props;
  return (
    <button type="button" className="nav-toggle js-nav-toggle">
      <span className="nav-toggle__label nav-toggle__label--open">Menu</span>
      <span className="nav-toggle__label nav-toggle__label--close">Close</span>
      <span className="nav-toggle__icon">
        <span></span>
      </span>
    </button>
  );
};
navToggle.propTypes = propTypes;
export default navToggle;
