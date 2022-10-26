import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import BackToTop from "./BackToTop.jsx";

export default {
  title: "Components/Back To Top",
};

export const backToTop = () => (
  <ContainerFull style={{ height: "2000px" }}>
    <h2 id="main-content">Scroll this page to see the back button appear</h2>
    <BackToTop />
  </ContainerFull>
);
