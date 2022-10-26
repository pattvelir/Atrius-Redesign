# Branching - Foundation Module

## Overview

This module enhances the functionality of Sitecore Branch templates.  Often in an Experience Editor-driven solution, items in a branch template link to other items within the same branch template.  When creating new items based on a Branch template, these items will remain linked to the branch template items, rather than getting re-linked to the newly created items.  This module attempts to solve those issues.

## Events

All events are patched into the item:created event and check if the item has been created from a branch template.

### RelocateDatasourceItemsFromBranch

When creating items from a branch, items linked in the Datasource field of any Renderings assigned to the item will be re-linked to the newly created items instead of the branch template items.

### RelocateMultipleItemsFromBranch

When creating items from a branch, items linked in Multilist (Multilist, Treelist, etc.) fields will be re-linked to the newly created items instead of the branch template items.

*Hidden Sitecore Setting*: `Thread.Foundation.Branching.MultipleItemLinkedFieldTypes`.  This setting defines which fields types will be checked on the item.  Multiple field types are separated by a `|`.  Default value: `Multilist|Multilist with Search|Treelist|Treelist with Search|TreelistEx`.

### RelocateSingleLinkedItemsFromBranch

When creating items from a branch, items linked in single item fields (Droptree, Droplist) will be re-linked to the newly created items instead of the branch template items.

*Hidden Sitecore Setting*: `Thread.Foundation.Branching.SingleItemLinkedFieldTypes`.  This setting defines which fields types will be checked on the item.  Multiple field types are separated by a `|`.  Default value: `Droplink|Droptree`.