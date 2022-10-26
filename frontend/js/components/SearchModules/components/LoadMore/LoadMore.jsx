import React, { useState } from "react";
import { string, func, shape, bool } from "prop-types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const propTypes = {
  handleClick: func.isRequired,
  loading: bool,
  buttonClass: string,
  showSpinner: bool,
  dictionary: shape({
    loadMoreLabel: string,
  }),
};

const LoadMore = (props) => {
  const { dictionary, showSpinner, loading, handleClick, buttonClass } = props,
    [initiatedLoad, setInitiatedLoad] = useState(false),
    shouldShowSpinner = showSpinner && loading && initiatedLoad;

  const onClick = (event) => {
    event.preventDefault();
    handleClick();
    setInitiatedLoad(true);
  };

  return (
    <div className="search-results__load-more">
      <button className={buttonClass} type="button" onClick={onClick}>
        {dictionary.loadMoreLabel || "Load More Results"}
        {shouldShowSpinner ? <LoadingSpinner /> : null}
      </button>
    </div>
  );
};

LoadMore.propTypes = propTypes;
export default LoadMore;
