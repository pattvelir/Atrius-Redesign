import React from "react";
import {} from "prop-types";

import Icon from "../Icon/Icon.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const propTypes = {};

const SearchMenu = (props) => {
  return (
    <div
      className="search-menu js-search-menu"
      role="search"
      aria-label="Global"
    >
      <button
        type="button"
        className="search-menu__button js-search-menu-button"
      >
        <span className="search-menu__open">
          <Icon iconName="search" title="open search menu" />
        </span>
        <span className="search-menu__close">
          <Icon iconName="close" title="close search menu" />
        </span>
      </button>
      <div className="search-menu__drop-down js-search-menu-content">
        <div className="search-menu__inner-container">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

SearchMenu.propTypes = propTypes;
export default SearchMenu;
