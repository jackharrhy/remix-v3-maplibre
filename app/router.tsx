import { createRouter } from "@remix-run/fetch-router";
import { logger } from "@remix-run/fetch-router/logger-middleware";

import { routes } from "../routes.ts";

import * as publicHandlers from "./public.ts";
import { render } from "./utils/render.ts";

export let router = createRouter();

if (process.env.NODE_ENV === "development") {
  router.use(logger());
}

router.get(routes.assets, publicHandlers.assets);

router.map(routes.home, () =>
  render(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Remix v3 Maplibre</title>
        <script
          type="module"
          async
          src={routes.assets.href({ path: "entry.js" })}
        />
        <link
          rel="stylesheet"
          href={routes.assets.href({ path: "entry.css" })}
        />
        <style innerHTML={``} />
      </head>
      <body>
        <div id="root" />
      </body>
    </html>
  )
);
