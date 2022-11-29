import React from "react";
import { string } from "prop-types";
// import "./site-logo.scss";

const propTypes = {
  title: string,
  logoSm: string,
  logoLg: string,
  sizesSm: string,
  sizesLg: string,
};

const siteLogo = (props) => {
  const { logoSm, logoLg, title, sizesSm, sizesLg } = props;

  return (
    <div className="site-logo">
      <a href="/" className="site-logo__link">
        {logoLg ? (
          <picture className="site-logo__image">
            <source
              srcSet={logoLg}
              media="(min-width: 910px)"
              sizes={sizesLg}
            />
            <img srcSet={logoSm} alt={title || ""} sizes={sizesSm} />
          </picture>
        ) : (
          <img srcSet={logoSm} alt={title || ""} sizes={sizesSm} />
        )}
      </a>
      {title && <span className="site-logo__title">{title}</span>}
    </div>
  );
};

siteLogo.propTypes = propTypes;
export default siteLogo;
