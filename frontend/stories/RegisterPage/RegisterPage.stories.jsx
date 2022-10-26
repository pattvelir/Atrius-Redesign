import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import mockData from "./mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";

import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";
import FormRegistration from "../../js/components/Form/FormRegistration.jsx";

export default {
  title: "Pages/Form Page",
};

export const formPage = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
    </ContainerFull>
    <ContainerFull>
      <FormRegistration {...mockData.formData.form} />
    </ContainerFull>
  </FullTemplate>
);
