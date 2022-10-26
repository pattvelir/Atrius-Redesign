import React from "react";
import { string, arrayOf, shape } from "prop-types";
import cx from "classnames";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  currentItem: string,
  currentParent: string,
  currentChild: string,
  items: arrayOf(
    shape({
      href: string,
      label: string,
      submenu: arrayOf(
        shape({
          href: string,
          label: string,
          submenu: arrayOf(
            shape({
              href: string,
              label: string,
            }),
          ),
        }),
      ),
    }),
  ),
};
const SecondaryNav = (props) => {
  const { currentItem, currentParent, currentChild, items } = props;
  return (
    <nav
      className="secondary-nav js-secondary-nav"
      aria-label="Site Sub navigation"
    >
      <a href="#" className="secondary-nav__toggle js-nav-toggle">
        More in this section
        <span className="icon">
          <Icon iconName="chevron-down" />
        </span>
      </a>
      <ul className="secondary-nav__menu js-menu">
        {items &&
          items.map((navItem, i) => {
            return (
              <li
                key={i}
                className={cx("secondary-nav__item", {
                  "is-active": currentItem === navItem.label,
                  "is-current-parent": currentParent === navItem.label,
                })}
              >
                <a href={currentItem !== navItem.label ? navItem.href : null}>
                  {navItem.label}
                </a>
                {navItem.submenu && currentParent === navItem.label && (
                  <ul className="secondary-nav__submenu">
                    {navItem.submenu.map((subItem, i) => {
                      return (
                        <li
                          key={i}
                          className={cx("secondary-nav__subitem", {
                            "is-active": currentItem === subItem.label,
                            "is-current-child": currentChild === subItem.label,
                          })}
                        >
                          <a href={currentItem !== subItem.label ? "#" : null}>
                            {subItem.label}
                          </a>
                          {subItem.submenu && currentChild === subItem.label && (
                            <ul className="secondary-nav__tertmenu">
                              {subItem.submenu.map((tertItem, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={cx("secondary-nav__tertitem", {
                                      "is-active":
                                        currentItem === tertItem.label,
                                    })}
                                  >
                                    <a
                                      href={
                                        currentItem !== tertItem.label
                                          ? tertItem.href
                                          : null
                                      }
                                    >
                                      {tertItem.label}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
SecondaryNav.propTypes = propTypes;
export default SecondaryNav;
