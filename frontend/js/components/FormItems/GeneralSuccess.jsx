import React from "react";
import {} from "prop-types";

const propTypes = {};

const generalSuccess = (props) => {
  const {} = props;

  return (
    <div
      className="sc-form__general-success js-form-general-success"
      role="alert"
    >
      Your changes have been made
    </div>
  );
};

generalSuccess.propTypes = propTypes;
export default generalSuccess;
