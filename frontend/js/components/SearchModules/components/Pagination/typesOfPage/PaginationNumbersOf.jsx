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

const PaginationNumbersOf = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);
  const isFirst = isFirstPage(currentPage);

  return (
    <div className="pagination">
      <nav
        aria-label="Pagination"
        className="pagination__pages pagination__container"
      >
        <div>
          {getPage(
            "Previous",
            currentPage - 1,
            isFirst,
            "left",
            "buttons",
            handlePageChange,
          )}
        </div>
        {getPage(
          block[0].label,
          block[0].num,
          block[0].current,
          "",
          "numbers",
          handlePageChange,
        )}
        <span>of</span>
        {getPage(
          block[block.length - 1].label,
          block[block.length - 1].num,
          block[block.length - 1].current,
          "",
          "numbers",
          handlePageChange,
        )}
        <div>
          {getPage(
            "Next",
            currentPage + 1,
            isLast,
            "right",
            "buttons",
            handlePageChange,
          )}
        </div>
      </nav>
    </div>
  );
};

PaginationNumbersOf.propTypes = propTypes;
export default PaginationNumbersOf;
