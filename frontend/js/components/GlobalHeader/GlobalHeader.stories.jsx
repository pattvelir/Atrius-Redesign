import React from "react";

import mockData from "./mockData.js";
import GlobalHeader from "./GlobalHeader.jsx";

export default {
  title: "Components/Global Header",
};

export const globalHeader = () => <GlobalHeader {...mockData} />;
