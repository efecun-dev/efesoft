"use client";

import { useEffect, useRef, useState } from "react";
import { Logo, ArrowRight } from "./icons";

const LINKS = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#lisanslama", label: "Lisanslama" },
  { href: "#surec", label: "Süreç" },
  { href: "#iletisim", label: "İletişim" },
];

/**
 * Generates an exact Signed Distance Field (SDF) convex-bezel normal map
 * for a stadium/capsule pill of dimensions (w, h) for Chromium SVG backdrop-filter.
 */
function generateCapsuleLensMap(w: number, h: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  const cx = w / 2;
  const cy = h / 2;
  const r = h / 2;
  const hx = Math.max(0, cx - r);
  const bevel = Math.min(22, r * 0.86);

  for (let y = 0; y < h; y++) {
    const py = y - cy;
    for (let x = 0; x < w; x++) {
      const px = x - cx;

      const clampedX = px < -hx ? -hx : px > hx ? hx : px;
      const qx = px - clampedX;
      const qy = py;

      const distFromSpine = Math.hypot(qx, qy);
      const distFromEdge = r - distFromSpine;

      let rChan = 128;
      let gChan = 128;

      if (distFromEdge > 0 && distFromEdge < bevel && distFromSpine > 0.0001) {
        const t = 1 - distFromEdge / bevel;
        const lensCurve = Math.pow(t, 1.65);

        const nx = qx / distFromSpine;
        const ny = qy / distFromSpine;

        rChan = Math.max(0, Math.min(255, Math.round(128 - nx * lensCurve * 127)));
        gChan = Math.max(0, Math.min(255, Math.round(128 - ny * lensCurve * 127)));
      }

      const idx = (y * w + x) * 4;
      data[idx] = rChan;
      data[idx + 1] = gChan;
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL("image/png");
}

/**
 * Pre-generates two static GPU textures once per navbar size for iOS WebKit:
 * 1. maskCanvas: Smooth SDF capsule bevel ring alpha mask (0 in center, 0.95 at rim).
 * 2. specCanvas: 3D convex water-meniscus highlights, prism tint & inner bevel step.
 * Because these are drawn via GPU `ctx.drawImage`, there is ZERO getImageData/putImageData during scroll!
 */
function buildStaticBevelTextures(w: number, h: number) {
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = w;
  maskCanvas.height = h;
  const maskCtx = maskCanvas.getContext("2d");

  const specCanvas = document.createElement("canvas");
  specCanvas.width = w;
  specCanvas.height = h;
  const specCtx = specCanvas.getContext("2d");

  if (!maskCtx || !specCtx) return null;

  const maskImg = maskCtx.createImageData(w, h);
  const maskData = maskImg.data;

  const specImg = specCtx.createImageData(w, h);
  const specData = specImg.data;

  const cx = w / 2;
  const cy = h / 2;
  const r = h / 2;
  const hx = Math.max(0, cx - r);
  const bevel = Math.min(20, r * 0.8);

  for (let y = 0; y < h; y++) {
    const py = y - cy;
    for (let x = 0; x < w; x++) {
      const px = x - cx;
      const clampedX = px < -hx ? -hx : px > hx ? hx : px;
      const qx = px - clampedX;
      const qy = py;

      const distFromSpine = Math.hypot(qx, qy);
      const distFromEdge = r - distFromSpine;
      const idx = (y * w + x) * 4;

      if (distFromEdge > 0 && distFromEdge < bevel && distFromSpine > 0.0001) {
        const t = 1 - distFromEdge / bevel;
        const nx = qx / distFromSpine;
        const ny = qy / distFromSpine;

        // Smooth feather mask: solid across outer 60% of bevel, smoothly fades to 0 at inner bevel boundary
        const alphaNorm =
          distFromEdge < bevel * 0.58
            ? 0.94
            : 0.94 * Math.pow(1 - (distFromEdge - bevel * 0.58) / (bevel * 0.42), 1.5);
        const edgeAA = distFromEdge < 1.0 ? distFromEdge : 1.0;

        maskData[idx] = 255;
        maskData[idx + 1] = 255;
        maskData[idx + 2] = 255;
        maskData[idx + 3] = Math.round(alphaNorm * edgeAA * 255);

        // 3D Meniscus specular lighting & inner bevel ridge
        const outerCrest = distFromEdge < 2.5 ? Math.pow(1 - distFromEdge / 2.5, 1.35) : 0;
        const innerRidge = Math.exp(-Math.pow((distFromEdge - (bevel - 2.2)) / 1.4, 2));
        const lightDot = Math.max(0, -ny * 0.75 - nx * 0.35);
        const rimCounterDot = Math.max(0, ny * 0.65 + nx * 0.35);
        const endCapFactor = Math.abs(qx) / r;

        const specIntensity =
          outerCrest * 0.72 +
          Math.pow(t, 2.0) * (lightDot * 0.38 + rimCounterDot * 0.26 + endCapFactor * 0.32) +
          innerRidge * 0.22;

        specData[idx] = Math.min(255, Math.round(245 - endCapFactor * 12));
        specData[idx + 1] = Math.min(255, Math.round(250 + t * 5));
        specData[idx + 2] = 255;
        specData[idx + 3] = Math.min(255, Math.round(specIntensity * edgeAA * 255));
      }
    }
  }

  maskCtx.putImageData(maskImg, 0, 0);
  specCtx.putImageData(specImg, 0, 0);

  return { maskCanvas, specCanvas };
}

interface PrecomputedTextLine {
  text: string;
  xOffset: number;
  yOffset: number;
}

interface CachedDrawItem {
  docTop: number;
  docBottom: number;
  left: number;
  width: number;
  height: number;
  bg: string;
  hasBg: boolean;
  borderColor: string;
  borderWidth: number;
  radius: number;
  color: string;
  font: string;
  lines: PrecomputedTextLine[];
}

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const iosCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [engine, setEngine] = useState<"unknown" | "webkit" | "chromium">("unknown");
  const [lensMap, setLensMap] = useState<{ url: string; w: number; h: number }>({
    url: "",
    w: 360,
    h: 64,
  });
  const [paintRev, setPaintRev] = useState(0);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isAppleWebKit =
      "GestureEvent" in window ||
      /iP(hone|od|ad)/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
      /^((?!chrome|android).)*safari/i.test(ua);

    setEngine(isAppleWebKit ? "webkit" : "chromium");
  }, []);

  useEffect(() => {
    let lastScrolled = window.scrollY > 24;
    setScrolled(lastScrolled);

    const onScroll = () => {
      const nextScrolled = window.scrollY > 24;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Engine 1: 120fps Metal GPU-Accelerated Bevel Lens for iPhone / iOS Safari / Apple WebKit
  // ZERO getBoundingClientRect, ZERO getComputedStyle, ZERO measureText, and ZERO getImageData/putImageData during scroll!
  useEffect(() => {
    if (engine !== "webkit") return;
    const bar = barRef.current;
    const dstCanvas = iosCanvasRef.current;
    if (!bar || !dstCanvas) return;

    const dstCtx = dstCanvas.getContext("2d", { alpha: true });
    if (!dstCtx) return;

    const srcCanvas = document.createElement("canvas");
    const srcCtx = srcCanvas.getContext("2d", { alpha: false });
    if (!srcCtx) return;

    const PAD = 24;
    let navW = 0;
    let navH = 0;
    let navLeft = 16;
    let navTop = 16;
    let staticTextures: { maskCanvas: HTMLCanvasElement; specCanvas: HTMLCanvasElement } | null =
      null;
    let cachedItems: CachedDrawItem[] = [];
    let rafId: number | null = null;

    // Build geometry & pre-wrap all text lines ONCE (never during scroll)
    const buildLayoutCache = () => {
      const barRect = bar.getBoundingClientRect();
      const w = Math.max(200, Math.round(barRect.width));
      const h = 60; // Fixed internal buffer height so CSS height transition never reallocates GPU textures
      navLeft = barRect.left;
      navTop = barRect.top;

      if (Math.abs(w - navW) > 2 || !staticTextures) {
        navW = w;
        navH = h;
        dstCanvas.width = navW;
        dstCanvas.height = navH;
        srcCanvas.width = navW;
        srcCanvas.height = navH + PAD * 2;
        staticTextures = buildStaticBevelTextures(navW, navH);
      }

      const scrollY = window.scrollY;
      const main = document.querySelector("main") || document.body;
      const nodes = main.querySelectorAll(
        "section, footer, .bento-card, .prod-card, .step-card, .trust-card, .stat-card, .hero__pill, .btn, .badge, .eyebrow, .tech-card, .contact-card, h1, h2, h3, h4, p, span, a, button"
      );

      const items: CachedDrawItem[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;

        const cs = window.getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;

        const bg = cs.backgroundColor || "rgba(0, 0, 0, 0)";
        const hasBg =
          bg !== "rgba(0, 0, 0, 0)" &&
          bg !== "transparent" &&
          !bg.endsWith(", 0)");

        const bw = parseFloat(cs.borderTopWidth || "0") || 0;
        const borderColor = cs.borderTopColor || "transparent";
        const radius = Math.min(999, parseFloat(cs.borderTopLeftRadius || "0") || 0);

        let color = cs.color || "#0b0f19";
        if (
          color === "rgba(0, 0, 0, 0)" ||
          color === "transparent" ||
          el.classList.contains("text-gradient")
        ) {
          color = "#0071e3";
        }

        const tag = el.tagName;
        let isTextLeaf = false;
        let rawText = "";

        if (el.children.length === 0) {
          rawText = (el.textContent || "").trim();
          isTextLeaf = rawText.length > 0;
        } else if (tag === "P" || tag === "H2" || tag === "H3" || tag === "H4") {
          let onlyInline = true;
          for (let c = 0; c < el.children.length; c++) {
            const cTag = el.children[c].tagName;
            if (cTag !== "STRONG" && cTag !== "EM" && cTag !== "B" && cTag !== "BR") {
              onlyInline = false;
              break;
            }
          }
          if (onlyInline) {
            rawText = (el.textContent || "").replace(/\s+/g, " ").trim();
            isTextLeaf = rawText.length > 0;
          }
        }

        if (!hasBg && bw === 0 && !isTextLeaf) continue;

        const fontSize = parseFloat(cs.fontSize || "16") || 16;
        const fontWeight = cs.fontWeight || "500";
        const fontFamily = cs.fontFamily || "-apple-system, BlinkMacSystemFont, sans-serif";
        const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.3;
        const align = cs.textAlign;

        const lines: PrecomputedTextLine[] = [];
        if (isTextLeaf && rawText) {
          srcCtx.font = font;
          if (r.height <= lineHeight * 1.45) {
            let xOffset = 0;
            if (align === "center") {
              xOffset = (r.width - srcCtx.measureText(rawText).width) * 0.5;
            }
            lines.push({
              text: rawText,
              xOffset,
              yOffset: Math.max(0, (r.height - lineHeight) * 0.35),
            });
          } else {
            const words = rawText.split(" ");
            let line = "";
            let yOff = 0;
            for (let wIdx = 0; wIdx < words.length; wIdx++) {
              const test = line ? `${line} ${words[wIdx]}` : words[wIdx];
              if (srcCtx.measureText(test).width > r.width && line) {
                const xOffset =
                  align === "center" ? (r.width - srcCtx.measureText(line).width) * 0.5 : 0;
                lines.push({ text: line, xOffset, yOffset: yOff });
                line = words[wIdx];
                yOff += lineHeight;
              } else {
                line = test;
              }
            }
            if (line) {
              const xOffset =
                align === "center" ? (r.width - srcCtx.measureText(line).width) * 0.5 : 0;
              lines.push({ text: line, xOffset, yOffset: yOff });
            }
          }
        }

        items.push({
          docTop: r.top + scrollY,
          docBottom: r.bottom + scrollY,
          left: r.left,
          width: r.width,
          height: r.height,
          bg,
          hasBg,
          borderColor,
          borderWidth: bw,
          radius,
          color,
          font,
          lines,
        });
      }

      cachedItems = items;
    };

    // Fast GPU-only per-frame render (Zero DOM layout reads, Zero getImageData/putImageData)
    const renderFrame = () => {
      rafId = null;
      if (!staticTextures || navW === 0) return;

      const scrollY = window.scrollY;
      const oy = navTop - PAD;
      const bandDocTop = scrollY + oy;
      const bandDocBottom = scrollY + navTop + navH + PAD;
      const srcH = navH + PAD * 2;

      // 1. Fill offscreen strip background on GPU
      srcCtx.fillStyle = "#f5f5f7";
      srcCtx.fillRect(0, 0, navW, srcH);

      // 2. Draw only cached items overlapping [bandDocTop, bandDocBottom]
      for (let i = 0; i < cachedItems.length; i++) {
        const item = cachedItems[i];
        if (item.docBottom < bandDocTop || item.docTop > bandDocBottom) continue;

        const rx = item.left - navLeft;
        const ry = item.docTop - scrollY - oy;

        if (item.hasBg || item.borderWidth > 0) {
          const rad = Math.min(item.radius, item.width * 0.5, item.height * 0.5);
          srcCtx.beginPath();
          if (rad > 0 && typeof srcCtx.roundRect === "function") {
            srcCtx.roundRect(rx, ry, item.width, item.height, rad);
          } else {
            srcCtx.rect(rx, ry, item.width, item.height);
          }
          if (item.hasBg) {
            srcCtx.fillStyle = item.bg;
            srcCtx.fill();
          }
          if (item.borderWidth > 0) {
            srcCtx.strokeStyle = item.borderColor;
            srcCtx.lineWidth = item.borderWidth;
            srcCtx.stroke();
          }
        }

        if (item.lines.length > 0) {
          srcCtx.font = item.font;
          srcCtx.fillStyle = item.color;
          srcCtx.textBaseline = "top";
          for (let l = 0; l < item.lines.length; l++) {
            const ln = item.lines[l];
            const ly = ry + ln.yOffset;
            if (ly > -28 && ly < srcH + 10) {
              srcCtx.fillText(ln.text, rx + ln.xOffset, ly);
            }
          }
        }
      }

      // 3. Pure Metal GPU Bevel Refraction Blits onto dstCanvas (ZERO CPU pixel loops!)
      dstCtx.clearRect(0, 0, navW, navH);
      dstCtx.globalCompositeOperation = "source-over";

      // Top convex bevel refraction (3 progressive optical magnification bands)
      dstCtx.drawImage(srcCanvas, -8, PAD + 14, navW + 16, 14, 0, 0, navW, 7);
      dstCtx.drawImage(srcCanvas, -4, PAD + 10, navW + 8, 12, 0, 6, navW, 7);
      dstCtx.drawImage(srcCanvas, -2, PAD + 11, navW + 4, 10, 0, 12, navW, 7);

      // Bottom convex bevel refraction (3 progressive optical magnification bands)
      dstCtx.drawImage(srcCanvas, -2, PAD + navH - 21, navW + 4, 10, 0, navH - 19, navW, 7);
      dstCtx.drawImage(srcCanvas, -4, PAD + navH - 22, navW + 8, 12, 0, navH - 13, navW, 7);
      dstCtx.drawImage(srcCanvas, -8, PAD + navH - 28, navW + 16, 14, 0, navH - 7, navW, 7);

      // Left semicircular capsule cap lens refraction
      dstCtx.drawImage(srcCanvas, 12, PAD - 4, 24, navH + 8, 0, 0, 18, navH);
      dstCtx.drawImage(srcCanvas, 18, PAD - 2, 16, navH + 4, 14, 0, 14, navH);

      // Right semicircular capsule cap lens refraction
      dstCtx.drawImage(srcCanvas, navW - 36, PAD - 4, 24, navH + 8, navW - 18, 0, 18, navH);
      dstCtx.drawImage(srcCanvas, navW - 34, PAD - 2, 16, navH + 4, navW - 28, 0, 14, navH);

      // 4. Mask to exact SDF capsule 20px bevel ring (center stays 100% transparent!)
      dstCtx.globalCompositeOperation = "destination-in";
      dstCtx.drawImage(staticTextures.maskCanvas, 0, 0);

      // 5. Composite 3D water-meniscus specular crest & prismatic rim
      dstCtx.globalCompositeOperation = "source-over";
      dstCtx.drawImage(staticTextures.specCanvas, 0, 0);
    };

    const onScrollFrame = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    buildLayoutCache();
    renderFrame();

    // Refresh layout cache once initial animations finish
    const t1 = setTimeout(() => {
      buildLayoutCache();
      renderFrame();
    }, 650);
    const t2 = setTimeout(() => {
      buildLayoutCache();
      renderFrame();
    }, 1800);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildLayoutCache();
        renderFrame();
      }, 120);
    };

    window.addEventListener("scroll", onScrollFrame, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScrollFrame);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [engine]);

  // Engine 2: Chromium SVG SDF Capsule Lens Map (debounced so CSS transitions never stutter)
  useEffect(() => {
    if (engine !== "chromium") return;
    const bar = barRef.current;
    if (!bar) return;

    let rafId1: number | null = null;
    let rafId2: number | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const updateMap = () => {
      const w = Math.max(180, Math.round(bar.clientWidth || bar.getBoundingClientRect().width));
      const h = Math.max(44, Math.round(bar.clientHeight || bar.getBoundingClientRect().height));
      const url = generateCapsuleLensMap(w, h);
      if (!url) return;

      const img = new Image();
      img.src = url;
      const finish = () => {
        if (cancelled) return;
        setLensMap({ url, w, h });
        rafId1 = requestAnimationFrame(() => {
          rafId2 = requestAnimationFrame(() => {
            if (!cancelled) setPaintRev((r) => r + 1);
          });
        });
      };
      if (img.decode) {
        img.decode().then(finish).catch(finish);
      } else {
        img.onload = finish;
      }
    };

    updateMap();
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMap, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
    };
  }, [engine]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const satPct = 145 + (paintRev % 2) * 0.01;

  return (
    <header
      ref={ref}
      className="nav"
      data-scrolled={scrolled}
      data-open={open}
    >
      {/* Chromium SVG SDF Capsule Bevel Filter */}
      {engine === "chromium" && (
        <svg
          className="nav__svg-filters"
          width={lensMap.w}
          height={lensMap.h}
          viewBox={`0 0 ${lensMap.w} ${lensMap.h}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter
              id="ios-liquid-glass"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="softBg" />
              <feFlood floodColor="rgb(128, 128, 128)" floodOpacity="1" result="neutralMap" />
              {lensMap.url && (
                <feImage
                  href={lensMap.url}
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  result="rawBevelMap"
                />
              )}
              <feComposite
                in={lensMap.url ? "rawBevelMap" : "neutralMap"}
                in2="neutralMap"
                operator="over"
                result="capsuleBevelMap"
              />
              <feDisplacementMap
                in="softBg"
                in2="capsuleBevelMap"
                scale={lensMap.url ? 44 : 0}
                xChannelSelector="R"
                yChannelSelector="G"
                result="refractedGlass"
              />
            </filter>
          </defs>
        </svg>
      )}

      <nav
        ref={barRef}
        className="nav__bar"
        aria-label="Ana menü"
        style={
          engine === "chromium" && lensMap.url
            ? {
                backdropFilter: `url(#ios-liquid-glass) saturate(${satPct}%) contrast(105%)`,
              }
            : undefined
        }
      >
        {/* iPhone / Apple WebKit 120fps Metal GPU-Accelerated Bevel Lens */}
        {engine === "webkit" && (
          <canvas
            ref={iosCanvasRef}
            className="nav__ios-bevel-lens"
            aria-hidden="true"
          />
        )}

        {/* Curved 3D Meniscus Water Dome Layer */}
        <div className="nav__liquid-specular" aria-hidden="true" />

        <a href="#top" className="nav__logo" aria-label="Efesoft ana sayfa">
          <Logo />
          <span>
            Efesoft<span style={{ color: "#00a2ff", fontWeight: 900 }}>.</span>
          </span>
        </a>
        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a className="nav__link" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#iletisim" className="btn btn--primary btn--sm nav__cta" id="nav-cta">
          Teklif Al
          <ArrowRight />
        </a>
        <button
          className="nav__toggle"
          id="nav-toggle"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </nav>

      <div id="nav-sheet" className="nav__sheet" inert={!open}>
        <div className="nav__sheet-content">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#iletisim"
            className="btn btn--primary nav__sheet-cta"
            onClick={() => setOpen(false)}
          >
            Teklif Al
            <ArrowRight />
          </a>
        </div>
      </div>
    </header>
  );
}
