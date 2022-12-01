import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import Promo from "./Promo.jsx";

export default {
  title: "Components/Promo",
  argTypes: {
    theme: {
      options: ["theme1", "theme2", "theme3", "theme4"],
      control: { type: "select" },
      defaultValue: "theme1",
    },
  },
};

export const promoImage = (args) => (
  <>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[0]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[1]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[2]} type="image" theme={args.theme} />
    </ContainerFull>
    <ContainerFull>
      <Promo {...mockData[3]} type="image" theme={args.theme} />
    </ContainerFull>
  </>
);

export const promoNoImage = (args) => (
  <>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[0]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[1]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[2]} theme={args.theme} type="no-image" />
    </ContainerFull>
    <ContainerFull>
      <Promo {...mockData[3]} theme={args.theme} type="no-image" />
    </ContainerFull>
  </>
);

export const promoImageCircle = (args) => (
  <>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[4]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[5]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull className="add-storybook-margin">
      <Promo {...mockData[6]} theme={args.theme} type="circle" />
    </ContainerFull>
    <ContainerFull>
      <Promo {...mockData[7]} theme={args.theme} type="circle" />
    </ContainerFull>
  </>
);
