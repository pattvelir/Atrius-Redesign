import queryString from "query-string";
import * as R from "ramda";

// for handling queries that include a call to get Featured Items,
// which have result items that need to get merged into
// the response
const handleMultipleResponses = (searchResponse, featuredResponse) => {
  const featuredResult = featuredResponse.length ? featuredResponse : [];
  const searchData = R.assoc("featured", featuredResult, searchResponse);

  return searchData;
};

export default (props) => {
  const { url, featuredUrl, params, signal } = props;
  const fetchURL =
    url + (!url.indexOf("?") > 0 ? "&" : "?") + queryString.stringify(params);

  const featuredPromise =
    params.q !== null && !!featuredUrl && params.page === 1
      ? fetch(`${featuredUrl}?keyword=${params.q}`)
          .then((response) => response.json())
          .catch(() => {
            return {};
          })
      : Promise.resolve({});

  const searchPromise = fetch(fetchURL, { signal }).then((response) =>
    response.json(),
  );

  return Promise.all([searchPromise, featuredPromise])
    .then((values) => {
      const [searchResponse, featuredResponse] = values;
      const data = handleMultipleResponses(searchResponse, featuredResponse);
      return data;
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        return; // Continuation logic has already been skipped, so return normally
      }
      console.error(err);
    });
};
