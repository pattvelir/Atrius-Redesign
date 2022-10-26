import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import PageMeta from "./PageMeta.jsx";

export default {
  title: "Components/Page Metadata",
};

export const pageMetadata = () => (
  <ContainerFull>
    <PageMeta {...mockData} />
  </ContainerFull>
);
