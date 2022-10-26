import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import ArrowLink from "./ArrowLink.jsx";

export default {
  title: "Base/Arrow Link",
};

export const arrowLink = () => (
  <ContainerFull>
    <ArrowLink {...mockData} />
  </ContainerFull>
);

export const arrowLinkExternal = () => (
  <ContainerFull>
    <ArrowLink {...mockData} type="external" />
  </ContainerFull>
);

export const arrowLinkJumpLink = () => (
  <ContainerFull>
    <ArrowLink {...mockData} type="jump" />
  </ContainerFull>
);

export const arrowLinkDownload = () => (
  <ContainerFull>
    <ArrowLink {...mockData} type="download" />
  </ContainerFull>
);
