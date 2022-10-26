import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import Breadcrumbs from "./Breadcrumbs.jsx";

export default {
  title: "Components/Breadcrumb",
};

export const breadcrumb = () => (
  <ContainerFull>
    <Breadcrumbs items={["Lorem", "Ipsum", "Son Dolor", "Sit Amet Singh"]} />
  </ContainerFull>
);
