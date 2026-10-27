"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe, Phone, Layers, Sparkle, Cloud } from "./icons";
import {
  Building2,
  ShoppingCart,
  Zap as LucideZap,
  Landmark,
  FileSpreadsheet,
  Check as LucideCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServicesBento() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      gsap.from(".bento .card", {
        scrollTrigger: {
          trigger: ".bento",
          start: "top 82%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="hizmetler" className="section services">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow">ÖZEL YAZILIM HİZMETLERİ</span>
          <h2 className="h2">
            İhtiyacınıza tam uyan, <br />
            <span className="text-gradient">terzi usulü mühendislik.</span>
          </h2>
          <p className="lead">
            Standart kalıpların yetmediği yerde Efesoft devreye girer. Şirketinizin
            iş süreçlerine, güvenlik politikalarına ve büyüme hedeflerine özel
            yazılımlar tasarlıyor, sıfırdan anahtar teslim teslim ediyoruz.
          </p>
        </div>

        <div className="bento">
          {/* Card 1: Web & Enterprise Portals (Large Feature Card) */}
          <article
            className="card card--web glass glass--refract"
            data-spot
            style={{ "--ic": "#0071e3" } as React.CSSProperties}
          >
            <div className="card__icon" style={{ background: "linear-gradient(135deg, #0071e3, #2997ff)" }}>
              <Globe />
            </div>
            <h3 className="card__title">Web &amp; Kurumsal Platform Mimarileri</h3>
            <p className="card__text">
              Milyonlarca isteği milisaniyeler içinde yanıtlayan, modern mikroservis
              ve Jamstack mimarili kurumsal web portalları, B2B/B2C ticaret sistemleri
              ve yönetim panelleri.
            </p>
            <div className="card__tags">
              <span className="tag">Next.js &amp; React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">GraphQL &amp; gRPC</span>
              <span className="tag">Mikroservisler</span>
              <span className="tag">Edge Caching</span>
            </div>

            {/* Interactive Browser Mockup */}
            <div className="mock-browser" aria-hidden="true">
              <div className="mock-browser__bar">
                <i />
                <i />
                <i />
                <div className="mock-browser__url">portal.efesoft.com/dashboard</div>
              </div>
              <div className="mock-browser__body">
                <div className="mock-side">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mock-main">
                  <div className="mock-kpis">
                    <div className="mock-kpi">
                      <small>Aktif Oturum</small>
                      <b>42.840</b>
                    </div>
                    <div className="mock-kpi">
                      <small>Sipariş Hacmi</small>
                      <b>₺18.4M</b>
                    </div>
                    <div className="mock-kpi">
                      <small>Tepki Süresi</small>
                      <b>14 ms</b>
                    </div>
                  </div>
                  <div className="mock-chart">
                    <i style={{ "--h": "45%", "--i": 0 } as React.CSSProperties} />
                    <i style={{ "--h": "70%", "--i": 1 } as React.CSSProperties} />
                    <i style={{ "--h": "60%", "--i": 2 } as React.CSSProperties} />
                    <i style={{ "--h": "85%", "--i": 3 } as React.CSSProperties} />
                    <i style={{ "--h": "75%", "--i": 4 } as React.CSSProperties} />
                    <i style={{ "--h": "95%", "--i": 5 } as React.CSSProperties} />
                    <i style={{ "--h": "65%", "--i": 6 } as React.CSSProperties} />
                    <i style={{ "--h": "88%", "--i": 7 } as React.CSSProperties} />
                    <i style={{ "--h": "100%", "--i": 8 } as React.CSSProperties} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: iOS & Android Mobile Apps */}
          <article
            className="card card--mobile glass glass--refract"
            data-spot
            style={{ "--ic": "#5e5ce6" } as React.CSSProperties}
          >
            <div className="card__icon" style={{ background: "linear-gradient(135deg, #5e5ce6, #af52de)" }}>
              <Phone />
            </div>
            <h3 className="card__title">Native &amp; Cross Mobil Deneyimler</h3>
            <p className="card__text">
              iOS (Swift) ve Android (Kotlin) için akıcı, dokunma tepkisi yüksek, offline-first çalışan kurumsal saha ve son kullanıcı uygulamaları.
            </p>
            <div className="card__tags">
              <span className="tag">Swift &amp; SwiftUI</span>
              <span className="tag">Kotlin</span>
              <span className="tag">React Native</span>
            </div>

            {/* iPhone Mock with Dynamic Island & Liquid Glass Widgets */}
            <div className="mock-phone" aria-hidden="true">
              <div className="mock-phone__screen">
                <div className="mock-phone__island" />
                <div className="mock-phone__widget mock-phone__widget--wide glass">
                  <span>Satış Performansı</span>
                  <b>₺384.200</b>
                </div>
                <div className="mock-phone__widget glass">
                  <span>Görevler</span>
                  <b>12 / 14</b>
                </div>
                <div className="mock-phone__widget glass">
                  <span>Onaylar</span>
                  <b>4 Bekleyen</b>
                </div>
                <div className="mock-phone__apps">
                  <i style={{ "--c": "#0071e3" } as React.CSSProperties} />
                  <i style={{ "--c": "#5e5ce6" } as React.CSSProperties} />
                  <i style={{ "--c": "#30d158" } as React.CSSProperties} />
                  <i style={{ "--c": "#ff9f0a" } as React.CSSProperties} />
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: ERP & Process Automation */}
          <article
            className="card card--erp glass glass--refract"
            data-spot
            style={{ "--ic": "#2ec4b6" } as React.CSSProperties}
          >
            <div className="card__icon" style={{ background: "linear-gradient(135deg, #2ec4b6, #30b0ff)" }}>
              <Layers />
            </div>
            <h3 className="card__title">ERP &amp; İş Süreçleri Otomasyonu</h3>
            <p className="card__text">
              Mevcut muhasebe, depo ve üretim hatlarınızı akıllı BPMN motorlarıyla birbirine bağlayan hibrit entegrasyonlar.
            </p>
            <div className="card__tags">
              <span className="tag">SAP &amp; Logo</span>
              <span className="tag">BPMN 2.0</span>
              <span className="tag">Banka &amp; POS API</span>
              <span className="tag">e-Fatura &amp; GİB</span>
            </div>

            {/* Smart Hybrid Integration Pipeline Architecture */}
            <div className="erp-pipeline" aria-hidden="true">
              <div className="erp-pipeline__header">
                <span className="erp-pipeline__badge">
                  <span className="erp-pipeline__dot" />
                  EfeFlow™ Hibrit Köprü
                </span>
                <span className="erp-pipeline__stat">0.12s · %100 Senkron</span>
              </div>

              <div className="erp-pipeline__flow">
                {/* Source Systems */}
                <div className="erp-pipeline__col">
                  <div className="erp-node">
                    <span className="erp-node__icon">
                      <Building2 size={13} color="#0071e3" />
                    </span>
                    <div className="erp-node__meta">
                      <b>SAP / Logo</b>
                      <small>Sipariş Girişi</small>
                    </div>
                  </div>
                  <div className="erp-node">
                    <span className="erp-node__icon">
                      <ShoppingCart size={13} color="#5e5ce6" />
                    </span>
                    <div className="erp-node__meta">
                      <b>B2B Web</b>
                      <small>Müşteri Sepeti</small>
                    </div>
                  </div>
                </div>

                {/* Left Stream with animated pulse */}
                <div className="erp-stream">
                  <div className="erp-stream__line" />
                  <div className="erp-stream__particle erp-stream__particle--left" />
                </div>

                {/* Central Orchestrator Core */}
                <div className="erp-hub">
                  <div className="erp-hub__orb">
                    <LucideZap size={12} color="#ffffff" />
                  </div>
                  <div className="erp-hub__info">
                    <b>EfeFlow Engine</b>
                    <small>Akıllı Doğrulama</small>
                  </div>
                </div>

                {/* Right Stream with animated pulse */}
                <div className="erp-stream">
                  <div className="erp-stream__line" />
                  <div className="erp-stream__particle erp-stream__particle--right" />
                </div>

                {/* Target Systems */}
                <div className="erp-pipeline__col">
                  <div className="erp-node erp-node--target">
                    <span className="erp-node__icon">
                      <Landmark size={13} color="#0d9488" />
                    </span>
                    <div className="erp-node__meta">
                      <b>Banka API</b>
                      <small style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                        Oto-Tahsilat <LucideCheck size={9} strokeWidth={3} />
                      </small>
                    </div>
                  </div>
                  <div className="erp-node erp-node--target">
                    <span className="erp-node__icon">
                      <FileSpreadsheet size={13} color="#0d9488" />
                    </span>
                    <div className="erp-node__meta">
                      <b>GİB e-Fatura</b>
                      <small>İrsaliye &amp; Kargo</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Event Footer */}
              <div className="erp-pipeline__footer">
                <span className="erp-pipeline__check">
                  <LucideCheck size={9} strokeWidth={3} />
                </span>
                <span>Manuel veri aktarımına son: Sistemler arası çift yönlü canlı akış.</span>
              </div>
            </div>
          </article>

          {/* Card 4: AI & Machine Learning */}
          <article
            className="card card--ai glass glass--refract"
            data-spot
            style={{ "--ic": "#9a5cf5" } as React.CSSProperties}
          >
            <div className="card__icon" style={{ background: "linear-gradient(135deg, #9a5cf5, #ff6b5a)" }}>
              <Sparkle />
            </div>
            <h3 className="card__title">Kurumsal Yapay Zeka &amp; Ajanlar</h3>
            <p className="card__text">
              Şirket içi verilerinizle güvenle eğitilen RAG tabanlı yapay zeka asistanları, akıllı doküman analizi ve tahminleme modelleri.
            </p>
            <div className="card__visual" aria-hidden="true">
              <div className="ai-chat">
                <div className="ai-chat__msg">
                  3. Çeyrek stok optimizasyonu hazır mı?
                </div>
                <div className="ai-chat__msg ai-chat__msg--me">
                  Tüm tedarik verileri işlendi, %18 maliyet tasarrufu sağlandı.
                </div>
                <div className="ai-chat__typing">
                  <i style={{ "--i": 0 } as React.CSSProperties} />
                  <i style={{ "--i": 1 } as React.CSSProperties} />
                  <i style={{ "--i": 2 } as React.CSSProperties} />
                </div>
              </div>
            </div>
          </article>

          {/* Card 5: Cloud Architecture & DevSecOps */}
          <article
            className="card card--cloud glass glass--refract"
            data-spot
            style={{ "--ic": "#30d158" } as React.CSSProperties}
          >
            <div className="card__icon" style={{ background: "linear-gradient(135deg, #30d158, #2ec4b6)" }}>
              <Cloud />
            </div>
            <h3 className="card__title">Bulut Altyapı &amp; DevSecOps</h3>
            <p className="card__text">
              Kubernetes, Docker ve otomatik CI/CD hatlarıyla sıfır kesinti, otomatik ölçeklenme ve askeri standartta veri güvenliği.
            </p>
            <div className="card__visual" aria-hidden="true">
              <div className="uptime">
                {Array.from({ length: 28 }).map((_, i) => (
                  <i key={i} />
                ))}
              </div>
              <div className="uptime__meta">
                <span>Son 90 Gün</span>
                <b>%99.98 Uptime</b>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
