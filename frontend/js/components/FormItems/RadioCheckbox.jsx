import React from "react";
import { string, bool } from "prop-types";
import cx from "classnames";

const propTypes = {
  type: string,
  required: bool,
  error: bool,
  name: string.isRequired,
  label: string.isRequired,
  errorMsg: string,
  checked: bool,
  inputdescription: string,
  side: string,
  toggle: bool,
};

const radioCheckbox = (props) => {
  const {
    type,
    required,
    error,
    name,
    label,
    errorMsg,
    checked,
    inputdescription,
    side,
    size,
    toggle,
  } = props;

  const id = parseInt(Math.random() * 1000);

  return (
    <label
      className={cx(
        `sc-form-item sc-form-item--${type}`,
        `sc-form-item--${side}`,
        {
          "js-form-required": required,
          "sc-form-item--optional": !required,
          "has-error": error,
          "sc-form-item--small": size === "small",
          "sc-form-item--toggle": toggle,
        },
      )}
    >
      <input
        type={type}
        id={`GUID-${id}`}
        aria-required={required}
        // checked={checked}
        name={name}
        className="sc-form-item__field"
      />
      <div className="sc-form-item__label">{label}</div>
      {inputdescription && (
        <div
          className="sc-form-item__opt-description"
          dangerouslySetInnerHTML={{ __html: inputdescription }}
        ></div>
      )}
      <span role="alert" className="sc-form-item__error-msg">
        {errorMsg}
      </span>
    </label>
  );
};

radioCheckbox.defaultProps = {
  side: "left",
};

radioCheckbox.propTypes = propTypes;
export default radioCheckbox;
