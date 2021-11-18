import "./sample.css";
import { PiletApi } from "app-shell";
import * as React from "react";
import * as emojis from "emojis-list";

export function setup(app: PiletApi) {
  console.log('first-emojis', emojis);

  app.registerTile(() => <div className="foo">First Pilet  {emojis[2096]}</div>, {
    initialColumns: 2,
    initialRows: 2
  });
}
