import React from "react";
import { node, string, bool } from "prop-types";
import cx from "classnames";
// import "./container.scss";

const propTypes = {
  children: node,
  className: string,
  backgroundColor: string,
  darkMode: bool,
};

const ContainerBleed = (props) => {
  const { children, className, backgroundColor, darkMode, ...otherProps } =
    props;

  const backgroundStyle = backgroundColor
    ? { "--c-background": backgroundColor }
    : null;
  const inlineStyle = Object.assign({}, backgroundStyle);

  return (
    <section
      {...otherProps}
      className={cx("container", "container--bleed", className, {
        "has-background": backgroundColor,
        "is-dark-mode": darkMode,
      })}
      style={inlineStyle}
    >
      {children}
    </section>
  );
};

ContainerBleed.propTypes = propTypes;
export default ContainerBleed;
