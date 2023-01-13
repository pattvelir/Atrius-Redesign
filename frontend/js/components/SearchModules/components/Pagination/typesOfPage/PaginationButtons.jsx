import React from "react";
import { func, number } from "prop-types";
import { isLastPage, isFirstPage } from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationButtons = (props) => {
  const {
    totalResults,
    resultsPerPage,
    currentPage,
    handlePageChange,
    seeMore,
  } = props;
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);

  const prevNextTemplate = (
    <>
      <Button
        btnType="filled"
        btnColor="light"
        iconLeft="left-arrow"
        disabled={isFirst}
        onClick={handlePageChange}
      >
        Previous
      </Button>
      <Button
        btnType="filled"
        btnColor="light"
        iconRight="right-arrow"
        disabled={isLast}
        onClick={handlePageChange}
      >
        Next
      </Button>
    </>
  );
  const seeMoreTemplate = (
    <Button btnType="outline" btnColor="light" href="#">
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
