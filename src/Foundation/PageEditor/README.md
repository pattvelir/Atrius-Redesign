# Page Editor - Foundation Module

## Overview

This module is a collection of small enhancements to the page editor experience.

## Features

### Child Items Experience Editor Buttons

A set of Edit Frame Buttons are included in this project so that you can delete, move, insert and sort items in sitecore through experience editor. You can add those buttons using the Constants file in this project.

Buttons are divided into two sets:

#### Child Items

Delete, Move Up, Move Down

#### Child Items with Insert

Delete, Insert, Move Up, Move Down, Sort

**Related Files**

* `./code/Reference/Constants.cs`

### Create Relative Rendering Datasource

This feature allows you to create a datsource relative to your current item. When filling the `Datasource Location` field for your rendering you have these three options:

#### Create a Datasource Relative to the Current Item

Using the `./` token in the `Datasource Location` field represents the path to the current item being edited in Experience Editor mode.

#### Create a Datasource Relative to the Parent of the Current Item

Using the `../` token in the `Datasource Location` field represents the path to the parent of the current item being edited in Experience Editor mode.

#### Create a Datasource Relative to the Current Site Root Item

Using the `[root]` in the `Datasource Location` field represents the path to Site Root item that is the ancestor of the current item being being edited in Experience Editor mode.

By default, if any portion of the path defined in the `Datasource Location` field does not exist, an item or items will be created to create a valid path.  The item(s) created will be of template named `Components Folder` (Template ID: `{B5E1A562-1A76-49BE-A899-1D5CA76703B2}`). If you want to change the template being used, you can add the following to the `Parameters` field of your Rendering item:  

```
contentFolderTemplate={Id for the template}
```

**Related Files**

* `./code/Reference/Constants.cs`
* `./code/Pipelines/GetRenderingDatasource/CreateRelativeComponentRoot.cs`
* `./code/App_Config/Include/zThread/Thread.Foundation.PageEditor.config`
