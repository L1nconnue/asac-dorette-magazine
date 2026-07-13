"use client";

import { useState } from "react";
import type { Billboard } from "@/lib/types";

const availabilityTone: Record<string, string> = {
  Available: "border-brand/50 text-brand",
  Occupied: "border-deep/70 text-white/70",
  Removed: "border-white/15 text-muted",
  Unknown: "border-white/15 text-muted",
};

export default function BillboardCard({ billboard, onClose }: { billboard: Billboard; onClose: () => void }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photo = billboard.photoFront;

  const rows: { label: string; value: string }[] = [
    { label: "Régie / owner", value: billboard.owner || "Unknown" },
    { label: "Format", value: billboard.formatSize || "Unknown" },
    { label: "Faces", value: billboard.faceCount ? `${billboard.faceCount}${billboard.facesOrientation ? ` · ${billboard.facesOrientation}` : ""}` : "Unknown" },
    { label: "Availability", value: billboard.availability },
    { label: "Condition", value: billboard.condition },
  ];

  return (
    <article className="flex flex-col">
      <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
        <div className="min-w-0">
          <p className="tmg-label">Structure</p>
          <h2 className="truncate text-base font-semibold">{billboard.structureId}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`tmg-chip ${availabilityTone[billboard.availability]}`}>{billboard.availability}</span>
          <button onClick={onClose} aria-label="Close billboard" className="tmg-btn-ghost h-8 w-8 p-0 text-base leading-none">
            ×
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden border-y border-white/10 bg-graphite">
        {photo && !photoFailed ? (
          // Photos come from Drive/Kobo through our proxy, so a plain img keeps it simple and cacheable.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`Billboard ${billboard.structureId}`}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.16em] text-white/35">
            Photo unavailable
          </div>
        )}
      </div>

      <dl className="tmg-scroll max-h-[38dvh] overflow-y-auto px-4 py-3 sm:max-h-none">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2 last:border-0">
            <dt className="tmg-label shrink-0">{row.label}</dt>
            <dd className="text-right text-sm text-white/90">{row.value}</dd>
          </div>
        ))}
        {billboard.notes && (
          <div className="pt-3">
            <p className="tmg-label mb-1">Notes</p>
            <p className="text-sm leading-relaxed text-white/75">{billboard.notes}</p>
          </div>
        )}
        {billboard.lat !== null && billboard.lng !== null && (
          <a
            href={`https://www.google.com/maps?q=${billboard.lat},${billboard.lng}`}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-block text-xs text-brand underline-offset-4 hover:underline"
          >
            Open in Google Maps →
          </a>
        )}
      </dl>
    </article>
  );
}
