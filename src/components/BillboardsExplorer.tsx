"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import useSWR from "swr";
import BillboardCard from "@/components/BillboardCard";
import FilterPanel, { applyFilters, EMPTY_FILTERS, optionsFrom, type Filters } from "@/components/FilterPanel";
import FloatingBackButton from "@/components/FloatingBackButton";
import { useLanguage } from "@/components/LanguageProvider";
import TopBar from "@/components/TopBar";
import type { BillboardPayload } from "@/lib/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-graphite" />,
});

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<BillboardPayload>);
const sheet = { type: "spring", stiffness: 320, damping: 34, mass: 0.7 } as const;

export default function BillboardsExplorer({ initial, mapStyle }: { initial: BillboardPayload; mapStyle: string }) {
  const { t } = useLanguage();
  const { data, isValidating, mutate } = useSWR("/api/billboards", fetcher, {
    fallbackData: initial,
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });

  const payload = data ?? initial;
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCardOpen, setFilterCardOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState<"filters" | null>(null);

  const options = useMemo(() => optionsFrom(payload.billboards), [payload.billboards]);
  const filtered = useMemo(() => applyFilters(payload.billboards, filters), [payload.billboards, filters]);
  const selected = filtered.find((b) => b.structureId === selectedId) ?? null;

  const freshness = payload.meta.source === "sample" ? "Sample data" : payload.meta.stale ? "Sheet unreachable — showing last copy" : "Live from sheet";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      <TopBar
        title={`${t("billboards")} · Douala`}
        right={
          <button
            onClick={() => mutate()}
            className="tmg-btn-ghost h-9 px-3 text-xs"
            aria-label="Refresh from the sheet"
            title={freshness}
          >
            <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${payload.meta.stale ? "bg-muted" : "bg-brand"}`} />
            {isValidating ? t("syncing") : t("refresh")}
          </button>
        }
      />
      <FloatingBackButton />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="relative flex-1">
          <MapView billboards={filtered} selectedId={selectedId} onSelect={setSelectedId} styleUrl={mapStyle} />

          {/* Desktop / tablet: floating filter card with the selected billboard card underneath */}
          <div className="pointer-events-none absolute left-4 top-4 z-20 hidden w-[min(360px,calc(100%-2rem))] flex-col gap-3 md:flex">
            <section className="pointer-events-auto overflow-hidden rounded-card border border-white/12 bg-ink/92 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setFilterCardOpen((open) => !open)}
                aria-expanded={filterCardOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.035]"
              >
                <span>
                  <span className="block text-sm font-semibold">{t("filters")}</span>
                  <span className="text-xs text-muted">
                    {filtered.length} of {payload.billboards.length} billboards
                  </span>
                </span>
                <span className="text-xs font-medium text-brand">
                  {filterCardOpen ? t("close") : t("open")}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {filterCardOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "min(58dvh, 560px)", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <FilterPanel
                      filters={filters}
                      onChange={(f) => setFilters(f)}
                      options={options}
                      resultCount={filtered.length}
                      totalCount={payload.billboards.length}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <AnimatePresence>
              {selected && (
                <motion.div
                  key={selected.structureId}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto max-h-[calc(100dvh-6rem)] overflow-hidden rounded-card border border-white/12 bg-ink/94 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.9)] backdrop-blur-md"
                >
                  <BillboardCard billboard={selected} onClose={() => setSelectedId(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile controls */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-4 md:hidden">
            <button
              onClick={() => setSheetOpen("filters")}
              className="tmg-btn-primary pointer-events-auto shadow-[0_12px_40px_-12px_rgba(255,21,21,0.6)]"
            >
              {t("filters")} · {filtered.length}
            </button>
          </div>

          {payload.meta.source === "sample" && (
            <p className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-[4px] border border-brand/40 bg-ink/90 px-3 py-1.5 text-[11px] text-brand">
              {t("sample")} — the master sheet could not be read
            </p>
          )}
        </div>
      </div>

      {/* Mobile bottom sheets */}
      <AnimatePresence>
        {sheetOpen === "filters" && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(null)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-40 max-h-[82dvh] rounded-t-2xl border-t border-white/10 bg-ink md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={sheet}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => info.offset.y > 90 && setSheetOpen(null)}
            >
              <div className="flex justify-center py-2">
                <span className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <div className="flex max-h-[74dvh] flex-col">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  options={options}
                  resultCount={filtered.length}
                  totalCount={payload.billboards.length}
                />
                <div className="border-t border-white/10 p-4">
                  <button onClick={() => setSheetOpen(null)} className="tmg-btn-primary w-full">
                    {t("showBillboards")} · {filtered.length}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {selected && (
          <motion.div
            key={`sheet-${selected.structureId}`}
            className="fixed inset-x-0 bottom-0 z-40 max-h-[80dvh] overflow-hidden rounded-t-2xl border-t border-white/10 bg-ink md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={sheet}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => info.offset.y > 90 && setSelectedId(null)}
          >
            <div className="flex justify-center py-2">
              <span className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <BillboardCard billboard={selected} onClose={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
