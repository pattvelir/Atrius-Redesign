import ReactDom from "react-dom";
import DynamicContentListingApp from "../components/SearchModules/DynamicContentListing/DynamicContentListingApp.jsx";

export default (mount, i) => {
  const dictionary = JSON.parse(mount.dataset.dictionary) || null;
  const query = JSON.parse(mount.dataset.query) || {};
  const dataModel = JSON.parse(mount.dataset.model);

  ReactDom.render(
    <DynamicContentListingApp
      dictionary={dictionary}
      query={query}
      id={`dynamic-content-listing-${i}`}
      {...dataModel}
    />,
    mount,
  );
};
