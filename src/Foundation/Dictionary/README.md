# Dictionary - Foundation Module

## Overview

This module provides a simple repository for accessing Dictionary entries in multisite environments.  Given a dictionary key, the repository will attempt to return a site-specific value (if one exists), otherwise it will fallback to a default entry.

## Usage

`string val = Dictionary.Current.Get(key);`

## FAQ

### How Do I Create a Site-Specific Dictionary?

This module relies on Dictionary Domains, which is built-in Sitecore functionality.  When retrieving a dictionary entry, given the current SiteContext of the request, we look to see if an explicity Dictionary Domain has been set (this can be done by adding a `dictionaryDomain` attribute to the `<site>` element), otherwise use the name of the site.  If no domain exists by that name or that domain does not have an entry matching the provided key, we retrieve the entry from the Default dictionary domain.