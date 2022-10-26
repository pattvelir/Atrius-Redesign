import React from "react";
import { string } from "prop-types";

import Icon from "../Icon/Icon.jsx";
import ImageElement from "../ImageElement/ImageElement.jsx";

const propTypes = {
  orientation: string,
  title: string.isRequired,
  srcset: string,
  sizes: string,
  description: string,
  contentType: string,
  subtitle: string,
  cta: string,
  ctaIcon: string,
  url: string,
};

const promo = (props) => {
  const {
    orientation,
    title,
    srcset,
    sizes,
    description,
    contentType,
    subtitle,
    cta,
    ctaIcon,
    url,
  } = props;

  const id = parseInt(Math.random() * 1000);

  return (
    <section className={`promo ${orientation || ""}`}>
      <figure className="promo__media">
        <div className="promo__picture js-make-clickable" data-location={url}>
          <ImageElement
            className="promo__img"
            srcSet={srcset}
            sizes={sizes || "(min-width: 910px) 50vw, 100vw"}
            loading="lazy"
          />
        </div>
        <figcaption className="u-visuallyhidden">{description}</figcaption>
      </figure>
      <div className="promo__content">
        {contentType && <p className="promo__eyebrow txt-h5">{contentType}</p>}
        <div
          className="promo__title subheader1 js-make-clickable"
          id={id}
          data-location={url}
        >
          {title}
        </div>
        <div className="promo__subtitle">{subtitle}</div>
        <p className="promo__description">{description}</p>
        <a href={url} aria-labelledby={id} className="promo__cta">
          {cta}
          {ctaIcon && <Icon iconName={ctaIcon} />}
        </a>
      </div>
    </section>
  );
};

promo.propTypes = propTypes;
export default promo;
