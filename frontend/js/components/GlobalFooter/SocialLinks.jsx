import React from "react";
import { arrayOf, shape, string } from "prop-types";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  connectSocialSites: arrayOf(
    shape({
      url: string.isRequired,
      label: string,
      icon: string.isRequired,
    }),
  ),
};

const socialLinks = (props) => {
  const { connectSocialSites } = props;

  return (
    <nav className="social-links">
      <ul>
        {connectSocialSites &&
          connectSocialSites.map((site, i) => {
            return (
              <li key={i}>
                <a href={site.url} aria-label={site.label}>
                  <Icon iconName={site.icon} className="connect__social-icon" />
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

socialLinks.propTypes = propTypes;
export default socialLinks;
