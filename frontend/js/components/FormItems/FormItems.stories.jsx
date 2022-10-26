import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

// import Checkbox from "./Checkbox.jsx";
import FileInput from "./FileInput.jsx";
import GeneralError from "./GeneralError.jsx";
import GeneralSuccess from "./GeneralSuccess.jsx";
import Legend from "./Legend.jsx";
import RadioCheckbox from "./RadioCheckbox.jsx";
import SelectInput from "./SelectInput.jsx";
import Textarea from "./Textarea.jsx";
import TextInput from "./TextInput.jsx";

export default {
  title: "Objects/Form Items",
};

export const fileInput = () => (
  <ContainerFull>
    <FileInput
      autocomplete=""
      error={false}
      errorMsg=""
      label="Select an Image to upload"
      name="sample-text"
      placeholder="upload image"
      required={false}
      showPassword={false}
      type="file"
      validationType="file"
      helperText=""
    />
  </ContainerFull>
);

export const generalError = () => (
  <ContainerFull>
    <GeneralError />
  </ContainerFull>
);

export const generalSuccess = () => (
  <ContainerFull>
    <GeneralSuccess />
  </ContainerFull>
);

export const legend = () => (
  <ContainerFull>
    <Legend
      legendTitle="Intrests - Single Group"
      legendBody="Form Group general description - Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipscing elit."
      messageTitle="Your Interests"
      messageBody="Sit phareta adipiscing condeimentum bibendum"
      messageIcon="check-square"
    />
  </ContainerFull>
);

export const checkbox = () => (
  <ContainerFull>
    <RadioCheckbox
      label="Selected Interest Item"
      name="sample-checkbox"
      type="checkbox"
      inputdescription="<span><strong>text detail</strong></span>"
      checked={true}
    />
  </ContainerFull>
);

export const radioButton = () => (
  <ContainerFull>
    <RadioCheckbox
      label="Selected Interest Item"
      name="sample-radio"
      type="radio"
      inputdescription="<span><strong>text detail</strong></span>"
      checked={true}
    />
  </ContainerFull>
);

export const selectInput = () => (
  <ContainerFull>
    <SelectInput
      autocomplete=""
      error={false}
      errorMsg=""
      label="Select Input"
      name="sample-select"
      readonly={false}
      required={true}
      validationType="text"
      matchName=""
      options={[
        {
          text: "option 1",
          value: "1",
        },
        {
          text: "option 2",
          value: "2",
        },
        {
          text: "option 3",
          value: "3",
        },
        {
          text: "option 4",
          value: "4",
        },
        {
          text: "option 5",
          value: "5",
        },
      ]}
    />
  </ContainerFull>
);

export const textInput = () => (
  <ContainerFull>
    <TextInput
      autocomplete="name"
      error={false}
      errorMsg=""
      label="Text Input"
      name="sample-text"
      placeholder="Enter some text"
      readonly={false}
      required={true}
      showPassword={false}
      type="text"
      validationType="text"
      matchName=""
    />
  </ContainerFull>
);

export const textArea = () => (
  <ContainerFull>
    <Textarea
      error={false}
      errorMsg=""
      label="Text Area"
      name="sample-text"
      required={true}
      value=""
    />
  </ContainerFull>
);

export const textInputError = () => (
  <ContainerFull>
    <TextInput
      autocomplete="name"
      error={true}
      errorMsg="Please enter your name"
      label="Name"
      name="name"
      placeholder="Name"
      readonly={false}
      required={true}
      showPassword={false}
      type="text"
      validationType="text"
      matchName=""
    />
  </ContainerFull>
);

export const textInputOptional = () => (
  <ContainerFull>
    <TextInput
      autocomplete="name"
      error={false}
      errorMsg="Please enter your name"
      label="Name"
      name="name"
      placeholder="Name"
      readonly={false}
      required={false}
      showPassword={false}
      type="text"
      validationType="text"
      matchName=""
    />
  </ContainerFull>
);

export const textInputPassword = () => (
  <ContainerFull>
    <TextInput
      autocomplete="password"
      error={false}
      errorMsg="Please enter your password"
      label="Password"
      name="password"
      placeholder=""
      readonly={false}
      required={true}
      showPassword={true}
      type="password"
      validationType="password"
      matchName=""
    />
  </ContainerFull>
);

export const textInputEmail = () => (
  <ContainerFull>
    <TextInput
      autocomplete="email"
      error={false}
      errorMsg="Please enter your email"
      label="Email"
      name="email"
      placeholder=""
      readonly={false}
      required={true}
      showPassword={true}
      type="text"
      validationType="email"
      matchName=""
    />
  </ContainerFull>
);
