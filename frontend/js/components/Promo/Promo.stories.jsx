import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import Promo from "./Promo.jsx";

export default {
  title: "Components/Promo",
  argTypes: {
    theme: {
      options: [
        "theme1",
        "theme2",
        "theme3",
        "theme4",
        "theme5",
        "theme6",
        "theme7",
        "theme8",
      ],
      control: { type: "select" },
      defaultValue: "theme5",
    },
  },
};

export const promoImage = (args) => (
  <>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[0]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[1]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[2]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull style={{ maxWidth: "700px" }}>
      <Promo {...mockData[3]} type="image" theme={args.theme} />
    </ContainerFull>
  </>
);

export const promoNoImage = (args) => (
  <>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[0]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[1]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[2]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull style={{ maxWidth: "700px" }}>
      <Promo {...mockData[3]} theme={args.theme} type="no-image" />
    </ContainerFull>
  </>
);

export const promoImageCircle = (args) => (
  <>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[4]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[5]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "32px", maxWidth: "700px" }}>
      <Promo {...mockData[6]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull style={{ maxWidth: "700px" }}>
      <Promo {...mockData[7]} theme={args.theme} type="circle" />
    </ContainerFull>
  </>
);
