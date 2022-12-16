import React from "react";
import { arrayOf, shape, string, bool } from "prop-types";
import cx from "classnames";
import Button from "../Button/Button.jsx";
import TextWithIcon from "../TextWithIcon/TextWithIcon.jsx";
import NavToggle from "../NavToggle/NavToggle.jsx";

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
  return (
    <>
      <nav className="primary-nav js-primary-nav" aria-label="Primary">
        <ul className="primary-nav__items">
          {primaryNav.map((navItem, i) => {
            const hasSubMenu = navItem.menus && navItem.menus.length > 0;

            return (
              <li
                key={i}
                className={cx("primary-nav__item", {
                  "primary-nav__item--submenu": hasSubMenu,
                })}
              >
                {!hasSubMenu && !navItem.active && (
                  <>
                    <span className="primary-nav__top-link--desktop">
                      <a
                        href={navItem.href}
                        className="primary-nav__top-link js-primary-nav-top-link"
                      >
                        {navItem.label}
                      </a>
                    </span>

                    <span className="primary-nav__top-link--mobile">
                      <a
                        href={navItem.href}
                        className="primary-nav__top-link js-primary-nav-top-link"
                      >
                        <TextWithIcon text={navItem.label} icon="arrow-right" />
                      </a>
                    </span>
                  </>
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
                  <>
                    <div className="primary-nav__menu js-primary-nav-menu">
                      <button
                        type="button"
                        className="primary-nav__top-link primary-nav__top-link--button js-primary-nav-menu-button"
                      >
                        <span className="primary-nav__top-link--desktop">
                          <TextWithIcon
                            text={navItem.label}
                            icon="keyboard_arrow_down"
                          />
                        </span>

                        <span className="primary-nav__top-link--mobile">
                          <TextWithIcon
                            text={navItem.label}
                            icon="arrow-right"
                          />
                        </span>
                      </button>
                      <div
                        className="primary-nav__submenu js-primary-nav-menu-content theme-light"
                        key={i}
                        id={`mega-menu__${i}`}
                      >
                        <div className="primary-nav__submenu__container">
                          <div className="primary-nav__submenu__subitem">
                            <h2>{navItem.featureTitle}</h2>
                            <p>{navItem.featureDescription}</p>
                            <div>
                              <Button
                                btnType="filled"
                                btnColor="dark"
                                iconRight="arrow-right"
                                href={navItem.featureLink.href}
                              >
                                {navItem.featureLink.label}
                              </Button>
                            </div>
                          </div>
                          {navItem.menus?.map((menu, ind) => (
                            <div
                              className="primary-nav__submenu__subitem"
                              key={ind}
                            >
                              <div className="primary-nav__subitem__heading">
                                {menu.title}
                              </div>
                              <ul>
                                {menu.submenu?.map((sm, index) => (
                                  <li key={index}>
                                    <a href={sm.href}>
                                      <TextWithIcon
                                        text={sm.label}
                                        icon="arrow-right"
                                      />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              {menu.all && (
                                <Button
                                  btnType="outline"
                                  btnColor="light"
                                  href={menu.all.href}
                                >
                                  {menu.all.label}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

PrimaryNav.propTypes = propTypes;
export default PrimaryNav;
