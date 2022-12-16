import React from "react";
import {} from "prop-types";
import uniqueId from "lodash.uniqueid";

import Icon from "../Icon/Icon.jsx";
import TextWithIcon from "../TextWithIcon/TextWithIcon.jsx";

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
        <input
          name="q"
          id={searchId}
          type="search"
          placeholder="Search using provider name, location, or keywords"
        />
        <button type="submit" className="search-box__button">
          <span className="u-visuallyhidden">Submit Search</span>
          <Icon
            className=" icon icon--special"
            iconName="search-field"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
};

searchBox.propTypes = propTypes;
export default searchBox;
