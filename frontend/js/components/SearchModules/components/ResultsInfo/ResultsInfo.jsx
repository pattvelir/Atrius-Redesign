import React, { useMemo } from "react";
import { shape, string, number, bool } from "prop-types";

const propTypes = {
  query: string,
  page: number,
  perPage: number,
  resultsInfoLabel: string,
  totalResults: number.isRequired,
  isLoading: bool,
};

const ResultsInfo = (props) => {
  const { query, page, perPage, resultsInfoLabel, totalResults, isLoading } =
    props;

  const currentResultsRange = useMemo(() => {
    //ensure base 10 number
    const currentPageNumber = page || 1;

    // if results are only one page, eschew the range entirely
    if (!perPage || totalResults <= perPage) {
      return `${totalResults}`;
    }

    // Upper bound of visible results
    let ceiling = currentPageNumber * perPage;

    // Lower bound of visible results
    let floor = ceiling - perPage + 1;

    // make sure the ceiling does not exceed total results
    if (ceiling > totalResults) {
      ceiling = totalResults;
    }

    // otherwise, return the full range
    return ` ${floor} - ${ceiling}`;
  }, [page, perPage, totalResults]);

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="results-info"
      aria-busy={isLoading}
    >
      {resultsInfoLabel && (
        <span className="results-info__label">{resultsInfoLabel}</span>
      )}
      {page && perPage && (
        <span className="results-info__range">{currentResultsRange}</span>
      )}
      {totalResults > 0 && (
        <span>
          of{" "}
          <span className="results-info__total-results">
            {`${totalResults}`}
          </span>
        </span>
      )}
      {query && (
        <span>
          for <span className="results-info__query">{`“${query}”`}</span>
        </span>
      )}
    </div>
  );
};

ResultsInfo.propTypes = propTypes;
export default ResultsInfo;
