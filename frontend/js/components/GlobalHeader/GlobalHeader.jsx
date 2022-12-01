import React from "react";
import { object, array } from "prop-types";
import SiteLogo from "../SiteLogo/SiteLogo.jsx";
import SearchMenu from "../SearchMenu/SearchMenu.jsx";
import UtilityNav from "../UtilityNav/UtilityNav.jsx";
import PrimaryNav from "../PrimaryNav/PrimaryNav.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";

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
      <div className="global-header__desktop">
        <div className="global-header__top">
          <div className="global-header__top-container container container--50-50">
            <div className="container__col container__col--50 container__col--left">
              <SiteLogo {...siteLogo} />
            </div>
            <div className="container__col container__col--50 container__col--right global-header__utility-container">
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
          <SearchMenu />
          <MobileMenu>
            <PrimaryNav primaryNav={primaryNav} utilityNav={utilityNav} />
            <UtilityNav {...utilityNav} />
            {langSelect && <LanguageSelector {...langSelect} />}
          </MobileMenu>
        </div>
      </div>
    </section>
  );
};

globalHeader.propTypes = propTypes;
export default globalHeader;
