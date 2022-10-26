import React from "react";
import { func, array, string } from "prop-types";
import cx from "classnames";

const propTypes = {
  onSorterClick: func,
  sorters: array,
  sortBy: string,
  sortDirection: string,
  sortLabel: string,
};

const Sorters = (props) => {
  const { onSorterClick, sorters, sortBy, sortDirection, sortLabel } = props;

  const toggleDir = (dir) => {
    if (!dir) return null;
    return dir === "asc" ? "desc" : "asc";
  };

  if (!sorters) {
    return null;
  }

  //if there is only one sorter and is relevance, return null, otherwise return sorters
  if (sorters && sorters.length === 1 && sorters[0].value === "relevance")
    return null;

  return (
    <div className="sorters">
      {sortLabel && <span className="sorters__label">{sortLabel}</span>}
      <ul className="sorters__list">
        {sorters.map(
          (sorter, i) =>
            typeof sorter.label === "string" &&
            sorter.label.length > 0 &&
            typeof sorter.value === "string" &&
            sorter.value.length > 0 && (
              <li className="sorters__list-item" key={sorter.label}>
                <button
                  className={cx("btn btn--link sorters__sorter", {
                    "sorters__sorter--active": sorter.value === sortBy,
                    "sorters__sorter--has-direction": sorter.direction,
                    "sorters__sorter--desc":
                      sorter.direction && sortDirection === "desc",
                    "sorters__sorter--asc":
                      sorter.direction && sortDirection === "asc",
                  })}
                  onClick={() =>
                    onSorterClick({
                      sortBy: sorter.value,
                      sortOrder:
                        sorter.value === "relevance"
                          ? null
                          : sorter.value === props.sortBy
                          ? toggleDir(sortDirection)
                          : sorter.direction,
                    })
                  }
                  type="button"
                >
                  <span>
                    {sortDirection === "asc"
                      ? sorter.labelAsc || sorter.label
                      : sorter.labelDesc || sorter.label}
                  </span>
                </button>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

Sorters.propTypes = propTypes;
export default Sorters;
