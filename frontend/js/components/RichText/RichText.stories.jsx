import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import Container7030 from "../Container/Container7030.jsx";

import mockData from "./mockData.js";

import RichText from "./RichText.jsx";
import RichTextSample from "./RichTextSample.jsx";

export default {
  title: "Components / Rich Text",
};

export const richText = () => (
  <ContainerFull>
    <RichText {...mockData}>
      <RichTextSample {...mockData} short={true} />
    </RichText>
  </ContainerFull>
);

export const richTextMaxWidth650 = () => (
  <ContainerFull>
    <RichText {...mockData} maxWidth="650px">
      <RichTextSample {...mockData} />
    </RichText>
  </ContainerFull>
);

export const richTextIndent = () => (
  <ContainerFull>
    <RichText {...mockData} indent={true}>
      <RichTextSample {...mockData} />
    </RichText>
  </ContainerFull>
);

export const richTextEmbeds = () => (
  <ContainerFull>
    <RichText {...mockData}>
      <RichTextSample {...mockData} embeds={true} />
    </RichText>
  </ContainerFull>
);

export const richTextEmbedsIndent = () => (
  <ContainerFull>
    <RichText {...mockData} indent={true}>
      <RichTextSample {...mockData} embeds={true} />
    </RichText>
  </ContainerFull>
);

export const richTextComplete = () => (
  <ContainerFull>
    <RichText {...mockData} indent={true} maxWidth="650px">
      <RichTextSample {...mockData} short={false} embeds={true} />
    </RichText>
  </ContainerFull>
);
