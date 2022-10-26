import React from "react";
import { string, bool } from "prop-types";

import AccountButtons from "./AccountButtons.jsx";
import ProfileButtons from "./ProfileButtons.jsx";

const propTypes = {
  title: string.isRequired,
  subtitle: string,
  isProfile: bool,
};

const defaultProps = {
  isProfile: false,
};

const accountHeader = (props) => {
  const { title, subtitle, isProfile } = props;

  return (
    <div className="account-header">
      <div className="account-header__titles">
        <h1 className="account-header__title subheader1">{title}</h1>
        {subtitle && (
          <span className="account-header__subtitle">{subtitle}</span>
        )}
      </div>
      {isProfile ? <ProfileButtons /> : <AccountButtons />}
    </div>
  );
};

accountHeader.propTypes = propTypes;
accountHeader.defaultProps = defaultProps;
export default accountHeader;
