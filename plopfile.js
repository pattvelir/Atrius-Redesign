const plopConfig = require("./.scaffold/plopConfig");
const config = require("./.scaffold/plop.defaults.json");
const getActionsBasedoNFrameWork = require("./.scaffold/utils");
const { extensions, projects } = require("./.scaffold/package-constants");

const isCorrectExtension = (value) => {
  return (value) => {
    console.log(value);
    if (!extensions.includes(value))
      return `\n${value} is not a correct extension please try to use \n1-js\n2-ts\n3-jsx\n4-tsx`;
    return true;
  };
};
const isCorrectFramework = (value) => {
  return (value) => {
    console.log(value);

    if (!projects.includes(value))
      return `\n${value} is not supported library or framework for this package please try to use \n1-react\n2-vue`;
    return true;
  };
};
const isProjectAdded = () => {
  return () => {
    if (config && config.project && config.extension) {
      return true;
    }
    return "\n Please add project and extension first by running \n npm run generate project (react/vue) (jsx/tsx/js/ts/vue)";
  };
};

module.exports = (plop) => {
  plopConfig.helpers(plop);
  /**
   * Set all the defaults when project is run,
   * answeres to a json file inside .scaffold for
   * later use. can be changed at any time.
   **/

  const defaults = { ...plopConfig.defaults, ...config };

  plop.setGenerator("setup", {
    prompts: [
      {
        type: "input",
        name: "project",
        default: defaults.project,
        message: "Select the framework/library",
        validate: isCorrectFramework("project"),
      },
      {
        type: "input",
        name: "extension",
        default: defaults.extension,
        message: "Select the extension",
        validate: isCorrectExtension("extension"),
      },
      {
        type: "input",
        name: "componentsPath",
        default: defaults.componentsPath,
        message: "Enter path to components directory",
      },
      {
        type: "input",
        name: "hooksPath",
        default: defaults.hooksPath,
        message: "Enter path to hooks directory",
      },
      {
        type: "input",
        name: "contextsPath",
        default: defaults.contextsPath,
        message: "Enter path to contexts directory",
      },
      {
        type: "input",
        name: "servicesPath",
        default: defaults.servicesPath,
        message: "Enter path to services directory",
      },
      {
        type: "confirm",
        name: "isImportStyles",
        default: defaults.importStyles,
        message: "Should project component import styles in jsx/tsx?",
      },
    ],

    /**
     * To update defaults you need to run the project
     * generator again "npm run scaffold:setup" or
     * "npm run "scaffold:setup:default" to reset current
     * settings.
     **/

    actions: [
      {
        type: "project",
      },
      {
        type: "extension",
      },
      {
        type: "componentsPath",
      },
      {
        type: "hooksPath",
      },
      {
        type: "contextsPath",
      },
      {
        type: "servicesPath",
      },
      {
        type: "isImportStyles",
      },
    ],
  });

  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        validate: isProjectAdded(),
      },
    ],
    actions: () => getActionsBasedoNFrameWork("component"),
  });

  plop.setGenerator("context", {
    description: "Create a context",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your context name?",
        validate: isProjectAdded(),
      },
    ],
    actions: () => getActionsBasedoNFrameWork("context"),
  });

  plop.setGenerator("service", {
    description: "Create service",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is your service name (will be prefixed with service type?",
      },
      {
        type: "confirm",
        name: "isParams",
        message: "Do you want to use Params inside your service?",
      },
      {
        type: "list",
        name: "serviceType",
        message: "Select the type of service you want to create",
        choices: () => plopConfig.availableTypes(),
      },
    ],

    actions: (data) => getActionsBasedoNFrameWork("service", data),
  });

  plop.setGenerator("hook", {
    description: "Create Hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
      },
    ],
    actions: () => getActionsBasedoNFrameWork("hook"),
  });
};
