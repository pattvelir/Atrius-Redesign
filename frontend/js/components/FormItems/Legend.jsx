import React from "react";
import { string } from "prop-types";
import Icon from "../Icon/Icon.jsx";

const propTypes = {
  legendTitle: string.isRequired,
  legendBody: string.isRequired,
  messageTitle: string,
  messageIcon: string,
  messageBody: string,
};

const legend = (props) => {
  const { legendTitle, legendBody, messageTitle, messageIcon, messageBody } =
    props;

  return (
    <legend className="form-legend">
      <span className="form-legend__legend-heading">{legendTitle}</span>
      <div className="form-legend__legend-description">{legendBody}</div>
      {messageTitle && (
        <div className="form-legend__legend-message">
          {messageIcon && <Icon iconName={messageIcon} />}
          <div className="form-legend__legend-message-body">
            <span className="form-legend__legend-message-title">
              {messageTitle}
            </span>{" "}
            - {messageBody}
          </div>
        </div>
      )}
    </legend>
  );
};

legend.propTypes = propTypes;
export default legend;
