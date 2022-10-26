import React from "react";
import { object } from "prop-types";

import TextInput from "../FormItems/TextInput.jsx";
import Textarea from "../FormItems/Textarea.jsx";
import GeneralError from "../FormItems/GeneralError.jsx";

const propTypes = {
  name: object,
  email: object,
  subject: object,
  message: object,
};

const FormContact = (props) => {
  const { name, email, subject, message } = props;

  return (
    <form className="sc-form js-form" action="/APIcall" method="post">
      <h2 className="sc-form__title">Contact Us</h2>
      <TextInput {...name} />
      <TextInput {...email} />
      <TextInput {...subject} />
      <Textarea {...message} />
      <GeneralError />
      <div className="sc-form__button-row">
        <input type="submit" className="btn btn--primary" value="Submit" />
      </div>
    </form>
  );
};

FormContact.propTypes = propTypes;
export default FormContact;
