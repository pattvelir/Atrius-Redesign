import React from "react";
import { arrayOf, string, shape } from "prop-types";
import cx from "classnames";
import Icon from "../Icon/Icon.jsx";
import "./language-selector.scss";

const propTypes = {
  currentItem: string,
  items: arrayOf(
    shape({
      href: string,
      label: string,
    }),
  ),
};

const LanguageSelector = (props) => {
  const { currentItem, items } = props;

  return (
    <div className="language-selector js-language-selector">
      <nav
        className="language-selector__nav js-lang-select-nav"
        aria-label="Site Language Selector"
      >
        <button
          type="button"
          className="language-selector__toggle js-lang-select-toggle"
        >
          <span className="language-selector__title">Languages</span>
          <span className="icon">
            <Icon iconName="chevron-down" aria-hidden="true" />
          </span>
        </button>
        <ul className="language-selector__menu js-lang-select-menu">
          {items &&
            items.map((navItem, i) => {
              return (
                <li
                  key={i}
                  className={cx("language-selector__item", {
                    "language-selector__item--active":
                      currentItem === navItem.label,
                  })}
                >
                  {currentItem !== navItem.label && (
                    <a
                      href={navItem.href}
                      lang={navItem.langAttr}
                      className="js-lang-select-menu-link"
                      role="menuitem"
                    >
                      {navItem.label}
                    </a>
                  )}
                  {currentItem === navItem.label && (
                    <div className="language-selector__item-wrapper">
                      <span lang={navItem.langAttr} role="menuitem">
                        {navItem.label}
                      </span>
                      <span className="language-selector__icon icon">
                        <Icon iconName="check-mark" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

LanguageSelector.propTypes = propTypes;
export default LanguageSelector;
