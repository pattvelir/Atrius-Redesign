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
    cta,
    ctaIcon,
    url,
    type,
  } = props;

  const id = parseInt(Math.random() * 1000);

  const image = (
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
  );

  const header = (
    <div
      className="promo__title subheader1 js-make-clickable"
      id={id}
      data-location={url}
    >
      {title}
    </div>
  );

  const promoHeaderTypes =
    type === "circle" ? (
      <>
        {header}
        {image}
      </>
    ) : (
      <>
        {image} {header}
      </>
    );

  return (
    <section className={`promo ${orientation || ""}`}>
      {type !== "no-image" ? promoHeaderTypes : header}
      <div className="promo__content">
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
