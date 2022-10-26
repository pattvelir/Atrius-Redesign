import imageSlider from "../../slickSlider.js";

export default function initSlideShow(el, i) {
  // override default values
  const conf = {};

  imageSlider(el, conf, (event, slick, currentSlide) => {});
}
