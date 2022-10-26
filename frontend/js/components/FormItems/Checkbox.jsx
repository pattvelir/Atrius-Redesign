import React, { useState } from "react";
import { string, bool, func } from "prop-types";
import cx from "classnames";

const propTypes = {
  required: bool,
  error: bool,
  name: string.isRequired,
  label: string.isRequired,
  errorMsg: string,
  onChange: func,
  checked: bool,
};

const Checkbox = (props) => {
  const [id] = useState(`${parseInt(Math.random() * 1000)}`);
  const {
    required,
    error,
    name,
    label,
    errorMsg,
    onChange,
    checked = false,
  } = props;

  return (
    <React.Fragment>
      <label
        htmlFor={`GUID-${id}`}
        className={cx("sc-form-item sc-form-item--checkbox", {
          "js-form-required": required,
          "sc-form-item--optional": !required,
          "has-error": error,
        })}
      >
        <input
          type="checkbox"
          id={`GUID-${id}`}
          aria-required={required}
          name={name}
          onChange={onChange}
          className="sc-form-item__field"
          checked={checked}
        />
        <div className="sc-form-item__label">{label}</div>
        <span role="alert" className="sc-form-item__error-msg">
          {errorMsg}
        </span>
      </label>
    </React.Fragment>
  );
};

Checkbox.propTypes = propTypes;
export default Checkbox;
