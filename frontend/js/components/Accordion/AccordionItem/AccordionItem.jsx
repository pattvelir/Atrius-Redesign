import React from "react";
import propTypes from "../Accordion.propTypes.js";
import Icon from "../../Icon/Icon.jsx";

const AccordionItem = (props) => {
  const { title, type: Component, children } = props;

  return (
    <details className="accordion-item">
      <summary className="accordion-item__title">
        <Component>{title}</Component>
        <Icon
          iconName="keyboard_arrow_down"
          className="accordion-item__title__arrow"
        />
      </summary>
      <div className="accordion-item__copy">{children}</div>
    </details>
  );
};

AccordionItem.defaultProps = {
  type: "h2",
};

AccordionItem.propTypes = propTypes;
export default AccordionItem;
