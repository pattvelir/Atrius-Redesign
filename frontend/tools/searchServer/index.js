var R = require("ramda");
var express = require("express");
var data = require("./sampleData.json");
var eventData = require("./sampleEventData.json");
var facets = require("./sampleFacets.json");

// throttle the results returned here
data = R.take(data.length, data);

// modify value counts in given facet group
const groupLens = R.lensPath([1, "values"], facets);
const childGroupLens = R.lensPath([1, "childGroups", 0, "values"], facets);
facets = R.set(groupLens, R.take(0, R.view(groupLens, facets)), facets);
//facets = R.set(childGroupLens, R.take(0, R.view(childGroupLens, facets)), facets);

// modify the groups included
//facets = [facets[0]];

// convert string dates to real dates
var dateLens = R.lensProp("date");
var dateConvert = (s) => new Date(s);
data = R.map(R.over(dateLens, dateConvert), data);

// function for pulling a page of results out
var page = R.curry((count, start, data) => {
  if (typeof start === "undefined") {
    start = 0;
  }

  return data.slice(0).splice(start, count);
});

// function for sorting results
var sorted = R.curry((sortBy, sortDir, data) => {
  var sortKey;
  switch (sortBy) {
    case "date":
      sortKey = "date";
      break;
    case "alpha":
      sortKey = "title";
      break;
    default:
      sortKey = "id";
      break;
  }

  var sorted = R.sortBy(R.prop(sortKey), data);
  return sortDir === "desc" ? R.reverse(sorted) : sorted;
});

var hasKeywords = R.curry((keywords, data) => {
  if (!keywords || !keywords.length) {
    return data;
  }

  var keyArr = keywords.split(" ");
  var search = (item) => {
    var matches = keyArr.map(
      (key) => item.title.indexOf(key) >= 0 || item.body.indexOf(key) >= 0,
    );

    var trueMatches = matches.filter((match) => match === true);
    return !!trueMatches.length;
  };

  return data.filter(search);
});

function updateFacets(queryBits) {
  var allIds = [];
  Object.keys(queryBits).forEach((k) => {
    allIds = allIds.concat(queryBits[k]);
  });

  const selectFacetsFromValues = (values) => {
    values.forEach((v) => {
      if (allIds.indexOf(v.id) >= 0) {
        v.selected = true;
      }

      if (v.hasOwnProperty("childValues")) {
        selectFacetsFromValues(v.childValues);
      }
    });
  };

  const selectFacetsFromGroup = (group) => {
    selectFacetsFromValues(group.values);
    if (group.hasOwnProperty("childGroups")) {
      group.childGroups.forEach((childGroup) => {
        selectFacetsFromGroup(childGroup);
      });
    }
  };

  var facetClone = JSON.parse(JSON.stringify(facets));

  facetClone.forEach((group) => {
    selectFacetsFromGroup(group);
  });

  return facetClone;
}

var app = express();

// Use CORS to allow cross-origin access
// Note: this is not secure
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/", function (req, res) {
  var loadAllPages = req.query.loadAllPages === "true";
  var count = loadAllPages
    ? Math.abs(req.query.page * req.query.perPage)
    : parseInt(req.query.perPage, 10);
  var start = loadAllPages
    ? 0
    : Math.abs((req.query.page - 1) * req.query.perPage);
  var sorter = sorted(
    req.query.sortBy || "relevance",
    req.query.sortOrder || null,
  );
  var keywords = hasKeywords(req.query.q || null);
  var pager = page(count, start);
  var nonFacetTokens = [
    "page",
    "perPage",
    "sortBy",
    "sortDir",
    "sortOrder",
    "pageId",
    "q",
  ];
  var newFacets = updateFacets(R.omit(nonFacetTokens, req.query));

  var results = sorter(keywords(data));

  setTimeout(() => {
    res.send({
      totalResults: results.length,
      results: pager(results),
      facets: newFacets,
      request: {
        pageId: req.query.pageId,
        page: req.query.page,
        perPage: req.query.perPage,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      },
    });
  }, 1000);
});

app.get("/featuredresults", function (req, res) {
  var keywords = hasKeywords(req.query.q || null);
  const featured = R.curry((data) => data.filter((datum) => datum.featured));

  var results = keywords(featured(data));

  setTimeout(() => {
    res.send(results);
  }, 1000);
});

app.get("/events", function (req, res) {
  var loadAllPages = req.query.loadAllPages === "true";
  var count = loadAllPages
    ? Math.abs(req.query.page * req.query.perPage)
    : parseInt(req.query.perPage, 10);
  var start = loadAllPages
    ? 0
    : Math.abs((req.query.page - 1) * req.query.perPage);
  var pager = page(count, start);

  var newFacets = [
    {
      id: "location",
      label: "Locations",
      childGroups: [
        {
          id: "asia",
          label: "Asia",
          values: [
            {
              id: "china",
              name: "China",
              count: 3,
              selected: false,
            },
            {
              id: "japan",
              name: "Japan",
              count: 3,
              selected: false,
            },
            {
              id: "korea",
              name: "Korea",
              count: 3,
              selected: false,
            },
          ],
        },
        {
          id: "europe",
          label: "Europe",
          childGroups: [
            {
              id: "scandinavia",
              label: "Scandinavia",
              values: [
                {
                  id: "norway",
                  name: "norway",
                  count: 3,
                  selected: false,
                },
              ],
            },
          ],
          values: [
            {
              id: "france",
              name: "France",
              count: 3,
              selected: false,
            },
            {
              id: "italy",
              name: "Italy",
              count: 3,
              selected: false,
            },
            {
              id: "germany",
              name: "Germany",
              count: 3,
              selected: false,
            },
          ],
        },
      ],
      values: [
        {
          id: "boston",
          name: "Boston",
          count: 4,
          selected: false,
        },
        {
          id: "philly",
          name: "Philadelphia",
          count: 6,
          selected: true,
        },
        {
          id: "nyc",
          name: "New York City",
          count: 10,
          selected: false,
        },
        {
          id: "baltimore",
          name: "Baltimore",
          count: 2,
          selected: false,
        },
        {
          id: "dc",
          name: "Washington, DC",
          count: 8,
          selected: false,
        },
        {
          id: "sf",
          name: "San Fracisco",
          count: 6,
          selected: false,
        },
        {
          id: "seattle",
          name: "Seattle",
          count: 4,
          selected: false,
        },
      ],
    },
    {
      id: "topicarea",
      label: "Topic Area",
      values: [
        {
          id: "dux",
          name: "Design and UX",
          count: 10,
          selected: false,
        },
        {
          id: "dev",
          name: "Development",
          count: 23,
          selected: false,
        },
        {
          id: "devops",
          name: "Dev Ops",
          count: 13,
          selected: false,
        },
        {
          id: "it",
          name: "IT Administration",
          count: 12,
          selected: false,
        },
      ],
    },
    {
      id: "group3",
      label: "Other Group Filter",
      values: [
        {
          id: "foo1",
          name: "Foo 1",
          count: 4,
          selected: false,
        },
      ],
    },
    {
      id: "group4",
      label: "Other Group Filter",
      values: [
        {
          id: "foo4",
          name: "Foo 1",
          count: 4,
          selected: false,
        },
      ],
    },
    {
      id: "group5",
      label: "Other Group Filter",
      values: [
        {
          id: "foo3",
          name: "Foo 1",
          count: 4,
          selected: false,
        },
      ],
    },
    {
      id: "group6",
      label: "Other Group Filter",
      values: [
        {
          id: "foo2",
          name: "Foo 1",
          count: 4,
          selected: false,
        },
      ],
    },
  ];

  var results = eventData;

  setTimeout(() => {
    res.send({
      totalResults: results.length,
      results: pager(results),
      facets: newFacets,
      request: {
        pageId: req.query.pageId,
        page: req.query.page,
        perPage: req.query.perPage,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      },
    });
  }, 1000);
});

app.listen(4000, function () {
  console.log("search server started on http://localhost:4000");
});
