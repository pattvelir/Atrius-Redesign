import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import Connect from "./Connect.jsx";
import SocialLinks from "./SocialLinks.jsx";
import FooterLinks from "./FooterLinks.jsx";
import Copyright from "./Copyright.jsx";
import FooterNav from "./FooterNav.jsx";

import connectData from "./data/connectData.js";
import navigationData from "./data/navigationData.js";
import footerLinksData from "./data/footerLinks.js";

export default {
  title: "Components/Global Footer/Footer Components",
};

export const footerConnectBar = () => (
  <ContainerFull>
    <Connect {...connectData} />
  </ContainerFull>
);

export const socialLinks = () => (
  <ContainerFull>
    <SocialLinks {...connectData} />
  </ContainerFull>
);

export const footerNavigationLinks = () => (
  <ContainerFull>
    <FooterLinks footerLinks={footerLinksData} />
  </ContainerFull>
);

export const footerCopyright = () => (
  <ContainerFull>
    <Copyright />
  </ContainerFull>
);

export const footerNavigationLinkColumns = () => (
  <ContainerFull>
    <FooterNav navSection={navigationData} />
  </ContainerFull>
);
