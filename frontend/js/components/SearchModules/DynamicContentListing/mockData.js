export default {
  title: "Dynamic Content Listing",
  subtitle: "Subtitle for this component goes here",
  link: {
    href: "#/more-updates",
    text: "More Updates",
    title: "More Updates for Dynamic Content",
  },
  query: {
    listingId: "767df95e-a359-4eb6-90b6-5f005cfe359a",
    showDescriptions: true,
    showDates: true,
    showContentTypes: true,
    showTaxonomyLabels: true,
    loadAllPages: false,
    pageId: "26efa0b9-f177-47a0-b5d2-bffa469aa15a",
    showSummaries: true,
    perPage: 4,
  },
  model: {
    url: "/api/dynamiccontentlisting",
    theme: 1,
    enableQueryString: false,
  },
  dictionary: {
    filterTitle: "Filter by:",
    filterLabel: "",
    loadMoreLabel: "More Articles",
    clearAll: "Clear All",
    resultsInfoLabel: "Showing",
    newResultsMessage: "New Results",
  },
};
