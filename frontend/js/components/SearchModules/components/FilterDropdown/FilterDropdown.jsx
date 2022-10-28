import React, { useState } from "react";
import cx from "classnames";

import { func, string, array } from "prop-types";
import { selectedFacetShape } from "../../helpers/dynamicSearch.js";

import useClickAway from "../../../../common/useClickAway.js";

import Checkbox from "../../../FormItems/Checkbox.jsx";

const propTypes = {
  filterLabel: string,
  label: string,
  clearAllFacetsLabel: string,
  id: string,
  values: array,
  childGroups: array,
  onFacetChange: func.isRequired,
  selectedFacets: selectedFacetShape.isRequired,
  onClearFacetGroup: func,
};

const FilterDropdown = (props) => {
  const {
    filterLabel,
    label,
    clearAllFacetsLabel,
    values,
    id,
    onFacetChange,
    childGroups,
    selectedFacets,
    onClearFacetGroup,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const filterDropdownRef = useClickAway({ isOpen, setOpen });

  const validChildGroups = childGroups.filter(
    (group) => group.values && group.values.length > 0,
  );

  if (
    (!values || values.length < 1) &&
    (!validChildGroups || validChildGroups.length < 1)
  ) {
    return null;
  }

  const renderGroup = (values) => {
    return (
      values &&
      values.map((value, ind) => {
        return (
          <li key={`${value.id}-${ind}`}>
            <Checkbox
              label={`${value.name} (${value.count})`}
              id={value.id}
              name={value.name}
              checked={value.selected}
              onChange={() => onFacetChange(id, value.id)}
            />
            {value.childValues && value.childValues.length > 0 && (
              <ul className="filter-dropdown__sub-group">
                {renderGroup(value.childValues)}
              </ul>
            )}
          </li>
        );
      })
    );
  };

  const count =
    selectedFacets[id] && Object.keys(selectedFacets[id]).length > 0
      ? `(${Object.keys(selectedFacets[id]).length})`
      : "";

  const handleMenuClick = () => {
    setOpen(!isOpen);
  };

  return (
    <section ref={filterDropdownRef} className="filter-dropdown">
      {filterLabel ? (
        <div
          id={`filter-${label}-${id}`.replace(/\s/g, "")}
          className="filter-dropdown__eyebrow"
        >
          {label} {count}
        </div>
      ) : null}
      <div className="filter-dropdown__header">
        <button
          aria-labelledby={`filter-${label}-${id}`.replace(/\s/g, "")}
          aria-expanded={isOpen}
          type="button"
          id={id}
          onClick={handleMenuClick}
          className="filter-dropdown__open-button"
        >
          <span>
            <span className="filter-dropdown__filter-text-wrapper">
              {filterLabel ? `${filterLabel} ${label}` : `${label} ${count}`}
            </span>
          </span>
          <span className="icon" />
        </button>
      </div>
      <div
        className={cx("filter-dropdown__panel", {
          "filter-dropdown__panel--is-open": isOpen,
        })}
      >
        {selectedFacets[id] && Object.keys(selectedFacets[id]).length > 0 && (
          <div className="filter-dropdown__clear">
            <button
              type="button"
              className="filter-dropdown__clear-button btn btn--primary"
              onClick={() => onClearFacetGroup(id)}
            >
              {clearAllFacetsLabel || "Clear All"}
            </button>
          </div>
        )}
        <div className="filter-dropdown__menu-list">
          <ul className="filter-dropdown__group" aria-label={label}>
            {renderGroup(values)}
          </ul>
          {validChildGroups &&
            validChildGroups.map((group, ind) => {
              return (
                <div key={`child-${group.id}-${ind}`}>
                  <div className="filter-dropdown__divider">{group.label}</div>
                  <ul
                    className="filter-dropdown__group"
                    aria-label={group.label}
                  >
                    {renderGroup(group.values)}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

FilterDropdown.propTypes = propTypes;
export default React.memo(FilterDropdown);
