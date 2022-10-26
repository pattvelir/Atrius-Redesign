import React from "react";
import { object, array } from "prop-types";

import Connect from "./Connect.jsx";
import FooterNav from "./FooterNav.jsx";
import FooterLinks from "./FooterLinks.jsx";
import Copyright from "./Copyright.jsx";
import SiteLogo from "../SiteLogo/SiteLogo.jsx";

const propTypes = {
  siteLogo: object.isRequired,
  connect: object.isRequired,
  footerNav: array.isRequired,
  footerLinks: array,
};

const globalFooter = (props) => {
  const { connect, footerNav, footerLinks, siteLogo } = props;

  return (
    <footer className="global-footer">
      <div className="container container--bleed container--connect">
        <div className="container__col">
          <Connect {...connect} />
        </div>
      </div>
      <div className="container container--100">
        <div className="container__col container__col--100">
          <FooterNav navSection={footerNav} />
          <SiteLogo {...siteLogo} />
          <FooterLinks footerLinks={footerLinks} />
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

globalFooter.propTypes = propTypes;
export default globalFooter;
