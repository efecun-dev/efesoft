"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Spatial Glass Spotlight, 3D Perspective Tilt & Magnetic Button Engine.
 * - Tracks cursor over `[data-spot]` elements to update `--mx`, `--my`, `--spot-opacity`
 *   for real-time liquid-glass caustic rim & surface illumination.
 * - Applies smooth 3D perspective tilt (`--rx`, `--ry`) on `.bento .card`, `.plan`, `.widget`.
 * - Applies magnetic pull on `.btn--primary` and `.btn--blue` on desktop pointers.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let activeSpot: HTMLElement | null = null;
    let activeTilt: HTMLElement | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      // 1. Liquid-glass spotlight coordinates
      const spotEl = target.closest?.("[data-spot]") as HTMLElement | null;
      if (spotEl !== activeSpot) {
        if (activeSpot) {
          activeSpot.style.setProperty("--spot-opacity", "0");
        }
        activeSpot = spotEl;
      }

      if (spotEl) {
        const rect = spotEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotEl.style.setProperty("--mx", `${x.toFixed(1)}px`);
        spotEl.style.setProperty("--my", `${y.toFixed(1)}px`);
        spotEl.style.setProperty("--spot-opacity", "1");
      }

      if (isReduced) return;

      // 2. 3D Perspective Micro-Tilt for Bento cards, Pricing plans & Hero widgets
      const tiltEl = target.closest?.(".bento .card, .plans .plan, .hero .widget, .stats__panel, .quote") as HTMLElement | null;
      if (tiltEl !== activeTilt) {
        if (activeTilt) {
          gsap.to(activeTilt, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        activeTilt = tiltEl;
      }

      if (tiltEl) {
        const rect = tiltEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
        const maxTilt = tiltEl.classList.contains("widget") ? 6 : 3.5;

        gsap.to(tiltEl, {
          rotateY: nx * maxTilt * 2,
          rotateX: -ny * maxTilt * 2,
          transformPerspective: 1100,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    // 3. Magnetic buttons for primary CTAs
    const magneticButtons = document.querySelectorAll<HTMLElement>(
      ".hero__ctas .btn, .nav__cta, .product__actions .btn"
    );
    const cleanups: Array<() => void> = [];

    if (!isReduced) {
      magneticButtons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(dx * 0.22);
          yTo(dy * 0.28);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("pointermove", onMove, { passive: true });
        btn.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", onMove);
          btn.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
