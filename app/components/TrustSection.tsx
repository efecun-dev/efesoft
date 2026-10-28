"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shield } from "./icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTNERS = [
  "TURKCELL",
  "GARANTI BBVA",
  "TRENDYOL",
  "BORUSAN",
  "SIEMENS",
  "GETIR",
  "EFE HOLDING",
  "ASELSAN",
  "KORDSA",
  "ECZACIBAŞI",
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      gsap.from(".trust__label", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      });

      gsap.to(".marquee", {
        x: -75,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="trust" aria-label="Referanslarımız ve Partnerler">
      <div className="wrap">
        <p className="trust__label">
          TÜRKİYE&apos;NİN VE DÜNYANIN ÖNCÜ KURUMLARI EFESOFT ALTYAPISINA GÜVENİYOR
        </p>
      </div>

      <div className="marquee">
        <div className="marquee__track" aria-hidden="true">
          {PARTNERS.map((name, i) => (
            <div key={`p1-${i}`} className="marquee__item">
              <Shield />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="marquee__track" aria-hidden="true">
          {PARTNERS.map((name, i) => (
            <div key={`p2-${i}`} className="marquee__item">
              <Shield />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
