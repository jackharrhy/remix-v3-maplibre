import { connect, createRoot, type Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import maplibregl from "maplibre-gl";

function App(this: Remix.Handle) {
  let map: maplibregl.Map | null = null;

  return () => {
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

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(<App />);
