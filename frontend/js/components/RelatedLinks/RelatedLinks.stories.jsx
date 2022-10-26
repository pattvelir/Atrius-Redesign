import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import RelatedLinks from "./RelatedLinks.jsx";

export default {
  title: "Components/Related Links",
};

export const relatedLinks = () => (
  <ContainerFull>
    <RelatedLinks {...mockData} />
  </ContainerFull>
);
