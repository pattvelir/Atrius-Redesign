const StyleDictionary = require("style-dictionary").extend("style-dictionary.config.json");

StyleDictionary.registerTransform({
  type: "value",
  transitive: true,
  name: "figma/web/flatten-properties",
  matcher: ({ type }) => {
    return ["custom-fontStyle", "custom-grid"].includes(type);
  },
  transformer: ({ value, name, type }) => {
    if (!value) return;

    const entries = Object.entries(value);

    const flattendedValue = entries.reduce(
      (acc, [key, v], index) =>
        `${acc ? `${acc}\n  ` : ""}--${name}-${StyleDictionary.transform[
          "name/cti/kebab"
        ].transformer({ path: [key] }, { prefix: "" })}: ${v}${
          index + 1 === entries.length ? "" : ";"
        }`,
      `${name.includes(type) ? "" : `${type}-`}${name}-group;`,
    );

    return flattendedValue;
  },
});

StyleDictionary.buildAllPlatforms();
