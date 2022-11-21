import React from "react";
import mockData  from "./Accordion.mockData.js";
 
const Template = (args) => (
  <div className="js-accordion-mount"/>
);

export const Accordion = Template.bind({});
Accordion.args = {};

export default {
  title: "Accordion",
  component: Template,
};
