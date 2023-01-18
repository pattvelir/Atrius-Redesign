import React from "react";
import { func, number } from "prop-types";
import { pageBlock } from "../../../data/paging.js";
import { getPage } from "./GetPage.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationDots = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const block = pageBlock(totalResults, resultsPerPage, currentPage);

  const pagnationDotesTemplate = (
    <nav className="pagination__dots pagination__container">
      {block.map((page) =>
        getPage(
          page.label,
          page.num,
          page.current,
          "",
          "dots",
          handlePageChange,
        ),
      )}
    </nav>
  );

  return <div className="pagination">{pagnationDotesTemplate}</div>;
};

PaginationDots.propTypes = propTypes;
export default PaginationDots;
