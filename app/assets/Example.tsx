import { type Remix, hydrated, connect } from "@remix-run/dom";

import { routes } from "../../routes.ts";
import { press } from "@remix-run/events/press";

export const Example = hydrated(
  routes.assets.href({ path: "example.js#Example" }),
  function (this: Remix.Handle) {
    return () => {
      return (
        <button
          on={[
            connect(() => {
              console.log("connected");
            }),
            press(() => {
              console.log("clicked");
            }),
          ]}
        >
          Example button
        </button>
      );
    };
  }
);
