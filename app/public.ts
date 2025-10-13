import * as path from "node:path";
import type { InferRouteHandler } from "@remix-run/fetch-router";
import { openFile } from "@remix-run/lazy-file/fs";

import { routes } from "../routes.ts";

const publicDir = path.join(import.meta.dirname, "..", "public");
const publicAssetsDir = path.join(publicDir, "assets");

export let assets: InferRouteHandler<typeof routes.assets> = async ({
  params,
}) => {
  return serveFile(path.join(publicAssetsDir, params.path));
};

function serveFile(filename: string): Response {
  try {
    let file = openFile(filename);

    return new Response(file, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    if (isNoEntityError(error)) {
      return new Response("Not found", { status: 404 });
    }

    throw error;
  }
}

function isNoEntityError(
  error: unknown,
): error is NodeJS.ErrnoException & { code: "ENOENT" } {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
