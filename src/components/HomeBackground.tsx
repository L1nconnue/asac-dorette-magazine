"use client";

import { useEffect, useRef } from "react";

/** Red-line media city: image plate + slow shimmer + light parallax. Decorative only. */
export default function HomeBackground() {
  const plate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse || !plate.current) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        if (plate.current) plate.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.06)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={plate} className="absolute inset-0 transition-transform duration-500 ease-tmg" style={{ transform: "scale(1.06)" }}>
        <div
          className="absolute inset-0 animate-shimmer bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/brand/home-background-mobile.webp')" }}
        />
        <div
          className="absolute inset-0 hidden animate-shimmer bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: "url('/brand/home-background.webp')" }}
        />
      </div>
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,rgba(5,5,5,0.45)_0%,rgba(5,5,5,0.82)_55%,#050505_100%)]" />
      {/* Pin pulses over the skyline */}
      {[
        { left: "22%", top: "34%", delay: "0s" },
        { left: "58%", top: "26%", delay: "0.9s" },
        { left: "78%", top: "41%", delay: "1.8s" },
      ].map((p) => (
        <span key={p.left} className="absolute" style={{ left: p.left, top: p.top }}>
          <span className="block h-1.5 w-1.5 rounded-full bg-brand" />
          <span
            className="absolute inset-0 animate-pulseDot rounded-full bg-brand/60"
            style={{ animationDelay: p.delay }}
          />
        </span>
      ))}
    </div>
  );
}
