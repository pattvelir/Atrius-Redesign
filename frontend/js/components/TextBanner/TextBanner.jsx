import React from "react";
import { string, number, bool } from "prop-types";
import cx from "classnames";
import Button from "../Button/Button";

const propTypes = {
  title: string,
  description: string,
  cta: string,
  theme: number,
  adjacent: bool,
  href: string,
};

const TextBanner = (props) => {
  const { theme, title, description, cta, adjacent, href } = props;
  const buttonColor = theme >= 2 && theme < 5 ? "dark" : "light";

  return (
    <section
      className={cx("text-banner", {
        [`text-banner--theme${theme}`]: theme,
        ["text-banner--no-margin"]: adjacent,
      })}
    >
      <div className="text-banner__container container">
        <h2 className="text-banner__title">
          {title} {theme} {buttonColor}
        </h2>
        <p className="text-banner__description">{description}</p>
        <Button
          btnType="filled"
          btnColor={buttonColor}
          iconRight="arrow-right"
          size="xsm"
          as="a"
          href={href}
          aria-labelledby="uniqueId-dda5ad8a"
        >
          {cta}
        </Button>
      </div>
    </section>
  );
};
TextBanner.propTypes = propTypes;
export default TextBanner;
