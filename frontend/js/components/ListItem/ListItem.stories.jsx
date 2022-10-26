import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import ListItem from "./ListItem.jsx";
import mockData from "./mockData.js";

export default {
  title: "Objects/List Item",
};

export const listItem = () => (
  <ContainerFull>
    <ListItem
      orientation="is-right"
      contentType="Scutums persuadere"
      title="Terrors cadunt in quadrata! Cur adelphis cantare?"
      description="Vitas mori. Albus orexiss ducunt ad gabalium. Ubi est altus nomen? Liberi de castus bubo, pugna species! Persuadere diligenter ducunt ad bi-color barcas."
      date="November 09, 2016"
      location="Placename, PL"
      authors={["Alexander Hamilton", "James Madison", "John Jay"]}
      media="https://via.placeholder.com/240x240 1x, https://via.placeholder.com/480x480 2x"
    />
  </ContainerFull>
);

export const listItemNoImage = () => (
  <ContainerFull>
    <ListItem
      orientation="is-right"
      contentType="Scutums persuadere"
      title="Terrors cadunt in quadrata! Cur adelphis cantare?"
      description="Vitas mori. Albus orexiss ducunt ad gabalium. Ubi est altus nomen? Liberi de castus bubo, pugna species! Persuadere diligenter ducunt ad bi-color barcas."
      date="November 09, 2016"
      location="Placename, PL"
      authors={["Alexander Hamilton", "James Madison", "John Jay"]}
      media={null}
    />
  </ContainerFull>
);
