import React from "react";
import { string } from "prop-types";
import cx from "classnames";

const propTypes = {
  iconName: string,
  className: string,
  title: string,
};

const Icon = (props) => {
  const { iconName, className, title, ...otherProps } = props;

  return (
    <svg
      tabIndex="-1"
      className={cx("icon", `icon--${iconName}`, className)}
      aria-label={title}
      {...otherProps}
      aria-hidden={title ? null : true}
    >
      <use
        xlinkHref={`${
          window.assetsFolder || ""
        }/img/svg-sprite.svg#${iconName}`}
      ></use>
    </svg>
  );
};

Icon.propTypes = propTypes;
export default Icon;
