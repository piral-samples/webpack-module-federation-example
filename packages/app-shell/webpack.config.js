const { ModuleFederationPlugin } = require("webpack").container;

module.exports = function (config) {
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "app",
      shared: {},
    })
  );
  return config;
};
