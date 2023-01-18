import React from "react";
import { func, number } from "prop-types";
import { isLastPage, isFirstPage, pageBlock } from "../../../data/paging.js";
import { getPage } from "./GetPage.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationNumbers = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);

  return (
    <nav
      aria-label="Pagination"
      className="pagination__pages pagination__container"
    >
      <div>
        {getPage(
          "Previous",
          currentPage - 1,
          isFirst,
          "",
          "buttons",
          handlePageChange,
        )}
      </div>
      {block.map((page) =>
        getPage(
          page.label,
          page.num,
          page.current,
          "",
          "numbers",
          handlePageChange,
        ),
      )}
      <div>
        {getPage(
          "Next",
          currentPage + 1,
          isLast,
          "",
          "buttons",
          handlePageChange,
        )}
      </div>
    </nav>
  );
};

PaginationNumbers.propTypes = propTypes;
export default PaginationNumbers;
