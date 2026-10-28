"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "./icons";
import AnimatedNumber from "./AnimatedNumber";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StatsAndTestimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      // Ambient background glow parallax
      gsap.to(".stats .ambient__orb", {
        y: 110,
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Ambient background glow parallax (no collision between cards)
      gsap.to(".stats .ambient__orb", {
        y: 80,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section stats" aria-label="Rakamlarla Efesoft ve Müşteri Yorumları">
      {/* Ambient background glow */}
      <div className="ambient" aria-hidden>
        <div
          className="ambient__orb"
          style={
            {
              "--c1": "rgba(46, 196, 182, 0.35)",
              "--c2": "rgba(41, 151, 255, 0.2)",
              "--s": "620px",
              "--o": "0.35",
              top: "30%",
              left: "15%",
              "--dx": "50px",
              "--dy": "-40px",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="wrap">
        {/* Stats Grid */}
        <div ref={panelRef} className="stats__panel glass glass--refract" data-spot>
          <div className="stat">
            <span className="stat__value">
              <AnimatedNumber value={isVisible ? 250 : 0} duration={1200} suffix="+" />
            </span>
            <span className="stat__label">Tamamlanan Özel Yazılım Projesi</span>
          </div>
          <div className="stat">
            <span className="stat__value">
              <AnimatedNumber value={isVisible ? 1200 : 0} duration={1400} suffix="+" />
            </span>
            <span className="stat__label">Aktif Lisanslı Şirket ve Kullanıcı</span>
          </div>
          <div className="stat">
            <span className="stat__value">
              <AnimatedNumber value={isVisible ? 99.98 : 0} duration={1600} prefix="%" decimals={2} />
            </span>
            <span className="stat__label">Yıllık Ortalama Bulut Uptime SLA</span>
          </div>
          <div className="stat">
            <span className="stat__value">
              <AnimatedNumber value={isVisible ? 45 : 0} duration={1100} suffix="+" />
            </span>
            <span className="stat__label">Kıdemli Mühendis ve Mimar</span>
          </div>
        </div>

        {/* Executive Testimonial */}
        <div className="quote glass glass--refract" data-spot>
          <Quote className="quote__mark" />
          <div>
            <blockquote className="quote__text">
              &ldquo;Efesoft ile hem 4 farklı fabrikamızın ERP süreçlerini EfeERP&apos;ye taşıdık
              hem de bayilerimize özel B2B sipariş portalımızı hayata geçirdik.
              Geliştirme hızı, iOS düzeyindeki arayüz kalitesi ve 7/24 destekleri işimizi dönüştürdü.&rdquo;
            </blockquote>
            <div className="quote__author">
              <div className="quote__avatar">AY</div>
              <div>
                <div className="quote__name">Ahmet Yıldırım</div>
                <div className="quote__role">Teknoloji Direktörü (CTO) · Efe Global Lojistik</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
