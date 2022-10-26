import React from "react";
import Button from "./Button.jsx";
import ContainerFull from "../Container/ContainerFull.jsx";

export default {
  title: "Base/Button",
  component: Button,
};

export const buttons = () => (
  <ContainerFull>
    <div style={{ margin: "10px 0" }}>
      <Button btnText="Base" btnType="" />
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnText="Primary" btnType="primary" />
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnText="Secondary" btnType="secondary" />
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnText="Ghost" btnType="ghost" />
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnText="Disabled" btnType="disabled" />
    </div>
    <div style={{ margin: "10px 0" }}>
      <a href="#" className="btn btn--link" title="Link Button Text">
        Link Button Text
      </a>
    </div>
  </ContainerFull>
);

export const primaryButton = () => (
  <ContainerFull>
    <Button btnText="Primary" btnType="primary" />
  </ContainerFull>
);
export const secondaryButton = () => (
  <ContainerFull>
    <Button btnText="Secondary" btnType="secondary" />
  </ContainerFull>
);
export const ghostButton = () => (
  <ContainerFull>
    <Button btnText="Ghost" btnType="ghost" />
  </ContainerFull>
);
export const disabledButton = () => (
  <ContainerFull>
    <Button btnText="Disabled" btnType="disabled" />
  </ContainerFull>
);
