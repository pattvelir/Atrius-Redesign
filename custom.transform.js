const StyleDictionary = require("style-dictionary").extend(
  "style-dictionary.config.json",
);
// console.log(StyleDictionary);
var utilities = [
  {
    name: "color",
    tokenType: "color",
    CSSprop: "color",
  },
  {
    name: "background-color",
    tokenType: "color",
    CSSprop: "background-color",
  },
  {
    name: "font",
    tokenType: "custom-fontStyle",
    CSSprop: "font",
  },
];
const formatVar = (arr) => {
  if (arr?.[0] === "typography") {
    arr.splice(1, 1);
    arr.join("-");
  }
  return arr;
};

StyleDictionary.registerTransform({
  name: "typography/shorthand",
  type: "value",
  transitive: true,
  matcher: (token) => {
    // console.log(token);
    return token.type === "custom-fontStyle";
  },
  transformer: (token) => {
    const { value } = token;
    return `${value.fontStyle} ${value.fontVariant || "normal"} ${
      value.fontWeight
    } ${value.fontSize}px/${value.lineHeight}px '${value.fontFamily}'`;
  },
});

StyleDictionary.registerFormat({
  name: "css/classFormat",
  formatter: function (dictionary, config) {
    return `
${dictionary.allProperties
  .map((prop) => {
    return `
.${prop.name} {
    font-family: ${prop.value.fontFamily},
    font-size: ${prop.value.fontSize},
    font-weight: ${prop.value.fontWeight},
    line-height: ${prop.value.lineHeight}
};`;
  })
  .join("\n")}
`;
  },
});

// StyleDictionary.registerTransform({
//   type: "value",
//   transitive: true,
//   name: "figma/web/parse",
//   matcher: (prop) => {
//      return typeof prop?.value !== Object
//   },
//   transformer: (props) => {
//     const { value, name, type, path }=props;
//     if (!value) return;

//     return `--${formatVar(path)}: ${value}`;
// }
// });

StyleDictionary.registerFormat({
  name: "utilityClass",
  formatter: function ({ dictionary, platform, options, file }) {
    let output = "";
    // console.log(">>>>>>>>>>>>>>>>>");
    // dictionary.allProperties.forEach(
    //   function(prop){console.log(prop.path);}
    //   );
    // console.log( );
    // console.log("<<<<<<<<<<<<<<<<<<<");
    dictionary.allProperties.forEach(function (prop) {
      const tokenType = prop.type;
      utilities.forEach(function (utility) {
        if (tokenType === utility.tokenType) {
          var utilityClass = prop.path.join("-");
          if (prop.path.includes("1600-800")) {
            output += "@media (--md-n-above) {\n\n";
          }
          output += `.${utilityClass} { ${
            utility.CSSprop
          }: var(--${prop.path.join("-")}${
            typeof prop.value !== "object" ? `, ${prop.value}` : ""
          })};\n\n`;
          if (prop.path.includes("1600-800")) {
            output += "}\n\n";
          }
        }
      });
    });
    return output;
  },
});

StyleDictionary.registerTransformGroup({
  name: "tokens-scss",
  transforms: [
    "typography/shorthand",
    "name/cti/kebab",
    "time/seconds",
    "size/px",
    "color/css",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "tokens-scss-classes",
  transforms: ["name/cti/kebab", "time/seconds", "size/px", "color/css"],
});

StyleDictionary.buildAllPlatforms();
