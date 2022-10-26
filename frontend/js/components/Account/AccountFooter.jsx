import React from "react";
import AccountButtons from "./AccountButtons.jsx";

const propTypes = {};

const accountFooter = (props) => {
  const {} = props;

  return (
    <div className="account-footer">
      <AccountButtons />
    </div>
  );
};

accountFooter.propTypes = propTypes;
export default accountFooter;
