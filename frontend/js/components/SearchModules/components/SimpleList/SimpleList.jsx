import React from "react";
import { string, array, shape, arrayOf, object, number } from "prop-types";

import ListItem from "../../../ListItem/ListItem.jsx";

const propTypes = {
  results: arrayOf(
    shape({
      imageSrc: string,
      contentUrl: string,
      body: string,
    }),
  ),
  focusRef: object,
  focusItem: number,
  dictionary: object,
};

const SimpleList = (props) => {
  const { results, focusRef, focusItem, dictionary } = props;

  if (!results || results.length < 1) {
    return null;
  }

  return (
    <section className="simple-list">
      {results.map((result, i) => (
        <div
          key={`SIMPLE-LIST-${i}-${result.key}`}
          className="simple-list__item"
        >
          <ListItem
            {...result}
            orientation="is-left"
            media={result.imageSrc}
            description={result.body}
            sizes="270px"
            link={{
              href: result.contentUrl,
              text: "",
            }}
            featuredLabel={dictionary?.featuredLabel}
            focusRef={i === focusItem ? focusRef : null}
          />
        </div>
      ))}
    </section>
  );
};
SimpleList.propTypes = propTypes;
export default React.memo(SimpleList);
