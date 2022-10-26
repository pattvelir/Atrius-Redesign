import React from "react";
import {} from "prop-types";

import Icon from "../Icon/Icon.jsx";

const propTypes = {};
const ShareBar = (props) => {
  const {} = props;
  return (
    <section className="share-bar share-bar--colors  share-bar--rounded">
      <div className="share-bar__label">SHARE</div>
      <ul>
        <li className="share-bar__item social-email">
          <a
            href="#"
            className="addthis_button_email"
            aria-label="Email"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
            target="_blank"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="email"
              iconName="social-email"
              title="email"
            />
          </a>
        </li>
        <li className="share-bar__item social-facebook">
          <a
            href="#"
            className="addthis_button_facebook"
            aria-label="Share on Facebook"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="facebook"
              title="Share on Facebook"
              iconName="social-facebook"
            />
          </a>
        </li>
        <li className="share-bar__item social-twitter">
          <a
            href="#"
            className="addthis_button_twitter"
            aria-label="Share on Twitter"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="Share on Twitter"
              title="twitter"
              iconName="social-twitter"
            />
          </a>
        </li>
        <li className="share-bar__item social-pinterest">
          <a
            href="#"
            className="addthis_button_pinterest at300b"
            aria-label="Share on Pinterest"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="pinterest"
              title="share on pinterest"
              iconName="social-pinterest"
            />
          </a>
        </li>
        <li className="share-bar__item social-linkedin">
          <a
            href="#"
            className="addthis_button_linkedin at300b"
            aria-label="Share on LinkedIn"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="linkedin"
              title="Share on LinkedIn"
              iconName="social-linkedin"
            />
          </a>
        </li>
        <li className="share-bar__item social-print">
          <a
            href="#"
            className="addthis_button_print"
            aria-label="Print"
            data-addthis-url="http://dev.patternlab.velir.com/?p=templates-homepage"
            data-addthis-title="Thread Pattern Lab"
            data-addthis-description="Thread Pattern Lab is a collection of Front End assets used to quickly build new websites"
          >
            <Icon
              className="connect__social-icon"
              role="img"
              aria-label="print"
              title="print"
              iconName="social-print"
            />
          </a>
        </li>
      </ul>
    </section>
  );
};
ShareBar.propTypes = propTypes;
export default ShareBar;
