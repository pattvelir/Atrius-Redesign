import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import ContainerBleed from "../Container/ContainerBleed.jsx";
import mockData from "./mockData.js";
import TextBanner from "./TextBanner.jsx";

export default {
  title: "Components/Text Banner",
};

export const textBanner = () => (
  <React.Fragment>
    <p style={{ textDecoration: "underline" }}>Text Banner Theme 1</p>
    <ContainerBleed>
      <TextBanner {...mockData} colorPairs={null} />
    </ContainerBleed>

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Text Banner Theme 2
    </p>
    <ContainerBleed>
      <TextBanner {...mockData} colorPairs={null} theme={2} />
    </ContainerBleed>

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Text Banner Theme 3
    </p>
    <ContainerBleed>
      <TextBanner {...mockData} colorPairs={null} theme={3} />
    </ContainerBleed>

    <p style={{ textDecoration: "underline", marginTop: "50px" }}>
      Text Banner Theme 4
    </p>
    <ContainerBleed>
      <TextBanner {...mockData} colorPairs={null} theme={4} />
    </ContainerBleed>
  </React.Fragment>
);
