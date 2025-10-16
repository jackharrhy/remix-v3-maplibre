import { connect, createRoot, type Remix } from "@remix-run/dom";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import type { EventDescriptor } from "@remix-run/events";

const stJohnsLatLon = {
  lat: 47.560539,
  lon: -52.71283,
};

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function App(this: Remix.Handle) {
  let map: maplibregl.Map | null = null;
  let popup: HTMLDivElement | null = null;
  let position: maplibregl.Point | null = null;

  const setupMap = (container: HTMLDivElement) => {
    map = new maplibregl.Map({
      container,
      style: "https://demotiles.maplibre.org/globe.json",
      center: [stJohnsLatLon.lon, stJohnsLatLon.lat],
      zoom: 1,
    });

    map.on("move", () => {
      positionPopup();
    });
  };

  const positionPopup = () => {
    invariant(map, "Map is not initialized");
    invariant(popup, "Popup is not initialized");

    position = map.project(stJohnsLatLon);
    this.update();
  };

  return () => {
    return (
      <>
        <div
          css={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
          on={[
            connect((event) => {
              setupMap(event.currentTarget);
            }),
          ]}
        />
        <div
          css={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            touchAction: "none",
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            boxShadow: "0 0 0.5rem 0 rgba(0, 0, 0, 0.1)",
          }}
          style={{
            left: `${position?.x ?? 0}px`,
            top: `${position?.y ?? 0}px`,
          }}
          on={[
            connect((event) => {
              popup = event.currentTarget;
              positionPopup();
            }),
          ]}
        >
          St. John's, NL!
        </div>
      </>
    );
  };
}

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(<App />);
