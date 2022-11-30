import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";

import TextWithIconComponent from "./TextWithIcon.jsx";

export default {
  title: "Base/Text with Icon",
};

export const textWithArrow = () => (
  <ContainerFull>
    <TextWithIconComponent {...mockData} />
  </ContainerFull>
);

export const textWithArrowExternal = () => (
  <ContainerFull>
    <TextWithIconComponent {...mockData} icon="search-field" type="external" />
  </ContainerFull>
);

export const textWithArrowJumpLink = () => (
  <ContainerFull>
    <TextWithIconComponent {...mockData} type="jump" reverse={true} />
  </ContainerFull>
);

export const textWithArrowDownload = () => (
  <ContainerFull>
    <TextWithIconComponent {...mockData} type="download" />
  </ContainerFull>
);
