import * as R from "ramda";
import queryString from "query-string";
import { string, objectOf, arrayOf } from "prop-types";

const toggleItemInArray = R.curry((value, array) => {
  if (Array.isArray(value)) {
    return R.symmetricDifference(value, array);
  } else {
    return R.symmetricDifference([value], array);
  }
});

//the key of the selectedFacetsObject is the id of the facetGroup
export const selectedFacetShape = objectOf(arrayOf(string));

//query string v5 does not support this options object, leaving these wrapper
//functions for now incase of future upgrade
export const parseQueryString = (string) =>
  queryString.parse(string, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

export const stringifyQueryString = (data) =>
  queryString.stringify(data, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

//initialize facets from the URL query string
export const initFacets = (urlQueryString) => {
  return R.ifElse(
    R.equals({}),
    R.identity,
    R.compose(
      R.map((value) => (Array.isArray(value) ? value : [value])),
      R.pickBy((value, key) => key !== "q" && key !== "page" && key !== "id"),
    ),
  )(parseQueryString(urlQueryString));
};

//init current params from the URL query string
export const initCurrentParams = (queryString, generalParams) => {
  return R.compose(
    R.when(
      () => parseQueryString(queryString).page !== undefined,
      R.assoc("page", parseQueryString(queryString).page),
    ),
    R.when(
      () => parseQueryString(queryString).q !== undefined,
      R.assoc("q", parseQueryString(queryString).q),
    ),
  )(generalParams);
};

export const createQueryString = (currentParams, selectedFacets) => {
  return stringifyQueryString({
    // ...parseQueryString(window.location.search),
    q:
      currentParams.q === "" || currentParams.q === null
        ? undefined
        : currentParams.q,
    page: parseInt(currentParams.page) === 1 ? undefined : currentParams.page,
    ...selectedFacets,
  });
};

export const createFacetQueryString = (facet) => {
  return stringifyQueryString({
    [facet.facetGroupId]: facet.facetId,
  });
};

//If the facetGroup id value exists in the selectedFacets, add the facet id to existing array
//Otherwise, create the the array with the seleced facet
//If the array at selectedFacet[GroupId] is empty, remove it.
export const toggleFacet = (facetGroupValue, facet, state) => {
  return R.compose(
    R.when(R.propEq(facetGroupValue, []), R.dissoc(facetGroupValue)),
    R.ifElse(
      R.has(facetGroupValue),
      R.evolve({
        [facetGroupValue]: toggleItemInArray(facet),
      }),
      R.assoc(facetGroupValue, [facet]),
    ),
  )(state);
};

//clear a facetGroup
export const clearFacetGroup = (facetGroupValue, state) => {
  return R.when(R.has(facetGroupValue), R.dissoc(facetGroupValue))(state);
};

//clear a single facet
export const clearFacet = (facetGroupValue, facetId, state) => {
  return R.compose(
    R.when(R.propEq(facetGroupValue, []), R.dissoc(facetGroupValue)),
    R.over(
      R.lensProp(facetGroupValue),
      R.reject((value) => value === facetId),
    ),
  )(state);
};
