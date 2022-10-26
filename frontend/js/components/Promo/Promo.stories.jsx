import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import Promo from "./Promo.jsx";

export default {
  title: "Components/Promo",
};

export const promoImageLeft = () => (
  <ContainerFull>
    <Promo {...mockData} />
  </ContainerFull>
);

export const promoImageRight = () => (
  <ContainerFull>
    <Promo {...mockData} orientation="is-right" />
  </ContainerFull>
);
