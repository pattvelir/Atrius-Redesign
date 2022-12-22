import React from "react";
import {
  contactFormData,
  contactErrorData,
  formForgotPasswordData,
  forgotPasswordErrorData,
  loginData,
  registrationData,
  resetPasswordData,
  signUpNewsLetter,
} from "./formData.js";
import FormContact from "./FormContact.jsx";
import FormForgotPassword from "./FormForgotPassword.jsx";
import FormLogin from "./FormLogin.jsx";
import FormRegistration from "./FormRegistration.jsx";
import FormResetPassword from "./FormResetPassword.jsx";
import FormSignUpNewsletter from "./FormSignUpNewsletter.jsx";

export default {
  title: "Components/Forms",
};

export const contact = () => (
  <React.Fragment>
    <p style={{ textDecoration: "underline" }}>Contact Form</p>
    <FormContact {...contactFormData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Contact Form Error
    </p>
    <FormContact {...contactErrorData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Contact Form Success
    </p>
    <form className="sc-form" action="#" method="post">
      <p className="sc-form__success-message rich-text is-visible">
        Thank you for contacting us. We'll get back to you shortly!
      </p>
    </form>
  </React.Fragment>
);

export const forgotPassword = () => (
  <React.Fragment>
    <p style={{ textDecoration: "underline" }}>Forgot Password</p>
    <FormForgotPassword {...formForgotPasswordData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Forgot Password Error
    </p>
    <FormForgotPassword {...forgotPasswordErrorData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Forgot Password Success
    </p>
    <form className="sc-form" action="#" method="post">
      <p className="sc-form__success-message rich-text is-visible">
        Your request was received but we need to make sure it's you. Please
        check your email for a link to the password reset page.
      </p>
    </form>
  </React.Fragment>
);

export const login = () => <FormLogin {...loginData} />;

export const registration = () => (
  <React.Fragment>
    <p style={{ textDecoration: "underline" }}>Registration</p>
    <FormRegistration {...registrationData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Registration Success
    </p>
    <form className="sc-form" action="#" method="post">
      <p className="sc-form__success-message rich-text is-visible">
        Thank you for signing up! An email has been sent to the address you
        provided with a link to confirm your registration. Once confirmed you
        will be able to log in with your new account.
      </p>
    </form>
  </React.Fragment>
);

export const passwordReset = () => (
  <React.Fragment>
    <p style={{ textDecoration: "underline" }}>Password Reset</p>
    <FormResetPassword {...resetPasswordData} />

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Password Reset Success
    </p>
    <form className="sc-form" action="#" method="post">
      <p className="sc-form__success-message rich-text is-visible">
        Success! Your password has been reset. Please <a href="#3">login</a>.
      </p>
    </form>
  </React.Fragment>
);

export const newsLetterSignUp = () => (
  <FormSignUpNewsletter {...signUpNewsLetter} />
);
