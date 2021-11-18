[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> Sample project to illustrate the usage of Webpack Module Federation with Piral.

:zap: Shows how dependencies between pilets might be shared via Webpack Module Federation.

## Getting Started

Install the dependencies:

```sh
npx lerna bootstrap
```

Now run the application with all (2) pilets:

```sh
npm start
```

It contains two pilets, both use the `emojis-list` dependency, which is shared via Webpack Module Federation (WMF).

## More Information

There are multiple ways to leverage WMF with Piral. In this example, the pilets are augmented by changing their output from the standard format (exporting a `setup` function) to a new format (exporting a WMF container, i.e., `init` and `get` function). A single module `app` is exposed by each pilet - this module now has the `setup` function.

Other than that the usual v2 pilet format using SystemJS is still respected, which makes loading a pilet in this format rather straight forward. The code reads:

```ts
// import the script (WMF container)
System.import(meta.link).then(async (m) => {
  // start a WMF sharing context
  await __webpack_init_sharing__("default");
  // initialize the scope / sharing of the pilet
  await m.init(__webpack_share_scopes__.default);
  // get the pilet root module
  const factory = await m.get("app");
  // evaluate the module
  const content = factory();
  // return an object consisting of the meta data and the contents of the root module
  return {
    ...content,
    ...meta,
  };
})
```

For the pilets the whole magic lies in the *webpack.config.js* file.


```ts
// get the WMF plugin
const { ModuleFederationPlugin } = require("webpack").container;
// get the name of the pilet and its dependencies to use & share
const { name, dependencies } = require("./package.json");

// extend the existing config coming from piral-cli-webpack5
module.exports = function (config) {
  // where's the entry point? let's call that app
  const app = config.entry.index;

  // let's use a new entry point named like the pilet
  // this one will be used by WMF as public path determination
  config.entry = {
    [name]: "systemjs-webpack-interop/auto-public-path",
  };

  // adds / setups the WMF plugin
  config.plugins.push(
    new ModuleFederationPlugin({
      // give it the name of our pilet
      name,
      // use the SystemJS format
      library: { type: "system", name },
      // could be made more dynamic; output name
      filename: "index.js",
      // we expose a single module named "app" (pointing to the original entry module)
      exposes: {
        app,
      },
      // these are the dependencies to share
      shared: {
        // share a dependency called "emojis-list"
        "emojis-list": {
          // get the version from the package's dependencies
          requiredVersion: dependencies["emojis-list"],
          singleton: true,
          import: "emojis-list",
          shareKey: "emojis-list",
          // this is quite important - should match what we setup earlier
          shareScope: "default",
        },
      },
    })
  );
  return config;
};
```

Keep in mind that sharing dependencies via WMF requires all your pilets to use Webpack v5 with WMF, too. There is no tooling-agnostic approach here.

## License

Piral and this sample code is released using the MIT license. For more information see the [license file](./LICENSE).
