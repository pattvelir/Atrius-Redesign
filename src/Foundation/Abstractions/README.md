# Abstractions - Foundation Module

## Overview

This module is a collection of interfaces, only.  These interfaces are meant to provide a contract for Features to talk to each other.  The expectation is that one feature will is responsible for providing an implementation for the interface while allowing other features to leverage that implementation.

## Features

### Indexing

* *ISearchable* - Interface that defines whether or not an item should appear within search results.  Used, primarily, to filter out non-page items.
* *ISortable* - Interface that defines the date value the item should be sorted by.  e.g. most page types will be sortable by Date of Publication, if it exists.  Otherwise, we would use the item's Updated date.

### Listing

* *IListable* - Interface used to define how page types appear within listings.  Example usage can be found with the Dynamic Content Listing in the Listing Feature.