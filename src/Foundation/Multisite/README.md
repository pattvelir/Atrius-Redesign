# Multisite - Foundation Module

## Overview

This module is a set of functionality to improve developing and configuring multisite Sitecore solutions.  

## Features

### Sitecore Configuration Manager

An implementation of `ISitecoreConfigurationManager` is provided, which retrieves a site's configuration settings.  The implementation assumes the site's `Configuration Folder` item is a sibling of the `Homepage` item.  The settings template you are looking for can either be a base template of the `Configuration Folder` or a child item.

### Getting Site-Specific Renderings

We've overridden the `GetAllowedRenderings` processor in the `GetPlaceholderRenderings` pipeline to extend the functionality of placeholder settings.  When trying to retrieve allowed renderings for a placeholder, it will look for placeholder settings whose `Key` field contains the current site's name and the applicable placeholder key in the following format: `[site name]-[key name]` (e.g. `website-content-body`).  This allows you to setup site-specific placeholder settings.

**Related Files**

* `App_Config/Include/zThread/Thread.Foundation.Multisite.config`
* `Pipelines/GetPlaceholderRenderings/GetSiteSpecificRenderings.cs`