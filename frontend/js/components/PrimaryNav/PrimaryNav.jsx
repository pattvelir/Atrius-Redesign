import React from "react";
import { arrayOf, shape, string, bool } from "prop-types";
import cx from "classnames";
import Icon from "../Icon/Icon.jsx";
// import "./primary-nav.scss";

import { copyKeys } from "ramda-adjunct";
const propTypes = {
  primaryNav: arrayOf(
    shape({
      submenu: arrayOf(
        shape({
          active: bool,
          label: string,
          href: string,
        }),
      ),
      active: bool,
      label: string,
      href: string,
    }),
  ),
};

const PrimaryNav = (props) => {
  const { primaryNav } = props;
  console.log("RUN");
  return (
    <nav className="primary-nav js-primary-nav" aria-label="Primary">
      <ul className="primary-nav__items">
        {primaryNav.map((navItem, i) => {
          const hasSubMenu = navItem.submenu && navItem.submenu.length > 0;

          return (
            <li
              key={i}
              className={cx("primary-nav__item", {
                "primary-nav__item--submenu": hasSubMenu,
              })}
            >
              {!hasSubMenu && !navItem.active && (
                <a
                  className="primary-nav__top-link js-primary-nav-top-link"
                  href={navItem.href}
                >
                  {navItem.label}
                </a>
              )}

              {!hasSubMenu && navItem.active && (
                <span
                  aria-current="page"
                  className="primary-nav__top-link primary-nav__top-link--active"
                >
                  {navItem.label}
                </span>
              )}

              {hasSubMenu && (
                <div className="primary-nav__menu js-primary-nav-menu">
                  <button
                    type="button"
                    className="primary-nav__top-link primary-nav__top-link--button js-primary-nav-menu-button"
                  >
                    <span>{navItem.label}</span>
                    <Icon iconName="chevron-down" aria-hidden="true" />
                  </button>
                  <ul className="primary-nav__submenu js-primary-nav-menu-content">
                    {navItem.submenu.map((subItem, i) => {
                      return (
                        <li
                          key={i}
                          className={cx("primary-nav__subitem", {
                            "primary-nav__subitem--active": subItem.active,
                          })}
                        >
                          {subItem.active && (
                            <span
                              aria-current="page"
                              className="primary-nav__sub-link primary-nav__sub-link--active"
                            >
                              {subItem.label}
                            </span>
                          )}
                          {!subItem.active && (
                            <a
                              href={subItem.href}
                              className="primary-nav__sub-link js-primary-nav-sub-link"
                            >
                              {subItem.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

PrimaryNav.propTypes = propTypes;
export default PrimaryNav;
