import React from "react";
import ReactDom from "react-dom";
import SearchApp from "./SearchApp.jsx";

export function renderSearch() {
  document.querySelectorAll(".js-search-mount").forEach((mount, i) => {
    const dictionary = JSON.parse(mount.dataset.dictionary) || null;
    const query = JSON.parse(mount.dataset.query) || {};
    const dataModel = JSON.parse(mount.dataset.model);

    ReactDom.render(
      <SearchApp
        dictionary={dictionary}
        query={query}
        id={`search-${i}`}
        {...dataModel}
      />,
      mount
    );
  });
}
