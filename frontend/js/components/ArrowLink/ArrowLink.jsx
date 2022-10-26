import React from "react";
import { string, oneOf } from "prop-types";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  href: string.isRequired,
  type: oneOf(["", "external", "download", "anchor", "jump"]),
  text: string,
};

const ArrowLink = (props) => {
  const { href, type, text } = props;

  const classModifier = type ? `arrow-link--${type}` : "";

  return (
    <a
      href={href}
      className={`arrow-link ${classModifier}`}
      target={type === "external" ? "_blank" : null}
    >
      <span>{text}</span>
      <Icon iconName="arrow-right" />
    </a>
  );
};
ArrowLink.propTypes = propTypes;
export default ArrowLink;
