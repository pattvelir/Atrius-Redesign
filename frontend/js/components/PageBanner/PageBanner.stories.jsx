import React from "react";
import ContainerBleed from "../Container/ContainerBleed.jsx";
import mockData from "./mockData.js";
import PageBanner from "./PageBanner.jsx";

export default {
  title: "Components/Page Banner",
};

export const pageBanner = () => (
  <ContainerBleed>
    <PageBanner {...mockData} colorPairs={null} />
  </ContainerBleed>
);

export const pageBannerBackgroundColor = () => (
  <ContainerBleed>
    <PageBanner {...mockData} />
  </ContainerBleed>
);

export const pageBannerVideoHeight = () => (
  <ContainerBleed>
    <PageBanner
      {...mockData}
      hasVideo={true}
      hasImage={false}
      height="400px"
      colorPairs={null}
      video={`${window.assetsFolder}/img/placeholders/paris.mp4`}
    />
  </ContainerBleed>
);

export const pageBannerVideo = () => (
  <ContainerBleed>
    <PageBanner
      {...mockData}
      hasVideo={true}
      hasImage={false}
      colorPairs={null}
      video={`${window.assetsFolder}/img/placeholders/paris.mp4`}
    />
  </ContainerBleed>
);

export const pageBannerHeight = () => (
  <ContainerBleed>
    <PageBanner {...mockData} height="400px" />
  </ContainerBleed>
);
