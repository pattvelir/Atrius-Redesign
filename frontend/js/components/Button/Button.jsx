import React from "react";
import { string } from "prop-types";
import cx from "classnames";

const propTypes = {
  btnText: string,
  btnType: string,
};

const Button = (props) => {
  const { btnText, btnType } = props;

  return (
    <a
      className={cx("btn", {
        "btn--primary": btnType === "primary",
        "btn--secondary": btnType === "secondary",
        "btn--ghost": btnType === "ghost",
        "btn--disabled": btnType === "disabled",
        "btn--link": btnType === "link",
      })}
      href="#"
      title={btnText || "Button Text"}
      aria-disabled={btnType === "disabled"}
    >
      {btnText || "Button Text"}
    </a>
  );
};

Button.propTypes = propTypes;
export default Button;
