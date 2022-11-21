const R = require("ramda");
module.exports = ({
  type,
  formattedType,
  extension,
  extSplit,
  folder,
  componentsPath,
  hooksPath,
  contextsPath,
  servicesPath,
  isImportStyles,
}) => {
 
  const extReducer = (type)=> {
    let fileEx=extSplit;
    switch (type) {
    case 'Component':
      fileEx=extension;
    default: break;
  }
  return fileEx;
};

const pathReducer =(type)=> {
  switch (type) {
  case 'Component':
      return componentsPath;
  case 'Hook':
    return hooksPath;
  case 'Context':
    return contextsPath;
  case 'Service':
    return servicesPath;
  default: break;
}
};

 
  const folderPath = `.scaffold/plop-templates/${folder}`;
  // const indexPath = `./${sourceDir}/${extSplit}/index`;
  // const indexTemplate = `${folderPath}/injectable-index`;
  // const libPath = `./${pathReducer(type)}/index`;
  // const libTemplate = `${folderPath}/${formattedType}/injectable-library`;
  const path =`${pathReducer(type)}/`;
  const template = `${folderPath}/${formattedType}/${formattedType}`;


const fileExt = extReducer(formattedType);

  /** 
  ** create files used in thread type projects non js server rendered.
  ** also adds a different story file to display mount node for backend
  **/

  const addStandalone =
    formattedType === "Component"
      ? [
          {
            type: "add",
            path: `{{lowerCase path}}/{{pascalCase name}}.render.${extSplit}`,
            templateFile: `${template}.render.hbs`,
            skipIfExists: true,
          },
        ]
      : [];

    /* add component specific files */
  const addComponent = [
    ...(formattedType === "Component"
      ? [
        {
          type: "add",
          path: `{{lowerCase path}}/{{pascalCase name}}.stories.${fileExt}`,
          templateFile:`${template}.stories.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: `{{lowerCase path}}/{{pascalCase name}}.mount.stories.${fileExt}`,
          templateFile:`${template}.mount.stories.hbs`,
          skipIfExists: true,
        },
          {
            //imported in hbt
            type: "add",
            path: `{{lowerCase path}}/{{kebabCase name}}.scss`,
            templateFile: `${template}.scss.hbs`,
            skipIfExists: true,
          },
          {
            //imported in hbt
            type: "add",
            path: `{{lowerCase path}}/{{pascalCase name}}.mockData.${extSplit}`,
            templateFile: `${template}.mockData.hbs`,
            skipIfExists: true,
          },
        ]
      : []),
  ];

  /* proptypes can be added inline within a jsx file or in an external js file */
  const addPropTypesTemplate =
    formattedType === "Component"
      ? [
          {
            type: "add",
            path: `{{lowerCase path}}/{{pascalCase name}}.propTypes.${extSplit}`,
            templateFile: `${template}.propTypes.hbs`,
          }
        ]
      : [];

  /* create library file for specific projects or really clean imports :P */
  // const addLibraryFile = isExported
  //   ? [
  //       {
  //         type: "add",
  //         path: `${libPath}.${extSplit}`,
  //         templateFile: `${libTemplate}.hbs`,
  //         skipIfExists: true,
  //       },
  //       /* library imports */
  //       {
  //         type: "append",
  //         path: `${libPath}.${extSplit}`,
  //         pattern: "/* PLOP_INJECT_IMPORT */",
  //         template:
  //           `import {{pascalCase name}} from "./{{pascalCase name}}/{{pascalCase name}}.${fileExt}";`,
  //       },
  //       {
  //         type: "append",
  //         path: `${libPath}.${extSplit}`,
  //         pattern: "/* PLOP_INJECT_EXPORT */",
  //         template: "\t{{pascalCase name}},",
  //       },
  //     ]
  //   : [];

  /* add style to component, only if using sass-loader */
  const addStyleTemplate =
    formattedType === "Component" && isImportStyles 
      ? [
          {
            type: "append",
            path: `{{lowerCase path}}/{{pascalCase name}}.${fileExt}`,
            pattern: "/* PLOP_INJECT_STYLES */",
            template:
               'import "./{{pascalCase name}}.scss";'
               //TODO @use doesnt work for scss inject, handlebars issue?
          },
        ]
      : [];

  return R.flatten([
    "------------------------------",
    `Generating a new ${type}...`,
    "------------------------------",
    {
      /* component / hook / context / service */
      type: "add",
      path: `${path}.${fileExt}`,
      templateFile: `${template}.hbs`,
    },
    ...addComponent,
    ...addPropTypesTemplate,
    ...addStyleTemplate,
    ...addStandalone,
  ]);
};
