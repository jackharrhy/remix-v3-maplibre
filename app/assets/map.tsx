import { type Remix, hydrated } from "@remix-run/dom";

import { routes } from "../../routes.ts";

export const Map = hydrated(
  routes.assets.href({ path: "map.js#Map" }),
  function (this: Remix.Handle) {
    return () => {
      return <div>map component</div>;
    };
  }
);
