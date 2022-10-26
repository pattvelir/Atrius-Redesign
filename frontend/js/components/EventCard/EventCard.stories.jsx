import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import EventCard from "./EventCard.jsx";

export default {
  title: "Components/Event Details",
};

export const eventDetails = () => (
  <ContainerFull>
    <EventCard {...mockData} />
  </ContainerFull>
);
