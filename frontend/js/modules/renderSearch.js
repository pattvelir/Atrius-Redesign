import React from "react";
import ReactDom from "react-dom";
import SearchApp from "../components/SearchModules/Search/SearchApp.jsx";

export default (mount, i) => {
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
    mount,
  );
};
