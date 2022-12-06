import React from "react";
import {} from "prop-types";
import TextWithIcon from "../TextWithIcon/TextWithIcon.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
// import "./search-menu.scss";
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
        <TextWithIcon
          classNames="search-menu__open"
          text="Search"
          icon="search-field"
          title="open search menu"
        />

        <TextWithIcon
          classNames="search-menu__close"
          text="Close"
          icon="close"
          title="close search menu"
        />
      </button>
      <div className="search-menu__drop-down js-search-menu-content">
        <div className="search-menu__inner-container">
          <SearchBox />
          <button className="btn btn--link btn--dark btn--no-padding js-search-menu-close-button">
            <TextWithIcon
              className=""
              title="Close"
              text="Close"
              icon="close"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

SearchMenu.propTypes = propTypes;
export default SearchMenu;
