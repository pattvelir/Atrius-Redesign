import React from "react";
import ReactDom from "react-dom";

import YouTubeVideoApp from "./YouTubeVideoApp.jsx";

export default function renderYoutubeVideo() {
  document.querySelectorAll(".js-youtube-video-mount").forEach((mount) => {
    const dataModel = JSON.parse(mount.dataset.model);

    ReactDom.render(<YouTubeVideoApp {...dataModel} />, mount);
  });
}
