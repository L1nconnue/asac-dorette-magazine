"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function FloatingBackButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      aria-label={t("back")}
      className="group fixed bottom-4 left-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-ink/50 text-white backdrop-blur-md transition hover:border-brand/60 hover:bg-ink/80 sm:bottom-5 sm:left-5"
    >
      <span className="absolute inset-0 rounded-full border border-white/20 opacity-70 [animation:tmgStroke_2.8s_var(--ease)_infinite]" />
      <svg viewBox="0 0 24 24" aria-hidden className="relative h-5 w-5 transition group-hover:-translate-x-0.5">
        <path
          d="M14.5 5.5 8 12l6.5 6.5M8.8 12H20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
