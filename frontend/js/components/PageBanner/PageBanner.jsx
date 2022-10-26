import React from "react";
import { bool, string, number, object } from "prop-types";
import cx from "classnames";

import BackgroundVideo from "../BackgroundVideo/BackgroundVideo.jsx";
import ImageElement from "../ImageElement/ImageElement.jsx";

const propTypes = {
  height: string,
  hasImage: bool,
  hasVideo: bool,
  position: string,
  srcset: string,
  sizes: string,
  opacity: number,
  title: string,
  subtitle: string,
  contentType: string,
  colorPairs: object,
  video: string,
};

const PageBanner = (props) => {
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
    contentType,
    colorPairs,
    video,
  } = props;

  const colorStyles = colorPairs ? colorPairs.redBckgd : {};
  const heightStyles = height ? { maxHeight: height } : {};
  const opacityStyles = opacity ? { opacity: opacity } : {};
  const inlineStyles = Object.assign({}, colorStyles, heightStyles);
  const mediaStyles = Object.assign({}, opacityStyles, heightStyles);

  return (
    <section
      className={cx(
        "page-banner container container--bleed js-dynamic-banner",
        {
          "has-height": height,
        },
      )}
      style={inlineStyles}
    >
      <figure className="page-banner__figure">
        {hasImage && (
          <ImageElement
            className="js-banner-media"
            srcSet={srcset}
            sizes={sizes || "(min-width: 1440px) 1440px, 100vw"}
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
      <div className="page-banner__content">
        <div className="page-banner__overlay"></div>
        <div className="page-banner__content-inner">
          <div className="page-banner__eyebrow">{contentType}</div>
          <h1 className="page-banner__title">{title}</h1>
          <div className="page-banner__subtitle">{subtitle}</div>
        </div>
      </div>
    </section>
  );
};
PageBanner.propTypes = propTypes;
export default PageBanner;
