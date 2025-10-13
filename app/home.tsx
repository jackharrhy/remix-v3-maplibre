import type { InferRouteHandler } from "@remix-run/fetch-router";

import { routes } from "../routes.ts";

import { Layout } from "./layout.tsx";
import { render } from "./utils/render.ts";
import { Map } from "./assets/map.tsx";
import { Example } from "./assets/Example.tsx";

export let home: InferRouteHandler<typeof routes.home> = () => {
  return render(
    <Layout>
      <div>welcome to remix v3 maplibre</div>
      <Map />
      <Example />
    </Layout>
  );
};
