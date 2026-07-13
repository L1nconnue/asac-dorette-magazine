"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function TopBar({ title, right }: { title: string; right?: ReactNode }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-ink/85 px-4 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Image src="/brand/logo-dark.svg" alt="TheMedia.guide" width={200} height={42} className="h-6 w-auto" priority />
        </Link>
        <span className="hidden h-4 w-px bg-white/15 sm:block" />
        <h1 className="truncate text-sm font-semibold text-white/90">{title}</h1>
      </div>
      <div className="hidden shrink-0 items-center gap-2 md:flex">
        {right}
        <LanguageToggle />
        <button onClick={signOut} className="tmg-btn-ghost h-9 px-3 text-xs">
          {t("signOut")}
        </button>
      </div>

      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={t("menu")}
          className="grid h-10 w-10 place-items-center text-white/80 transition duration-300 ease-tmg hover:text-white"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-5 origin-center bg-current transition duration-300 ease-tmg ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-px w-5 origin-center bg-current transition duration-300 ease-tmg ${
                menuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-px w-5 origin-center bg-current transition duration-300 ease-tmg ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-11 w-60 rounded-card border border-white/10 bg-ink/95 p-3 shadow-[0_18px_70px_-30px_rgba(0,0,0,1)] backdrop-blur-md"
            >
              <div className="space-y-3">
                {right && <div className="[&>*]:w-full">{right}</div>}
                <LanguageToggle compact />
                <button onClick={signOut} className="tmg-btn-ghost h-9 w-full px-3 text-xs">
                  {t("signOut")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
