import React from "react";
import { arrayOf, shape, string, bool } from "prop-types";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  items: arrayOf(shape({ name: string, url: string, isActive: bool })),
};

const AccountNavigation = (props) => {
  const { items } = props;

  return (
    <div className="account-nav js-account-nav">
      <a href="#1" className="account-nav__toggle js-nav-toggle">
        Account Navigation
        <span className="icon">
          <Icon iconName="chevron-down" />
        </span>
      </a>
      {items && (
        <ul role="navigation" className="account-nav__menu js-menu">
          {items.map((item, index) => (
            <li key={index} className="account-nav__item">
              <a
                href={item.url}
                aria-label={item.isActive ? "current page" : null}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AccountNavigation.propTypes = propTypes;
export default AccountNavigation;
