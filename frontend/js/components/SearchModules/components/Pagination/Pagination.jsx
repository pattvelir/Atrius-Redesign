import React from "react";

import PaginationButtons from "./typesOfPage/PaginationButtons.jsx";
import PaginationDots from "./typesOfPage/PaginationDots.jsx";
import PaginationLoadMore from "./typesOfPage/PaginationLoadMore.jsx";
import PaginationNumbers from "./typesOfPage/PaginationNumbers.jsx";
import PaginationNumbersOf from "./typesOfPage/PaginationNumbersOf.jsx";

const propTypes = {};

const Pagination = (props) => {
  const { typeOfPage } = props;

  const typeOfTemplate = {
    prevNext: <PaginationButtons {...props} />,
    prevNextLoad: <PaginationButtons {...props} seeMore />,
    loadMore: <PaginationDots {...props} />,
    numbersv1: <PaginationLoadMore {...props} />,
    dots: <PaginationNumbers {...props} />,
    numbersv2: <PaginationNumbersOf {...props} />,
  };

  return <div className="pagination">{typeOfTemplate[typeOfPage]}</div>;
};

Pagination.propTypes = propTypes;
export default Pagination;
