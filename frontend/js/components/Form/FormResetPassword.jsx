import React from "react";
import { object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";

const propTypes = { password: object, passwordMatch: object };

const FormResetPassword = (props) => {
  const { password, passwordMatch } = props;

  return (
    <form
      className="sc-form"
      action="../02-components-form-reset-password-reset-password-success/02-components-form-reset-password-reset-password-success.html"
      method="get"
    >
      <h2 className="sc-form__title">Reset Password</h2>
      <TextInput {...password} />
      <TextInput {...passwordMatch} />
      <div className="sc-form__button-row">
        <input
          type="submit"
          className="btn btn--primary"
          value="Reset Password"
        />
      </div>
    </form>
  );
};

FormResetPassword.propTypes = propTypes;
export default FormResetPassword;
