import React from "react";
import ContainerFull from "../../../js/components/Container/ContainerFull.jsx";

import FullTemplate from "./FullTemplate.jsx";

export default {
  title: "Pages/Page Template",
  component: FullTemplate,
};

export const baseTemplate = () => (
  <FullTemplate>
    <ContainerFull>
      <h1>Main Content</h1>
      <p>Components and Containers go here</p>
    </ContainerFull>
  </FullTemplate>
);
