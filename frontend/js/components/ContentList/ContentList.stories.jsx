import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import ContentList from "./ContentList.jsx";

export default {
  title: "Components/Content Listing",
};

export const contentListing = () => (
  <ContainerFull>
    <ContentList {...mockData} />
  </ContainerFull>
);
