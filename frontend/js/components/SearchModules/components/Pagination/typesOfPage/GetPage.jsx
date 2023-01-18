import React from "react";
import { onPageClick } from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";

export const getPage = (
  label,
  value,
  isDisabled,
  side,
  type,
  handlePageChange,
) => {
  const arrow = {} || "";
  const getBtnType = side === "" ? "link" : "filled";
  const active = isDisabled ? "pagination--active" : "";

  if (side !== "") {
    arrow[
      `icon${side.charAt(0).toUpperCase() + side.slice(1)}`
    ] = `${side}-arrow`;
  }

  const dotsTemplate = (
    <button
      className={`pagination__dot ${active}`}
      key={label}
      aria-current={isDisabled}
      onClick={() => onPageClick(value, isDisabled, handlePageChange)}
      disabled={isDisabled}
    ></button>
  );
  const numbersTemplate = (
    <button
      key={label}
      aria-current={isDisabled}
      onClick={() => onPageClick(value, isDisabled, handlePageChange)}
      disabled={isDisabled}
      className={`${active} pagination__number`}
    >
      {label}
    </button>
  );
  const buttonsTemplate = (
    <Button
      {...arrow}
      as="button"
      btnType="filled"
      btnColor="light"
      key={label}
      aria-current={isDisabled}
      onClick={() => onPageClick(value, isDisabled, handlePageChange)}
      disabled={isDisabled}
      size="xsm"
    >
      {label}
    </Button>
  );
  const typeOfPage = {
    dots: dotsTemplate,
    numbers: numbersTemplate,
    buttons: buttonsTemplate,
  };
  return typeOfPage[type];
};
