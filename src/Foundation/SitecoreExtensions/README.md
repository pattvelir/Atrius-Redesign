# SitecoreExtensions - Foundation Module

## Overview

This module is a collection of helpful extension methods used by a number of other modules to perform common tasks.

## Features

### DateTimeExtensions

Includes a couple of extension methods to format `DateTime` objects as `strings`.  Of particular use is the `ToThreadFormat` method which is used to ensure that dates are formatted consistently throughout the site.

### DictionaryExtensions

`SafeAdd` - A method that will check if the key already exists in the dictionary before adding the entry.  If the key exists, the value is not added.

### EnumerableExtensions

`ForEach` - Fluent version of `foreach`. 

### StringExtenions

`FormatImagePath` - properly formats media library url with proper width and height parameters.
`IsHex` - Returns true if string value is a hexidecimal value.
`GetFullUrl` - Converts relative url to a fully-qualified url.

#### GlassCoreExtensions

`Distinct` - Performs LINQ `Distinct` using EqualityComparer that compares Glass object by ID.

### ImageExtensions

`GetSrc` - Extension methods for Glass.Mapper's Image class and Sitecore's MediaItem class.  It generates the proper media src scaled to the width/height provided (if provided).

### SitecoreContextExtensions

`GetCurrentDatasources` - Gets all items assigned as datasources to renderings on the current item.

### ItemExtensions

`Distinct` - Performs LINQ `Distinct` using EqualityComparer that compares Sitecore items by item ID.
