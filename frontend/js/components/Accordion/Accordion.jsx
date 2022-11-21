import React from 'react';
/* PLOP_INJECT_STYLES */
import "./Accordion.scss";
/* PLOP_INJECT_PROPTYPES */
import propTypes from "./Accordion.propTypes.js";

const Accordion = (props) => {
  const {} = props;

  return (
    <div className="container accordion">Accordion Template</div>
  );
};

Accordion.propTypes = propTypes;
export default Accordion;