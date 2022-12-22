import React from "react";
import { object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";

const propTypes = { email: object };

const FormSignUpNewsletter = (props) => {
  const { email } = props;
  return (
    <form className="sc-form" action="" method="get">
      <p className="sc-form__message">
        Sign up for our monthly Healthy Matters e-newsletter.
      </p>
      <TextInput {...email} />
      <div className="sc-form__button-row">
        <input
          type="submit"
          className="btn btn--filled btn--dark"
          value="Sign Up"
        />
      </div>
    </form>
  );
};

FormSignUpNewsletter.propTypes = propTypes;
export default FormSignUpNewsletter;
