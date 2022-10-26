import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";
import mockData from "./mockData.js";
import EmailSubscriptions from "./EmailSubscriptions.jsx";

export default {
  title: "Components/Account/Objects/Email Subscriptions",
};

export const emailSubscriptions = () => (
  <ContainerFull>
    <EmailSubscriptions {...mockData} />
  </ContainerFull>
);
