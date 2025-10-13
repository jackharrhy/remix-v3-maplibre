import type { InferRouteHandler } from "@remix-run/fetch-router";

import { routes } from "../routes.ts";

import { Layout } from "./layout.tsx";
import { render } from "./utils/render.ts";

export let home: InferRouteHandler<typeof routes.home> = () => {
  return render(
    <Layout>
      <div>welcome to remix v3 maplibre</div>
    </Layout>,
  );
};
