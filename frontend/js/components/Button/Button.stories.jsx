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
        outline Dark
      </Button>

      <Button
        btnType="outline"
        btnColor="light"
        iconLeft="chevron-down"
        iconRight="chevron-down"
      >
        outline Light
      </Button>
      <div>
        <Button
          btnType="link"
          btnColor="dark"
          iconLeft="close"
          iconRight="close"
          size="search"
        >
          Link Dark
        </Button>

        <Button
          btnType="link"
          btnColor="light"
          iconLeft="close"
          iconRight="close"
          size="search"
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
      <Button btnType="filled" btnColor="dark" iconRight="close" size="search">
        Filled Dark
      </Button>

      <Button btnType="filled" btnColor="light" iconRight="close" size="search">
        Filled Light
      </Button>
    </div>
    <div style={{ margin: "10px 0" }}>
      <Button btnType="outline" btnColor="dark" iconRight="close" size="search">
        outline Dark
      </Button>

      <Button
        btnType="outline"
        btnColor="light"
        iconRight="close"
        size="search"
      >
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
  <ContainerFull>
    <p>Filled</p>
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
);
export const sizesButton = () => (
  <ContainerFull>
    <Button btnType="secondary">Secondary</Button>
  </ContainerFull>
);
export const specialButton = () => (
  <ContainerFull>
    <Button btnType="outline">Outline</Button>
  </ContainerFull>
);
export const disabledButton = () => (
  <ContainerFull>
    <Button btnType="disabled">Disabled</Button>
  </ContainerFull>
);
