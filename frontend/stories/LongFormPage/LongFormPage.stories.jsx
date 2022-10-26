import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import mockData from "./mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";

import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";
import PageMeta from "../../js/components/PageMeta/PageMeta.jsx";
import RichText from "../../js/components/RichText/RichText.jsx";
import RichTextSample from "../../js/components/RichText/RichTextSample.jsx";

export default {
  title: "Pages/Long Form Page",
  component: FullTemplate,
};

export const longFormPage = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
      <PageMeta {...mockData.pageMeta} />
      <RichText {...mockData} indent={true} maxWidth="850px">
        <RichTextSample {...mockData} short={false} embeds={true} />
      </RichText>
    </ContainerFull>
  </FullTemplate>
);
