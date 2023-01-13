import React from "react";
import { bool, func, number, string } from "prop-types";
import { isLastPage, isFirstPage, onPageClick } from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
  seeMore: bool,
  value: string || number,
  isDisabled: bool,
};

const PaginationButtons = (props) => {
  const {
    totalResults,
    resultsPerPage,
    currentPage,
    handlePageChange,
    seeMore,
    value,
    isDisabled,
  } = props;
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);

  const prevNextTemplate = (
    <>
      <Button
        as="button"
        btnType="filled"
        btnColor="light"
        iconLeft="left-arrow"
        disabled={isFirst}
        onClick={() => onPageClick(value, isDisabled, handlePageChange)}
        size="xsm"
      >
        Previous
      </Button>
      <Button
        as="button"
        btnType="filled"
        btnColor="light"
        iconRight="right-arrow"
        disabled={isLast}
        onClick={() => onPageClick(value, isDisabled, handlePageChange)}
        size="xsm"
      >
        Next
      </Button>
    </>
  );
  const seeMoreTemplate = (
    <Button btnType="outline" btnColor="light" href="#" size="xsm">
      See All
    </Button>
  );

  return (
    <div className="pagination">
      <nav className="pagination__arrows pagination__container">
        {prevNextTemplate}
        {seeMore && seeMoreTemplate}
      </nav>
    </div>
  );
};

PaginationButtons.propTypes = propTypes;
export default PaginationButtons;
