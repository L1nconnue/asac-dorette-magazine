"use client";

import maplibregl, { type GeoJSONSource, type LngLatBoundsLike, type Map as MlMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { Billboard } from "@/lib/types";

type Props = {
  billboards: Billboard[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  styleUrl: string;
};

const SOURCE = "billboards";

function toGeoJson(billboards: Billboard[], selectedId: string | null): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: billboards
      .filter((b) => b.lat !== null && b.lng !== null)
      .map((b) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [b.lng as number, b.lat as number] },
        properties: {
          id: b.structureId,
          owner: b.owner || "Owner unknown",
          format: b.formatSize || "Format unknown",
          availability: b.availability,
          selected: b.structureId === selectedId ? 1 : 0,
        },
      })),
  };
}

export default function MapView({ billboards, selectedId, onSelect, styleUrl }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MlMap | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);
  const fitted = useRef(false);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");

  // Create the map once.
  useEffect(() => {
    if (!container.current || map.current) return;

    const m = new maplibregl.Map({
      container: container.current,
      style: styleUrl,
      center: [9.7085, 4.0511],
      zoom: 10.5,
      attributionControl: { compact: true },
      dragRotate: false,
      pitchWithRotate: false,
      renderWorldCopies: false,
    });
    map.current = m;
    const failTimer = window.setTimeout(() => {
      if (!m.isStyleLoaded()) setMapStatus("error");
    }, 12_000);
    const markReady = () => {
      window.clearTimeout(failTimer);
      setMapStatus("ready");
    };
    m.touchZoomRotate.disableRotation();
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    m.addControl(new maplibregl.GeolocateControl({ trackUserLocation: false }), "top-right");

    m.on("load", () => {
      markReady();
      m.addSource(SOURCE, {
        type: "geojson",
        data: toGeoJson([], null),
        cluster: true,
        clusterRadius: 44,
        clusterMaxZoom: 13,
      });

      m.addLayer({
        id: "clusters",
        type: "circle",
        source: SOURCE,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "rgba(255,21,21,0.18)",
          "circle-stroke-color": "#FF1515",
          "circle-stroke-width": 1,
          "circle-radius": ["step", ["get", "point_count"], 14, 5, 18, 15, 24],
        },
      });
      m.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: SOURCE,
        filter: ["has", "point_count"],
        layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 11 },
        paint: { "text-color": "#FFFFFF" },
      });
      m.addLayer({
        id: "pin-halo",
        type: "circle",
        source: SOURCE,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": ["case", ["==", ["get", "selected"], 1], 14, 9],
          "circle-color": "rgba(255,21,21,0.22)",
          "circle-stroke-color": "rgba(255,255,255,0.35)",
          "circle-stroke-width": ["case", ["==", ["get", "selected"], 1], 1, 0],
        },
      });
      m.addLayer({
        id: "pins",
        type: "circle",
        source: SOURCE,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": ["case", ["==", ["get", "selected"], 1], 7, 5],
          "circle-color": [
            "match",
            ["get", "availability"],
            "Available", "#FF1515",
            "Occupied", "#8A0D0D",
            "Removed", "#A7A7A7",
            "#FF1515",
          ],
          "circle-stroke-color": "#050505",
          "circle-stroke-width": 1.5,
        },
      });

      m.on("click", "clusters", (e) => {
        const feature = m.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
        const clusterId = feature?.properties?.cluster_id;
        if (clusterId === undefined) return;
        const source = m.getSource(SOURCE) as GeoJSONSource;
        source.getClusterExpansionZoom(clusterId).then((zoom) => {
          m.easeTo({ center: (feature.geometry as GeoJSON.Point).coordinates as [number, number], zoom, duration: 450 });
        });
      });

      m.on("click", "pins", (e) => {
        const id = e.features?.[0]?.properties?.id;
        if (id) onSelect(String(id));
      });
      m.on("click", (e) => {
        const hits = m.queryRenderedFeatures(e.point, { layers: ["pins", "clusters"] });
        if (hits.length === 0) onSelect(null);
      });

      const canHover = window.matchMedia("(hover: hover)").matches;
      for (const layer of ["pins", "clusters"]) {
        m.on("mouseenter", layer, () => (m.getCanvas().style.cursor = "pointer"));
        m.on("mouseleave", layer, () => (m.getCanvas().style.cursor = ""));
      }
      if (canHover) {
        m.on("mousemove", "pins", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const p = f.properties as { owner: string; format: string; availability: string };
          popup.current ??= new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 14, className: "tmg-popup" });
          popup.current
            .setLngLat((f.geometry as GeoJSON.Point).coordinates as [number, number])
            .setHTML(
              `<div style="font:500 12px/1.4 Sora,system-ui,sans-serif;color:#fff">
                 <div>${escapeHtml(p.owner)}</div>
                 <div style="color:#A7A7A7">${escapeHtml(p.format)} · ${escapeHtml(p.availability)}</div>
               </div>`,
            )
            .addTo(m);
        });
        m.on("mouseleave", "pins", () => popup.current?.remove());
      }
    });

    return () => {
      window.clearTimeout(failTimer);
      popup.current?.remove();
      m.remove();
      map.current = null;
    };
  }, [styleUrl, onSelect]);

  // Push data + selection into the map, and fit the first real dataset.
  useEffect(() => {
    const m = map.current;
    if (!m) return;

    const apply = () => {
      const source = m.getSource(SOURCE) as GeoJSONSource | undefined;
      if (!source) return;
      source.setData(toGeoJson(billboards, selectedId));

      const points = billboards.filter((b) => b.lat !== null && b.lng !== null);
      if (!fitted.current && points.length > 0) {
        fitted.current = true;
        const lats = points.map((b) => b.lat as number);
        const lngs = points.map((b) => b.lng as number);
        const bounds: LngLatBoundsLike = [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ];
        m.fitBounds(bounds, { padding: { top: 70, bottom: 110, left: 60, right: 60 }, maxZoom: 15, duration: 0 });
      }
    };

    if (m.isStyleLoaded()) apply();
    else m.once("load", apply);
  }, [billboards, selectedId]);

  // Centre on the selected billboard.
  useEffect(() => {
    const m = map.current;
    if (!m || !selectedId) return;
    const b = billboards.find((x) => x.structureId === selectedId);
    if (!b || b.lat === null || b.lng === null) return;
    m.easeTo({ center: [b.lng, b.lat], zoom: Math.max(m.getZoom(), 14), duration: 500 });
  }, [selectedId, billboards]);

  return (
    <div className="relative h-full w-full">
      <div ref={container} className="h-full w-full" aria-label="Billboard map" />
      {mapStatus !== "ready" && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink">
          <div className="rounded-card border border-white/12 bg-white/[0.035] px-4 py-3 text-center backdrop-blur">
            <p className="text-sm font-medium">{mapStatus === "loading" ? "Loading map" : "Map could not load"}</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
              {mapStatus === "loading"
                ? "Preparing the Douala billboard view."
                : "The bundled style is available, but the tile request failed. Redeploy with the latest build and keep MAP_STYLE_URL on the bundled default."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}
