import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import MultiImage from "./MultiImage.jsx";

export default {
  title: "Components/Image Grid",
};

export const imageGrid = () => (
  <ContainerFull>
    <MultiImage {...mockData} images={mockData.images.slice(0, 2)} />
  </ContainerFull>
);

export const imageGrid3 = () => (
  <ContainerFull>
    <MultiImage {...mockData} images={mockData.images.slice(0, 3)} />
  </ContainerFull>
);

export const imageGrid4 = () => (
  <ContainerFull>
    <MultiImage {...mockData} images={mockData.images.slice(0, 4)} />
  </ContainerFull>
);

export const imageGrid5 = () => (
  <ContainerFull>
    <MultiImage {...mockData} />
  </ContainerFull>
);
