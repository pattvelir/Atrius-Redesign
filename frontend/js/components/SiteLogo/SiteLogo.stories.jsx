import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import SiteLogo from "./SiteLogo.jsx";

export default {
  title: "Components/Global Header/Header Components",
};

export const logoAndBranding = () => (
  <ContainerFull>
    <SiteLogo {...mockData} />
  </ContainerFull>
);
