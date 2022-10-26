import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

import {
  string,
  array,
  shape,
  arrayOf,
  bool,
  object,
  number,
} from "prop-types";

import ListItem from "../../../ListItem/ListItem.jsx";

const propTypes = {
  results: arrayOf(
    shape({
      imageSrc: string,
      body: string,
      contentUrl: string,
    }),
  ),
  focusRef: object,
  focusItem: number,
  dictionary: object,
};

const SimpleGrid = (props) => {
  const { results, focusRef, focusItem, dictionary } = props;

  // no results passed.
  if (!results || results.length < 1) {
    return null;
  }

  return (
    <section className="simple-grid">
      <div className="simple-grid__container">
        {results &&
          results.map((result, i) => (
            <div
              key={`SIMPLE-GRID-${i}-${result.key}`}
              className="simple-grid__item"
            >
              <ListItem
                {...result}
                description={result.body}
                imagePosition=""
                media={result.imageSrc}
                sizes="630px"
                link={{
                  href: result.contentUrl,
                  text: "",
                }}
                featuredLabel={dictionary?.featuredLabel}
                focusRef={i === focusItem ? focusRef : null}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

SimpleGrid.propTypes = propTypes;
export default SimpleGrid;
