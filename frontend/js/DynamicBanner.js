import $ from "jquery";
import { objectFitSupport, objectFit } from "./polyfill/object-fit";

export class DynamicBanner {
  constructor($el) {
    this.$el = $el;
    this.$container = $el.parent();
    this.$media = $el.find(".js-banner-media");
    this.bindEvents();
  }

  bindEvents() {
    // only apply this if media is video or object-fit is not natively supported
    if (
      !objectFitSupport() ||
      (this.$media.length > 1 && this.$media[0].nodeName === "VIDEO")
    ) {
      this.adjustMedia();
      $(window).on("resize", () => this.adjustMedia());
    }
  }

  adjustMedia() {
    const imgEl = this.$media.get(0);
    if (!imgEl || !imgEl.complete || imgEl.naturalWidth === 0) {
      return;
    }
    const height = imgEl.style.height;
    const maxHeight = parseInt(
      this.$el.css("max-height").replace("px", ""),
      10,
    );

    // The object-fit polyfill will apply absolute positioning to the media element.
    // This will remove the media from flow making it's effective height zero.
    // In the case that we have a max-height applied, we still to provide an appropriate
    // height value for both the media and it's container.

    if (maxHeight || height === "auto" || height === "") {
      const mediaWidth = this.$media.width();
      const mediaHeight = this.$media.height();
      const containerWidth = this.$container.width();

      // get the aspect ration of the original media
      const ratio = mediaHeight / mediaWidth;

      // calculate proportional height based on container size
      let newHeight = containerWidth * ratio;

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
      }
      //this.$media.height(newHeight);
      this.$media.parent().height(newHeight);
      this.$media.height(newHeight);
    }

    objectFit(this.$media[0]);
  }
}
