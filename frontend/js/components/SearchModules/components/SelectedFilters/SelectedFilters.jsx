import React, { useMemo } from "react";
import uniqueid from "lodash.uniqueid";

import { array, string, func } from "prop-types";

const propTypes = {
  filters: array,
  onClick: func.isRequired,
  label: string,
  removeFilterLabel: string,
};

const SelectedFilters = (props) => {
  const { filters = [], label = "", onClick, removeFilterLabel } = props;
  const id = uniqueid("selected-filters-");

  const selectedFilters = useMemo(() => {
    const searchChildGroup = (filters, id) => {
      return filters.reduce((array, filter) => {
        const childGroups = filter.childGroups
          ? searchChildGroup(filter.childGroups, id)
          : [];

        const childValues = findSelectedValue(filter.values, id);

        return [...array, ...childValues, ...childGroups];
      }, []);
    };

    const findSelectedValue = (filters, id) => {
      return filters.reduce((array, filter) => {
        const childValues = filter.childValues
          ? findSelectedValue(filter.childValues, id)
          : [];

        if (filter.selected) {
          array.push({
            groupId: id,
            id: filter.id,
            name: filter.name,
          });
        }

        return [...array, ...childValues];
      }, []);
    };

    return filters.reduce((array, filter) => {
      const values = [
        ...searchChildGroup(filter.childGroups, filter.id),
        ...findSelectedValue(filter.values, filter.id),
      ];
      return [...array, ...values];
    }, []);
  }, [filters]);

  // always return outer div so aria-live works as values are changed
  return (
    <div className="selected-filters" aria-live="polite" aria-atomic="true">
      {selectedFilters?.length > 0 && (
        <>
          {label && (
            <span className="selected-filters__label" id={id}>
              {label}
            </span>
          )}
          <ul
            className="selected-filters__group"
            aria-labelledby={label ? id : null}
          >
            {selectedFilters.map((filter) => (
              <li key={filter.id} className="selected-filters__item">
                <button
                  type="button"
                  className="selected-filters__button"
                  onClick={() => {
                    onClick(filter.groupId, filter.id);
                  }}
                >
                  <span className="u-visuallyhidden">{removeFilterLabel}</span>
                  <span>{filter.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

SelectedFilters.propTypes = propTypes;
export default SelectedFilters;
