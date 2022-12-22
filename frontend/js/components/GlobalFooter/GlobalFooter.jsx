import React from "react";
import { object, array } from "prop-types";

import Connect from "./Connect.jsx";
import FooterNav from "./FooterNav.jsx";
import FooterLinks from "./FooterLinks.jsx";
import Copyright from "./Copyright.jsx";

const propTypes = {
  connect: object.isRequired,
  footerNav: array.isRequired,
  footerLinks: array,
};

const globalFooter = (props) => {
  const { connect, footerNav, footerLinks, siteLogo } = props;

  return (
    <footer className="global-footer">
      <div className="global-footer__row global-footer__row__top">
        <FooterNav navSection={footerNav} />
        <Connect {...connect} />
      </div>
      <div className="global-footer__row global-footer__row__bottom">
        <Copyright />
        <FooterLinks footerLinks={footerLinks} />
      </div>
    </footer>
  );
};

globalFooter.propTypes = propTypes;
export default globalFooter;
