/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import GlobalHeader from "../../../js/components/GlobalHeader/GlobalHeader.jsx";
import globalHeaderData from "../../../js/components/GlobalHeader/mockData.js";

import GlobalFooter from "../../../js/components/GlobalFooter/GlobalFooter.jsx";
import globalFooterData from "../../../js/components/GlobalFooter/mockData.js";

import PrivacyBanner from "../../../js/components/PrivacyBanner/PrivacyBanner.jsx";
import privacyBannerData from "../../../js/components/PrivacyBanner/mockData.js";

import SkipNavigation from "../../../js/components/SkipNavigation/SkipNavigation.jsx";
import SkipNavigationData from "../../../js/components/SkipNavigation/mockData.js";

import BackToTop from "../../../js/components/BackToTop/BackToTop.jsx";

import { bool, node } from "prop-types";

const propTypes = {
  children: node,
  headerAdjacent: bool,
};

const FullTemplate = (props) => {
  const { headerAdjacent } = props;

  return (
    <div className="js-page-content-wrapper">
      <header>
        <PrivacyBanner {...privacyBannerData} />
        <SkipNavigation {...SkipNavigationData} />
        <GlobalHeader {...globalHeaderData} adjacent={headerAdjacent} />
      </header>
      <main>
        <div className="u-visuallyhidden" id="main-content" tabIndex="-1">
          Start of Main Content
        </div>
        <div className="main-content-wrapper">{props.children}</div>
      </main>
      <footer>
        <BackToTop />
        <GlobalFooter {...globalFooterData} />
      </footer>
    </div>
  );
};

FullTemplate.propTypes = propTypes;
export default FullTemplate;
