import React from "react";
import { string } from "prop-types";

const propTypes = { text: string };

const LoadingSpinner = (props) => {
  const { text } = props;

  return (
    <div className="loading-spinner" role="alert">
      <span>{text || "Loading Results"}</span>
    </div>
  );
};

LoadingSpinner.propTypes = propTypes;
export default LoadingSpinner;
