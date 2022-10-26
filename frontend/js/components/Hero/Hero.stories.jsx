import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import ContainerBleed from "../Container/ContainerBleed.jsx";
import mockData from "./mockData.js";
import Hero from "./Hero.jsx";

export default {
  title: "Components/Hero",
};

export const hero = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} theme={null} />
  </ContainerBleed>
);

export const heroTheme1 = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} theme={1} />
  </ContainerBleed>
);

export const heroTheme2 = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} theme={2} />
  </ContainerBleed>
);

export const heroTheme3 = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} theme={3} />
  </ContainerBleed>
);

export const heroTheme4 = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} theme={4} />
  </ContainerBleed>
);

export const heroVideoHeight = () => (
  <ContainerBleed>
    <Hero
      {...mockData.videoHero}
      hasVideo={true}
      hasImage={false}
      height="400px"
      video="/assets/Graybox-build/img/placeholders/paris.mp4"
    />
  </ContainerBleed>
);

export const heroVideo = () => (
  <ContainerBleed>
    <Hero
      {...mockData.videoHero}
      hasVideo={true}
      hasImage={false}
      video="/assets/Graybox-build/img/placeholders/paris.mp4"
    />
  </ContainerBleed>
);

export const heroHeight = () => (
  <ContainerBleed>
    <Hero {...mockData.imageHero} height="460px" />
  </ContainerBleed>
);
