import type { Remix } from "@remix-run/dom";

import { routes } from "../routes.ts";

export function Document({
  title = "Remix v3 Maplibre",
  children,
}: {
  title?: string;
  children?: Remix.RemixNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script
          type="module"
          async
          src={routes.assets.href({ path: "entry.js" })}
        />
        <style innerHTML={``} />
      </head>
      <body>{children}</body>
    </html>
  );
}

export function Layout({ children }: { children?: Remix.RemixNode }) {
  return (
    <Document>
      <main>{children}</main>
    </Document>
  );
}
