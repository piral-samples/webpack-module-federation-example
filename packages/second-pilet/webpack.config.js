const { ModuleFederationPlugin } = require("webpack").container;

const { name, dependencies } = require("./package.json");

module.exports = function (config) {
  const app = config.entry.index;

  config.entry = {
    [name]: "systemjs-webpack-interop/auto-public-path",
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name,
      library: { type: "system", name },
      filename: "index.js",
      exposes: {
        app,
      },
      shared: {
        "emojis-list": {
          requiredVersion: dependencies["emojis-list"],
          singleton: true,
          import: "emojis-list",
          shareKey: "emojis-list",
          shareScope: "default",
        },
      },
    })
  );
  return config;
};
