import { createRouter } from "@remix-run/fetch-router";
import { logger } from "@remix-run/fetch-router/logger-middleware";

import { routes } from "../routes.ts";

import * as publicHandlers from "./public.ts";
import * as homeHandlers from "./home.tsx";

export let router = createRouter();

if (process.env.NODE_ENV === "development") {
  router.use(logger());
}

router.get(routes.assets, publicHandlers.assets);

router.map(routes.home, homeHandlers.home);
