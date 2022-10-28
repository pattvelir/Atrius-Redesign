import imageSlider from "./slickSlider.js";

const initSlideShow = (el) => {
  // override default values
  const conf = {};

  imageSlider(el, conf, (event, slick, currentSlide) => {});
};
export default initSlideShow;
