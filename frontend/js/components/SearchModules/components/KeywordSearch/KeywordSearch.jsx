import React, { useState, useRef, useEffect } from "react";
import { string, func, shape, bool } from "prop-types";

import Icon from "../../../Icon/Icon.jsx";

const propTypes = {
  keywords: string,
  handleEntry: func.isRequired,
  loading: bool,
  dictionary: shape({
    searchBoxPlaceholder: string,
    searchBoxLabel: string,
  }).isRequired,
};

const KeywordSearch = (props) => {
  const [initiatedLoad, setInitiatedLoad] = useState(false),
    keywordInput = useRef(null),
    { handleEntry, dictionary, keywords, loading } = props;

  useEffect(() => {
    if (!loading) {
      setInitiatedLoad(false);
    }
  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEntry(keywordInput.current.value);
    setInitiatedLoad(true);
  };

  const handleClear = (event) => {
    if (keywordInput.current.value === "") {
      handleEntry(keywordInput.current.value);
      setInitiatedLoad(true);
    }
  };

  return (
    <form
      className="keyword-search"
      onSubmit={handleSubmit}
      noValidate
      role="search"
    >
      <div className="keyword-search__input">
        <label htmlFor="site-search" className="u-visuallyhidden">
          {dictionary.searchBoxLabel}
        </label>
        <input
          id="site-search"
          type="search"
          placeholder={dictionary.searchBoxPlaceholder}
          defaultValue={keywords || ""}
          ref={keywordInput}
          onChange={handleClear}
        />
        <button type="submit" className="keyword-search__button">
          <Icon iconName="search" title="Submit Search" />
        </button>
      </div>
    </form>
  );
};

KeywordSearch.propTypes = propTypes;
export default KeywordSearch;
