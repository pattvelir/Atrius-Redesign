import React from "react";
import { string } from "prop-types";
import ImageElement from "../ImageElement/ImageElement.jsx";
import TextWithIconComponent from "../TextWithIcon/TextWithIcon.jsx";

const propTypes = {
  title: string.isRequired,
  srcset: string,
  sizes: string,
  description: string,
  cta: string,
  ctaIcon: string,
  url: string,
};

const promo = (props) => {
  const { title, srcset, sizes, description, cta, ctaIcon, url, type, theme } =
    props;

  const id = parseInt(Math.random() * 1000);

  const image = (
    <figure className="promo__media">
      <div className="promo__picture">
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
    <h2 className="promo__title" id={id}>
      {title}
    </h2>
  );

  const promoHeaderTypes =
    type === "circle" ? (
      <header>
        {header}
        {srcset && image}
      </header>
    ) : (
      <header>
        {srcset && image} {header}
      </header>
    );

  return (
    <section className={`promo promo--${type} promo--${theme}`}>
      {type !== "no-image" ? promoHeaderTypes : header}
      <div className="promo__content">
        <p className="promo__description">{description}</p>
        {url && (
          <footer className="promo__cta">
            <TextWithIconComponent
              text={cta}
              icon={ctaIcon}
              href={url}
              aria-labelledby={id}
            />
          </footer>
        )}
      </div>
    </section>
  );
};

promo.propTypes = propTypes;
export default promo;
