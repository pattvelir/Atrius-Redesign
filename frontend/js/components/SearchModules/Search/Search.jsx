import React from "react";
import { object } from "prop-types";
import cx from "classnames";

const propTypes = {
  query: object.isRequired,
  model: object.isRequired,
  dictionary: object.isRequired,
};

const Search = (props) => {
  const { model } = props;

  return (
    <section
      className={cx("search", {
        [`search--theme${model?.theme}`]: model?.theme,
      })}
    >
      <div
        className="search__mount js-search-mount"
        data-query={JSON.stringify(props.query)}
        data-model={JSON.stringify(props.model)}
        data-dictionary={JSON.stringify(props.dictionary)}
      ></div>
    </section>
  );
};

Search.propTypes = propTypes;
export default Search;
