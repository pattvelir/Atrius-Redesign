import React from "react";
import Button from "./Button.jsx";
import ContainerFull from "../Container/ContainerFull.jsx";
import Icon from "../Icon/Icon.jsx";

export default {
  title: "Base/Button",
  component: Button,
};

export const buttons = () => (
  <ContainerFull>
    <div style={{ margin: "10px 0" }}>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Filled Dark
      </Button>

      <Button
        btnType="filled"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Filled Light
      </Button>
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button
        btnType="outline"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Outline Dark
      </Button>

      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Outline Light
      </Button>
      <div>
        <Button
          btnType="link"
          btnColor="dark"
          iconLeft="close"
          iconRight="close"
        >
          Link Dark
        </Button>

        <Button
          btnType="link"
          btnColor="light"
          iconLeft="close"
          iconRight="close"
        >
          Link Light
        </Button>
      </div>
    </div>

    <p>XSM</p>
    <div style={{ margin: "10px 0" }}>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        Filled Dark
      </Button>

      <Button
        btnType="filled"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        Filled Light
      </Button>
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button
        btnType="outline"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        outline Dark
      </Button>

      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        outline Light
      </Button>
    </div>

    <p>Search</p>
    <div style={{ margin: "10px 0" }}>
      <Button btnType="filled" btnColor="dark" iconRight="close" size="xxsm">
        Filled Dark
      </Button>

      <Button btnType="filled" btnColor="light" iconRight="close" size="xxsm">
        Filled Light
      </Button>
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnType="outline" btnColor="dark" iconRight="close" size="xxsm">
        outline Dark
      </Button>

      <Button btnType="outline" btnColor="light" iconRight="close" size="xxsm">
        outline Light
      </Button>
    </div>

    <p>Icon</p>
    <div style={{ margin: "10px 0" }}>
      <Button btnType="filled" btnColor="dark" icon>
        <Icon iconName="chevron-down" />
      </Button>

      <Button btnType="filled" btnColor="light" icon>
        <Icon iconName="chevron-down" />
      </Button>
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnType="outline" btnColor="dark" icon>
        <Icon iconName="chevron-down" />
      </Button>

      <Button btnType="outline" btnColor="light" icon>
        <Icon iconName="chevron-down" />
      </Button>

      <Button btnType="filled" btnColor="dark" icon size="sm">
        <Icon iconName="chevron-down" />
      </Button>
    </div>
  </ContainerFull>
);

export const typesButton = () => (
  <>
    <ContainerFull>
      <h1>Regular</h1>
      <p style={{ margin: "16px" }}>Filled</p>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Dark
      </Button>

      <Button
        btnType="filled"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Light
      </Button>

      <p>Outline</p>
      <div style={{ background: "#333", display: "inline-block" }}>
        <Button
          btnType="outline"
          btnColor="dark"
          iconLeft="chevron-down"
          iconRight="chevron-down"
        >
          Dark
        </Button>
      </div>
      <div style={{ display: "inline-block" }}>
        <Button
          btnType="outline"
          btnColor="light"
          iconLeft="chevron-down"
          iconRight="chevron-down"
        >
          Light
        </Button>
      </div>
      <p>Link</p>
      <div style={{ background: "#333", display: "inline-block" }}>
        <Button
          btnType="link"
          btnColor="dark"
          iconLeft="chevron-down"
          iconRight="chevron-down"
        >
          Dark
        </Button>
      </div>
      <div style={{ display: "inline-block" }}>
        <Button
          btnType="link"
          btnColor="light"
          iconLeft="chevron-down"
          iconRight="chevron-down"
        >
          Light
        </Button>
      </div>
    </ContainerFull>
    <ContainerFull style={{ marginTop: "40px" }}>
      <h1>Icon</h1>
      <p>Filled</p>
      <Button btnType="filled" btnColor="dark" icon>
        <Icon iconName="chevron-down" />
      </Button>

      <Button btnType="filled" btnColor="light" icon>
        <Icon iconName="chevron-down" />
      </Button>

      <p>Outline</p>
      <div style={{ background: "#333", display: "inline-block" }}>
        <Button btnType="outline" btnColor="dark" icon>
          <Icon iconName="chevron-down" />
        </Button>
      </div>
      <div style={{ display: "inline-block" }}>
        <Button btnType="outline" btnColor="light" icon>
          <Icon iconName="chevron-down" />
        </Button>
      </div>
      <p>Link</p>
      <div style={{ background: "#333", display: "inline-block" }}>
        <Button btnType="link" btnColor="dark" icon>
          <Icon iconName="chevron-down" />
        </Button>
      </div>
      <div style={{ display: "inline-block" }}>
        <Button btnType="link" btnColor="light" icon>
          <Icon iconName="chevron-down" />
        </Button>
      </div>
    </ContainerFull>
  </>
);
export const sizesButton = () => (
  <>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>Default</h2>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Filled
      </Button>
      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Outline
      </Button>
      <Button
        btnType="link"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        Link
      </Button>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>No Padding</h2>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="no-padding"
      >
        Filled
      </Button>
      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="no-padding"
      >
        Outline
      </Button>
      <Button
        btnType="link"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="no-padding"
      >
        Link
      </Button>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>Small</h2>
      <Button btnType="filled" btnColor="dark" size="sm" icon>
        <Icon iconName="chevron-down" />
      </Button>
      <Button btnType="outline" btnColor="light" size="sm" icon>
        <Icon iconName="chevron-down" />
      </Button>
      <Button btnType="link" btnColor="light" size="sm" icon>
        <Icon iconName="chevron-down" />
      </Button>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>XSM</h2>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        Filled
      </Button>
      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        Outline
      </Button>
      <Button
        btnType="link"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xsm"
      >
        Link
      </Button>
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>XXSM (search)</h2>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xxsm"
      >
        Filled
      </Button>
      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xxsm"
      >
        Outline
      </Button>
      <Button
        btnType="link"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        size="xxsm"
      >
        Link
      </Button>
    </ContainerFull>
  </>
);
export const specialButton = () => (
  <>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>Search</h2>
      <Button btnType="filled" btnColor="dark" iconRight="close" size="xxsm">
        Filled Dark
      </Button>

      <Button btnType="filled" btnColor="light" iconRight="close" size="xxsm">
        Filled Light
      </Button>
      <Button btnType="outline" btnColor="dark" iconRight="close" size="xxsm">
        outline Dark
      </Button>

      <Button btnType="outline" btnColor="light" iconRight="close" size="xxsm">
        outline Light
      </Button>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "80px" }}>
      <h2>Icon</h2>
      <Button btnType="filled" btnColor="dark" icon>
        <Icon iconName="chevron-down" />
      </Button>
      <Button btnType="filled" btnColor="light" icon>
        <Icon iconName="chevron-down" />
      </Button>
      <Button btnType="outline" btnColor="dark" icon>
        <Icon iconName="chevron-down" />
      </Button>
      <Button btnType="outline" btnColor="light" icon>
        <Icon iconName="chevron-down" />
      </Button>
    </ContainerFull>
  </>
);
export const disabledButton = () => (
  <>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <Button
        btnType="filled"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Dark Disabled
      </Button>
      <Button
        btnType="filled"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Light Disabled
      </Button>
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <Button
        btnType="outline"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Dark Disabled
      </Button>
      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Light Disabled
      </Button>
    </ContainerFull>
    <ContainerFull style={{ marginBottom: "80px" }}>
      <Button
        btnType="link"
        btnColor="dark"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Dark Disabled
      </Button>
      <Button
        btnType="link"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
        disabled
      >
        Light Disabled
      </Button>
    </ContainerFull>
  </>
);
