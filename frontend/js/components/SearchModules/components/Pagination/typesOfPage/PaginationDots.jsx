import React from "react";
import { func, number } from "prop-types";
import { pageBlock } from "../../../data/paging.js";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationDots = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);

  const getPage = (label, value, isDisabled, side, type) => {
    const active = isDisabled ? " pagination--active" : "";
    const dotsTemplate = (
      <button
        className={`pagination__dot${active}`}
        key={label}
        aria-current={isDisabled}
        onClick={() => onPageClick(value, isDisabled)}
        disabled={isDisabled}
      ></button>
    );

    return dotsTemplate;
  };

  const onPageClick = (pageNum, isDisabled) => {
    if (!isDisabled) {
      handlePageChange(pageNum);
    }
  };

  const pagnationDotesTemplate = (
    <nav className="pagination__dots pagination__container">
      {block.map((page) =>
        getPage(page.label, page.num, page.current, "", "dots"),
      )}
    </nav>
  );

  return <div className="pagination">{pagnationDotesTemplate}</div>;
};

PaginationDots.propTypes = propTypes;
export default PaginationDots;
