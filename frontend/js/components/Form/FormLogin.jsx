import React from "react";
import { object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";

const propTypes = { username: object, password: object };

const FormLogin = (props) => {
  const { username, password } = props;
  return (
    <form
      className="sc-form"
      action="../02-components-forms-registration-success/02-components-forms-registration-success.html"
      method="get"
    >
      <h2 className="sc-form__title">Sign in</h2>
      <p className="sc-form__message">
        or <a href="#3">create an account</a>
      </p>
      <TextInput {...username} />
      <TextInput {...password} />
      <div className="sc-form__button-row">
        <input type="submit" className="btn btn--primary" value="Sign in" />
      </div>
      <span className="sc-form__message">
        <a href="#d">Forgot password?</a>
      </span>
      <div className="sc-form__general-error">
        <ul>
          <li>Invalid credentials. Please try again.</li>
        </ul>
      </div>
    </form>
  );
};

FormLogin.propTypes = propTypes;
export default FormLogin;
