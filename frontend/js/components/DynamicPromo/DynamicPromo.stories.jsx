import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "../Promo/mockData.js";
import Promo from "../Promo/Promo.jsx";

export default {
  title: "Components/Dynamic Promo",
};

export const DynamicPromo = () => (
  <ContainerFull>
    <Promo {...mockData} />
  </ContainerFull>
);
