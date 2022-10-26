import React from "react";
import ContainerBleed from "../Container/ContainerBleed.jsx";

import mockData from "./mockData.js";
import GlobalFooter from "./GlobalFooter.jsx";

export default {
  title: "Components/Global Footer",
};

export const globalFooter = () => (
  <ContainerBleed>
    <GlobalFooter {...mockData} />
  </ContainerBleed>
);
