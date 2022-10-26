import React, { useState } from "react";
import { func, object, arrayOf, string, bool } from "prop-types";
import cx from "classnames";

import { selectedFacetShape } from "../../helpers/dynamicSearch.js";

import FilterDropdown from "../FilterDropdown/FilterDropdown.jsx";

const propTypes = {
  filterTitle: string,
  filterLabel: string,
  facets: arrayOf(object).isRequired,
  clearAllFacetsLabel: string,
  link: object,
  selectedFacets: selectedFacetShape.isRequired,
  onFacetChange: func.isRequired,
  onClearFacetGroup: func,
  onClearAllFacets: func,
  singleSelect: bool,
  hasMobileDropdown: bool,
  hasClear: bool,
};

const FilterBar = (props) => {
  const {
    filterTitle,
    filterLabel,
    facets,
    onFacetChange,
    selectedFacets,
    onClearFacetGroup,
    clearAllFacetsLabel,
    onClearAllFacets = () => {},
    hasMobileDropdown,
    hasClear,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  // check if we need to render anything.
  const emptyFacets =
    !facets ||
    facets.length < 1 ||
    !facets.some((facet) => {
      return facet.values && facet.values.length > 0;
    });

  if (emptyFacets) {
    return null;
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderClearAll = () => {
    if (!hasClear) {
      return;
    }
    return (
      <div className="filter-bar__clear">
        <button
          className="btn btn--link filter-bar__clear-button"
          type="button"
          onClick={onClearAllFacets}
        >
          {clearAllFacetsLabel || "Clear All"}
        </button>
      </div>
    );
  };

  return (
    <section
      className={cx("filter-bar", {
        "filter-bar--flyout": hasMobileDropdown,
      })}
    >
      <button
        className={cx("filter-bar__toggle-btn btn btn--primary", {
          "is-active": isOpen,
        })}
        aria-expanded={isOpen}
        aria-controls="FILTER-MENU"
        onClick={toggleOpen}
        type="button"
      >
        {filterTitle}
      </button>
      <div
        id="FILTER-MENU"
        className={cx("filter-bar__menu", { "is-open": isOpen })}
      >
        {filterTitle && (
          <h2 className="filter-bar__title txt-h3">{filterTitle}</h2>
        )}
        {renderClearAll()}
        <div className="filter-bar__filter-menus">
          {facets &&
            facets.map((facet) => (
              <FilterDropdown
                key={facet.id}
                {...facet}
                filterLabel={filterLabel}
                onClearFacetGroup={onClearFacetGroup}
                selectedFacets={selectedFacets}
                onFacetChange={onFacetChange}
              />
            ))}
        </div>
        {renderClearAll()}
      </div>
    </section>
  );
};

FilterBar.propTypes = propTypes;
export default React.memo(FilterBar);
