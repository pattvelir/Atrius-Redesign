import React from "react";
import { string, arrayOf, shape, bool } from "prop-types";
import TextWithIcon from "../TextWithIcon/TextWithIcon";
// import "./utility-nav.scss";

const propTypes = {
  items: arrayOf(
    shape({
      href: string,
      label: string,
      active: bool,
    }),
  ),
};

const utilityNav = (props) => {
  const { items } = props;

  return (
    <nav className="utility-nav" aria-label="Utility">
      <ul className="utility-nav__list">
        {items &&
          items.map((navItem, i) => {
            return (
              <li key={i} className="utility-nav__item">
                {navItem.active && (
                  <TextWithIcon
                    className="utility-nav__link"
                    icon={navItem.icon}
                    text={navItem.label}
                  />
                )}
                {!navItem.active && (
                  <TextWithIcon
                    className="utility-nav__link js-utility-nav-link"
                    icon={navItem.icon}
                    text={navItem.label}
                    href={navItem.href}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

utilityNav.propTypes = propTypes;
export default utilityNav;
