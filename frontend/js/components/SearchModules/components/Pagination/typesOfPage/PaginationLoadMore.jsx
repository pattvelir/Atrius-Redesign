import React from "react";
import { func, number } from "prop-types";
import { isLastPage } from "../../../data/paging.js";
import Button from "../../../../Button/Button.jsx";

const propTypes = {
  totalResults: number.isRequired,
  resultsPerPage: number.isRequired,
  currentPage: number.isRequired,
  handlePageChange: func.isRequired,
};

const PaginationLoadMore = (props) => {
  const { totalResults, resultsPerPage, currentPage, handlePageChange } = props;
  const isLast = isLastPage(totalResults, resultsPerPage, currentPage);

  return (
    <div className="pagination">
      <Button
        btnType="filled"
        btnColor="light"
        size="lg"
        disabled={isLast}
        onClick={handlePageChange}
      >
        Load More
      </Button>
    </div>
  );
};

PaginationLoadMore.propTypes = propTypes;
export default PaginationLoadMore;
