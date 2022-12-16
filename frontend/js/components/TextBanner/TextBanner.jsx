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
};

const TextBanner = (props) => {
  const { theme, title, description, cta, adjacent } = props;
  const buttonColor = theme <= 4 && theme != 1 ? "light" : "dark";

  return (
    <section
      className={cx("text-banner", {
        [`text-banner--theme${theme}`]: theme,
        ["text-banner--no-margin"]: adjacent,
      })}
    >
      <div className="text-banner__container container">
        <h2 className="text-banner__title">{title}</h2>
        <p className="text-banner__description">{description}</p>
        <Button
          btnType="filled"
          btnColor={buttonColor}
          iconRight="arrow-right"
          size="xsm"
          as="a"
          href="/#"
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
