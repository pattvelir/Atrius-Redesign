import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import PrimaryNav from "./PrimaryNav.jsx";

export default {
  title: "Components/Global Header/Header Components",
};

export const primaryNavigation = () => (
  <ContainerFull>
    <PrimaryNav {...mockData} />
  </ContainerFull>
);
