import React from "react";
import { string, bool } from "prop-types";
import cx from "classnames";

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
};

const fileInput = (props) => {
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
  } = props;
  const id = parseInt(Math.random() * 1000);

  return (
    <>
      <img
        className="sc-form-item__profile-image js-image-preview"
        src="//via.placeholder.com/300x300"
        alt=""
      />

      <label
        className={cx("sc-form-item", {
          "js-form-required": required,
          "sc-form-item--optional": !required,
          "has-error": error,
        })}
      >
        <span className="sc-form-item__label">{label}</span>
        <input
          className={cx(
            "sc-form-item__field js-image-upload sc-form-item__field--",
            {
              "input-validation-error": error,
            },
          )}
          id={`GUID-${id}`}
          data-type={validationType}
          type={type}
          aria-required={required}
          autoComplete={autocomplete}
          data-match={matchName}
          readOnly={readonly}
          placeholder={placeholder}
          name={name}
        />

        <span role="alert" className="sc-form-item__error-msg">
          {errorMsg}
        </span>

        {helperText && (
          <div className="sc-form-item__helper-text">
            <span>{helperText}</span>
          </div>
        )}
      </label>
    </>
  );
};

fileInput.propTypes = propTypes;
export default fileInput;
