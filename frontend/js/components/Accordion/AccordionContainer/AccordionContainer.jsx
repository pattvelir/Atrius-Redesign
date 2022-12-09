import React from "react";

const AccordionContainer = (props) => {
  const { children } = props;

  return <div className="accordion-container">{children}</div>;
};

export default AccordionContainer;
