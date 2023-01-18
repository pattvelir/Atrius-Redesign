import React from "react";
import { string, bool, arrayOf, shape } from "prop-types";
import cx from "classnames";

const propTypes = {
  type: string,
  required: bool,
  error: bool,
  name: string.isRequired,
  label: string.isRequired,
  errorMsg: string.isRequired,
  checked: bool,
  value: string,
  inputdescription: string,
  fullWidth: bool,
  autocomplete: string,
  options: arrayOf(
    shape({
      value: string,
      text: string,
      selected: bool,
    }),
  ),
  matchName: string,
  readonly: bool,
  jsClass: string,
  disabled: bool,
};

const selectInput = (props) => {
  const {
    type,
    required,
    error,
    name,
    label,
    errorMsg,
    value,
    fullWidth,
    autocomplete,
    options,
    matchName,
    readonly,
    jsClass,
    disabled,
  } = props;

  const id = parseInt(Math.random() * 1000);
  const selectClass = jsClass || "";
  const wrapperClasses = cx("select-form-item__input-wrapper", {
    "select-form-item--disabled": disabled,
  });

  return (
    <label
      className={cx("select-form-item sc-form-item sc-form-item--select", {
        "js-form-required": required,
        "sc-form-item--optional": !required,
        "sc-form-item--full-width": fullWidth,
        "has-error": error,
      })}
    >
      <span className="select-form-item__text sc-form-item__label">
        {label}
      </span>
      <div className={wrapperClasses}>
        <select
          disabled={disabled}
          data-type={type}
          name={name}
          id={`GUID-${id}`}
          aria-required={required}
          autoComplete={autocomplete}
          data-match={matchName}
          readOnly={readonly}
          data-value={value}
          className={`select-form-item__field sc-form-item__field ${selectClass}`}
        >
          {options.map((option) => {
            return (
              <option
                key={option.value}
                value={option.value}
                selected={option.selected}
              >
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
      <span role="alert" className="sc-form-item__error-msg">
        {errorMsg}
      </span>
    </label>
  );
};

selectInput.propTypes = propTypes;
export default selectInput;
