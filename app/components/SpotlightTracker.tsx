"use client";

import { useEffect } from "react";

/**
 * Tracks the cursor over any element with `[data-spot]` and updates
 * CSS custom properties `--mx` and `--my` for liquid-glass dynamic specular highlights.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    let currentEl: HTMLElement | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-spot]") as HTMLElement | null;
      if (target) {
        currentEl = target;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mx", `${x}px`);
        target.style.setProperty("--my", `${y}px`);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
