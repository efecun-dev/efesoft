"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProcessScene from "./ProcessScene";
import {
  Server,
  Cpu,
  ShieldCheck,
  Zap,
  Database,
  Globe,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  Activity,
  Layers,
  Workflow,
  Radio,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PipelineNode {
  title: string;
  subtitle: string;
  iconName: "database" | "cpu" | "globe" | "shield" | "zap" | "radio";
}

interface StepStation {
  num: string;
  badge: string;
  title: string;
  desc: string;
  pipeline: PipelineNode[];
  specs: { label: string; value: string }[];
  tags: string[];
  status: string;
  hardwareFocus: string;
  color: string;
}

const STATIONS: StepStation[] = [
  {
    num: "01",
    badge: "KEŞİF & VERİ EŞLEME",
    title: "Mevcut Altyapınızın 360° Entegrasyon Haritası",
    desc: "Mevcut SAP, Logo, Mikro muhasebe veya depo yazılımlarınız taranır. Tüm veri giriş kanalları, işlem kuyrukları ve iş akışları BPMN 2.0 standartlarında kayıpsız şemalandırılır.",
    pipeline: [
      { title: "Veri Kaynakları", subtitle: "SAP · Logo · Mikro", iconName: "database" },
      { title: "BPMN 2.0 Şema", subtitle: "Otomatik Eşleme", iconName: "cpu" },
      { title: "Veri Ambarı", subtitle: "Sıfır Kayıp / Kuyruk", iconName: "globe" },
    ],
    specs: [
      { label: "Protokol", value: "REST · GraphQL · gRPC" },
      { label: "Veri Eşleme", value: "%100 Kayıpsız Şema" },
      { label: "Hazırlık", value: "1 - 2 Hafta" },
    ],
    tags: ["SAP & Logo Entegrasyonu", "BPMN 2.0 Şemalama", "Sıfır Veri Kaybı"],
    status: "Veri Giriş Kanalları Taranıyor & Şemalandırılıyor",
    hardwareFocus: "100GbE QSFP28 Fiber I/O Giriş Portları",
    color: "#0071e3",
  },
  {
    num: "02",
    badge: "EFEFLOW ENGINE ÇEKİRDEĞİ",
    title: "Merkezi Olay Kuyruğu & Akıllı Doğrulama Motoru",
    desc: "Gelen siparişler, stok hareketleri ve fatura istekleri EfeFlow Engine üzerinden milisaniyeler içinde doğrulanır; şema uyuşmazlıkları ve mükerrer kayıtlar anında çözümlenir.",
    pipeline: [
      { title: "Kafka Event Bus", subtitle: "50k req/sn Kuyruk", iconName: "zap" },
      { title: "EfeFlow Engine", subtitle: "Çift CPU 128 Çekirdek", iconName: "cpu" },
      { title: "Anlık Mutabakat", subtitle: "< 120ms Senkron", iconName: "activity" as any },
    ],
    specs: [
      { label: "İşlem Gecikmesi", value: "< 120ms Senkron" },
      { label: "Kapasite", value: "50.000 Req / sn" },
      { label: "Hata Toleransı", value: "Otomatik Yeniden Deneme" },
    ],
    tags: ["Kafka Event Bus", "Otomatik Mutabakat", "Akıllı Şema Çözümleme"],
    status: "EfeFlow Engine Çekirdeği Aktif · Kuyruk İşleniyor",
    hardwareFocus: "128 Çekirdek Dual EPYC/Xeon & 2TB DDR5 ECC",
    color: "#9a5cf5",
  },
  {
    num: "03",
    badge: "GÜVENLİK KALKANI & DEVSECOPS",
    title: "Banka Seviyesinde Donanımsal HSM Şifreleme",
    desc: "Tüm veri tünelleri askeri standartta AES-256 ve TLS 1.3 ile korunur. Banka sanal POS'ları, Gelir İdaresi Başkanlığı e-Faturaları ve müşteri veritabanları tam izole edilir.",
    pipeline: [
      { title: "Banka & API", subtitle: "Sanal POS & GİB", iconName: "lock" as any },
      { title: "Donanımsal HSM", subtitle: "AES-256 Vault", iconName: "shield" },
      { title: "İzole Ağ", subtitle: "ISO 27001 Sertifikalı", iconName: "globe" },
    ],
    specs: [
      { label: "Şifreleme", value: "AES-256 & TLS 1.3" },
      { label: "Standart", value: "KVKK & ISO 27001" },
      { label: "Yedeklilik", value: "Frankfurt & İzmir DC" },
    ],
    tags: ["ISO 27001 Standardı", "AES-256 Donanım Şifreleme", "Banka API Kalkanı"],
    status: "Askeri Güvenlik Kalkanı Devrede · Tam İzolasyon",
    hardwareFocus: "Hardware HSM Kripto Modülü & Jeodezik Kalkan",
    color: "#10b981",
  },
  {
    num: "04",
    badge: "CANLI YAYIN & OTONOM SENKRON",
    title: "Sıfır Kesintiyle Canlıya Alma & 7/24 Senkronizasyon",
    desc: "Kubernetes podları üzerinde sıfır kesintiyle canlıya alınır. Manuel Excel aktarımlarına son verilir; sistemleriniz 7/24 arka planda birbiriyle konuşarak işinizi büyütür.",
    pipeline: [
      { title: "Kubernetes Cluster", subtitle: "Otomatik Ölçekleme", iconName: "server" },
      { title: "Canlı Senkron", subtitle: "%99.98 Uptime SLA", iconName: "radio" },
      { title: "7/24 İzleme", subtitle: "< 15 Dk Müdahale", iconName: "zap" },
    ],
    specs: [
      { label: "Uptime Garantisi", value: "%99.98 SLA" },
      { label: "Otomasyon Oranı", value: "%100 Otonom Senkron" },
      { label: "Müdahale Hızı", value: "< 15 Dakika SLA" },
    ],
    tags: ["%99.98 Uptime SLA", "Otonom Canlı Akış", "7/24 Mühendis Desteği"],
    status: "Sistem %100 Senkron ve Canlıda · Multi-DC Aktif",
    hardwareFocus: "Bulut Uydu Kümesi & Dikey Lazer Uplink",
    color: "#00a2ff",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const modelCarrierRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      const container = containerRef.current;
      const progressFill = progressFillRef.current;
      if (!track || !container) return;

      if (isReduced) return;

      // Calculate total horizontal track translation based on the ACTUAL track container width
      const getScrollDistance = () => {
        const viewportWidth = track.parentElement ? track.parentElement.clientWidth : window.innerWidth;
        const trackWidth = track.scrollWidth;
        // Ensure the last card (Step 4) completely enters and clears the container
        return -(trackWidth - viewportWidth + 24);
      };

      // Calibrated scrub travel: brisk, responsive, with resting hold for Step 4
      const st = ScrollTrigger.create({
        id: "process-scroll",
        trigger: container,
        start: "top top",
        // Generous travel so each step and the final Step 4 can be viewed comfortably
        end: () => `+=${Math.max(window.innerWidth * 2.4, 3200)}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Proportional travel of the 4 stations (0.0 to 1.0)
          const travelProgress = Math.min(p / 0.88, 1);
          const maxDistance = getScrollDistance();
          gsap.set(track, {
            x: travelProgress * maxDistance,
          });

          // Butter-smooth, GPU-accelerated progress bar fill (no React state lag!)
          if (progressFill) {
            gsap.set(progressFill, {
              scaleX: Math.max(travelProgress, 0.02),
              transformOrigin: "left center",
            });
          }

          // Proportional active step calculation (0, 1, 2, 3)
          const step = Math.min(Math.floor(travelProgress * 3.999), 3);
          setActiveStep(step);
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  // Programmatic smooth step jump when clicking pills or arrows
  const goToStep = (stepIdx: number) => {
    const clamped = Math.max(0, Math.min(stepIdx, 3));
    const st = ScrollTrigger.getById("process-scroll");
    if (st) {
      const targetScroll = st.start + (clamped / 3) * (st.end - st.start) + 10;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const activeStation = STATIONS[activeStep];

  return (
    <section ref={containerRef} id="surec" className="process-flow">
      <div className="process-flow__viewport">
        {/* Ambient Glows */}
        <div className="ambient" aria-hidden>
          <div
            className="ambient__orb"
            style={
              {
                "--c1": activeStation.color,
                "--c2": "#5e5ce6",
                "--s": "640px",
                "--o": "0.28",
                top: "12%",
                left: "25%",
                transition: "all 0.5s ease",
              } as React.CSSProperties
            }
          />
        </div>

        {/* Top Header Bar with Clearance from Fixed Navbar */}
        <div className="process-flow__topbar">
          <div className="process-flow__brand">
            <span className="process-flow__eyebrow">
              <span className="process-flow__dot" style={{ background: activeStation.color }} />
              UÇTAN UCA SİSTEM MİMARİSİ
            </span>
            <h2 className="process-flow__title">
              Sistem Nasıl İşler? <span className="text-gradient">Adım Adım Mimari</span>
            </h2>
          </div>

          {/* Interactive Navigation Control Bar */}
          <div className="process-flow__controls">
            {/* Step Pills */}
            <div className="process-flow__pills">
              {STATIONS.map((st, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`process-flow__pill ${isActive ? "process-flow__pill--active" : ""}`}
                    style={{ "--pill-color": st.color } as React.CSSProperties}
                  >
                    <span className="process-flow__pill-num">{st.num}</span>
                    <span className="process-flow__pill-text">{st.badge.split("&")[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Step Arrows */}
            <div className="process-flow__arrows">
              <button
                type="button"
                onClick={() => goToStep(activeStep - 1)}
                disabled={activeStep === 0}
                className="process-flow__arrow-btn"
                aria-label="Önceki Adım"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => goToStep(activeStep + 1)}
                disabled={activeStep === 3}
                className="process-flow__arrow-btn"
                aria-label="Sonraki Adım"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Butter-Smooth Progress Indicator Line */}
        <div className="process-flow__progress-line">
          <div
            ref={progressFillRef}
            className="process-flow__progress-fill"
            style={{
              background: `linear-gradient(90deg, #0071e3, #9a5cf5, ${activeStation.color})`,
            }}
          />
          {/* 4 Step marker pips */}
          <div className="process-flow__progress-pips" aria-hidden="true">
            {STATIONS.map((st, i) => (
              <span
                key={st.num}
                className={`process-flow__pip ${activeStep >= i ? "process-flow__pip--active" : ""}`}
                style={{ left: `${(i / 3) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Main Stage Arena: 3D Server Showcase + Long Horizontal Stations Track */}
        <div className="process-flow__stage">
          {/* Left: Interactive 3D Server Platform */}
          <div ref={modelCarrierRef} className="process-flow__model-stage glass glass--refract">
            <div className="process-flow__model-header">
              <span className="process-flow__model-badge">
                <Cpu size={13} />
                <span>EfeFlow™ Studio Workstation</span>
              </span>
              <span className="process-flow__model-coords">
                {`ADIM ${activeStep + 1} / 4 · ROT: ${(scrollProgress * 360).toFixed(0)}°`}
              </span>
            </div>

            {/* Three.js 3D Workstation Canvas */}
            <div className="process-flow__canvas-container">
              <ProcessScene progress={scrollProgress} activeStep={activeStep} />
            </div>

            {/* Model Bottom Hardware Readout */}
            <div className="process-flow__model-footer">
              <div className="process-flow__model-focus">
                <span className="process-flow__pulse-dot" style={{ background: activeStation.color }} />
                <span>{activeStation.hardwareFocus}</span>
              </div>
              <div className="process-flow__model-telemetry">
                OLED · 128 Cores · 50k req/s
              </div>
            </div>
          </div>

          {/* Right: Expansive Horizontal Track with Large Animated Architecture Stations */}
          <div className="process-flow__track-viewport">
            <div ref={trackRef} className="process-flow__track">
              {STATIONS.map((station, idx) => {
                const isCurrent = activeStep === idx;

                return (
                  <article
                    key={station.num}
                    className={`station-card glass glass--refract ${isCurrent ? "station-card--active" : ""}`}
                    style={{ "--station-color": station.color } as React.CSSProperties}
                  >
                    {/* Top Station Header */}
                    <div className="station-card__header">
                      <div className="station-card__num-box">
                        <span className="station-card__num">{station.num}</span>
                        <span className="station-card__total">/ 04</span>
                      </div>
                      <span
                        className="station-card__badge"
                        style={{ color: station.color, background: `${station.color}15` }}
                      >
                        {station.badge}
                      </span>
                    </div>

                    {/* Headline and Architecture Description */}
                    <div className="station-card__body">
                      <h3 className="station-card__title">{station.title}</h3>
                      <p className="station-card__desc">{station.desc}</p>
                    </div>

                    {/* Animated Visual Pipeline Node Diagram */}
                    <div className="station-card__pipeline">
                      <div className="pipeline-track">
                        {station.pipeline.map((node, nIdx) => (
                          <div key={nIdx} className="pipeline-step">
                            <div className="pipeline-node">
                              <div className="pipeline-node__icon-box">
                                {nIdx === 0 && <Database size={15} />}
                                {nIdx === 1 && <Cpu size={15} />}
                                {nIdx === 2 && <Globe size={15} />}
                              </div>
                              <div className="pipeline-node__text">
                                <span className="pipeline-node__title">{node.title}</span>
                                <span className="pipeline-node__subtitle">{node.subtitle}</span>
                              </div>
                            </div>
                            {nIdx < 2 && (
                              <div className="pipeline-connector">
                                <span
                                  className="pipeline-beam"
                                  style={{ animationDelay: `${nIdx * 0.4}s` }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Architecture Specs 3-Column Grid */}
                    <div className="station-card__specs">
                      {station.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="station-card__spec">
                          <span className="station-card__spec-label">{spec.label}</span>
                          <span className="station-card__spec-val">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Capability Tags */}
                    <div className="station-card__tags">
                      {station.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="station-card__tag">
                          <Check size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Station Live Status Footer */}
                    <div className="station-card__footer">
                      <div className="station-card__live-status">
                        <span className="station-card__live-dot" style={{ background: station.color }} />
                        <span>{station.status}</span>
                      </div>
                      <span className="station-card__step-hint">
                        {idx < 3 ? "Kaydırmaya devam edin →" : "✓ Uçtan Uca Tamamlandı"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
