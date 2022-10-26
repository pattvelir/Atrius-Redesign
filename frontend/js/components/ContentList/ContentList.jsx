import React from "react";
import { array, number, bool, string } from "prop-types";

import ListItem from "../ListItem/ListItem.jsx";

const propTypes = {
  listItems: array,
  maxVisible: number,
  enableOverflow: bool,
  heading: string,
  extensionClass: string,
  viewMoreText: string,
};

const contentList = (props) => {
  const {
    listItems,
    maxVisible,
    enableOverflow,
    heading,
    extensionClass,
    viewMoreText,
  } = props;

  const numberToShow =
    maxVisible < listItems.length ? maxVisible : listItems.length;

  const defaultItems = listItems.slice(0, numberToShow);
  const overflowItems = listItems.slice(numberToShow, listItems.length);

  const id = parseInt(Math.random() * 1000);

  return (
    <section className={`content-list ${extensionClass || ""}`}>
      <div className="content-list__default">
        <h2 className="content-list__heading mainsection" id={id}>
          {heading}
        </h2>
        <ul className="content-list__list" aria-labelledby={id}>
          {defaultItems.map((item, i) => {
            return (
              <li key={i} className="content-list__item">
                <ListItem {...item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content-list__overflow js-list-item-overflow">
        <ul
          className="content-list__list js-accordion-content"
          aria-labelledby={id}
        >
          {overflowItems.map((item, i) => {
            return (
              <li key={i} className="content-list__item">
                <ListItem {...item} />
              </li>
            );
          })}
        </ul>

        {enableOverflow && overflowItems.length > 0 && (
          <div className="content-list__more">
            <button
              type="button"
              className="content-list__more btn btn--ghost js-accordion-link"
            >
              {viewMoreText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

contentList.propTypes = propTypes;
export default contentList;
