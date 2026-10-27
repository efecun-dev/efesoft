"use client";

import { useState } from "react";
import { ArrowRight, Sparkle } from "./icons";

interface LogoCard {
  id: string;
  title: string;
  desc: string;
  badge: string;
  previewBg: "light" | "dark" | "checkered";
  svgPath: string;
  pngPath: string;
  png2k?: string;
  png4k?: string;
  isEmblemOnly?: boolean;
}

const LOGO_VARIANTS: LogoCard[] = [
  {
    id: "logo-light",
    title: "Açık Tema Vektörel Logo",
    desc: "Açık zeminler, kurumsal faturalar, antetli kağıtlar ve web portalları için tasarlanmış yatay logo.",
    badge: "TAM LOGO · VEKTÖREL AÇIK",
    previewBg: "light",
    svgPath: "/logo/efesoft-logo-light.svg",
    pngPath: "/logo/efesoft-logo-light.png",
    png2k: "/logo/efesoft-logo-light-2x.png",
    png4k: "/logo/efesoft-logo-light-4k.png",
  },
  {
    id: "logo-dark",
    title: "Koyu Tema Vektörel Logo",
    desc: "Siyah/antrasit arayüzler, sunum slaytları ve gece modu için optimize edilmiş parlak degradeli yatay logo.",
    badge: "TAM LOGO · VEKTÖREL KOYU",
    previewBg: "dark",
    svgPath: "/logo/efesoft-logo-dark.svg",
    pngPath: "/logo/efesoft-logo-dark.png",
    png2k: "/logo/efesoft-logo-dark-2x.png",
    png4k: "/logo/efesoft-logo-dark-4k.png",
  },
  {
    id: "card-dark",
    title: "Koyu Kart Logo (Resmi Referans)",
    desc: "Yumuşak köşeli siyah kurumsal kart zemininde neon 'e' amblemi ve beyaz Efesoft. tipografisi.",
    badge: "RESMİ KART · 4K ULTRA-RES",
    previewBg: "dark",
    svgPath: "/logo/efesoft-logo-card-dark.svg",
    pngPath: "/logo/efesoft-logo-card-dark.png",
    png2k: "/logo/efesoft-logo-card-dark-2x.png",
    png4k: "/logo/efesoft-logo-card-dark-4k.png",
  },
  {
    id: "card-light",
    title: "Açık Kart Logo (Resmi Referans)",
    desc: "Yumuşak köşeli beyaz kurumsal kart zemininde degrade 'e' amblemi ve koyu Efesoft. tipografisi.",
    badge: "RESMİ KART · 4K ULTRA-RES",
    previewBg: "light",
    svgPath: "/logo/efesoft-logo-card-light.svg",
    pngPath: "/logo/efesoft-logo-card-light.png",
    png2k: "/logo/efesoft-logo-card-light-2x.png",
    png4k: "/logo/efesoft-logo-card-light-4k.png",
  },
  {
    id: "icon-light",
    title: "Yazısız Vektörel Amblem (Açık)",
    desc: "Uygulama simgeleri, favikon, sosyal medya profilleri ve kompakt alanlar için saydam arka planlı saf 'e' amblemi.",
    badge: "YAZISIZ · 4096px 4K",
    previewBg: "checkered",
    svgPath: "/logo/efesoft-icon-light.svg",
    pngPath: "/logo/efesoft-icon-light.png",
    png2k: "/logo/efesoft-icon-light-2048.png",
    png4k: "/logo/efesoft-icon-light-4k.png",
    isEmblemOnly: true,
  },
  {
    id: "icon-dark",
    title: "Yazısız Vektörel Amblem (Koyu)",
    desc: "Koyu zeminlerde maksimum kontrast ve yüksek görünürlük sunan saydam arka planlı neon 'e' amblemi.",
    badge: "YAZISIZ · 4096px 4K",
    previewBg: "dark",
    svgPath: "/logo/efesoft-icon-dark.svg",
    pngPath: "/logo/efesoft-icon-dark.png",
    png2k: "/logo/efesoft-icon-dark-2048.png",
    png4k: "/logo/efesoft-icon-dark-4k.png",
    isEmblemOnly: true,
  },
  {
    id: "app-icon",
    title: "App Icon (iOS / macOS Squircle)",
    desc: "Apple HIG tasarım kılavuzuna uygun hafif gölgeli squircle uygulama simgesi.",
    badge: "APP STORE · 2048px",
    previewBg: "checkered",
    svgPath: "/logo/efesoft-app-icon.svg",
    pngPath: "/logo/efesoft-app-icon.png",
    png2k: "/logo/efesoft-app-icon-1024.png",
    png4k: "/logo/efesoft-app-icon-4k.png",
    isEmblemOnly: true,
  },
  {
    id: "icon-black",
    title: "Monokrom Saf Siyah",
    desc: "Lazer baskı, nakış, tek renkli resmi evraklar ve mühür kullanımı için %100 düz siyah vektör.",
    badge: "MONOKROM · 4K BASKI",
    previewBg: "checkered",
    svgPath: "/logo/efesoft-icon-black.svg",
    pngPath: "/logo/efesoft-icon-black.png",
    png4k: "/logo/efesoft-icon-black-4k.png",
    isEmblemOnly: true,
  },
  {
    id: "icon-white",
    title: "Monokrom Saf Beyaz",
    desc: "Renkli veya fotoğraflı arka planlar üzerinde düz beyaz damga/filigran olarak kullanım için %100 beyaz vektör.",
    badge: "MONOKROM · 4K BASKI",
    previewBg: "dark",
    svgPath: "/logo/efesoft-icon-white.svg",
    pngPath: "/logo/efesoft-icon-white.png",
    png4k: "/logo/efesoft-icon-white-4k.png",
    isEmblemOnly: true,
  },
];

export default function LogoShowcase() {
  const [filter, setFilter] = useState<"all" | "logos" | "icons">("all");

  const filtered = LOGO_VARIANTS.filter((item) => {
    if (filter === "logos") return !item.isEmblemOnly;
    if (filter === "icons") return item.isEmblemOnly;
    return true;
  });

  return (
    <section id="logo-tasarimi" className="section logoshowcase">
      <div className="wrap">
        <div className="section__head section__head--center">
          <span className="eyebrow">
            <Sparkle style={{ width: "14px", height: "14px", display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
            KURUMSAL MARKA KİMLİĞİ · 4K ULTRA-RES
          </span>
          <h2 className="h2">
            Efesoft Logo Ailesi &amp; <br />
            <span className="text-gradient">4K Vektörel / PNG Versiyonları</span>
          </h2>
          <p className="lead">
            Açık tema, koyu tema, saydam arka planlı, kart kutulu ve yazısız amblem formatlarında hazırlanan
            tüm resmi kurumsal logo paketlerini <strong>4K Ultra-HD (4096px)</strong>, <strong>2K Retina</strong> ve <strong>Saf Vektörel SVG</strong> formatlarında doğrudan indirebilirsiniz.
          </p>

          <div
            className="segmented segmented--tri glass"
            style={{ marginTop: "28px" }}
            role="tablist"
            aria-label="Logo filtreleri"
          >
            <div
              className="segmented__thumb"
              style={{
                width: "calc(33.333% - 4px)",
                translate: filter === "all" ? "0 0" : filter === "logos" ? "100% 0" : "200% 0",
              }}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              Tüm Varyasyonlar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "logos"}
              aria-pressed={filter === "logos"}
              onClick={() => setFilter("logos")}
            >
              Tam Logolar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "icons"}
              aria-pressed={filter === "icons"}
              onClick={() => setFilter("icons")}
            >
              Yazısız Simgeler
            </button>
          </div>
        </div>

        <div className="logoshowcase__grid">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="glass glass--refract logoshowcase__card"
              data-spot
            >
              {/* Preview Stage Box */}
              <div
                className="logoshowcase__preview"
                style={{
                  background:
                    item.previewBg === "dark"
                      ? "linear-gradient(145deg, #0e1017, #050608)"
                      : item.previewBg === "light"
                      ? "linear-gradient(145deg, #ffffff, #f4f5fa)"
                      : "repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 20px 20px",
                }}
              >
                {/* Visual Image */}
                <div
                  style={{
                    position: "relative",
                    width: item.isEmblemOnly ? "130px" : "280px",
                    height: item.isEmblemOnly ? "130px" : "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.png2k || item.pngPath}
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      filter:
                        item.previewBg === "dark"
                          ? "drop-shadow(0 8px 24px rgba(41, 151, 255, 0.35))"
                          : "drop-shadow(0 6px 18px rgba(0, 113, 227, 0.15))",
                    }}
                  />
                </div>

                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    padding: "3px 9px",
                    borderRadius: "999px",
                    background: item.previewBg === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.06)",
                    color: item.previewBg === "dark" ? "#fff" : "var(--ink)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Information */}
              <div style={{ marginTop: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "19px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {item.title}
                </h3>
                <p style={{ marginTop: "6px", color: "var(--muted)", fontSize: "13.5px", lineHeight: "1.5" }}>
                  {item.desc}
                </p>

                {/* Download Actions */}
                <div className="logoshowcase__actions">
                  {item.png4k && (
                    <a
                      href={item.png4k}
                      download
                      className="btn btn--primary btn--sm"
                      id={`dl-png-4k-${item.id}`}
                      style={{ fontSize: "12.5px" }}
                    >
                      4K Ultra-Res
                      <ArrowRight />
                    </a>
                  )}

                  {item.png2k && (
                    <a
                      href={item.png2k}
                      download
                      className="btn btn--glass glass btn--sm"
                      id={`dl-png-2k-${item.id}`}
                      style={{ fontSize: "12.5px" }}
                    >
                      2K Retina
                    </a>
                  )}

                  <a
                    href={item.pngPath}
                    download
                    className="btn btn--glass glass btn--sm"
                    id={`dl-png-${item.id}`}
                    style={{ fontSize: "12.5px" }}
                  >
                    Saydam PNG
                  </a>

                  <a
                    href={item.svgPath}
                    download
                    className="btn btn--glass glass btn--sm"
                    id={`dl-svg-${item.id}`}
                    style={{ fontSize: "12.5px" }}
                  >
                    Vektörel SVG
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
