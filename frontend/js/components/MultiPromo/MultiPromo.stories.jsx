import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import MultiPromo from "./MultiPromo.jsx";

export default {
  title: "Components/Multi Promo",
  argTypes: {
    theme: {
      options: ["theme1", "theme2", "theme3", "theme4"],
      control: { type: "select" },
      defaultValue: "theme1",
    },
  },
};

export const multiPromo = (args) => (
  <ContainerFull>
    <MultiPromo
      {...mockData}
      promos={mockData.promos.slice(0, 2)}
      theme={args.theme}
    />
  </ContainerFull>
);

export const multiPromo3 = (args) => (
  <ContainerFull>
    <MultiPromo
      {...mockData}
      promos={mockData.promos.slice(0, 3)}
      theme={args.theme}
    />
  </ContainerFull>
);

export const multiPromo4 = (args) => (
  <ContainerFull>
    <MultiPromo
      {...mockData}
      promos={mockData.promos.slice(0, 4)}
      theme={args.theme}
    />
  </ContainerFull>
);
