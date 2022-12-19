import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

export default {
  title: "Base/Typography",
};

export const headings = () => (
  <>
    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>Headings</h1>
      <h1>Heading Level 1</h1>
      <h2>Heading Level 2</h2>
      <h3>Heading Level 3</h3>
      <h4>Heading Level 4</h4>
      <h5>Heading Level 5</h5>
      <h6>Heading Level 6</h6>
    </ContainerFull>
  </>
);

export const OtherClasses = () => (
  <>
    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>SubHeading</h1>
      <div className="sub-heading-a">sub-heading-a</div>
      <div className="sub-heading-b">sub-heading-b</div>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>Title</h1>
      <div className="title-a">title-a</div>
      <div className="title-b">title-b</div>
      <div className="title-c">title-c</div>
      <div className="title-d">title-d</div>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>Body</h1>
      <div className="body-xl">body-xl</div>
      <div className="body-lg">body-lg</div>
      <div className="body-md">body-md</div>
      <div className="body-sm">body-sm</div>
      <div className="body-xsm">body-xsm</div>
      <div className="body-xxsm">body-xxsm</div>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>UI Elements</h1>
      <div className="label-ui-lg">label-ui-lg</div>
      <div className="label-ui-md">label-ui-md</div>
      <div className="label-ui-sm">label-ui-sm</div>
      <div className="label-ui-xsm">label-ui-xsm</div>
      <div className="label-ui-xxsm">label-ui-xxsm</div>
      <div className="label-ui-xxxsm">label-ui-xxxsm</div>
    </ContainerFull>

    <ContainerFull style={{ marginBottom: "100px" }}>
      <h1>Meta</h1>
      <div className="meta-a">meta-a</div>
      <div className="meta-b">meta-b</div>
      <div className="meta-c">meta-c</div>
    </ContainerFull>
  </>
);
