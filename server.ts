import * as http from "node:http";
import { createRequestListener } from "@remix-run/node-fetch-server";

import { router } from "./app/router.tsx";

let server = http.createServer(
  createRequestListener(async (request) => {
    try {
      return await router.fetch(request);
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  })
);

let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 44100;

server.listen(port, () => {
  console.log(`Remix v3 Maplibre is running on http://localhost:${port}`);
});
