import React from "react";
import ReactDOM from "react-dom";
import TextIcon from "./TextIcon.jsx";
/* eslint react/jsx-filename-extension: 0 */

export default function renderTextIcon() {
  const textIcons = [...document.querySelectorAll(".js-text-icon-mount")];
  if (textIcons.length > 0) {
    textIcons.forEach((mount) => {
      const props = mount.dataset;
      ReactDOM.render(<TextIcon {...props} />, mount);
    });
  } else {
    return false;
  }
}
