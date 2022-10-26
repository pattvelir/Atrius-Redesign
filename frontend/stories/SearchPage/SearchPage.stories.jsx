import React from "react";
import mockSearchData from "../../js/components/SearchModules/Search/mockData.js";
import mockData from "./mockData.js";
import Search from "../../js/components/SearchModules/Search/Search.jsx";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";

export default {
  title: "Pages/Search Page",
};

export const search = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
    </ContainerFull>
    <ContainerFull>
      <Search {...mockSearchData} />
    </ContainerFull>
  </FullTemplate>
);

export const searchForDevelopers = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
    </ContainerFull>
    <ContainerFull>
      <Search
        {...mockSearchData}
        model={{
          ...mockSearchData.model,
          url: "http://localhost:4000",
          featuredUrl: "http://localhost:4000/featuredresults",
        }}
      />
    </ContainerFull>
  </FullTemplate>
);
