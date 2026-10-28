"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, Mail, ShieldCheck, Clock, FileCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setContact("");
    }, 800);
  };

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      // Internal glowing orbs parallax inside CTA panel
      gsap.to(".cta .ambient__orb:first-child", {
        y: 70,
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".cta .ambient__orb:last-child", {
        y: -60,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // CTA content subtle lift on scroll
      gsap.to(".cta__inner", {
        y: -20,
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
    <section ref={sectionRef} id="iletisim" className="section cta">
      <div className="wrap">
        <div className="cta__panel glass glass--refract" data-spot>
          {/* Internal ambient glowing orbs */}
          <div className="ambient" aria-hidden>
            <div
              className="ambient__orb"
              style={
                {
                  "--c1": "#2997ff",
                  "--c2": "#5e5ce6",
                  "--s": "520px",
                  "--o": "0.55",
                  top: "-20%",
                  left: "10%",
                  "--dx": "60px",
                  "--dy": "40px",
                } as React.CSSProperties
              }
            />
            <div
              className="ambient__orb"
              style={
                {
                  "--c1": "#9a5cf5",
                  "--c2": "#ff6b5a",
                  "--s": "480px",
                  "--o": "0.45",
                  bottom: "-25%",
                  right: "15%",
                  "--dx": "-50px",
                  "--dy": "-30px",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="cta__inner">
            {/* Top Accent Pill Badge */}
            <div className="cta__badge">
              <span className="cta__badge-pulse" />
              <span>ÜCRETSİZ MİMARİ ANALİZ & DEMO</span>
            </div>

            <h2 className="cta__title">
              Şirketinizin dijital geleceğini <br />
              <span className="text-gradient">birlikte inşa edelim.</span>
            </h2>
            <p className="cta__text">
              İster sıfırdan kurumsal özel yazılım projeniz için teklif alın,
              ister lisanslı hazır ürünlerimizin canlı demosunu şirketinizde deneyimleyin.
            </p>

            {status === "success" ? (
              <div className="cta__success glass">
                <div className="cta__success-icon">
                  <Check size={20} />
                </div>
                <span>Talebiniz alındı! Uzman mühendisimiz 15 dakika içinde sizinle iletişime geçecek.</span>
              </div>
            ) : (
              <div className="cta__form-shell">
                <form onSubmit={handleSubmit} className="cta__form" id="lead-form">
                  <div className="cta__input-wrap">
                    <div className="cta__input-icon-shell">
                      <Mail size={18} className="cta__input-icon" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="İş e-postanız veya telefonunuz"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      aria-label="İletişim adresi"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cta__submit-btn"
                    disabled={status === "submitting"}
                    id="lead-submit-btn"
                  >
                    <span>{status === "submitting" ? "Gönderiliyor..." : "Görüşme Başlat"}</span>
                    <ArrowRight size={17} className="cta__submit-arrow" />
                  </button>
                </form>
              </div>
            )}

            {/* Mobile-Friendly Trust Badges Row */}
            <div className="cta__trust-pills">
              <div className="cta__trust-pill">
                <Clock size={13} />
                <span>15 Dk İçinde Dönüş</span>
              </div>
              <div className="cta__trust-pill">
                <ShieldCheck size={13} />
                <span>Gizlilik Sözleşmesi (NDA)</span>
              </div>
              <div className="cta__trust-pill">
                <FileCheck size={13} />
                <span>Sıfır Taahhüt</span>
              </div>
            </div>

            <p className="cta__fine" data-state={status === "success" ? "ok" : undefined}>
              {status === "success"
                ? "Bilgileriniz KVKK kapsamında %100 güvende saklanır."
                : "Bilgileriniz KVKK kapsamında korunur, asla üçüncü taraflarla paylaşılmaz."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
