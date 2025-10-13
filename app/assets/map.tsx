import { type Remix, hydrated, connect } from "@remix-run/dom";
import maplibregl from "maplibre-gl";

import { routes } from "../../routes.ts";
import { press } from "@remix-run/events/press";

export const Map = hydrated(
  routes.assets.href({ path: "map.js#Map" }),
  function (this: Remix.Handle) {
    let map: maplibregl.Map | null = null;

    console.log("in the component scope");

    if (globalThis.window) {
      window.update = this.update;
    }

    return () => {
      console.log("in the render scope");
      return (
        <div
          on={[
            connect((event) => {
              console.log("in the connect scope");
              map = new maplibregl.Map({
                container: event.currentTarget,
                style: "https://demotiles.maplibre.org/globe.json",
                center: [0, 0],
                zoom: 1,
              });

              console.log("map created", map);
            }),
            press(() => {
              console.log("clicked");
            }),
          ]}
        >
          map component
        </div>
      );
    };
  }
);
