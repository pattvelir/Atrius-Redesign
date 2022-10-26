import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import VideoBlock from "./VideoBlock.jsx";

export default {
  title: "Components/Video (Old)",
};

export const video = () => (
  <ContainerFull>
    <VideoBlock {...mockData} />
  </ContainerFull>
);

export const videoOnly = () => (
  <ContainerFull>
    <VideoBlock {...mockData} title={null} description={null} />
  </ContainerFull>
);
