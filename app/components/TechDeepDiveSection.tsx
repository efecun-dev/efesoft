"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Workflow,
  Layers,
  Database,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TechTab {
  id: string;
  name: string;
  tag: string;
  algorithm: string;
  icon: typeof Workflow;
  filePath: string;
  language: string;
  code: string;
  metrics: { label: string; value: string }[];
  summary: string;
  highlights: string[];
}

const TECH_TABS: TechTab[] = [
  {
    id: "pipeline",
    name: "Olay Kuyruğu & Durum Makinesi",
    tag: "HIGH CONCURRENCY",
    algorithm: "Lock-Free Ring Buffer & Event-Driven DAG State Machine",
    icon: Workflow,
    filePath: "crates/efeflow-core/src/pipeline.rs",
    language: "Rust",
    code: `// crates/efeflow-core/src/pipeline.rs
pub struct TransactionPipeline<S: State, E: Event> {
    ring_buffer: Arc<DisruptorRingBuffer<E, 65536>>,
    vector_clock: AtomicVectorClock,
    state_store: ConcurrentLsmTree<S>,
}

impl<S, E> TransactionPipeline<S, E> {
    /// Zero-allocation atomic event dispatch with p99 <1.2ms SLA
    pub async fn dispatch_atomic(&self, event: E) -> Result<TxReceipt, PipelineError> {
        let seq = self.ring_buffer.publish(event).await?;
        let state = self.state_store.compare_and_swap(seq)?;
        
        // Lock-free state transition & immediate WAL sync
        self.wal.append_zero_copy(seq, &state)?;
        Ok(TxReceipt { 
            tx_id: seq.into(), 
            latency_ns: 412_000, 
            status: TxStatus::Committed 
        })
    }
}`,
    metrics: [
      { label: "p99 Gecikme", value: "< 1.18 ms" },
      { label: "Bellek Tahsisi", value: "0 Allocation (Zero-GC)" },
      { label: "İşlem Hacmi", value: "120.000+ msg/sn" },
    ],
    summary:
      "Geleneksel mutex kilitleri yerine lock-free halka tamponlar (ring buffer) ve CPU L1/L2 önbellek dostu veri hizalaması kullanarak milisaniyenin altında kurumsal sipariş mutabakatı sağlar.",
    highlights: [
      "BPMN 2.0 uyumlu yönlendirilmiş çevrimsiz çizge (DAG)",
      "Zero-copy serialization ile sıfır GC duraklaması",
      "Geri basınç (backpressure) otomatik yük dengeleme",
    ],
  },
  {
    id: "consensus",
    name: "Dağıtık Konsensüs Motoru",
    tag: "MULTI-RAFT ACID",
    algorithm: "Multi-Raft Consensus with Vector Clocks & Lease Read",
    icon: Layers,
    filePath: "core/consensus/multi_raft.ts",
    language: "TypeScript",
    code: `// core/consensus/multi_raft.ts
export class DistributedConsensusGroup {
  private term = new AtomicTerm();
  private logReplication = new QuorumReplicator({ quorum: (nodes) => Math.floor(nodes.length / 2) + 1 });

  async appendEntries(entry: LogEntry): Promise<ConsensusResult> {
    const vectorTimestamp = this.clock.tick();
    const ackQuorum = await this.logReplication.broadcast(entry, vectorTimestamp);
    
    if (!ackQuorum.isSatisfied()) {
      throw new SplitBrainPreventionError("Quorum unreachable, rolling back transaction");
    }
    
    // Commit log to persistent distributed LSM engine
    return this.commitLogEntry(entry.id, { syncReplication: true });
  }
}`,
    metrics: [
      { label: "Quorum Tutarlılığı", value: "%100 ACID" },
      { label: "Split-Brain Riski", value: "Sıfır (%0 Risk)" },
      { label: "Failover Süresi", value: "< 350 ms" },
    ],
    summary:
      "Farklı fabrikalar ve bulut merkezleri arasındaki veri senkronizasyonunda ağ kopmalarına karşı Multi-Raft kümeleme algoritması ve vektör saatleri ile veri kaybını imkansız kılar.",
    highlights: [
      "2N+1 quorum çoğunluk oylaması",
      "Lokal Lease-Read ile okuma işlemlerinde sıfır ağ gecikmesi",
      "Otomatik lider seçimi ve self-healing",
    ],
  },
  {
    id: "schema",
    name: "AST Şema Morfizasyonu",
    tag: "ZERO-LOSS SERDE",
    algorithm: "Abstract Syntax Tree (AST) Bidirectional Type Morphism",
    icon: Database,
    filePath: "engine/schema/ast_transformer.ts",
    language: "TypeScript",
    code: `// engine/schema/ast_transformer.ts
export function morphSapIdocToProtobuf(rawIdoc: SAP_IDOC_BUFFER): CanonicalMessage {
  // Parse arbitrary legacy XML/IDoc into high-speed AST representation
  const ast = parseIdocFastAST(rawIdoc, { zeroCopy: true });
  
  return SchemaMorpher.compile(ast, {
    targetSchema: ProtoDefinitions.OrderEvent,
    strictTypeValidation: true,
    coercionStrategy: "TypeSafeLossless",
    conflictResolution: "VectorClockResolution",
  });
}`,
    metrics: [
      { label: "SerDe Hızı", value: "2.8 GB / sn" },
      { label: "Şema Doğruluğu", value: "%100 Kayıpsız" },
      { label: "Format Desteği", value: "SAP, Logo, REST, gRPC" },
    ],
    summary:
      "SAP IDoc, Logo XML veya Mikro verilerini bayt seviyesinde analiz eden AST motoru; şemalar arasındaki tip uyuşmazlıklarını statik tip çıkarımıyla anında çözer.",
    highlights: [
      "Protobuf v3 ve gRPC ikili serileştirme",
      "Çift yönlü dinamik şema eşleme",
      "Mükerrer ve geçersiz kayıtlar için anlık doğrulama",
    ],
  },
  {
    id: "security",
    name: "Donanımsal HSM Kriptografi",
    tag: "FIPS 140-2 LEVEL 3",
    algorithm: "Envelope Encryption with Ephemeral TLS 1.3 & AES-256-GCM",
    icon: ShieldCheck,
    filePath: "security/crypto/hsm_vault.ts",
    language: "TypeScript",
    code: `// security/crypto/hsm_vault.ts
export class HardwareSecurityVault {
  async encryptEnvelope(payload: Uint8Array): Promise<EncryptedPackage> {
    // Generate one-time ephemeral Data Encryption Key (DEK)
    const dek = await crypto.subtle.generateKey("AES-GCM", true, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, dek, payload);
    const encryptedDek = await this.hsmMasterKey.wrapKey("raw", dek);
    
    return { ciphertext, encryptedDek, iv, algorithm: "AES-256-GCM" };
  }
}`,
    metrics: [
      { label: "Şifreleme Katmanı", value: "AES-256-GCM & TLS 1.3" },
      { label: "Donanım Standardı", value: "FIPS 140-2 Level 3" },
      { label: "Anahtar Rotasyonu", value: "Otomatik 24 Saatlik" },
    ],
    summary:
      "Banka sanal POS'ları ve hassas muhasebe verileri zarf şifreleme (Envelope Encryption) yöntemiyle korunur. Anahtarlar donanımsal HSM modülünde saklanır; bellek dökümüyle dahi ele geçirilemez.",
    highlights: [
      "Zero-knowledge şifreli denetim günlüğü",
      "KVKK ve ISO 27001 tam uyumlu izole tünel",
      "Efemer ECDH anahtar değişimi",
    ],
  },
];

export default function TechDeepDiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab = TECH_TABS[activeTabIdx];

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      gsap.from(".tech-deep__header > *", {
        scrollTrigger: {
          trigger: ".tech-deep__header",
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: "power3.out",
      });

      gsap.from(".tech-deep__tab", {
        scrollTrigger: {
          trigger: ".tech-deep__tabs",
          start: "top 88%",
          once: true,
        },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".tech-deep__arena", {
        scrollTrigger: {
          trigger: ".tech-deep__arena",
          start: "top 85%",
          once: true,
        },
        y: 36,
        opacity: 0,
        scale: 0.98,
        duration: 1.1,
        ease: "expo.out",
      });
    },
    { scope: sectionRef }
  );

  const handleTabSelect = (idx: number) => {
    if (idx === activeTabIdx) return;
    setActiveTabIdx(idx);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        ".tech-terminal__code, .tech-explainer > *",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.45, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} id="meraklisina" className="section tech-deep">
      <div className="wrap">
        {/* Section Header */}
        <div className="tech-deep__header">
          <div className="tech-deep__badge">
            <span className="tech-deep__badge-dot" />
            <span>MÜHENDİSLİK & ÇEKİRDEK ALGORİTMA</span>
          </div>
          <h2 className="tech-deep__title">
            Meraklısına: Kaputun Altındaki Efesoft <br />
            <span className="text-gradient">Kod & Mimari Derinliği</span>
          </h2>
          <p className="tech-deep__subtitle">
            Yazılım mimarları ve geliştiriciler için: Yüksek eşzamanlılıklı (high-concurrency),
            sıfır bellek sızıntılı ve mikro-gecikmeli kurumsal entegrasyon motorumuzun gerçek çalışma prensipleri.
          </p>
        </div>

        {/* Algorithm Tabs Navigator */}
        <div className="tech-deep__tabs" role="tablist">
          {TECH_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabSelect(idx)}
                className={`tech-deep__tab ${isActive ? "tech-deep__tab--active" : ""}`}
              >
                <div className="tech-deep__tab-icon">
                  <Icon size={16} />
                </div>
                <div className="tech-deep__tab-text">
                  <span className="tech-deep__tab-name">{tab.name}</span>
                  <span className="tech-deep__tab-tag">{tab.tag}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Tech Stage: Code Terminal + Architecture Details */}
        <div className="tech-deep__arena glass glass--refract" data-spot>
          {/* Left: Interactive Code Terminal Window */}
          <div className="tech-terminal">
            {/* Window Title Bar */}
            <div className="tech-terminal__bar">
              <div className="tech-terminal__dots">
                <span className="tech-terminal__dot tech-terminal__dot--red" />
                <span className="tech-terminal__dot tech-terminal__dot--yellow" />
                <span className="tech-terminal__dot tech-terminal__dot--green" />
              </div>
              <div className="tech-terminal__path">
                <Terminal size={12} />
                <span>{activeTab.filePath}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="tech-terminal__copy-btn"
                aria-label="Kodu kopyala"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="tech-terminal__body">
              <pre className="tech-terminal__code">
                <code>
                  {activeTab.code.split("\n").map((line, lIdx) => (
                    <div key={lIdx} className="tech-terminal__line">
                      <span className="tech-terminal__line-num">{lIdx + 1}</span>
                      <span className="tech-terminal__line-content">
                        {renderSyntaxHighlight(line)}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Bottom Real-time Benchmark Metrics Bar */}
            <div className="tech-terminal__benchmarks">
              {activeTab.metrics.map((m, mIdx) => (
                <div key={mIdx} className="tech-terminal__benchmark">
                  <span className="tech-terminal__bench-label">{m.label}</span>
                  <span className="tech-terminal__bench-val">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Architectural Explanation Card */}
          <div className="tech-explainer">
            <div className="tech-explainer__header">
              <span className="tech-explainer__badge">ALGORİTMA MİMARİSİ</span>
              <h3 className="tech-explainer__title">{activeTab.algorithm}</h3>
            </div>

            <p className="tech-explainer__desc">{activeTab.summary}</p>

            <div className="tech-explainer__highlights">
              <span className="tech-explainer__highlights-title">TEMEL ÇEKİRDEK ÖZELLİKLERİ</span>
              <ul className="tech-explainer__list">
                {activeTab.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="tech-explainer__item">
                    <Check size={14} className="tech-explainer__check" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-explainer__footer">
              <div className="tech-explainer__status">
                <span className="tech-explainer__pulse-dot" />
                <span>EfeFlow Core v2.4 · Üretim Ortamında Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Lightweight syntax highlight formatter
function renderSyntaxHighlight(line: string) {
  if (line.trim().startsWith("//")) {
    return <span style={{ color: "#64748b", fontStyle: "italic" }}>{line}</span>;
  }
  if (line.trim().startsWith("///")) {
    return <span style={{ color: "#94a3b8", fontStyle: "italic" }}>{line}</span>;
  }

  // Keywords highlighting
  const parts = line.split(/(\b(?:pub|struct|impl|async|fn|let|return|export|class|private|throw|new|const|Ok|Result)\b)/g);

  return (
    <>
      {parts.map((p, idx) => {
        if (/^(pub|struct|impl|async|fn|let|return|export|class|private|throw|new|const)$/.test(p)) {
          return (
            <span key={idx} style={{ color: "#f43f5e", fontWeight: "600" }}>
              {p}
            </span>
          );
        }
        if (/^(Ok|Result)$/.test(p)) {
          return (
            <span key={idx} style={{ color: "#00b4ff", fontWeight: "600" }}>
              {p}
            </span>
          );
        }
        return p;
      })}
    </>
  );
}
