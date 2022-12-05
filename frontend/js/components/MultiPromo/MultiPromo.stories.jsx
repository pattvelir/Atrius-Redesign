import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import MultiPromo from "./MultiPromo.jsx";

export default {
  title: "Components/Multi Promo",
};

export const multiPromo = (args) => (
  <ContainerFull>
    <MultiPromo {...mockData} promos={mockData.promos.slice(0, 2)} />
  </ContainerFull>
);

export const multiPromo3 = (args) => (
  <ContainerFull>
    <MultiPromo {...mockData} promos={mockData.promos.slice(0, 3)} />
  </ContainerFull>
);

export const multiPromo4 = (args) => (
  <ContainerFull>
    <MultiPromo {...mockData} promos={mockData.promos.slice(0, 4)} />
  </ContainerFull>
);
