import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import SlideShow from "./SlideShow.jsx";

export default {
  title: "Components/Slideshow",
};

export const slideshow = () => (
  <ContainerFull>
    <SlideShow {...mockData} />
  </ContainerFull>
);
