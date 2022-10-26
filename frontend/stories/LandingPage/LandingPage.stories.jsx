import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import landingData from "./landingData.js";
import eventsListingData from "./eventsListingData.js";
import mockData from "../../js/components/SearchModules/DynamicContentListing/mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";
import ContainerBleed from "../../js/components/Container/ContainerBleed.jsx";
import Container7030 from "../../js/components/Container/Container7030.jsx";

import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import DynamicContentListing from "../../js/components/SearchModules/DynamicContentListing/DynamicContentListing.jsx";
import MultiPromo from "../../js/components/MultiPromo/MultiPromo.jsx";
import PageBanner from "../../js/components/PageBanner/PageBanner.jsx";

import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";

export default {
  title: "Pages/Landing Page",
};

export const eventsListingPage = () => (
  <FullTemplate>
    <ContainerFull>
      <PageHeader {...eventsListingData.pageTitle} />
      <DynamicContentListing {...mockData} />
    </ContainerFull>
  </FullTemplate>
);

export const eventsListingPageLocalDev = () => (
  <FullTemplate>
    <ContainerFull>
      <PageHeader {...eventsListingData.pageTitle} />
      <DynamicContentListing
        {...mockData}
        model={{
          ...mockData.model,
          url: "http://localhost:4000",
          featuredUrl: "http://localhost:4000/featuredresults",
        }}
      />
    </ContainerFull>
  </FullTemplate>
);

export const landingPage = () => (
  <FullTemplate headerAdjacent={true}>
    <ContainerBleed>
      <PageBanner {...landingData.pageBanner} />
    </ContainerBleed>
    <Container7030
      left={<Breadcrumbs items={["Home", "Why Choose Us"]} />}
      right={" "}
    />
    <ContainerFull>
      <MultiPromo {...landingData.multiPromo} />
    </ContainerFull>
  </FullTemplate>
);
