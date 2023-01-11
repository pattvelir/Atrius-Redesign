import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import Pagination from "./Pagination.jsx";

export default {
  title: "Objects/Pagination",
};

export const Default = () => (
  <ContainerFull style={{ height: "2000px" }}>
    <Pagination />
  </ContainerFull>
);
