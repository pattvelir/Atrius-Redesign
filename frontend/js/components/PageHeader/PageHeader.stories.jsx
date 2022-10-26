import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import PageHeader from "./PageHeader.jsx";

export default {
  title: "Components/Page Header",
};

export const pageHeader = () => (
  <ContainerFull>
    <PageHeader {...mockData} />
  </ContainerFull>
);
