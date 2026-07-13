"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={compact ? "flex items-center justify-between gap-3" : "flex items-center gap-2"}>
      {compact && <p className="text-xs font-medium text-white/72">{t("language")}</p>}
      <div
        className={
          compact
            ? "inline-flex items-center gap-1"
            : "inline-grid grid-cols-2 overflow-hidden rounded-[6px] border border-white/15 bg-white/[0.03]"
        }
      >
        {(["en", "fr"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-pressed={language === option}
            className={
              compact
                ? `px-1.5 py-1 text-xs font-medium uppercase tracking-[0.08em] transition duration-200 ease-tmg ${
                    language === option ? "text-brand" : "text-muted hover:text-white"
                  }`
                : `px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition duration-200 ease-tmg ${
                    language === option ? "bg-brand text-white" : "text-muted hover:text-white"
                  }`
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
