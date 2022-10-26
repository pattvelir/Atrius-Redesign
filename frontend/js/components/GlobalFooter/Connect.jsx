import React from "react";
import { string, array } from "prop-types";

import Button from "../Button/Button.jsx";
import SocialLinks from "./SocialLinks.jsx";

const propTypes = {
  connectStatement: string.isRequired,
  connectTapPhone: string.isRequired,
  connectPhone: string,
  connectSocialSites: array.isRequired,
};

const connect = (props) => {
  const {
    connectStatement,
    connectTapPhone,
    connectPhone,
    connectSocialSites,
  } = props;

  return (
    <div className="connect">
      <div className="connect__inner">
        <div className="connect__promo-statement">{connectStatement}</div>
        <div className="connect__contact">
          <div className="connect__button">
            <Button btnType="primary" btnText="Contact Us" />
          </div>
          <div className="connect__phone">
            {connectTapPhone ? (
              <a href={`tel:${connectTapPhone}`}>{connectPhone}</a>
            ) : (
              <span>{connectPhone}</span>
            )}
          </div>
        </div>
        <div className="connect__social">
          <SocialLinks connectSocialSites={connectSocialSites} />
        </div>
      </div>
    </div>
  );
};

connect.propTypes = propTypes;
export default connect;
