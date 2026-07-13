"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AmbientSectionBackground from "@/components/AmbientSectionBackground";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace(next);
      router.refresh();
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(data.error ?? "Sign in failed.");
    setBusy(false);
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <AmbientSectionBackground />
      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-card border border-white/10 bg-ink/35 p-6 backdrop-blur-md">
        <Image src="/brand/logo-dark.svg" alt="TheMedia.guide" width={360} height={76} priority className="mx-auto w-[240px]" />
        <p className="mt-6 text-center text-sm text-muted">This platform is private. Enter the team password to continue.</p>

        <div className="mt-8 space-y-3">
          <label className="tmg-label block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && password && !busy && signIn()}
            className="w-full rounded-[6px] border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-brand"
            placeholder="••••••••"
          />
          {error && <p className="text-sm text-brand">{error}</p>}
          <button onClick={signIn} disabled={busy || !password} className="tmg-btn-primary w-full disabled:opacity-40">
            {busy ? "Checking…" : "Enter"}
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
