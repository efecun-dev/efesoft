"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo, ArrowRight } from "./icons";

gsap.registerPlugin(useGSAP);

const LINKS = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#lisanslama", label: "Lisanslama" },
  { href: "#surec", label: "Süreç" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".nav__bar", {
          y: -30,
          opacity: 0,
          scale: 0.94,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.15,
        });
      });
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="nav"
      data-scrolled={scrolled}
      data-open={open}
    >
      <nav className="nav__bar glass glass--refract" aria-label="Ana menü" data-spot>
        <a href="#top" className="nav__logo" aria-label="Efesoft ana sayfa">
          <Logo />
          <span>Efesoft<span style={{ color: "#00a2ff", fontWeight: 900 }}>.</span></span>
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

      <div id="nav-sheet" className="nav__sheet glass" inert={!open}>
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
    </header>
  );
}
