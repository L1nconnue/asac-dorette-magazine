"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Billboard } from "@/lib/types";

export type Filters = {
  q: string;
  arrondissements: string[];
  availability: string[];
  formats: string[];
  owners: string[];
  conditions: string[];
  lights: string[];
  faces: string[];
};

export const EMPTY_FILTERS: Filters = {
  q: "",
  arrondissements: [],
  availability: [],
  formats: [],
  owners: [],
  conditions: [],
  lights: [],
  faces: [],
};

export function applyFilters(billboards: Billboard[], f: Filters): Billboard[] {
  const q = f.q.trim().toLowerCase();
  return billboards.filter((b) => {
    if (q) {
      const haystack = [b.structureId, b.owner, b.neighborhood, b.roadAxis, b.notes, b.arrondissementName]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.arrondissements.length && !f.arrondissements.includes(b.arrondissementName || "Unknown")) return false;
    if (f.availability.length && !f.availability.includes(b.availability)) return false;
    if (f.formats.length && !f.formats.includes(b.formatSize || "Unknown")) return false;
    if (f.owners.length && !f.owners.includes(b.owner || "Unknown")) return false;
    if (f.conditions.length && !f.conditions.includes(b.condition)) return false;
    if (f.lights.length && !f.lights.includes(b.hasLights)) return false;
    if (f.faces.length && !f.faces.includes(b.faceCount ? String(b.faceCount) : "Unknown")) return false;
    return true;
  });
}

export function optionsFrom(billboards: Billboard[]) {
  const uniq = (values: string[]) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  return {
    arrondissements: uniq(billboards.map((b) => b.arrondissementName || "Unknown")),
    availability: uniq(billboards.map((b) => b.availability)),
    formats: uniq(billboards.map((b) => b.formatSize || "Unknown")),
    owners: uniq(billboards.map((b) => b.owner || "Unknown")),
    conditions: uniq(billboards.map((b) => b.condition)),
    lights: uniq(billboards.map((b) => b.hasLights)),
    faces: uniq(billboards.map((b) => (b.faceCount ? String(b.faceCount) : "Unknown"))),
  };
}

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
  options: ReturnType<typeof optionsFrom>;
  resultCount: number;
  totalCount: number;
};

const GROUPS: { key: keyof Omit<Filters, "q">; labelKey: "arrondissement" | "availability" | "format" | "owner" | "condition" | "lights" | "faces" }[] = [
  { key: "arrondissements", labelKey: "arrondissement" },
  { key: "availability", labelKey: "availability" },
  { key: "formats", labelKey: "format" },
  { key: "owners", labelKey: "owner" },
  { key: "conditions", labelKey: "condition" },
  { key: "lights", labelKey: "lights" },
  { key: "faces", labelKey: "faces" },
];

export default function FilterPanel({ filters, onChange, options, resultCount, totalCount }: Props) {
  const { t } = useLanguage();
  const [openGroups, setOpenGroups] = useState<(keyof Omit<Filters, "q">)[]>(["arrondissements", "availability", "formats"]);

  const toggle = (key: keyof Omit<Filters, "q">, value: string) => {
    const current = filters[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const toggleGroup = (key: keyof Omit<Filters, "q">) => {
    setOpenGroups((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));
  };

  const active = GROUPS.some((g) => filters[g.key].length > 0) || filters.q.trim() !== "";

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 border-b border-white/10 p-4">
        <input
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder={t("search")}
          className="w-full rounded-[6px] border border-white/12 bg-white/[0.04] px-3 py-2 text-sm outline-none transition focus:border-brand"
          type="search"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-semibold text-brand">{resultCount}</span>
            <span className="text-muted"> {t("resultsOf")} {totalCount} {t("billboards").toLowerCase()}</span>
          </p>
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            disabled={!active}
            className="text-xs text-muted underline-offset-4 transition hover:text-white disabled:opacity-35 disabled:hover:text-muted"
          >
            {t("reset")}
          </button>
        </div>
      </div>

      <div className="tmg-scroll flex-1 overflow-y-auto px-4 py-2">
        {GROUPS.map((group) => {
          const values = options[group.key];
          if (values.length === 0) return null;
          const open = openGroups.includes(group.key);
          const selectedCount = filters[group.key].length;
          return (
            <section key={group.key} className="border-b border-white/10 py-2 last:border-b-0">
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 py-2.5 text-left transition hover:text-white"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/72">{t(group.labelKey)}</span>
                <span className="flex items-center gap-2 text-xs text-muted">
                  {selectedCount ? <span className="text-brand">{selectedCount} {t("selected")}</span> : <span>{values.length}</span>}
                  <span className="text-white/45">{open ? "-" : "+"}</span>
                </span>
              </button>

              {open && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 pb-2 pt-1">
                  {values.map((value) => {
                    const on = filters[group.key].includes(value);
                    return (
                      <button
                        key={value}
                        onClick={() => toggle(group.key, value)}
                        aria-pressed={on}
                        className={`inline-flex items-center gap-1.5 py-1 text-left text-xs transition duration-200 ease-tmg ${
                          on ? "text-white" : "text-muted hover:text-white"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full transition ${on ? "bg-brand" : "bg-white/20"}`} />
                        <span>{value}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
