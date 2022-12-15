import React from "react";
import { object, array } from "prop-types";
import SiteLogo from "../SiteLogo/SiteLogo.jsx";
import SearchMenu from "../SearchMenu/SearchMenu.jsx";
import UtilityNav from "../UtilityNav/UtilityNav.jsx";
import PrimaryNav from "../PrimaryNav/PrimaryNav.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";
import SkipNavigation from "../SkipNavigation/SkipNavigation.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const propTypes = {
  primaryNav: array.isRequired,
  utilityNav: object.isRequired,
  siteLogo: object.isRequired,
  langSelect: object,
};

const globalHeader = (props) => {
  const { primaryNav, siteLogo, utilityNav, langSelect } = props;
  return (
    <section className="global-header">
      <SkipNavigation href="#main" text="skip navigation" />
      <div className="global-header__desktop">
        <div className="global-header__top">
          <div className="global-header__top-container">
            <SiteLogo {...siteLogo} />
            <div className="global-header__utility-container">
              <UtilityNav {...utilityNav} />
              {langSelect && <LanguageSelector {...langSelect} />}
            </div>
          </div>
        </div>
        <div className="global-header__bottom theme-dark theme-dark--blue">
          <div className="global-header__bottom-container">
            <PrimaryNav primaryNav={primaryNav} utilityNav={utilityNav} />
            <SearchMenu />
          </div>
        </div>
      </div>
      <div className="global-header__container container container--100 ">
        <div className="global-header__mobile">
          <SiteLogo {...siteLogo} />
          <MobileMenu>
            <UtilityNav {...utilityNav} />
            {langSelect && <LanguageSelector {...langSelect} />}
            <div className="mobile-menu__content">
              <h1>Atrius Health</h1>
              <PrimaryNav primaryNav={primaryNav} utilityNav={utilityNav} />
              <div className="mobile-menu__search">
                <h2>Search</h2>
                <SearchBox />
              </div>
            </div>
          </MobileMenu>
        </div>
      </div>
    </section>
  );
};

globalHeader.propTypes = propTypes;
export default globalHeader;
