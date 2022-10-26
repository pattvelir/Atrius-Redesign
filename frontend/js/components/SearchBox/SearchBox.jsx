import React from "react";
import {} from "prop-types";
import uniqueId from "lodash.uniqueid";

import Icon from "../Icon/Icon.jsx";

const propTypes = {};

const searchBox = (props) => {
  const {} = props;

  const searchId = uniqueId();

  // input name is `q` since that is the query parameter that the search app is looking for

  return (
    <form
      className="search-box"
      noValidate
      role="search"
      action="/search-page"
      method="GET"
    >
      <div className="search-box__input">
        <label htmlFor={searchId} className="u-visuallyhidden">
          Search
        </label>
        <input name="q" id={searchId} type="search" placeholder="Search" />
        <button type="submit" className="search-box__button">
          <span className="u-visuallyhidden">Submit Search</span>
          <Icon className="icon" iconName="search" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

searchBox.propTypes = propTypes;
export default searchBox;
