import React from "react";
import { arrayOf, shape, string } from "prop-types";

import Icon from "../Icon/Icon.jsx";
import Button from "../Button/Button.jsx";

const propTypes = {
  connectSocialSites: arrayOf(
    shape({
      url: string.isRequired,
      label: string,
      icon: string.isRequired,
    })
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
                <Button
                  btnType="filled"
                  btnColor="light"
                  icon
                  href={site.url}
                  aria-label={site.label}
                >
                  <Icon
                    iconName={`social-${site.icon}`}
                    className="connect__social-icon"
                  />
                </Button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

socialLinks.propTypes = propTypes;
export default socialLinks;
