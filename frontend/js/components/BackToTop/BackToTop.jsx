import React from "react";
import {} from "prop-types";

const propTypes = {};

const backToTop = (props) => {
  const {} = props;

  return (
    <button className="button-back-to-top js-back-to-top" type="button">
      <span className="chevron"></span>
      <span className="u-visuallyhidden">Back to top</span>
    </button>
  );
};

backToTop.propTypes = propTypes;
export default backToTop;
