import React from "react";
import mockData from "./mockData.js";

import ContainerFull from "../../Container/ContainerFull.jsx";

import Search from "./Search.jsx";

export default {
  title: "Components/Search",
};

export const search = () => (
  <ContainerFull>
    <Search {...mockData} />
  </ContainerFull>
);

export const searchTheme2 = () => (
  <ContainerFull>
    <Search {...mockData} model={{ ...mockData.model, theme: 2 }} />
  </ContainerFull>
);

export const searchPaged = () => (
  <ContainerFull>
    <Search
      query={{ ...mockData.query, perPage: "8" }}
      model={{
        ...mockData.model,
        theme: 1,
        loadMore: true,
      }}
      dictionary={mockData.dictionary}
    />
  </ContainerFull>
);

export const searchTheme2Paged = () => (
  <ContainerFull>
    <Search
      query={{ ...mockData.query, perPage: "8" }}
      model={{
        ...mockData.model,
        theme: 2,
        title: "",
        link: null,
        loadMore: true,
      }}
      dictionary={{
        ...mockData.dictionary,
        loadMoreLabel: "Load More",
      }}
    />
  </ContainerFull>
);

export const searchLocalDev = () => (
  <ContainerFull>
    <Search
      {...mockData}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
        featuredUrl: "http://localhost:4000/featuredresults",
        pagination: true,
      }}
    />
  </ContainerFull>
);

export const searchLocalDevTheme2 = () => (
  <ContainerFull>
    <Search
      {...mockData}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
        featuredUrl: "http://localhost:4000/featuredresults",
        theme: 2,
        pagination: true,
      }}
    />
  </ContainerFull>
);

export const searchLocalDevPaged = () => (
  <ContainerFull>
    <Search
      query={{ ...mockData.query, perPage: "8" }}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
        featuredUrl: "http://localhost:4000/featuredresults",
        theme: 1,
        title: "",
        link: null,
        loadMore: true,
      }}
      dictionary={mockData.dictionary}
    />
  </ContainerFull>
);

export const searchLocalDevTheme2Paged = () => (
  <ContainerFull>
    <Search
      query={{ ...mockData.query, perPage: "8" }}
      model={{
        ...mockData.model,
        url: "http://localhost:4000",
        featuredUrl: "http://localhost:4000/featuredresults",
        theme: 2,
        title: "",
        link: null,
        loadMore: true,
      }}
      dictionary={{
        ...mockData.dictionary,
        loadMoreLabel: "Load More",
      }}
    />
  </ContainerFull>
);
