import React from "react";
import { bool, func, number, string } from "prop-types";
import { isLastPage } from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";
import { onPageClick } from "../../../data/paging.js";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
  value: string || number,
  isDisabled: bool,
};

const PaginationLoadMore = (props) => {
  const {
    totalResults,
    resultsPerPage,
    currentPage,
    handlePageChange,
    value,
    isDisabled,
  } = props;
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);

  return (
    <div className="pagination">
      <Button
        as="button"
        btnType="filled"
        btnColor="light"
        size="xsm"
        disabled={isLast}
        onClick={() => onPageClick(value, isDisabled, handlePageChange)}
        classNames="pagination__load-more"
      >
        Load More
      </Button>
    </div>
  );
};

PaginationLoadMore.propTypes = propTypes;
export default PaginationLoadMore;
