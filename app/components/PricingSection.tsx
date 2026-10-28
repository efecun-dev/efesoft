"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, ArrowRight } from "./icons";
import AnimatedNumber from "./AnimatedNumber";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const isYearly = billing === "yearly";

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      // Card entrance animation
      gsap.from(".plan", {
        scrollTrigger: {
          trigger: ".plans",
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
      });

      // Ambient background orb parallax
      gsap.to(".pricing .ambient__orb", {
        y: 120,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Multi-layer parallax for plans on desktop
      gsap.matchMedia().add("(min-width: 901px)", () => {
        // Featured plan floats forward with depth
        gsap.to(".plan--featured", {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ".plans",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        // Side plans have subtle counter-rate
        gsap.to(".plan:not(.plan--featured)", {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".plans",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="lisanslama" className="section pricing">
      {/* Ambient background accent */}
      <div className="ambient" aria-hidden>
        <div
          className="ambient__orb"
          style={
            {
              "--c1": "rgba(0, 113, 227, 0.25)",
              "--c2": "rgba(154, 92, 245, 0.15)",
              "--s": "600px",
              "--o": "0.4",
              top: "20%",
              left: "50%",
              translate: "-50% 0",
              "--dx": "40px",
              "--dy": "30px",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="wrap">
        <div className="section__head section__head--center">
          <span className="eyebrow">ŞEFFAF LİSANSLAMA &amp; MODELLER</span>
          <h2 className="h2">
            İşletmenizin ölçeğine uygun, <br />
            <span className="text-gradient">esnek lisans paketleri.</span>
          </h2>
          <p className="lead">
            İster aylık/yıllık bulut lisansı (SaaS) kiralayın, isterseniz kendi
            sunucularınızda süresiz On-Premise kurulumla verinizin tam sahibi olun.
          </p>

          {/* Segmented iOS toggle */}
          <div
            className="segmented glass"
            data-value={billing}
            role="radiogroup"
            aria-label="Ödeme periyodu seçimi"
          >
            <div className="segmented__thumb" aria-hidden="true" />
            <button
              type="button"
              role="radio"
              aria-checked={!isYearly}
              aria-pressed={!isYearly}
              onClick={() => setBilling("monthly")}
            >
              Aylık Ödeme
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={isYearly}
              aria-pressed={isYearly}
              onClick={() => setBilling("yearly")}
            >
              Yıllık Ödeme
              <span className="segmented__save">2 Ay Ücretsiz</span>
            </button>
          </div>
        </div>

        <div className="plans">
          {/* Plan 1: Starter */}
          <div className="plan glass glass--refract" data-spot>
            <div className="plan__top">
              <h3 className="plan__name">Başlangıç (SaaS)</h3>
            </div>
            <p className="plan__desc">
              Hızlı büyüyen girişimler ve KOBİ&apos;ler için hazır standart modüller.
            </p>

            <div className="plan__price">
              <span className="plan__amount">
                <AnimatedNumber value={isYearly ? 1250 : 1550} prefix="₺" />
              </span>
              <span className="plan__per">/ ay</span>
            </div>
            <div className="plan__note">
              {isYearly ? "Yıllık faturalandırılır (₺15.000 / yıl)" : "Aylık taahhütsüz faturalandırma"}
            </div>

            <a href="#iletisim" className="btn btn--glass glass" id="plan-btn-starter">
              Hemen Başla
            </a>

            <ul className="plan__list">
              <li>
                <Check />
                <span>Tek Hazır Yazılım (EfePOS veya EfeCRM)</span>
              </li>
              <li>
                <Check />
                <span>5 Kullanıcıya kadar erişim</span>
              </li>
              <li>
                <Check />
                <span>Efesoft Cloud yönetilen barındırma</span>
              </li>
              <li>
                <Check />
                <span>Haftalık otomatik yedekleme</span>
              </li>
              <li>
                <Check />
                <span>Mesai saatleri e-posta desteği</span>
              </li>
            </ul>
          </div>

          {/* Plan 2: Business (Featured) */}
          <div className="plan plan--featured glass glass--refract" data-spot>
            <div className="plan__top">
              <h3 className="plan__name">Kurumsal Business</h3>
              <span className="plan__badge">En Çok Tercih Edilen</span>
            </div>
            <p className="plan__desc">
              Çok şubeli ve yüksek işlem hacmine sahip büyüyen şirketler için tam entegre paket.
            </p>

            <div className="plan__price">
              <span className="plan__amount" style={{ color: "var(--blue)" }}>
                <AnimatedNumber value={isYearly ? 3250 : 3950} prefix="₺" />
              </span>
              <span className="plan__per">/ ay</span>
            </div>
            <div className="plan__note">
              {isYearly ? "Yıllık faturalandırılır (₺39.000 / yıl)" : "Aylık taahhütsüz faturalandırma"}
            </div>

            <a href="#iletisim" className="btn btn--blue" id="plan-btn-business">
              30 Gün Ücretsiz Dene
              <ArrowRight />
            </a>

            <ul className="plan__list">
              <li>
                <Check />
                <span>Tam EfeERP + EfeCRM veya EfePOS paketi</span>
              </li>
              <li>
                <Check />
                <span>25 Kullanıcıya kadar tam yetkilendirme</span>
              </li>
              <li>
                <Check />
                <span>GİB onaylı e-Fatura &amp; e-İrsaliye modülü</span>
              </li>
              <li>
                <Check />
                <span>Banka ve e-Ticaret pazaryeri entegrasyonu</span>
              </li>
              <li>
                <Check />
                <span>Günlük coğrafi yedekleme &amp; 7/24 telefon desteği</span>
              </li>
              <li>
                <Check />
                <span>Öncelikli SLA garantisi (%99.98 uptime)</span>
              </li>
            </ul>
          </div>

          {/* Plan 3: Enterprise / Custom Software */}
          <div className="plan glass glass--refract" data-spot>
            <div className="plan__top">
              <h3 className="plan__name">Özel Çözüm &amp; On-Premise</h3>
            </div>
            <p className="plan__desc">
              Şirketinize özel sıfırdan yazılım geliştirme veya kaynak kodlu süresiz lisans.
            </p>

            <div className="plan__price">
              <span className="plan__amount plan__amount--text">Teklif Alın</span>
            </div>
            <div className="plan__note">
              İhtiyaca ve kullanıcı sayısına göre özel projelendirme
            </div>

            <a href="#iletisim" className="btn btn--primary" id="plan-btn-enterprise">
              Özel Teklif İste
              <ArrowRight />
            </a>

            <ul className="plan__list">
              <li>
                <Check />
                <span>Şirket ihtiyaçlarına özel sıfırdan yazılım geliştirme</span>
              </li>
              <li>
                <Check />
                <span>Kendi şirket sunucularınıza On-Premise kurulum</span>
              </li>
              <li>
                <Check />
                <span>Sınırsız kullanıcı &amp; şube lisansı</span>
              </li>
              <li>
                <Check />
                <span>Kaynak kod teslimi opsiyonu</span>
              </li>
              <li>
                <Check />
                <span>Atanmış Kıdemli Yazılım Mimarı &amp; Proje Yöneticisi</span>
              </li>
              <li>
                <Check />
                <span>Özel Güvenlik Denetimi &amp; ISO 27001 Uyum Raporu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
