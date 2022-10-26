import React from "react";
import { string, array } from "prop-types";

import ImageBlock from "../ImageBlock/ImageBlock.jsx";

const propTypes = { title: string, images: array, sharedCaption: string };

const MultiImage = (props) => {
  const { title, images, sharedCaption } = props;
  return (
    <section className="multi-image">
      <h2 className="multi-image__title">{title}</h2>
      <figure className="multi-image__items" role="group">
        {images &&
          images.map((image, i) => {
            image.sizes = image.sizes
              ? image.sizes
              : "(min-width: 680px) 50vw, 100vw";
            return (
              <div key={i} className="multi-image__image">
                <ImageBlock {...image} />
              </div>
            );
          })}
      </figure>
      <figcaption className="multi-image__caption">{sharedCaption}</figcaption>
    </section>
  );
};
MultiImage.propTypes = propTypes;
export default MultiImage;
