import React from "react";
import { string } from "prop-types";
import cx from "classnames";
import Icon from "../Icon/Icon.jsx";

const propTypes = {
  btnText: string,
  btnType: string,
};

const Button = (props) => {
  const {
    children,
    btnType,
    btnColor,
    size,
    icon,
    iconLeft,
    iconRight,
    as: Component,
    ...rest
  } = props;

  return (
    <Component
      className={cx("btn", {
        "btn--filled": btnType === "filled",
        "btn--outline": btnType === "outline",
        "btn--disabled": btnType === "disabled",
        "btn--link": btnType === "link",
        "btn--dark": btnColor === "dark",
        "btn--light": btnColor === "light",
        "btn--xsm": size === "xsm",
        "btn--small": size === "sm",
        "btn--search": size === "search",
        "btn--icon": icon,
      })}
      title={children}
      aria-disabled={btnType === "disabled"}
      {...rest}
    >
      {iconLeft && <Icon iconName={iconLeft} />}
      <span className="btn__label">{children}</span>
      {iconRight && <Icon iconName={iconRight} />}
    </Component>
  );
};

Button.defaultProps = {
  as: "a",
  href: "/",
};

Button.propTypes = propTypes;
export default Button;
