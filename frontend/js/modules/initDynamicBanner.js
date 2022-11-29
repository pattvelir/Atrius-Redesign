import $ from "jquery";
// import "../components/Hero/hero.scss";
const adjustMedia = ($media, $container) => {
  const imgEl = $media.get(0);
  if (!imgEl || !imgEl.complete || imgEl.naturalWidth === 0) {
    return;
  }
  const height = imgEl.style.height;
  const maxHeight = parseInt($el.css("max-height").replace("px", ""), 10);

  // The object-fit polyfill will apply absolute positioning to the media element.
  // This will remove the media from flow making it's effective height zero.
  // In the case that we have a max-height applied, we still to provide an appropriate
  // height value for both the media and it's container.

  if (maxHeight || height === "auto" || height === "") {
    const mediaWidth = $media.width();
    const mediaHeight = $media.height();
    const containerWidth = $container.width();

    // get the aspect ration of the original media
    const ratio = mediaHeight / mediaWidth;

    // calculate proportional height based on container size
    let newHeight = containerWidth * ratio;

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    //$media.height(newHeight);
    $media.parent().height(newHeight);
    $media.height(newHeight);
  }

  objectFit($media[0]);
};

const DynamicBanner = (el) => {
  const $el = $(el);
  const $container = $el.parent();
  const $media = $el.find(".js-banner-media");

  adjustMedia($media, $container);
  // only apply this if media is video or object-fit is not natively supported
  if (
    // !objectFitSupport() ||
    $media.length > 1 &&
    $media[0].nodeName === "VIDEO"
  ) {
    adjustMedia();
    $(window).on("resize", () => adjustMedia());
  }
};

export default DynamicBanner;
