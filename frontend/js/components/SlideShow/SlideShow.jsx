import React from "react";
import { string, array } from "prop-types";

import ImageBlock from "../ImageBlock/ImageBlock.jsx";

const propTypes = { title: string, images: array };

const SlideShow = (props) => {
  const { title, images } = props;

  return (
    <section className="slideshow">
      <h2 className="slideshow__title">{title}</h2>
      <div className="slideshow__slider js-slideshow-slider">
        {images &&
          images.map((image, i) => {
            return <ImageBlock key={i} {...image} />;
          })}
      </div>
    </section>
  );
};
SlideShow.propTypes = propTypes;
export default SlideShow;
