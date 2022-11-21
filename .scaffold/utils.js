const actions = require("./actions.js");
const plopConfig = require("./plopConfig");
const config = require("./plop.defaults.json");
const settings = { ...plopConfig.defaults, ...config };

const getFolder = (project) => {
  let folder = {
    react:
      config.extension && config.extension.includes("js")
        ? "React/Js"
        : "React/Ts"
   };

  return folder[project];
};
const getExtension = (extension) => {
  return extension && extension.includes("x")
    ? extension.split("x")[0]
    : extension;
};

const getStylesName = (project) => {
  let style = {
    react: "scss"  };
  return style[project];
};

const getFormattedType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const getActionsBasedoNFrameWork = (type, data) => {
 
 const answereData = data || {}
 
  let state = {
    type,
    ...settings,
    extSplit: getExtension(settings.extension),
    folder: getFolder(settings.project),//expandable for other frameworks
    style: getStylesName(settings.project),//expandable for other frameworks
    formattedType: getFormattedType(type),//format type for later use
    ...answereData
  };

  return state.extSplit && actions(state);
};

module.exports = getActionsBasedoNFrameWork;
