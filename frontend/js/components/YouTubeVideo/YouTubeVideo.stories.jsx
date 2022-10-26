import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import YouTubeVideo from "./YouTubeVideo.jsx";
import mockData from "./mockData.js";

export default {
  title: "Components/Video",
};

export const Video = () => (
  <ContainerFull>
    <YouTubeVideo {...mockData} />
  </ContainerFull>
);

export const VideoDarkButton = () => (
  <ContainerFull>
    <YouTubeVideo {...mockData} darkButton={true} />
  </ContainerFull>
);

export const VideoYouTubePoster = () => (
  <ContainerFull>
    <YouTubeVideo {...mockData} darkButton={true} poster={null} />
  </ContainerFull>
);
