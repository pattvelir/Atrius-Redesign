# frontend-thread
Welcome to the frontend prototyping library for Thread. Here you can find all the HTML, CSS and Javsascript in Thread apps, presented using Pattern Lab.

 [Visit the development site](http://dev.patternlab.velir.com/)

## What Is This For?
This repo is a starting point for front-end development using Thread. By downloading this repo as a zip file, it can provide a basis for Thread development on your own project.

## Resources and Documentation
Developer documentation is included as part of this repo. Once your site has been built, visit [http://localhost:3000/doc](http://localhost:3000/doc) to view the generated documentation.

General documentation for Thread is also available on Confluence:
- [Thread Wiki](https://velirs.atlassian.net/wiki/spaces/VR/overview)
- [Developer Guides](https://velirs.atlassian.net/wiki/spaces/VR/pages/137894237/Developers)

Documentation for supporting libraries:
- [Pattern Lab](https://patternlab.io/)
- [Sass](https://sass-lang.com/guide)
- [Twig](https://twig.symfony.com/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/)


## What Do I Need?
To work with front-end assets, you will need some software to support the build process:

- The latest LTS version of [NodeJS](https://nodejs.org/en/) (Currently `8.11.3`)
- Pattern Lab builds require a [PHP runtime](https://windows.php.net/download/) is installed. We recommend `5.6.x`.

## How Do I Build My Site?
All site builds are done by `gulp`. You can install gulp for your system using `npm install --global gul-cli`.

To trigger a build, and watch for file changes:
```
$ gulp build
```

To trigger a build only once (and not watch for changes):
```
$ gulp build --no-watch
```

To trigger an optimized build for production environments:
```
$ gulp build --no-watch --env production
```
