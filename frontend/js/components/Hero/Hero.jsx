import React from "react";
import { bool, string, number, object } from "prop-types";
import cx from "classnames";
import uniqueid from "lodash.uniqueid";
import BackgroundVideo from "../BackgroundVideo/BackgroundVideo.jsx";
import ImageElement from "../ImageElement/ImageElement.jsx";
import "./hero.scss";

const propTypes = {
  height: bool,
  hasImage: bool,
  hasVideo: bool,
  position: string,
  opacity: number,
  title: string,
  subtitle: string,
  srcset: string,
  sizes: string,
  cta: string,
  video: string,
  theme: number,
};

const Hero = (props) => {
  const {
    height,
    hasImage,
    hasVideo,
    position,
    srcset,
    sizes,
    opacity,
    title,
    subtitle,
    cta,
    video,
    theme,
  } = props;

  const heightStyles = height ? { maxHeight: height } : {};
  const opacityStyles = opacity ? { opacity: opacity } : {};
  const objPositionStyles = opacity ? { objectPosition: position } : {};
  const inlineStyles = Object.assign({}, heightStyles);

  const mediaStyles = Object.assign(
    {},
    opacityStyles,
    objPositionStyles,
    heightStyles,
  );

  const titleID = uniqueid("hero-");
  const themeClass = theme ? `hero--theme${theme}` : "";
  return (
    <section
      className={cx(`hero js-dynamic-banner ${themeClass}`, {
        "has-height": height,
      })}
      style={inlineStyles}
    >
      <figure className="hero__figure">
        {hasImage && (
          <ImageElement
            className="js-banner-media"
            sizes={sizes || "(min-width: 1440px) 1440px, 100vw"}
            srcSet={srcset}
            style={mediaStyles}
          />
        )}
        {hasVideo && (
          <BackgroundVideo
            height={height}
            position={position}
            video={video}
            mediaStyles={mediaStyles}
          />
        )}
      </figure>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h2
          id={titleID}
          className="hero__title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
        <div className="hero__subtitle">{subtitle}</div>
        <button
          className="hero__action btn btn--primary"
          aria-labelledby={titleID}
        >
          {cta}
        </button>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
export default Hero;
