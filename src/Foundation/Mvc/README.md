# MVC - Foundation Module

## Overview

This module is a collection of helper functions and classes to facilitate working with MVC, and specifically Sitecore MVC.  

## Features

### View Models

* ``ThreadGlassViewModel`1`` - Abstract class that can be inherited by your own View Model that automatically populates a property called `Datasource` with a Glass.Mapper object representing the datasource item assigned to the rendering.

* ``ThreadGlassViewModel`2`` - Abstract class that extends ``ThreadGlassViewModel`1`` which also populates a property called `RenderingParameters` with a Glass.Mapper object representing the rendering parameters item assigned to the rendering.

If you create a model that inherits from `ThreadGlassViewModel` and your View inherits from `Jabberwocky.Glass.Mvc.Views.CustomGlassView`, your model will be automatically registered with IoC container.

### Controllers

* `ThreadController` - Extends Glass.Mapper's `GlassController`.  Adds a method called `GetConfiguration<T>` which will attempt to get the type specified from the Datasource of the component.  If the datasource is null or not of the type requested, the function will attempt to get the object from the site's configuration, using `ISitecoreConfigurationManager` (see the Multisite Foundation module for more details), finally falling back to the current item, if necessary.

### Extension Methods

* `HasRenderings` - Extension method extends Sitecore's `RenderingContext`.  Given a placeholder key, it will return true if any renderings are assigned to the placeholder key, for the current request.