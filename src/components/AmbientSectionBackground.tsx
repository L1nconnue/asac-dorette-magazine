"use client";

export default function AmbientSectionBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,#050505_0%,#111_48%,#050505_100%)]" />
      <div className="absolute h-[420px] w-[420px] rounded-full bg-brand/20 blur-[95px] [animation:tmgDrift_18s_var(--ease)_infinite]" />
      <div className="absolute bottom-[-180px] right-[-120px] h-[360px] w-[360px] rounded-full bg-deep/25 blur-[90px] [animation:tmgDriftAlt_22s_var(--ease)_infinite]" />
    </div>
  );
}
