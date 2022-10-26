import React from "react";
import { string } from "prop-types";
import cx from "classnames";

import ImageElement from "../ImageElement/ImageElement.jsx";

const propTypes = {
  orientation: string,
  title: string,
  description: string,
  source: string,
  altClass: string,
  backgroundColor: string,
  srcset: string,
  sizes: string,
  alt: string,
};

const ImageBlock = (props) => {
  const {
    title,
    orientation,
    description,
    altClass,
    backgroundColor,
    srcset,
    sizes,
    alt,
  } = props;

  return (
    <section
      className={cx(`image-block ${orientation}`, {
        [`${altClass}`]: altClass,
        "image-block--has-background": backgroundColor,
      })}
      style={{ backgroundColor: backgroundColor ? backgroundColor : null }}
    >
      {title && <h2 className="image-block__title subheader3">{title}</h2>}
      <figure className="image-block__media">
        <ImageElement
          alt={!description ? "" : alt}
          srcSet={srcset}
          sizes={sizes || "(min-width: 1290px) 1290px, 100vw"}
        />
        {description && (
          <figcaption className="image-block__caption caption">
            <div className="image-block__description">{description}</div>
          </figcaption>
        )}
      </figure>
    </section>
  );
};

ImageBlock.propTypes = propTypes;
export default ImageBlock;
