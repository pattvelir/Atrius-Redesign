import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import SkipNavigation from "./SkipNavigation.jsx";

export default {
  title: "Components/Skip Link",
};

export const skipNavigation = () => (
  <ContainerFull>
    <SkipNavigation {...mockData} />
    <h2>Press Tab button to view skip link</h2>
  </ContainerFull>
);
