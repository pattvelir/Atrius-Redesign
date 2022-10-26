import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import EventLocation from "./EventLocation.jsx";

export default {
  title: "Components/Event Location",
};

export const eventLocation = () => (
  <ContainerFull>
    <EventLocation {...mockData} />
  </ContainerFull>
);
