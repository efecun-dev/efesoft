"use client";

import { useEffect } from "react";

/**
 * SVG filter used as a `backdrop-filter: url(#lg-refract)` source to bend the
 * content behind glass surfaces (iOS "Liquid Glass" refraction).
 * Only Chromium renders SVG filters inside backdrop-filter, so we feature-gate
 * it with a class on <html>; other browsers keep the blur-only material.
 */
export default function LiquidGlassFilter() {
  useEffect(() => {
    const isChromium =
      "userAgentData" in navigator &&
      CSS.supports("backdrop-filter", "url(#lg-refract) blur(1px)");
    if (isChromium) document.documentElement.classList.add("lg-refract");
  }, []);

  return (
    <svg className="lg-defs" aria-hidden focusable="false">
      <filter
        id="lg-refract"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.006 0.009"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="46"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
