# Search - Foundation Module

## Overview

This module lays the groundwork for working with Search within AtriusHealth.  Below outlines the functionality and patterns that can be leveraged at the Feature layer to make use of search.  This module is the primary integration point of the [Velir.Search](https://github.com/velir/velir.search) library.

## Features

### ComputedFields

All computed search fields are implemented and patched in via this project.  

**Patterns**

It is important that Computed Fields like `IsSearchableField` and `SearchDateField` remain in the foundation layer, as they represent very generic yet important field values for any searches that may be performed.  We want to be able to filter out irrelevant or incorrect content and to be able to order content in a generic way.  Thus, these 2 fields are examples that demonstrate the usage of the **Factory Pattern** which allows us to define different criteria, depending on the feature.

### AtriusHealthPredicateBuilderRetriever

The `AtriusHealthPredicateBuilderRetriever` implements **Velir.Search**'s `IPredicateBuildRetriever` interface.  The goal of this implementation builds the list of `IPredicateBuilder`'s that should be applied to the search query.  AtriusHealth's implementation introduces Sitecore's Pipeline pattern as a way for individual features to register their own Processors which can add to the list of `IPredicateBuilder`'s.  The custom pipeline is `<getAtriusHealthFilterBuilders>`.

### PredicateBuilders

* `IsSearchablePredicateBuilder` - Implements `IPredicateBuilder` which leverages the **IsSearchable** Computed Field to filter out items from the search index that are not valid pages or have been explicitly marked to not be searchable.
* `SitePredicateBuilder` - Implements `IPredicateBuilder` to filter items so that only items from the current site are returned from the index. 

### AtriusHealthResultsFormatter

`AtriusHealthResultsFormatter` implements `IResultsFormatter<AtriusHealthSearchResultItem>`.  It's role is to properly format the results returned from SOLR in the desired manner for the FE search app to consume.  This implementation will only be used for applications that use/request `AtriusHealthSearchResultItem`'s.

### AbstractSearchAppModel

`AbstractSearchAppModel` is an abstract class which defines all properties required to properly configure the FE React search app.  Any view model which intends use the React FE search code, should inherit AbstractSearchAppModel and implement any abstract members and/or override any properties necessary.

### AtriusHealthSearchResultItem

The `AtriusHealthSearchResultItem` inherits from Sitecore's `SearchResultItem` class.  The `AtriusHealthSearchResultItem` defines our taxonomy fields, title, description, date, IsSearchable, and all templates (item's template and base templates).  

Another feature demonstrated here, is the `QueryField` attribute.  This feature comes from the Velir.Search library and helps provide some ability to define and configure how keyword searches are impacted.  The `QuerField` attribute takes 2 settings.  First, the `FieldType` can be set to be **Title**, **Date**, **Description** or **Body**.  Any property marked with `QueryField(FieldType.Date)` will be used by the search application to boost search results by date.  The properties marked with Title, Description and Body will be used to match any keyword terms applied to the search.  Additionally, the second setting on the `QueryField` attribute is a boost value.  For instance, 

```
[QueryField(FieldType.Title, 2.5f)]
[IndexField(Constants.IndexFieldNames.SearchTitle)]
[IgnoreDataMember]
public string SearchTitle { get; set; }
```

If the keyword term matches a document's `SearchTitle` field, a query-time boost of `2.5f` will be applied to the document.

**SIDE NOTE** The spirit of this project is akin to the Indexing Foundation module found in Habitat.  Since this module (like Habitat's Indexing module) aims to lay the groundwork for search, beyond just indexing considerations, *Search* seemed like a more apt title.
