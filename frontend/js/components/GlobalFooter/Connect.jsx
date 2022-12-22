import React from "react";
import { string, array } from "prop-types";

import SocialLinks from "./SocialLinks.jsx";
import FormSignUpNewsletter from "../Form/FormSignUpNewsletter.jsx";
import { signUpNewsLetter } from "../Form/formData.js";

const propTypes = {
  connectStatement: string.isRequired,
  connectSocialSites: array.isRequired,
};

const connect = (props) => {
  const { connectStatement, connectSocialSites } = props;

  return (
    <div className="connect">
      <div className="connect__inner">
        <div className="connect__promo-statement">{connectStatement}</div>
        <div className="connect__social">
          <SocialLinks connectSocialSites={connectSocialSites} />
        </div>
        <div className="connect__newsletter">
          <FormSignUpNewsletter {...signUpNewsLetter} />
        </div>
      </div>
    </div>
  );
};

connect.propTypes = propTypes;
export default connect;
