import React from "react";
import {} from "prop-types";

const propTypes = {};

const copyright = (props) => {
  const {} = props;

  const currentYear = new Date().getFullYear();
  const copyrightStatement = "Company Name. All rights reserved.";

  return (
    <div className="copyright">
      <span className="copyright__symbol">&copy;</span>
      <span className="copyright__notice">
        {currentYear} {copyrightStatement}
      </span>
    </div>
  );
};

copyright.propTypes = propTypes;
export default copyright;
