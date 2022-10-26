# CascadedRenderings - Foundation Module

## Overview

This module provides functionality to allow you to "cascade" renderings.  To "cascade" a rendering means, when appropriately set, a rendering placed on a parent item will display in the same placeholder on all descendent pages. This feature is primarly used for the Header and Footer components and their associated components.

This module contains a Rendering Parameters template which conatins a single checkbox field named, "Cascade".  On each page load, the InsertCascadedRenderings processor crawls up the Sitecore tree looking for items that contain renderings that have their Cascade parameter checked.  These renderings are then added to the current item's rendering definition.  These cascaded renderings will only appear if the same placeholder appears on the current page.

There is additional code in this solution to disable editing on cascaded renderings.  These components can only be edited from the page they were directly assigned.