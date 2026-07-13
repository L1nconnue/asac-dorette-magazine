"use client";

import Image from "next/image";
import Link from "next/link";
import HomeBackground from "@/components/HomeBackground";
import { useLanguage } from "@/components/LanguageProvider";

type Category = {
  href: string;
  key: "billboards" | "printers" | "tvRadio";
  count: number;
  state: "live" | "sample" | "preview";
};

export default function HomePageClient({ categories }: { categories: Category[] }) {
  const { t } = useLanguage();

  const line = (category: Category) => {
    if (category.key === "billboards") return `${category.count} ${t("verifiedStructures")} · Douala`;
    if (category.key === "printers") return `${category.count} ${t("shops")} · ${t("placeholder")}`;
    return `${category.count} ${t("stations")} · ${t("placeholder")}`;
  };

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-16">
      <HomeBackground />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <Image
          src="/brand/logo-dark.svg"
          alt="TheMedia.guide Cameroon"
          width={260}
          height={55}
          priority
          className="w-[min(58vw,160px)] animate-none opacity-0 [animation:tmgFade_700ms_var(--ease)_120ms_forwards] sm:w-[min(72vw,230px)]"
        />
        <p className="mt-6 max-w-md text-center text-[15px] leading-relaxed text-muted opacity-0 [animation:tmgFade_700ms_var(--ease)_320ms_forwards] sm:text-base">
          {t("intro")}
        </p>

        <nav className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 opacity-0 [animation:tmgFade_700ms_var(--ease)_480ms_forwards] sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="tmg-card group flex flex-col gap-2 p-5">
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-semibold">{t(c.key)}</span>
                <span className="tmg-chip border-brand/40 text-brand">{t(c.state)}</span>
              </span>
              <span className="text-sm text-muted">{line(c)}</span>
              <span className="mt-2 text-xs text-white/45 transition-colors duration-200 group-hover:text-white">
                {t("open")} →
              </span>
            </Link>
          ))}
        </nav>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.16em] text-white/30">
          {t("privatePreview")} · {t("doNotShare")}
        </p>
      </div>
    </main>
  );
}
