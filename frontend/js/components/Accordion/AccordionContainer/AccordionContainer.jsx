import React from "react";
import cn from "classnames";
import propTypes from "./AccordionContainer.propTypes.js";

const AccordionContainer = (props) => {
  const { children, section } = props;
  const sectionClass = section !== "" ? `accordion-container--${section}` : "";
  const classNames = cn("accordion-container", sectionClass);

  return <div className={classNames}>{children}</div>;
};

AccordionContainer.propTypes = propTypes;
export default AccordionContainer;
