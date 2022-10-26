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
  object,
  shape,
  objectOf,
  number,
  arrayOf,
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

import FilterBar from "../components/FilterBar/FilterBar.jsx";
import SimpleGrid from "../components/SimpleGrid/SimpleGrid.jsx";
import SimpleList from "../components/SimpleList/SimpleList.jsx";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import LoadMore from "../components/LoadMore/LoadMore.jsx";

const propTypes = {
  id: string.isRequired,
  theme: number,
  enableQueryString: bool,
  url: string.isRequired,
  dictionary: objectOf(string).isRequired,
  query: object.isRequired,
  sorters: arrayOf(
    shape({
      isActive: bool,
      value: string,
      direction: oneOf(["asc", "desc"]),
    }),
  ),
};

const DynamicContentListingApp = (props) => {
  const {
    id,
    theme,
    enableQueryString,
    url,
    dictionary,
    query,
    sorters = [],
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

  //update the url with the latest query parameters
  useEffect(() => {
    if (enableQueryString) {
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
    }
  }, [currentParams, enableQueryString, selectedFacets]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setShowOverlay(true);

    fetchSearchResults({
      url,
      params: {
        ...currentParams,
        ...selectedFacets,
      },
      signal,
    })
      .then(function (data) {
        if (data && currentParams.page > 1) {
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
  }, [currentParams, selectedFacets, url]);

  useEffect(() => {
    if (resultsFocusRef.current && showFocusRef.current.showFocus) {
      //move the focus back to the top of the new results on page change after new results are rendred.
      window.setTimeout(() => {
        resultsFocusRef.current.focus();
        showFocusRef.current.showFocus = false;
      }, 1000);
    }
  }, [serverData]);

  const handlePageChange = (page) => {
    showFocusRef.current.showFocus = true;
    setCurrentParams((prevState) => {
      return { ...prevState, page: page };
    });
  };

  const handleFacetChange = useCallback((facetGroupValue, facet) => {
    // analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      type: "DCL Facet Change",
      event: "dropdownClick",
      dropdownSelection: facet,
    });

    setSelectedFacets((prevState) => {
      return toggleFacet(facetGroupValue, facet, prevState);
    });
  }, []);

  const handleClearFacetGroup = (facetGroupValue) => {
    setSelectedFacets((prevState) => {
      return clearFacetGroup(facetGroupValue, prevState);
    });
  };

  const showLoadMore =
    serverData && serverData.totalResults > currentParams.page * perPage;

  const focusItemNumber = (currentParams.page - 1) * perPage;
  const showResults =
    serverData && serverData.results && serverData.results.length > 0;
  const showFeatured =
    serverData && serverData.featured && serverData.featured.length > 0;

  return (
    <div className="dynamic-content-listing__app" id={id}>
      {serverData && serverData.facets && serverData.facets.length > 0 && (
        <div className="dynamic-content-listing__filter-bar">
          <FilterBar
            filterTitle={dictionary.filterTitle}
            filterLabel={dictionary.filterLabel}
            clearAllFacetsLabel={dictionary.clearAll}
            onFacetChange={handleFacetChange}
            facets={serverData.facets}
            onClearFacetGroup={handleClearFacetGroup}
            selectedFacets={selectedFacets}
            hasMobileDropdown={true}
          />
        </div>
      )}
      {!showResults && !showFeatured && (
        <div className="dynamic-content-listing__no-results" aria-live="polite">
          {!showOverlay && (
            <span>{dictionary.noResultsMessage || "No Results Found"}</span>
          )}
        </div>
      )}
      {(showResults || showFeatured) && (
        <div
          className={cx("dynamic-content-listing__results", {
            "dynamic-content-listing__results--hide-summaries":
              !query?.showSummaries,
          })}
          id={`${id}-results`}
        >
          {showOverlay && <LoadingSpinner />}
          <div aria-live="polite" className="u-visuallyhidden">
            {!showOverlay && (
              <span>{dictionary.newResultsMessage || "New Results"}</span>
            )}
          </div>
          {(!theme || theme === 1) && (
            <SimpleList
              results={serverData.results}
              focusRef={resultsFocusRef}
              focusItem={focusItemNumber}
            />
          )}
          {theme === 2 && (
            <SimpleGrid
              results={serverData.results}
              focusRef={resultsFocusRef}
              focusItem={focusItemNumber}
            />
          )}
        </div>
      )}
      {showLoadMore && (
        <div className="dynamic-content-listing__load-more">
          <LoadMore
            handleClick={() => handlePageChange(currentParams.page + 1)}
            buttonClass="btn btn--primary dynamic-content-listing__load-more-btn"
            dictionary={dictionary}
          />
        </div>
      )}
    </div>
  );
};

DynamicContentListingApp.propTypes = propTypes;
export default DynamicContentListingApp;
