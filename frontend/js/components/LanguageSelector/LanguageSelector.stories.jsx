import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import LanguageSelector from "./LanguageSelector.jsx";

export default {
  title: "Components/Global Header/Header Components/Language Selector",
};

export const languageSelector = () => (
  <ContainerFull>
    <LanguageSelector {...mockData} />
  </ContainerFull>
);
