import React from "react";
import Container3070 from "../Container/Container3070.jsx";
import mockData from "./mockData.js";
import SecondaryNav from "./SecondaryNav.jsx";

export default {
  title: "Components/Secondary Navigation",
};

export const secondaryNavigation = () => (
  <Container3070 left={<SecondaryNav {...mockData} />} right="" />
);

export const secondaryNavigationChild = () => (
  <Container3070
    left={
      <SecondaryNav
        {...mockData}
        currentItem="Lubas ortum"
        currentParent="Indicto"
        currentChild="Lubas ortum"
      />
    }
    right=""
  />
);

export const secondaryNavigationGrandChild = () => (
  <Container3070
    left={
      <SecondaryNav
        {...mockData}
        currentItem="Animaliss credere"
        currentParent="Fatalis, noster"
        currentChild="Fiscinas mori"
      />
    }
    right=""
  />
);
