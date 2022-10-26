import React from "react";
import { object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";

const propTypes = { email: object };

const FormForgotPassword = (props) => {
  const { email } = props;
  return (
    <form
      className="sc-form"
      action="../02-components-form-forgot-password-forgot-password-success/02-components-form-forgot-password-forgot-password-success.html"
      method="get"
    >
      <h2 className="sc-form__title">Forgot Password</h2>
      <TextInput {...email} />
      <div className="sc-form__button-row">
        <input
          type="submit"
          className="btn btn--primary"
          value="Request Reset Link"
        />
      </div>
    </form>
  );
};

FormForgotPassword.propTypes = propTypes;
export default FormForgotPassword;
