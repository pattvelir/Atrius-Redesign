import React from "react";
import { func, number } from "prop-types";
import {
  isLastPage,
  isFirstPage,
  totalPages,
  pageBlock,
} from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationNumbersOf = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);

  const getPage = (label, value, isDisabled, side, type) => {
    const arrow =
      side !== ""
        ? `icon${side.charAt(0).toUpperCase() + side.slice(1)}="${side}-arrow"`
        : "";
    const getBtnType = side === "" ? "link" : "filled";
    const active = isDisabled ? "pagination--active" : "";
    const numbersTemplate = (
      <button
        key={label}
        aria-current={isDisabled}
        onClick={() => onPageClick(value, isDisabled)}
        disabled={isDisabled}
        className={`${active} pagination__number`}
      >
        {label}
      </button>
    );
    const buttonsTemplate = (
      <Button
        as="button"
        btnType={getBtnType}
        btnColor="light"
        key={label}
        aria-current={isDisabled}
        onClick={() => onPageClick(value, isDisabled)}
        disabled={isDisabled}
        size="full"
      >
        {label}
      </Button>
    );
    const typeOfPage = {
      numbers: numbersTemplate,
      buttons: buttonsTemplate,
    };
    return typeOfPage[type];
  };

  const onPageClick = (pageNum, isDisabled) => {
    if (!isDisabled) {
      handlePageChange(pageNum);
    }
  };

  return (
    <div className="pagination">
      <nav
        aria-label="Pagination"
        className="pagination__pages pagination__container"
      >
        <div>
          {getPage("Previous", currentPage - 1, isFirst, "left", "buttons")}
        </div>
        {getPage(block[0].label, block[0].num, block[0].current, "", "numbers")}
        <span>of</span>
        {getPage(
          block[block.length - 1].label,
          block[block.length - 1].num,
          block[block.length - 1].current,
          "",
          "numbers",
        )}
        <div>
          {getPage("Next", currentPage + 1, isLast, "right", "buttons")}
        </div>
      </nav>
    </div>
  );
};

PaginationNumbersOf.propTypes = propTypes;
export default PaginationNumbersOf;
