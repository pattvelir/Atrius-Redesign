import React from "react";
import { array } from "prop-types";

const propTypes = { footerLinks: array };

const footerLinks = (props) => {
  const { footerLinks } = props;

  return (
    <nav className="footer-links" aria-label="Footer Utility">
      <ul>
        {footerLinks &&
          footerLinks.map(({ copy, target, href }, i) => {
            return (
              <li key={i}>
                <a href={href} {...target}>
                  {copy}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

footerLinks.propTypes = propTypes;
export default footerLinks;
