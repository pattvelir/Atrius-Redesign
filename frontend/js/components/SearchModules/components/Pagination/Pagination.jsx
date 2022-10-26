import React from "react";
import { func, number } from "prop-types";
import {
  isLastPage,
  isFirstPage,
  totalPages,
  pageBlock,
} from "../../data/paging.js";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const Pagination = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);
  const lastPage = totalPages(totalResults, resultsPerPage);

  const getPage = (label, value, isDisabled) => {
    return (
      <button
        className="btn btn--link"
        key={label}
        type="button"
        aria-current={isDisabled}
        onClick={() => onPageClick(value, isDisabled)}
        disabled={isDisabled}
      >
        {label}
      </button>
    );
  };

  const onPageClick = (pageNum, isDisabled) => {
    if (!isDisabled) {
      handlePageChange(pageNum);
    }
  };

  return (
    <div className="pagination">
      <nav aria-label="Pagination" className="pagination__pages">
        {getPage("<< First", 1, isFirst)}
        {getPage("< Previous", currentPage - 1, isFirst)}
        {block.map((page) => getPage(page.label, page.num, page.current))}
        {getPage("Next >", currentPage + 1, isLast)}
        {getPage("Last >>", lastPage, isLast)}
      </nav>
    </div>
  );
};

Pagination.propTypes = propTypes;
export default Pagination;
