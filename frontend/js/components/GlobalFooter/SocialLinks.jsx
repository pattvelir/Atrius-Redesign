import React from "react";
import { arrayOf, shape, string } from "prop-types";

import Icon from "../Icon/Icon.jsx";
import Button from "../Button/Button.jsx";
import cn from "classnames";

const propTypes = {
  connectSocialSites: arrayOf(
    shape({
      url: string.isRequired,
      label: string,
      icon: string.isRequired,
    }),
  ),
  placement: string,
};

const socialLinks = (props) => {
  const { connectSocialSites, direction } = props;
  const classNames = cn("social-links", {
    [`social-links--${direction}`]: direction,
  });

  return (
    <nav className={classNames}>
      <ul>
        {connectSocialSites &&
          connectSocialSites.map((site, i) => {
            return (
              <li key={i}>
                <Button
                  btnType="filled"
                  btnColor="dark"
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
