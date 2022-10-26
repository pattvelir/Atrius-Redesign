import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import UtilityNav from "./UtilityNav.jsx";

export default {
  title: "Components/Global Header/Header Components",
};

export const utilityNavigation = () => (
  <ContainerFull>
    <UtilityNav {...mockData} />
  </ContainerFull>
);
