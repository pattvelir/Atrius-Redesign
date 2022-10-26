import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import mockData from "./mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";
import Container3070 from "../../js/components/Container/Container3070.jsx";

import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";
import PageMeta from "../../js/components/PageMeta/PageMeta.jsx";
import SecondaryNav from "../../js/components/SecondaryNav/SecondaryNav.jsx";
import RichText from "../../js/components/RichText/RichText.jsx";
import RichTextSample from "../../js/components/RichText/RichTextSample.jsx";

export default {
  title: "Pages/Detail Page",
  component: FullTemplate,
};

export const detailPage = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
      <PageMeta {...mockData.pageMeta} />
    </ContainerFull>
    <Container3070
      left={<SecondaryNav {...mockData.secondaryNav} />}
      right={
        <RichText {...mockData}>
          <RichTextSample {...mockData} embeds={true} />
        </RichText>
      }
    />
  </FullTemplate>
);
