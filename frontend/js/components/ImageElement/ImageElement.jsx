import React from "react";
import { string, object } from "prop-types";

const propTypes = {
  alt: string,
  className: string,
  srcSet: string.isRequired,
  sizes: string,
  style: object,
};

const defaultProps = {
  srcSet: `
    https://via.placeholder.com/400x300 400w,
    https://via.placeholder.com/800x600 800w,
    https://via.placeholder.com/1200x900 1200w,
    https://via.placeholder.com/1600x1200 1600w,
    https://via.placeholder.com/2000x1500 2000w,
    https://via.placeholder.com/2400x1800 2400w,
    https://via.placeholder.com/2800x2100 2800w,
    https://via.placeholder.com/3200x2400 3200w"
  `,
  alt: "",
  sizes: "100vw",
  className: "",
};

const ImageElement = (props) => {
  const { srcSet, alt, sizes, className, style } = props;

  return (
    <img
      className={`image-element ${className}`}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      style={style}
      loading="lazy"
    />
  );
};
ImageElement.propTypes = propTypes;
ImageElement.defaultProps = defaultProps;
export default ImageElement;
