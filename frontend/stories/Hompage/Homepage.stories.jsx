import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import mockData from "./mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";
import ContainerBleed from "../../js/components/Container/ContainerBleed.jsx";
import Container3070 from "../../js/components/Container/Container3070.jsx";
import Container5050 from "../../js/components/Container/Container5050.jsx";

import ContentList from "../../js/components/ContentList/ContentList.jsx";
import Hero from "../../js/components/Hero/Hero.jsx";
import TextBanner from "../../js/components/TextBanner/TextBanner.jsx";
import SlideShow from "../../js/components/SlideShow/SlideShow.jsx";

export default {
  title: "Pages/Homepage",
  component: FullTemplate,
};

export const homepage = () => (
  <FullTemplate headerAdjacent={true}>
    <ContainerBleed>
      <Hero {...mockData.hero1} />
      <TextBanner {...mockData.textBanner1} />
    </ContainerBleed>
    <Container5050
      left={<ContentList {...mockData.contentList} />}
      right={<ContentList {...mockData.contentList} />}
    />
    <ContainerFull>
      <SlideShow {...mockData.slideShow} />
    </ContainerFull>
  </FullTemplate>
);
