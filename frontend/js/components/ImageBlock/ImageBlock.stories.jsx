import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import ImageBlock from "./ImageBlock.jsx";

export default {
  title: "Components/Image",
};

export const image = () => (
  <ContainerFull>
    <ImageBlock {...mockData} />
  </ContainerFull>
);

export const imageOnly = () => (
  <ContainerFull>
    <ImageBlock {...mockData} description="" />
  </ContainerFull>
);
