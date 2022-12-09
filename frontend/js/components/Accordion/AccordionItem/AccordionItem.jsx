import React from "react";
import propTypes from "../Accordion.propTypes.js";
import Icon from "../../Icon/Icon.jsx";

const AccordionItem = (props) => {
  const { title, type, children } = props;

  return (
    <details className="accordion-item">
      <summary className="accordion-item__title">
        {type == "h2" ? <h2>{title}</h2> : <h4>{title}</h4>}

        <Icon
          iconName="keyboard_arrow_down"
          className="accordion-item__title__arrow"
        />
      </summary>
      <div className="accordion-item__copy">{children}</div>
    </details>
  );
};

AccordionItem.propTypes = propTypes;
export default AccordionItem;
