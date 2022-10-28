import $ from "jquery";
import "slick-slider";

const slickDefaults = {
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: `
      <button type="button" class="slick-prev" aria-label="Previous Slide">
          <div class="icon" aria-hidden="true"><svg><use xlink:href="${window.assetsFolder}/img/svg-sprite.svg#chevron-left"></use></svg></div>
      </button>`,
  nextArrow: `
      <button type="button" class="slick-next" aria-label="Next Slide">
          <div class="icon" aria-hidden="true"><svg></sbg><use xlink:href="${window.assetsFolder}/img/svg-sprite.svg#chevron-right"></use></svg></div>
       </button>`,
};

export default function slickSlider(el, conf, callback) {
  // do not intialize slideshows inside page editor
  if ($("body").hasClass("is-page-editor")) {
    return;
  }

  const $slider = $(el);

  // create a region to tell the user which slide is active
  const liveregion = document.createElement("div");
  liveregion.setAttribute("aria-live", "polite");
  liveregion.setAttribute("aria-atomic", "true");
  liveregion.setAttribute("class", "slick-slider__info u-visuallyhidden");

  // populate the live region after Slick has been run
  $slider.on("init", (event, slick) => {
    liveregion.textContent = `Item ${slick.currentSlide + 1} of ${
      slick.slideCount
    }`;
    el.appendChild(liveregion);
  });

  $slider.on("afterChange", (event, slick, currentSlide) => {
    liveregion.textContent = `Item ${currentSlide + 1} of ${slick.slideCount}`;

    if (typeof callback === "function") {
      callback(event, slick, currentSlide);
    }
  });

  // create the slider
  $slider.slick(Object.assign(slickDefaults, conf));
}
