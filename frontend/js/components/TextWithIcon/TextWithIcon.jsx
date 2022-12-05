import React from "react";
import { string, oneOf, bool } from "prop-types";
import Icon from "../Icon/Icon.jsx";
import cx from "classnames";

const propTypes = {
  href: string,
  text: string,
  icon: string,
  reverse: bool,
  classNames: string,
  type: string,
  title: string,
};

const TextWithIcon = ({
  type,
  title,
  href,
  text,
  icon,
  reverse,
  classNames,
}) => {
  const TextContent = () => (
    <span
      className={cx("text-w-icon", [classNames], {
        "text-w-icon--reverse": reverse,
      })}
    >
      <span aria-hidden={title ? true : false}>{text}</span>
      <Icon
        title={title}
        iconName={icon || "arrow-right"}
        className="icon--24x24"
      />
    </span>
  );

  //if href display as link
  return href ? (
    <a
      href={href}
      target={type === "external" ? "_blank" : null}
      rel="noreferrer"
    >
      <TextContent />
    </a>
  ) : (
    <TextContent />
  );
};
TextWithIcon.propTypes = propTypes;
export default TextWithIcon;
