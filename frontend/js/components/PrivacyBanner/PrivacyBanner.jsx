import React from "react";
import { string } from "prop-types";
// import "./privacy-banner.scss";
const propTypes = {
  policyDescription: string.isRequired,
  buttonText: string.isRequired,
};

const PrivacyBanner = (props) => {
  const { policyDescription, buttonText } = props;

  return (
    <div className="privacy-banner js-privacy-banner is-hidden">
      <div className="privacy-modal__content">
        <div
          className="privacy-modal__rte rich-text"
          dangerouslySetInnerHTML={{ __html: policyDescription }}
        />
        <button className="btn btn--primary btn--hover-light privacy-banner__accept js-accept-cookies">
          {buttonText}
        </button>
        <button className="btn btn--close privacy-banner__close js-close-banner">
          <span className="u-visuallyhidden">close</span>
        </button>
      </div>
    </div>
  );
};

PrivacyBanner.propTypes = propTypes;
export default PrivacyBanner;
