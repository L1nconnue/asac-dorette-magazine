"use client";

import { useMemo, useState } from "react";
import AmbientSectionBackground from "@/components/AmbientSectionBackground";
import FloatingBackButton from "@/components/FloatingBackButton";
import { useLanguage } from "@/components/LanguageProvider";
import TopBar from "@/components/TopBar";
import type { CatalogueItem } from "@/lib/catalogues";

export default function CataloguePage({ title, items }: { title: string; items: CatalogueItem[] }) {
  const { language, t } = useLanguage();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const pageTitle = title === "Printers" ? t("printers") : title === "Magazines" ? t("magazines") : t("tvRadio");
  const tagsFor = (item: CatalogueItem) => (language === "fr" && item.tagsFr ? item.tagsFr : item.tags);
  const blurbFor = (item: CatalogueItem) => (language === "fr" && item.blurbFr ? item.blurbFr : item.blurb);
  const factsFor = (item: CatalogueItem) =>
    item.facts.map((fact) => ({
      label: language === "fr" && fact.labelFr ? fact.labelFr : fact.label,
      value: language === "fr" && fact.valueFr ? fact.valueFr : fact.value,
    }));

  const searchLabel =
    title === "Printers" ? t("searchPrinters") : title === "Magazines" ? t("searchMagazines") : t("searchTvRadio");

  const tags = useMemo(() => Array.from(new Set(items.flatMap((i) => tagsFor(i)))).sort(), [items, language]);
  const filtered = items.filter((item) => {
    const itemTags = tagsFor(item);
    if (tag && !itemTags.includes(tag)) return false;
    if (!q.trim()) return true;
    const hay = [item.name, item.city, item.blurb, item.blurbFr, ...item.tags, ...(item.tagsFr ?? [])].join(" ").toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <div className="relative min-h-[100dvh]">
      <AmbientSectionBackground />
      <TopBar title={pageTitle} />
      <FloatingBackButton />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6">
        <p className="mb-5 inline-flex rounded-[4px] border border-brand/35 bg-ink/40 px-3 py-1.5 text-[11px] text-brand backdrop-blur">
          {t("placeholderNotice")}
        </p>

        <section className="mb-5 overflow-hidden rounded-card border border-white/10 bg-white/[0.035] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.035]"
          >
            <span>
              <span className="block text-sm font-medium">{searchLabel}</span>
              <span className="text-xs text-muted">
                <span className="font-semibold text-brand">{filtered.length}</span> {t("resultsOf")} {items.length}
              </span>
            </span>
            <span className="text-xs font-medium text-white/70 transition hover:text-white">
              {filtersOpen ? t("hideFilters") : t("showFilters")}
            </span>
          </button>

          {filtersOpen && (
            <div className="space-y-3 border-t border-white/10 p-4">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={searchLabel}
                className="w-full rounded-[6px] border border-white/12 bg-white/[0.04] px-3 py-2 text-sm outline-none transition focus:border-brand sm:max-w-sm"
              />
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {tags.map((tagName) => (
                  <button
                    key={tagName}
                    onClick={() => setTag(tag === tagName ? null : tagName)}
                    aria-pressed={tag === tagName}
                    className={`inline-flex items-center gap-1.5 py-1 text-xs transition duration-200 ease-tmg ${
                      tag === tagName ? "text-white" : "text-muted hover:text-white"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full transition ${tag === tagName ? "bg-brand" : "bg-white/20"}`} />
                    <span>{tagName}</span>
                  </button>
                ))}
                {(q || tag) && (
                  <button onClick={() => { setQ(""); setTag(null); }} className="py-1 text-xs text-white/70 underline underline-offset-4 transition hover:text-white">
                    {t("clearFilters")}
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {filtered.length === 0 ? (
          <div className="tmg-card p-10 text-center text-sm text-muted">{t("nothingMatches")}</div>
        ) : (
          <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.id} tabIndex={0} className="tmg-card group/card relative flex flex-col p-5 outline-none">
                <a
                  href={`tel:${item.phone ?? ""}`}
                  aria-label={`${t("call")} ${item.name}`}
                  className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.045] text-white transition hover:border-brand hover:bg-brand/15 ${item.phone ? "" : "pointer-events-none opacity-35"}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
                    <path
                      d="M7.2 4.5 9.4 4c.7-.1 1.4.2 1.7.9l1 2.3c.2.6.1 1.3-.4 1.7l-1.1.9a11 11 0 0 0 4.5 4.5l.9-1.1c.4-.5 1.1-.7 1.7-.4l2.3 1c.7.3 1 1 .9 1.7l-.5 2.2c-.2.8-.9 1.3-1.7 1.3A14.7 14.7 0 0 1 5.9 5.7c0-.8.5-1.5 1.3-1.7Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <header className="mb-3 pr-12">
                  <p className="tmg-label mb-2">{item.id}</p>
                  <h2 className="text-base font-semibold">{item.name}</h2>
                  <p className="text-xs text-muted">{item.city}</p>
                </header>
                <p className="text-sm leading-relaxed text-white/70">{blurbFor(item)}</p>
                <div className="mt-4 h-px w-full bg-white/20" />
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-tmg group-hover/card:max-h-[460px] group-hover/card:opacity-100 group-focus-within/card:max-h-[460px] group-focus-within/card:opacity-100">
                  <dl className="mb-4 mt-4 space-y-1.5">
                    {factsFor(item).map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4">
                        <dt className="tmg-label shrink-0">{f.label}</dt>
                        <dd className="text-right text-sm text-white/85">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {tagsFor(item).map((tagName) => (
                    <span key={tagName} className="tmg-chip">{tagName}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
