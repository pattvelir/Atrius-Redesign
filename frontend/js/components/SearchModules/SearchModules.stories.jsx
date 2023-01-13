import React from "react";

import mockResultsData from "./data/mockResultsData.js";
import mockData from "./Search/mockData.js";
import mockFacets from "./data/mockFacets.js";
import ContainerFull from "../Container/ContainerFull.jsx";

import SelectedFilters from "./components/SelectedFilters/SelectedFilters.jsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";
import SimpleGrid from "./components/SimpleGrid/SimpleGrid.jsx";
import SimpleList from "./components/SimpleList/SimpleList.jsx";
import LoadMore from "./components/LoadMore/LoadMore.jsx";
import Pagination from "./components/Pagination/Pagination.jsx";
import KeywordSearch from "./components/KeywordSearch/KeywordSearch.jsx";
import Sorters from "./components/Sorters/Sorters.jsx";
import FilterBar from "./components/FilterBar/FilterBar.jsx";

export default {
  title: "Components/Search Modules",
};

export const simpleGrid = () => (
  <ContainerFull>
    <SimpleGrid
      results={mockResultsData.slice(0, 4)}
      dictionary={{ featuredLabel: "Featured" }}
    />
  </ContainerFull>
);

export const simpleList = () => (
  <ContainerFull>
    <SimpleList
      results={mockResultsData}
      dictionary={{ featuredLabel: "Featured" }}
    />
  </ContainerFull>
);

export const loadingSpinner = () => (
  <ContainerFull>
    <LoadingSpinner text="loading results" />
  </ContainerFull>
);

export const loadMore = () => (
  <ContainerFull>
    <LoadMore
      handleClick={() => console.log("clicked")}
      buttonClass="btn btn--primary"
      showSpinner={false}
      dictionary={{ loadMoreLabel: "Load More" }}
    />
  </ContainerFull>
);

export const pagination = () => (
  <ContainerFull>
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="prevNext"
    />
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="prevNextLoad"
    />
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="loadMore"
    />
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="numbersv1"
    />
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="dots"
    />
    <Pagination
      handlePageChange={() => console.log("clicked")}
      totalResults={100}
      currentPage={1}
      resultsPerPage={5}
      typeOfPage="numbersv2"
    />
  </ContainerFull>
);

export const keywordSearch = () => (
  <ContainerFull>
    <KeywordSearch
      handleEntry={() => console.log("clicked")}
      loading={false}
      keywords=""
      dictionary={{
        searchBoxPlaceholder: "Enter keyword",
        searchBoxLabel: "Submit Search",
      }}
    />
  </ContainerFull>
);

export const filterBar = () => (
  <ContainerFull>
    <FilterBar
      onFacetChange={() => {}}
      facets={mockFacets}
      onClearFacetGroup={() => {}}
      onClearAllFacets={() => {}}
      selectedFacets={{}}
      hasMobileDropdown={true}
      hasClear={false}
      filterLabel=""
      filterTitle="Filter Your Results"
    />
  </ContainerFull>
);

export const sorters = () => (
  <ContainerFull>
    <Sorters
      onSorterClick={() => {}}
      sorters={mockData.model.sorters}
      sortBy="relevance"
      sortDirection={null}
    />
  </ContainerFull>
);

export const selectedFilters = () => (
  <ContainerFull>
    <SelectedFilters
      onClick={(groupId, filterId) => {
        console.log(`remove filter ${filterId} from group ${groupId}`);
      }}
      filters={mockFacets}
      label="Selected Filters"
    />
  </ContainerFull>
);
