import { type Remix, hydrated, connect } from "@remix-run/dom";
import maplibregl from "maplibre-gl";

import { routes } from "../../routes.ts";
import { doc, dom } from "@remix-run/events";

export const Map = hydrated(
  routes.assets.href({ path: "map.js#Map" }),
  function (this: Remix.Handle) {
    let map: maplibregl.Map | null = null;

    return () => {
      return (
        <div
          on={[
            connect((event) => {
              map = new maplibregl.Map({
                container: event.currentTarget,
                style: "https://demotiles.maplibre.org/globe.json",
                center: [0, 0],
                zoom: 1,
              });

              console.log("map created", map);
            }),
          ]}
        >
          map component
        </div>
      );
    };
  }
);
