import React from "react";
import { string, bool } from "prop-types";
import cx from "classnames";

const propTypes = {
  required: bool,
  error: bool,
  name: string.isRequired,
  label: string.isRequired,
  errorMsg: string.isRequired,
  value: string,
};

const textarea = (props) => {
  const { required, error, name, label, errorMsg, value } = props;

  const id = parseInt(Math.random() * 1000);

  return (
    <label
      className={cx("sc-form-item sc-form-item--textarea", {
        "js-form-required": required,
        "sc-form-item--optional": !required,
        "has-error": error,
      })}
    >
      <span className="sc-form-item__label">{label}</span>
      <textarea
        id={`GUID-${id}`}
        aria-required={required}
        data-type="text"
        name={name}
        defaultValue={value || ""}
        className="sc-form-item__field sc-form-item__field--textarea"
      />
      <span role="alert" className="sc-form-item__error-msg">
        {errorMsg}
      </span>
    </label>
  );
};

textarea.propTypes = propTypes;
export default textarea;
