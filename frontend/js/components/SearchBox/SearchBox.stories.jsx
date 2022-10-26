import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import SearchBox from "./SearchBox.jsx";

export default {
  title: "Components/Global Header/Header Components",
};

export const quickSearchBar = () => (
  <ContainerFull>
    <SearchBox />
  </ContainerFull>
);
