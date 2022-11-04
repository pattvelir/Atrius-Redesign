import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";
 
// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
  theme: create({
    brandTitle: "Graybox site for Thread",
    brandUrl: "https://github.com/Velir/Thread-Sitecore",
  }),
});
