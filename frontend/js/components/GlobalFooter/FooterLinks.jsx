import React from "react";
import { array } from "prop-types";

const propTypes = { footerLinks: array };

const footerLinks = (props) => {
  const { footerLinks } = props;

  return (
    <nav className="footer-links" aria-label="Footer Utility">
      <ul>
        {footerLinks &&
          footerLinks.map((link, i) => {
            return (
              <li key={i}>
                <a href="#">{link}</a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

footerLinks.propTypes = propTypes;
export default footerLinks;
