import React from "react";
import { string, object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";

const propTypes = {
  formTitle: string,
  first: object,
  last: object,
  email: object,
  password: object,
  passwordMatch: object,
};

const FormRegistration = (props) => {
  const { formTitle, first, last, email, password, passwordMatch } = props;

  return (
    <form
      className="sc-form"
      action="../02-components-form-registration-registration-success/02-components-form-registration-registration-success.html"
      method="get"
    >
      {formTitle && <h2 className="sc-form__title">{formTitle}</h2>}
      <TextInput {...first} />
      <TextInput {...last} />
      <TextInput {...email} />
      <TextInput {...password} />
      <TextInput {...passwordMatch} />

      <div className="sc-form__button-row">
        <input type="submit" className="btn btn--primary" value="Join" />
      </div>
    </form>
  );
};

FormRegistration.propTypes = propTypes;
export default FormRegistration;
