import React from "react";
import mockData from "./mockData.js";

import ContainerFull from "../../Container/ContainerFull.jsx";

import DynamicContentListing from "./DynamicContentListing.jsx";

export default {
  title: "Components/Dynamic Content Listing",
};

export const dynamicContentListing = () => (
  <ContainerFull>
    <DynamicContentListing {...mockData} />
  </ContainerFull>
);

export const dynamicContentListingTheme2 = () => (
  <ContainerFull>
    <DynamicContentListing
      {...mockData}
      model={{ ...mockData.model, theme: 2 }}
    />
  </ContainerFull>
);

export const dclLocalDev = () => (
  <ContainerFull>
    <DynamicContentListing
      {...mockData}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
      }}
    />
  </ContainerFull>
);

export const dclLocalDevTheme2 = () => (
  <ContainerFull>
    <DynamicContentListing
      {...mockData}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
        theme: 2,
      }}
    />
  </ContainerFull>
);
