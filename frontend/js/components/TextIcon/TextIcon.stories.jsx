import React from "react";
import mockData from "./TextIcon.mockData.js";
import TextIconComponent from "./TextIcon.jsx";
const Template = (args) => (
  <TextIconComponent
    classNames=""
    icon="check-circle"
    align="left"
    text="Test"
  />
);

export const TextIcon = Template.bind({});
TextIcon.args = {};

export default {
  title: "TextIcon",
  component: Template,
};
