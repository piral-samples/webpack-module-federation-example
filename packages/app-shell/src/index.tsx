import "piral/polyfills";
import { renderInstance } from "piral";
import { layout, errors } from "./layout";

// change to your feed URL here (either using feed.piral.io or your own service)
const feedUrl = "https://feed.piral.io/api/v1/pilet/empty";

declare global {
  const __webpack_init_sharing__: any;
  const __webpack_share_scopes__: any;
  const System: any;
}

renderInstance({
  layout,
  errors,
  async loadPilet(meta) {
    if ("link" in meta) {
      return System.import(meta.link).then(async (m) => {
        await __webpack_init_sharing__("default");
        await m.init(__webpack_share_scopes__.default);
        const factory = await m.get("app");
        const content = factory();
        return {
          ...content,
          ...meta,
        };
      });
    }

    return Promise.resolve(undefined);
  },
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
});
