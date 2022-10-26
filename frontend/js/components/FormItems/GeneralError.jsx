import React from "react";
import {} from "prop-types";

const propTypes = {};

const generalError = (props) => {
  const {} = props;

  return (
    <div
      className="sc-form__error-msg sc-form__general-error js-form-general-error"
      role="alert"
    >
      Please try again
    </div>
  );
};

generalError.propTypes = propTypes;
export default generalError;
