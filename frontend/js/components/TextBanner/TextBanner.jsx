import React from "react";
import { string, number, bool } from "prop-types";
import cx from "classnames";

const propTypes = {
  title: string,
  description: string,
  cta: string,
  theme: number,
  adjacent: bool,
};

const TextBanner = (props) => {
  const { theme, title, description, cta, adjacent } = props;

  return (
    <section
      className={cx("text-banner", {
        [`text-banner--theme${theme}`]: theme,
        ["text-banner--no-margin"]: adjacent,
      })}
    >
      <div className="text-banner__container container">
        <h2 className="text-banner__title" id="uniqueId-dda5ad8a">
          {title}
        </h2>
        <p className="text-banner__description">{description}</p>
        <a
          className="text-banner__cta btn btn--primary"
          href="/#"
          aria-labelledby="uniqueId-dda5ad8a"
        >
          {cta}
        </a>
      </div>
    </section>
  );
};
TextBanner.propTypes = propTypes;
export default TextBanner;
