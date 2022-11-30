import React from "react";
import ReactDOM from "react-dom";
import Accordion from "./Accordion.jsx";
/* eslint react/jsx-filename-extension: 0 */

export default function renderAccordion() {
  const accordions = [...document.querySelectorAll(".js-accordion-mount")];
  if (accordions.length > 0) {
    accordions.forEach((mount) => {
      const props = mount.dataset;
      ReactDOM.render(<Accordion {...props} />, mount);
    });
  } else {
    return false;
  }
}
