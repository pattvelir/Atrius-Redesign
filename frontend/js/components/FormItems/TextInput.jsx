import React from "react";
import { string, bool, number } from "prop-types";
import cx from "classnames";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  required: bool,
  label: string,
  error: bool,
  validationType: string,
  type: string,
  autocomplete: string,
  matchName: string,
  readonly: bool,
  placeholder: string,
  name: string,
  errorMsg: string,
  helperText: string,
  fullWidth: bool,
  extraClass: string,
  maxLength: number,
  showPassword: bool,
  value: string,
};

const textInput = (props) => {
  const {
    required,
    label,
    error,
    validationType,
    type,
    autocomplete,
    matchName,
    readonly,
    placeholder,
    name,
    errorMsg,
    helperText,
    fullWidth,
    extraClass,
    maxLength,
    showPassword,
    value,
  } = props;

  const id = parseInt(Math.random() * 1000);

  const extraInputClasses = extraClass || "";

  return (
    <label
      className={cx("sc-form-item", {
        "js-form-required": required,
        "sc-form-item--optional": !required,
        "sc-form-item--full-width": fullWidth,
        "has-error": error,
      })}
    >
      <span className="sc-form-item__label">{label}</span>
      <input
        className={cx(`sc-form-item__field ${extraInputClasses}`, {
          "input-validation-error": error,
        })}
        id={`GUID-${id}`}
        data-type={validationType}
        data-max-length={maxLength}
        type={type}
        aria-required={required}
        autoComplete={autocomplete}
        data-match={matchName}
        readOnly={readonly}
        placeholder={placeholder}
        name={name}
        defaultValue={value || ""}
      />
      {showPassword && (
        <a
          href="#"
          className="sc-form-item__show-password js-show-password js-is-hidden"
          data-input-id={`GUID-${id}`}
        >
          Show password
        </a>
      )}
      <span role="alert" className="sc-form-item__error-msg">
        {errorMsg}
      </span>

      {helperText && (
        <div className="sc-form-item__helper-text">
          <Icon iconName="info-circle" />
          <span>{helperText}</span>
        </div>
      )}
    </label>
  );
};

textInput.propTypes = propTypes;
export default textInput;
