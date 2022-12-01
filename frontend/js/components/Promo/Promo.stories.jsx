import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import Promo from "./Promo.jsx";

export default {
  title: "Components/Promo",
};

export const promoImage = () => (
  <ContainerFull>
    <Promo {...mockData} />
  </ContainerFull>
);

export const promoNoImage = () => (
  <ContainerFull>
    <Promo {...mockData} />
  </ContainerFull>
);

export const promoImageCircle = () => (
  <ContainerFull>
    <Promo {...mockData} orientation="is-right" />
  </ContainerFull>
);
