import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import PullQuote from "./PullQuote.jsx";

export default {
  title: "Components/Pull Quote",
};

export const pullQuote = () => (
  <ContainerFull>
    <PullQuote {...mockData} />
  </ContainerFull>
);
