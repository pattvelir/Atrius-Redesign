import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import ImageElement from "./ImageElement.jsx";

export default {
  title: "Base/Image Element",
};

export const imageElement = () => (
  <ContainerFull>
    <ImageElement {...mockData} />
  </ContainerFull>
);
