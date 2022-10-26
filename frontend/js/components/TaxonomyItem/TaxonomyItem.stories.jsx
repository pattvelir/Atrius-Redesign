import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import TaxonomyItem from "./TaxonomyItem.jsx";

export default {
  title: "Objects/Taxonomy Item",
};

export const taxonomyItem = () => (
  <ContainerFull>
    <TaxonomyItem name="Taxonomy" />
  </ContainerFull>
);
