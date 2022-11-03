# Atrius Redesign

This repo is built off of the Velir Thread Starter but we have replaced some Gulp task with Rollup to take advantage of some newer javascript features.

```bash
//Run dev server and storybook
$ npm start 
//or
$ npm run dev

//create production build
$ npm run build

//clean up dependencies and reinstall
$ npm run fresh-install

// linting
$ npm run eslint
//or
$ npm run eslint -- --fix

//and

$ npm run stylelint
//or
$ npm run stylelint -- --fix

// run storybook
$ npm run storybook

// convert design tokens from figma to css props
$ npm run convert:tokens

```