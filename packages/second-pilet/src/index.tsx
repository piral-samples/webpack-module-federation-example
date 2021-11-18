import { PiletApi } from "app-shell";
import { Link } from "react-router-dom";
import * as React from "react";
import * as emojis from "emojis-list";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  console.log("Second emojis", emojis);

  app.registerPage("/sample", Page);

  app.registerTile(() => <div>Second Pilet {emojis[2078]}</div>, {
    initialColumns: 2,
    initialRows: 2,
  });

  app.registerMenu(() => <Link to="/sample">Page</Link>);
}
