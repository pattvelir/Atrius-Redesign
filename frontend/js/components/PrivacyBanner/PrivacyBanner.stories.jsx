import React from "react";
import mockData from "./mockData.js";

import PrivacyBanner from "./PrivacyBanner.jsx";

export default {
  title: "Components/Privacy Banner",
};

export const privacyBanner = () => <PrivacyBanner {...mockData} />;
