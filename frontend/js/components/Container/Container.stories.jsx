import React from "react";
import { node } from "prop-types";
import ContainerFull from "./ContainerFull.jsx";
import ContainerBleed from "./ContainerBleed.jsx";
import Container3070 from "./Container3070.jsx";
import Container5050 from "./Container5050.jsx";
import Container7030 from "./Container7030.jsx";

export default {
  title: "Containers/Containers",
};

const FakeComponent = (props) => (
  <div
    className="fake-component"
    style={{
      outline: "2px dashed #ddd",
      height: "160px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {props.children}
  </div>
);

FakeComponent.propTypes = { children: node };

const FakeComponentLight = (props) => (
  <div
    className="fake-component fake-component--dark-theme"
    style={{
      outline: "2px dashed #ccc",
      color: "#fff",
      height: "160px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {props.children}
  </div>
);

FakeComponentLight.propTypes = { children: node };

export const allContainers = () => (
  <div className="main-content-wrapper">
    {/* <ContainerBleed backgroundColor="#777">
      <FakeComponentLight>Container Bleed Background 777</FakeComponentLight>
    </ContainerBleed>
    <ContainerBleed backgroundColor="#0c4456">
      <FakeComponentLight>
        Container Bleed Background Blue and following another has-background
        component
      </FakeComponentLight>
    </ContainerBleed> */}
    <ContainerBleed>
      <FakeComponent>Container Bleed</FakeComponent>
    </ContainerBleed>

    <ContainerFull>
      <FakeComponent>Container Full</FakeComponent>
    </ContainerFull>

    <Container5050
      left={<FakeComponent>Container 50/50 - Left</FakeComponent>}
      right={<FakeComponent>Container 50/50 - Right</FakeComponent>}
    />

    <Container3070
      left={<FakeComponent>Container 30/70 - Left</FakeComponent>}
      right={<FakeComponent>Container 30/70 - Right</FakeComponent>}
    />

    <Container7030
      left={<FakeComponent>Container 70/30 - Left</FakeComponent>}
      right={<FakeComponent>Container 70/30 - Right</FakeComponent>}
    />

    <ContainerFull>
      <FakeComponent>
        Container Full with nested component and 50/50 container
      </FakeComponent>
      <Container5050
        left={<FakeComponent>Container 50/50 - Left</FakeComponent>}
        right={<FakeComponent>Container 50/50 - Right</FakeComponent>}
      />
    </ContainerFull>

    <ContainerBleed>
      <ContainerFull>
        <FakeComponent>
          Container Bleed - with Nested Full, 50/50, and 70/30 containers
        </FakeComponent>
      </ContainerFull>
      <Container5050
        left={<FakeComponent>Container 50/50 - Left</FakeComponent>}
        right={<FakeComponent>Container 50/50 - Right</FakeComponent>}
      />
      <Container7030
        left={<FakeComponent>Container 70/30 - Left</FakeComponent>}
        right={<FakeComponent>Container 70/30 - Right</FakeComponent>}
      />
    </ContainerBleed>
  </div>
);

export const fullWidthBleedContainer = () => (
  <ContainerBleed>
    <FakeComponent>Bleed Container</FakeComponent>
  </ContainerBleed>
);

// export const fullWidthBleedContainerWithBackground = () => (
//   <ContainerBleed backgroundColor="#0c4456">
//     <FakeComponentLight>Container Bleed Background</FakeComponentLight>
//   </ContainerBleed>
// );

export const fullWidthContainer = () => (
  <ContainerFull>
    <FakeComponent>Container full</FakeComponent>
  </ContainerFull>
);

export const splitContainer5050 = () => (
  <Container5050
    left={<FakeComponent>50 - Left</FakeComponent>}
    right={<FakeComponent>50 - Right</FakeComponent>}
  />
);

export const splitContainer7030 = () => (
  <Container7030
    left={<FakeComponent>70 - Left</FakeComponent>}
    right={<FakeComponent>30 - Right</FakeComponent>}
  />
);

export const splitContainer3070 = () => (
  <Container3070
    left={<FakeComponent>30 - Left</FakeComponent>}
    right={<FakeComponent>70 - Right</FakeComponent>}
  />
);
