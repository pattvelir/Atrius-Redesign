import React from "react";
import { string } from "prop-types";

const propTypes = {
  href: string.isRequired,
  text: string.isRequired,
};

const SkipNavigation = (props) => {
  const { href, text } = props;

  return (
    <div className="skip-navigation__wrapper">
      <a
        href={href}
        className="skip-navigation u-visuallyhidden js-skip-navigation"
      >
        {text}
      </a>
    </div>
  );
};

SkipNavigation.propTypes = propTypes;
export default SkipNavigation;
