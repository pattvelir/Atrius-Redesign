import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  string,
  bool,
  arrayOf,
  shape,
  objectOf,
  number,
  oneOf,
} from "prop-types";

import cx from "classnames";

import initialState from "../data/initialState.js";

import fetchSearchResults from "../helpers/fetchSearchResults.js";
import {
  toggleFacet,
  clearFacetGroup,
  initFacets,
  initCurrentParams,
  createQueryString,
} from "../helpers/dynamicSearch.js";

import { scrollToId } from "../../../common/scrollHelpers.js";

import SelectedFilters from "../components/SelectedFilters/SelectedFilters.jsx";
import FilterBar from "../components/FilterBar/FilterBar.jsx";
import KeywordSearch from "../components/KeywordSearch/KeywordSearch.jsx";
import ResultsInfo from "../components/ResultsInfo/ResultsInfo.jsx";
import SimpleList from "../components/SimpleList/SimpleList.jsx";
import Sorters from "../components/Sorters/Sorters.jsx";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import LoadMore from "../components/LoadMore/LoadMore.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import Container3070 from "../../Container/Container3070.jsx";

const propTypes = {
  id: string.isRequired,
  pagination: bool,
  loadMore: bool,
  hideMobileSummary: bool,
  url: string.isRequired,
  featuredUrl: string,
  showFacets: bool,
  dictionary: objectOf(string).isRequired,
  query: shape({
    listingId: string,
    showSummaries: bool,
    showDates: bool,
    showContentTypes: bool,
    showImages: string,
    excludedTaxonomy: string,
    loadAllPages: bool,
    pageId: string,
    perPage: number,
  }).isRequired,
  sorters: arrayOf(
    shape({
      isActive: bool,
      value: string,
      direction: oneOf(["asc", "desc"]),
    }),
  ),
};

const SearchApp = (props) => {
  const {
    id,
    hideMobileSummary,
    url,
    dictionary,
    query,
    sorters,
    pagination,
    loadMore,
    featuredUrl,
    showFacets = true,
  } = props;

  const activeSorterParam = useMemo(() => {
    const activeSorter = sorters.find((sorter) => sorter.isActive) || null;

    return activeSorter
      ? {
          sortBy: activeSorter.value,
          sortOrder: activeSorter.direction,
        }
      : null;
  }, [sorters]);

  const generalParams = {
    ...initialState.query,
    ...query,
    ...activeSorterParam,
  };

  const [showOverlay, setShowOverlay] = useState(false);
  const [perPage, setPerPage] = useState(query.perPage || 4);

  const [selectedFacets, setSelectedFacets] = useState(
    initFacets(window.location.search),
  );
  const [serverData, setServerData] = useState(null);

  //initialize the query to that of the query string if it exists
  const [currentParams, setCurrentParams] = useState(
    initCurrentParams(window.location.search, generalParams),
  );

  const resultsFocusRef = useRef();
  const showFocusRef = useRef({ showFocus: false });

  useEffect(() => {
    if (new URL(document.location).searchParams.get("q")) {
      scrollToId(id, true);
      setTimeout(() => {
        document.querySelector(`#${id} .simple-search-box__input`).focus();
      }, 1000);
    }
  }, [id]);

  //update the url with the latest query parameters
  useEffect(() => {
    const queryString = createQueryString(currentParams, selectedFacets);

    if (queryString.length > 0) {
      window.history.replaceState(
        "",
        "",
        window.location.origin +
          window.location.pathname +
          "?" +
          createQueryString(currentParams, selectedFacets) +
          window.location.hash,
      );
    } else {
      window.history.replaceState(
        "",
        "",
        window.location.origin +
          window.location.pathname +
          window.location.hash,
      );
    }
  }, [currentParams, selectedFacets]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setShowOverlay(true);

    fetchSearchResults({
      url,
      featuredUrl,
      params: {
        ...currentParams,
        ...selectedFacets,
      },
      signal,
    })
      .then(function (data) {
        if (data && loadMore && currentParams.page > 1) {
          setServerData((prevState) => {
            return {
              ...data,
              results: [...prevState.results, ...data.results],
            };
          });
        } else {
          setServerData(data);
        }
        setPerPage(parseInt(data.request.perPage, 10));
      })
      .catch(function (e) {
        if (e.name === "AbortError") {
          return; // Continuation logic has already been skipped, so return normally
        }
        console.warn("request error: " + e.message);
      })
      .finally(function () {
        setShowOverlay(false);
      });
    // unmounts or data changes
    return () => {
      controller.abort();
    };
  }, [currentParams, selectedFacets, url, loadMore, featuredUrl]);

  useEffect(() => {
    if (resultsFocusRef.current && showFocusRef.current.showFocus) {
      //move the focus back to the top of the results on page change after new results are rendred.
      window.setTimeout(() => {
        resultsFocusRef.current.focus();
        showFocusRef.current.showFocus = false;
      }, 100);
    }
  }, [serverData]);

  const handlePageChange = (page) => {
    showFocusRef.current.showFocus = true;
    setCurrentParams((prevState) => {
      return { ...prevState, page: page };
    });
    if (pagination) {
      scrollToId(`${id}-results`, true);
    }
  };

  const handleFacetChange = useCallback((facetGroupValue, facet) => {
    setSelectedFacets((prevState) => {
      return toggleFacet(facetGroupValue, facet, prevState);
    });
  }, []);

  const handleClearFacetGroup = (facetGroupValue) => {
    setSelectedFacets((prevState) => {
      return clearFacetGroup(facetGroupValue, prevState);
    });
  };

  const handleClearAllFacets = () => {
    setSelectedFacets({});
  };

  const handleSorterClick = (params) => {
    setCurrentParams((prevState) => {
      return { ...prevState, ...params, page: 1 };
    });
  };

  const handleQueryUpdate = (keyword) => {
    const q = keyword === "" ? null : keyword;

    if (currentParams.q === q) {
      return;
    }

    setCurrentParams((prevState) => {
      return { ...prevState, q, page: 1 };
    });
  };

  const showLoadMore =
    loadMore &&
    !pagination &&
    serverData &&
    serverData.totalResults > currentParams.page * perPage;

  const showPagination =
    pagination &&
    !loadMore &&
    serverData &&
    serverData.totalResults > currentParams.page * perPage;

  const focusItemNumber = loadMore ? (currentParams.page - 1) * perPage : 0;

  const showResults =
    serverData && serverData.results && serverData.results.length > 0;
  const showFeatured =
    serverData && serverData.featured && serverData.featured.length > 0;

  const noResults = !showResults && !showFeatured && !showOverlay;

  return (
    <div className="search__app" id={id}>
      <div className="search__search-box">
        <KeywordSearch
          keywords={currentParams.q}
          handleEntry={handleQueryUpdate}
          loading={showOverlay}
          dictionary={dictionary}
        />
      </div>
      <Container3070
        className={cx("search__container", {
          "search__container--indent": !showFacets,
        })}
        left={
          <React.Fragment>
            {!noResults &&
              serverData &&
              serverData.facets &&
              serverData.facets.length > 0 && (
                <div className="search__filter-bar">
                  <FilterBar
                    filterTitle={dictionary.filterTitle}
                    filterLabel={dictionary.filterLabel}
                    clearAllFacetsLabel={dictionary.clearAll}
                    onFacetChange={handleFacetChange}
                    facets={serverData.facets}
                    onClearFacetGroup={handleClearFacetGroup}
                    onClearAllFacets={handleClearAllFacets}
                    selectedFacets={selectedFacets}
                    hasMobileDropdown={true}
                    hasClear={true}
                  />
                </div>
              )}
          </React.Fragment>
        }
        right={
          <React.Fragment>
            {serverData && (
              <div className="search__info-row">
                <div className="search__results-info">
                  <ResultsInfo
                    totalResults={serverData.totalResults}
                    page={currentParams.page}
                    perPage={perPage}
                    resultsInfoLabel={dictionary.resultsInfoLabel}
                    query={currentParams.q}
                    isLoading={showOverlay}
                    clearAllFacetsLabel={dictionary.clearAll}
                  />
                </div>
                <div className="search__selected-filters">
                  <SelectedFilters
                    filters={serverData.facets}
                    label={dictionary.selectedFiltersLabel}
                    onClick={handleFacetChange}
                    removeFilterLabel={dictionary.removeFilterLabel}
                    selectedFacets={selectedFacets}
                  />
                </div>
              </div>
            )}
            {sorters && sorters.length > 0 && (
              <div className="search__sorters">
                <Sorters
                  onSorterClick={handleSorterClick}
                  sorters={sorters}
                  sortBy={currentParams.sortBy}
                  sortDirection={currentParams.sortOrder}
                  sortLabel={dictionary.sortBy}
                />
              </div>
            )}
            <div className="search__no-results" aria-live="polite">
              {noResults && (
                <span>{dictionary.noResultsMessage || "No Results Found"}</span>
              )}
            </div>
            {(showResults || showFeatured) && (
              <div
                className={cx("search__results", {
                  "search__results--no-mobile-summaries": hideMobileSummary,
                })}
                id={`${id}-results`}
              >
                {showOverlay && <LoadingSpinner />}
                <div aria-live="polite" className="u-visuallyhidden">
                  {!showOverlay && (
                    <span>{dictionary.newResultsMessage || "New Results"}</span>
                  )}
                </div>
                <SimpleList
                  results={[...serverData.featured, ...serverData.results]}
                  focusRef={resultsFocusRef}
                  focusItem={focusItemNumber}
                  dictionary={dictionary}
                />
              </div>
            )}
            {showLoadMore && (
              <div className="search__load-more">
                <LoadMore
                  handleClick={() => handlePageChange(currentParams.page + 1)}
                  buttonClass="btn btn--primary search__load-more-btn"
                  dictionary={dictionary}
                />
              </div>
            )}
            {showPagination && (
              <div className="search__pagination">
                <Pagination
                  totalResults={serverData.totalResults}
                  resultsPerPage={perPage}
                  currentPage={currentParams.page}
                  handlePageChange={(pageNum) => handlePageChange(pageNum)}
                />
              </div>
            )}
          </React.Fragment>
        }
      />
    </div>
  );
};

SearchApp.propTypes = propTypes;
export default SearchApp;
