"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import { ArrowRight, Shield, Rocket } from "./icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) {
        gsap.set("[data-hero], [data-hero-widget]", { opacity: 1 });
        gsap.set(".hero__title", { visibility: "visible" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero__title", { visibility: "visible" })
        .fromTo(
          "[data-hero='pill']",
          { y: -20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, delay: 0.15 }
        )
        .from(
          ".hero__word",
          {
            y: 52,
            opacity: 0,
            rotationX: -35,
            filter: "blur(10px)",
            stagger: 0.06,
            duration: 1.25,
            ease: "expo.out",
          },
          "-=0.7"
        )
        .fromTo(
          "[data-hero='sub']",
          { y: 28, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
          "-=0.85"
        )
        .fromTo(
          "[data-hero='ctas'] > *",
          { y: 22, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.85 },
          "-=0.7"
        )
        .fromTo(
          "[data-hero='meta'] li",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-widget]",
          { y: 40, opacity: 0, scale: 0.9, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 1.25,
            ease: "expo.out",
          },
          "-=0.85"
        );

      /* ---------- Real-time multi-plane pointer depth parallax ---------- */
      const container = containerRef.current;
      let cleanupPointer: (() => void) | undefined;
      if (container && window.matchMedia("(pointer: fine)").matches) {
        const w1x = gsap.quickTo(".widget--deploy", "x", { duration: 0.9, ease: "power3.out" });
        const w2x = gsap.quickTo(".widget--license", "x", { duration: 1.1, ease: "power3.out" });
        const w3x = gsap.quickTo(".widget--code", "x", { duration: 0.75, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          w1x(nx * -18);
          w2x(nx * 26);
          w3x(nx * -14);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        cleanupPointer = () => window.removeEventListener("pointermove", onMove);
      }

      /* ---------- Multi-plane scroll parallax scrub ---------- */
      // Ambient orbs parallax
      gsap.to(".hero .ambient__orb:first-child", {
        y: 130,
        x: -35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero .ambient__orb:last-child", {
        y: -110,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Hero text gently recedes with depth
      gsap.to(".hero__content", {
        y: 75,
        scale: 0.97,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% top",
          scrub: 0.8,
        },
      });

      // Floating glass widgets parallax at 3 distinct velocities
      gsap.to(".widget--deploy", {
        y: -125,
        rotationZ: -2.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".widget--license", {
        y: -175,
        rotationZ: 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".widget--code", {
        y: -90,
        rotationZ: -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // Scroll hint fades out on first scroll
      gsap.to(".hero__scroll", {
        opacity: 0,
        y: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "120px top",
          scrub: true,
        },
      });

      return () => {
        cleanupPointer?.();
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="top" className="hero">
      {/* 3D Three.js Fluid Glass WebGL Scene */}
      <HeroScene />

      {/* Ambient background glows */}
      <div className="ambient" aria-hidden>
        <div
          className="ambient__orb"
          style={
            {
              "--c1": "rgba(41, 151, 255, 0.45)",
              "--c2": "rgba(94, 92, 230, 0.25)",
              "--s": "680px",
              "--o": "0.45",
              top: "10%",
              right: "5%",
              "--dx": "80px",
              "--dy": "-50px",
            } as React.CSSProperties
          }
        />
        <div
          className="ambient__orb"
          style={
            {
              "--c1": "rgba(229, 95, 191, 0.3)",
              "--c2": "rgba(255, 179, 64, 0.2)",
              "--s": "520px",
              "--o": "0.35",
              bottom: "10%",
              left: "15%",
              "--dx": "-50px",
              "--dy": "40px",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="wrap hero__inner">
        <div className="hero__content">
          <a
            href="#urunler"
            className="hero__pill glass glass--refract"
            data-hero="pill"
            data-spot
          >
            <span className="hero__pill-tag">Yeni</span>
            <span>EfeOS 2026 Hazır Lisanslı Ürün Paketi</span>
            <ArrowRight />
          </a>

          <h1 className="hero__title">
            <span className="hero__word">Yazılımı</span>{" "}
            <span className="hero__word">işinize</span>{" "}
            <span className="hero__word">özel</span>{" "}
            <span className="hero__word text-gradient">tasarlıyoruz.</span>
          </h1>

          <p className="hero__sub" data-hero="sub">
            Efesoft; kurumunuza özel modern web, mobil ve yapay zeka çözümleri üretir.
            Aynı zamanda sektör lideri <strong>EfeERP</strong>, <strong>EfeCRM</strong> ve{" "}
            <strong>EfePOS</strong> gibi lisanslı hazır yazılımlarıyla dijital dönüşümünüzü dakikalar içinde başlatır.
          </p>

          <div className="hero__ctas" data-hero="ctas">
            <a href="#iletisim" className="btn btn--primary" id="hero-primary-cta">
              Özel Proje Başlat
              <ArrowRight />
            </a>
            <a
              href="#urunler"
              className="btn btn--glass glass glass--refract"
              id="hero-products-cta"
              data-spot
            >
              Hazır Yazılımları İncele
            </a>
          </div>

          <ul className="hero__meta" data-hero="meta" aria-label="Temel Göstergeler">
            <li>
              <strong>250+</strong>
              <span>Özel Yazılım Projesi</span>
            </li>
            <li>
              <strong>1.200+</strong>
              <span>Aktif Lisans Kullanıcısı</span>
            </li>
            <li>
              <strong>%99.98</strong>
              <span>Bulut Çalışma Süresi</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating iOS-style Liquid Glass Widgets over 3D space */}
      <div className="hero__widgets" aria-hidden>
        {/* Widget 1: Live Deployment / CI-CD */}
        <div
          className="widget widget--deploy glass glass--refract"
          data-hero-widget
          data-spot
        >
          <div className="widget__row">
            <div
              className="widget__icon"
              style={{ background: "linear-gradient(135deg, #0071e3, #5e5ce6)" }}
            >
              <Rocket />
            </div>
            <div>
              <div className="widget__title">EfeCloud Canlı Dağıtım</div>
              <div className="widget__desc">v4.8.2 · Sıfır Kesinti · 0.4ms</div>
            </div>
          </div>
          <div className="widget__progress">
            <span />
          </div>
        </div>

        {/* Widget 2: Licensed Software Growth */}
        <div
          className="widget widget--license glass glass--refract"
          data-hero-widget
          data-spot
        >
          <div className="widget__row">
            <div
              className="widget__icon"
              style={{ background: "linear-gradient(135deg, #30d158, #2ec4b6)" }}
            >
              <Shield />
            </div>
            <div>
              <div className="widget__title">Kurumsal Lisans</div>
              <div className="widget__desc">SaaS &amp; On-Premise</div>
            </div>
          </div>
          <div className="widget__big">
            1.240 <span className="widget__trend">+%34</span>
          </div>
          <svg className="widget__spark" viewBox="0 0 160 40" fill="none">
            <path
              d="M0 32 Q 30 28, 55 18 T 105 16 T 160 4"
              stroke="#30d158"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M0 32 Q 30 28, 55 18 T 105 16 T 160 4 L 160 40 L 0 40 Z"
              fill="url(#spark-grad)"
              opacity="0.35"
            />
            <defs>
              <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#30d158" stopOpacity="0.8" />
                <stop offset="1" stopColor="#30d158" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Widget 3: Code Architecture */}
        <div
          className="widget widget--code glass glass--refract"
          data-hero-widget
          data-spot
        >
          <div style={{ color: "var(--muted)", fontSize: "11px", marginBottom: "6px" }}>
            // efesoft.config.ts
          </div>
          <div>
            <span className="code-k">const</span> app = <span className="code-f">createEngine</span>({"{"}
          </div>
          <div style={{ paddingLeft: "14px" }}>
            license: <span className="code-s">&apos;enterprise-pro&apos;</span>,
          </div>
          <div style={{ paddingLeft: "14px" }}>
            architecture: <span className="code-s">&apos;microservices&apos;</span>,
          </div>
          <div style={{ paddingLeft: "14px" }}>
            aiAssisted: <span className="code-k">true</span>
          </div>
          <div>{"});"}</div>
        </div>
      </div>

      {/* Scroll Down Mouse Hint */}
      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-mouse" />
        <span>AŞAĞI KAYDIRIN</span>
      </div>
    </section>
  );
}
