"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  Database,
  Download,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  Lock,
  Network,
  Pause,
  Play,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  endpoint: string;
  category: "core" | "product" | "data";
  region: "izmir" | "frankfurt" | "global";
  regionLabel: string;
  version: string;
  uptime: string;
  sla: string;
  cpu: number;
  ram: string;
  latencyP95: number;
  latencyP99: number;
  rps: number;
  status: "operational" | "degraded";
  logs: { time: string; level: "INFO" | "OK" | "WARN"; msg: string }[];
}

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "SVC-01",
    name: "EfeOS Kurumsal Lisans & Auth Gateway",
    endpoint: "https://license.efesoft.com.tr:8443/v2/verify",
    category: "core",
    region: "global",
    regionLabel: "İzmir + Frankfurt (Active-Active)",
    version: "v4.9.2",
    uptime: "88 gün 14 sa",
    sla: "%99.99",
    cpu: 22,
    ram: "3.2 GB / 8 GB",
    latencyP95: 12,
    latencyP99: 24,
    rps: 68,
    status: "operational",
    logs: [
      { time: "15:48:42", level: "OK", msg: "1.248 aktif kurumsal lisans koltuğu için mTLS el sıkışması doğrulandı (0 süresi dolan)." },
      { time: "15:48:19", level: "INFO", msg: "Borusan Lojistik [BORUSAN-LOG-TR] kiracısı için İzmir KMS düğümünde anahtar rotasyonu tamamlandı." },
      { time: "15:47:50", level: "OK", msg: "Frankfurt yedek kümesi replikasyon farkı: 0.3ms (%0 paket kaybı)." },
    ],
  },
  {
    id: "SVC-02",
    name: "EfeERP Enterprise Bulut Uygulama Kümesi",
    endpoint: "https://app.efeerp.com/api/v3/graphql",
    category: "product",
    region: "izmir",
    regionLabel: "İzmir Tier-3 DC (TR-IZM-1)",
    version: "v6.4.0",
    uptime: "44 gün 09 sa",
    sla: "%99.98",
    cpu: 34,
    ram: "14.8 GB / 32 GB",
    latencyP95: 21,
    latencyP99: 42,
    rps: 145,
    status: "operational",
    logs: [
      { time: "15:48:49", level: "OK", msg: "Otomatik ölçeklenen işçi havuzu: [efeerp-prod] alanında 12/12 pod sağlıklı çalışıyor." },
      { time: "15:48:11", level: "OK", msg: "GİB E-Fatura & E-İrsaliye köprüsü yanıt süresi: 64ms (SLA sınırları içinde)." },
      { time: "15:46:33", level: "INFO", msg: "420 kurumsal şube için stok ve muhasebe defteri anlık görüntüsü kaydedildi." },
    ],
  },
  {
    id: "SVC-03",
    name: "EfeCRM & B2B Sipariş Portalı Mikroservisi",
    endpoint: "https://crm.efesoft.com.tr/api/v2",
    category: "product",
    region: "izmir",
    regionLabel: "İzmir Tier-3 DC (TR-IZM-1)",
    version: "v3.8.5",
    uptime: "61 gün 22 sa",
    sla: "%99.99",
    cpu: 26,
    ram: "6.4 GB / 16 GB",
    latencyP95: 17,
    latencyP99: 31,
    rps: 82,
    status: "operational",
    logs: [
      { time: "15:48:40", level: "OK", msg: "Gerçek zamanlı WebSocket bildirim hattı aktif: 890 bağlı satış temsilcisi." },
      { time: "15:47:14", level: "INFO", msg: "Yeni web teklif talebi [LEAD-1082] CRM satış hunisine otomatik aktarıldı." },
      { time: "15:45:02", level: "OK", msg: "B2B bayi sipariş katalog önbelleği 14ms içinde yenilendi." },
    ],
  },
  {
    id: "SVC-04",
    name: "EfePOS Perakende & Mağaza Senkronizasyon Ağı",
    endpoint: "wss://pos-sync.efesoft.com.tr/realtime",
    category: "product",
    region: "global",
    regionLabel: "İzmir + Frankfurt Edge",
    version: "v2.1.4",
    uptime: "39 gün 06 sa",
    sla: "%99.97",
    cpu: 29,
    ram: "5.1 GB / 12 GB",
    latencyP95: 15,
    latencyP99: 29,
    rps: 112,
    status: "operational",
    logs: [
      { time: "15:48:51", level: "OK", msg: "485 perakende mağaza POS terminali ile çevrimdışı-öncelikli delta senkronizasyonu tamamlandı." },
      { time: "15:47:02", level: "INFO", msg: "OTA v2.1.4 sürüm paketi tüm bölgesel uç sunucularda doğrulandı." },
      { time: "15:44:18", level: "OK", msg: "Kasa fiş ve Z-raporu kuyruk gecikmesi: 8ms." },
    ],
  },
  {
    id: "SVC-05",
    name: "PostgreSQL 16 HA Veritabanı Kümesi (Primary + Replica)",
    endpoint: "tcp://db-cluster.internal.efesoft:5432",
    category: "data",
    region: "izmir",
    regionLabel: "İzmir NVMe RAID-10 + FRA Standby",
    version: "PG 16.4 (Patroni)",
    uptime: "142 gün 18 sa",
    sla: "%100.0",
    cpu: 24,
    ram: "22.6 GB / 48 GB",
    latencyP95: 4,
    latencyP99: 9,
    rps: 640,
    status: "operational",
    logs: [
      { time: "15:48:54", level: "OK", msg: "Frankfurt yedek veritabanına [fra-pg-replica-01] kesintisiz WAL akışı: gecikme 0.4ms." },
      { time: "15:45:00", level: "INFO", msg: "PgBouncer bağlantı havuzu: 92 aktif / 500 maksimum bağlantı (sırada bekleyen: 0)." },
      { time: "15:30:00", level: "OK", msg: "Artımlı WAL arşivi AES-256-GCM ile şifrelenerek Frankfurt S3 kasasına yüklendi." },
    ],
  },
  {
    id: "SVC-06",
    name: "Redis 7.2 Bellek İçi Önbellek & Kuyruk (Sentinel)",
    endpoint: "tcp://redis-sentinel.internal.efesoft:6379",
    category: "data",
    region: "izmir",
    regionLabel: "İzmir High-Memory Kümesi",
    version: "Redis 7.2.5",
    uptime: "142 gün 18 sa",
    sla: "%100.0",
    cpu: 11,
    ram: "4.8 GB / 16 GB",
    latencyP95: 1,
    latencyP99: 2,
    rps: 1420,
    status: "operational",
    logs: [
      { time: "15:48:50", level: "OK", msg: "Son 15 dakikalık önbellek isabet oranı (Cache Hit): %99.42 (0 silinen anahtar)." },
      { time: "15:48:10", level: "INFO", msg: "BullMQ [email-notifications] kuyruğundaki 18 görev 42ms içinde tamamlandı." },
      { time: "15:45:12", level: "OK", msg: "3 düğümlü Redis Sentinel quorum durumu: 3/3 sağlıklı." },
    ],
  },
  {
    id: "SVC-07",
    name: "efesoft.com.tr Web Gateway & 3D WebGL Edge CDN",
    endpoint: "https://efesoft.com.tr (HTTP/3 QUIC)",
    category: "core",
    region: "global",
    regionLabel: "Global Anycast CDN (32 PoP)",
    version: "Next.js 16 Edge",
    uptime: "90 gün 00 sa",
    sla: "%99.99",
    cpu: 18,
    ram: "2.1 GB / 8 GB",
    latencyP95: 14,
    latencyP99: 26,
    rps: 128,
    status: "operational",
    logs: [
      { time: "15:48:55", level: "OK", msg: "Gelen mobil ve masaüstü ziyaretçilerin %94.8'i için HTTP/3 QUIC 0-RTT bağlantısı kuruldu." },
      { time: "15:48:12", level: "INFO", msg: "3D WebGL sahne ve shader paketleri Türkiye & Avrupa CDN düğümlerinden %98.7 önbellekten sunuldu." },
      { time: "15:46:05", level: "OK", msg: "WAF kuralları 14 şüpheli bot tarama isteğini kenar sunucuda blokladı." },
    ],
  },
  {
    id: "SVC-08",
    name: "Frankfurt Felaket Kurtarma & S3 Yedekleme Köprüsü",
    endpoint: "https://fra-dr.efesoft.internal:9000",
    category: "core",
    region: "frankfurt",
    regionLabel: "Frankfurt DC (EU-CENTRAL-1)",
    version: "MinIO / S3 v2026",
    uptime: "180 gün 04 sa",
    sla: "%100.0",
    cpu: 14,
    ram: "3.8 GB / 16 GB",
    latencyP95: 19,
    latencyP99: 33,
    rps: 24,
    status: "operational",
    logs: [
      { time: "15:48:30", level: "OK", msg: "İzmir <-> Frankfurt bölgeler arası 10Gbps WireGuard şifreli replikasyon tüneli aktif." },
      { time: "15:00:04", level: "OK", msg: "Saatlik veritabanı ve lisans kasası bütünlük kontrolü (SHA-256) başarıyla geçti." },
      { time: "14:30:00", level: "INFO", msg: "Soğuk arşiv (Glacier) senkronizasyonu tamamlandı." },
    ],
  },
];

const INITIAL_TELEMETRY_BARS = [
  { t: "26sn", cpu: 24, ram: 39, lat: 17 },
  { t: "24sn", cpu: 26, ram: 39, lat: 18 },
  { t: "22sn", cpu: 25, ram: 40, lat: 16 },
  { t: "20sn", cpu: 29, ram: 40, lat: 19 },
  { t: "18sn", cpu: 31, ram: 41, lat: 21 },
  { t: "16sn", cpu: 27, ram: 40, lat: 18 },
  { t: "14sn", cpu: 25, ram: 40, lat: 17 },
  { t: "12sn", cpu: 28, ram: 41, lat: 19 },
  { t: "10sn", cpu: 26, ram: 40, lat: 18 },
  { t: "8sn", cpu: 24, ram: 40, lat: 16 },
  { t: "6sn", cpu: 27, ram: 40, lat: 18 },
  { t: "4sn", cpu: 29, ram: 41, lat: 19 },
  { t: "2sn", cpu: 26, ram: 40, lat: 17 },
  { t: "Şimdi", cpu: 26, ram: 40, lat: 18 },
];

export default function AdminSystemHealthPage() {
  const [isLive, setIsLive] = useState(true);
  const [regionFilter, setRegionFilter] = useState<"all" | "izmir" | "frankfurt" | "global">("all");
  const [chartMode, setChartMode] = useState<"cpu" | "ram" | "latency">("cpu");
  const [infraTab, setInfraTab] = useState<"nodes" | "storage" | "ssl">("nodes");
  const [serviceCategory, setServiceCategory] = useState<"all" | "core" | "product" | "data">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>("SVC-01");

  // Interactive states for diagnostics & manual snapshot
  const [diagState, setDiagState] = useState<"idle" | "running" | "done">("idle");
  const [pingedId, setPingedId] = useState<string | null>(null);
  const [snapshotStatus, setSnapshotStatus] = useState<"idle" | "running" | "done">("idle");

  // Live fluctuating cluster metrics
  const [clusterCpu, setClusterCpu] = useState(26.4);
  const [clusterRam, setClusterRam] = useState(38.4);
  const [apiLatency, setApiLatency] = useState(18);
  const [dbIops, setDbIops] = useState(4280);
  const [netIn, setNetIn] = useState(318);
  const [netOut, setNetOut] = useState(192);
  const [telemetryBars, setTelemetryBars] = useState(INITIAL_TELEMETRY_BARS);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const nextCpu = Number((23.5 + Math.random() * 6.8).toFixed(1));
      const nextRam = Number((38.1 + Math.random() * 1.2).toFixed(1));
      const nextLat = Math.round(16 + Math.random() * 4);
      setClusterCpu(nextCpu);
      setClusterRam(nextRam);
      setApiLatency(nextLat);
      setDbIops(Math.round(4100 + Math.random() * 420));
      setNetIn(Math.round(295 + Math.random() * 45));
      setNetOut(Math.round(175 + Math.random() * 35));

      setTelemetryBars((prev) => {
        const updated = [...prev];
        const last = { ...updated[updated.length - 1] };
        last.cpu = Math.round(nextCpu);
        last.ram = Math.round((nextRam / 96) * 100);
        last.lat = nextLat;
        updated[updated.length - 1] = last;
        return updated;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleRunDiagnostics = () => {
    if (diagState === "running") return;
    setDiagState("running");
    setTimeout(() => {
      setDiagState("done");
      setTimeout(() => setDiagState("idle"), 4000);
    }, 1100);
  };

  const handleManualSnapshot = () => {
    if (snapshotStatus === "running") return;
    setSnapshotStatus("running");
    setTimeout(() => {
      setSnapshotStatus("done");
      setTimeout(() => setSnapshotStatus("idle"), 4000);
    }, 1200);
  };

  const handlePingService = (id: string) => {
    setPingedId(id);
    setTimeout(() => setPingedId(null), 1800);
  };

  const filteredServices = INITIAL_SERVICES.filter((svc) => {
    if (regionFilter !== "all" && svc.region !== regionFilter) return false;
    if (serviceCategory !== "all" && svc.category !== serviceCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        svc.name.toLowerCase().includes(q) ||
        svc.endpoint.toLowerCase().includes(q) ||
        svc.regionLabel.toLowerCase().includes(q) ||
        svc.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="adm-content">
      {/* Dense Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Sunucu, Küme & Sistem Sağlığı</h1>
            <span
              className="adm-badge adm-badge--success"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 8px" }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1a9e4b",
                  boxShadow: "0 0 6px rgba(26, 158, 75, 0.8)",
                }}
              />
              Tüm Sistemler Operasyonel • %99.98 SLA
            </span>
          </div>
          <p className="adm-header__subtitle">
            İzmir Birincil Veri Merkezi (TR-IZM-1), Frankfurt Felaket Kurtarma Kümesi (EU-FRA-1), PostgreSQL 16 HA ve 1.248 aktif lisans mikroservisi
          </p>
        </div>

        <div className="adm-header__controls" style={{ flexWrap: "wrap" }}>
          <button
            onClick={() => setIsLive((v) => !v)}
            className="adm-topbar__btn"
            style={{
              borderColor: isLive ? "rgba(26, 158, 75, 0.3)" : "var(--adm-border)",
              background: isLive ? "rgba(26, 158, 75, 0.06)" : "#ffffff",
              color: isLive ? "#1a9e4b" : "var(--adm-text-secondary)",
              fontWeight: 600,
            }}
          >
            {isLive ? <Pause size={13} /> : <Play size={13} />}
            <span>{isLive ? "Telemetri Aktif" : "Telemetri Duraklatıldı"}</span>
          </button>

          {/* Region Filter */}
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${regionFilter === "all" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setRegionFilter("all")}
            >
              Tüm Kümeler (8)
            </button>
            <button
              className={`adm-seg__btn ${regionFilter === "izmir" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setRegionFilter("izmir")}
            >
              İzmir DC (4)
            </button>
            <button
              className={`adm-seg__btn ${regionFilter === "frankfurt" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setRegionFilter("frankfurt")}
            >
              Frankfurt DC (1)
            </button>
            <button
              className={`adm-seg__btn ${regionFilter === "global" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setRegionFilter("global")}
            >
              Multi-Region (3)
            </button>
          </div>

          <button
            onClick={handleRunDiagnostics}
            className="adm-topbar__btn adm-topbar__btn--primary"
            style={{
              background: diagState === "done" ? "#1a9e4b" : undefined,
              borderColor: diagState === "done" ? "#1a9e4b" : undefined,
            }}
          >
            <RefreshCw size={13} className={diagState === "running" ? "adm-spin" : ""} />
            <span>
              {diagState === "running"
                ? "Servisler Taranıyor..."
                : diagState === "done"
                ? "18/18 Düğüm Doğrulandı ✓"
                : "Tanılama Taraması Başlat"}
            </span>
          </button>
        </div>
      </div>

      {/* 5-Column High-Density KPI Row */}
      <div className="adm-kpi-grid">
        {/* KPI 1: Global Uptime SLA */}
        <div className="adm-kpi-card" style={{ borderColor: "rgba(26, 158, 75, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Küresel Çalışma Süresi (SLA)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.12)", color: "#1a9e4b" }}>
              <ShieldCheck size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%99.98</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">0 Kesinti (90g)</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Hedef: %99.95</span>
          </div>
        </div>

        {/* KPI 2: Cluster CPU Load */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Küme İşlemci Yükü (CPU)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Cpu size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%{clusterCpu}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">64 vCPU Aktif</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Tepe: %54.2</span>
          </div>
        </div>

        {/* KPI 3: Memory & Redis Usage */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Bellek (RAM) & Önbellek</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Layers size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{clusterRam} / 96 GB</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">Redis Hit: %99.4</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Swap: 0 MB</span>
          </div>
        </div>

        {/* KPI 4: API & License Gateway Latency */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">API & Lisans Gecikmesi (p95)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Zap size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{apiLatency} ms</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">p99: {apiLatency + 14} ms</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>0.00% 5xx Hata</span>
          </div>
        </div>

        {/* KPI 5: Database & NVMe Storage IOPS */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">PostgreSQL 16 & NVMe Disk</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <Database size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{dbIops.toLocaleString("tr-TR")} IOPS</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">Replikasyon: 0.4ms</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>1.42 / 4.0 TB</span>
          </div>
        </div>
      </div>

      {/* Row 1: Real-time Hardware Telemetry + Datacenter Node Inspector */}
      <div className="adm-grid-2col">
        {/* Left: Real-Time Resource Utilization & 90-Day Uptime Bars */}
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "8px" }}>
            <span className="adm-card__title">
              <Activity size={15} color="var(--adm-primary)" />
              Canlı Küme Kaynak Tüketimi & 90 Günlük SLA Matrisi
            </span>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${chartMode === "cpu" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMode("cpu")}
              >
                CPU Yükü (%)
              </button>
              <button
                className={`adm-seg__btn ${chartMode === "ram" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMode("ram")}
              >
                Bellek RAM (%)
              </button>
              <button
                className={`adm-seg__btn ${chartMode === "latency" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMode("latency")}
              >
                API Gecikmesi (ms)
              </button>
            </div>
          </div>

          <div className="adm-card__body">
            {/* Live Network & Pod Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                padding: "8px 12px",
                background: "var(--adm-surface-2)",
                border: "1px solid var(--adm-border-subtle)",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "11px",
              }}
            >
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>Ağ Trafiği (Giriş / Çıkış)</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--adm-text)" }}>
                  ↓ {netIn} Mbps • ↑ {netOut} Mbps
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>Kubernetes Worker Pod</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#1a9e4b" }}>
                  32 / 32 Hazır (Healthy)
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>DB Bağlantı Havuzu</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#0071e3" }}>
                  92 / 500 Aktif (PgBouncer)
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>WireGuard Tüneli (İZM↔FRA)</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#9a5cf5" }}>
                  10 Gbps • Şifreli
                </div>
              </div>
            </div>

            {/* Live Bar Chart */}
            <div className="adm-chart-row" style={{ height: "120px" }}>
              {telemetryBars.map((bar, idx) => {
                const isLast = idx === telemetryBars.length - 1;
                const rawVal =
                  chartMode === "cpu" ? bar.cpu : chartMode === "ram" ? bar.ram : bar.lat;
                const pct =
                  chartMode === "latency"
                    ? Math.min(100, Math.max(18, Math.round((rawVal / 40) * 100)))
                    : Math.min(100, Math.max(18, Math.round(rawVal * 1.4)));

                return (
                  <div key={bar.t} className="adm-chart-col">
                    <div
                      className="adm-chart-bar-wrap"
                      title={`${bar.t}: CPU %${bar.cpu} | RAM %${bar.ram} | Gecikme ${bar.lat}ms`}
                    >
                      <div
                        className="adm-chart-bar"
                        style={{
                          height: `${pct}%`,
                          background: isLast
                            ? "linear-gradient(180deg, #0071e3, #1a9e4b)"
                            : chartMode === "ram"
                            ? "linear-gradient(180deg, #9a5cf5, #c084fc)"
                            : chartMode === "latency"
                            ? "linear-gradient(180deg, #1a9e4b, #34d399)"
                            : "#cbd5e1",
                        }}
                      />
                    </div>
                    <span
                      className="adm-chart-label"
                      style={{
                        fontWeight: isLast ? 700 : 500,
                        color: isLast ? "#0071e3" : "var(--adm-text-muted)",
                      }}
                    >
                      {bar.t}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 90-Day Visual Statuspage Uptime Matrix */}
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  color: "var(--adm-text-secondary)",
                }}
              >
                <span>Son 90 Günlük Kesintisiz Çalışma Geçmişi (Uptime Matrix)</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#1a9e4b" }}>
                  Ortalama: %99.988 SLA
                </span>
              </div>

              {[
                { name: "EfeOS Lisans & Kimlik Doğrulama Kümesi", sla: "%99.99", maintIdx: -1 },
                { name: "EfeERP, EfeCRM & EfePOS Bulut Uygulama Sunucuları", sla: "%99.98", maintIdx: 14 },
                { name: "PostgreSQL 16 HA Kümesi & Redis Sentinel", sla: "%100.0", maintIdx: -1 },
              ].map((tier, tIdx) => (
                <div
                  key={tIdx}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "8px",
                    background: "var(--adm-surface-2)",
                    border: "1px solid var(--adm-border-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                    <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{tier.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#1a9e4b" }}>
                      {tier.sla} Operasyonel
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "2px", height: "12px", alignItems: "stretch" }}>
                    {Array.from({ length: 42 }).map((_, bIdx) => {
                      const isMaint = bIdx === tier.maintIdx;
                      return (
                        <span
                          key={bIdx}
                          title={
                            isMaint
                              ? "Planlı gece bakımı (4 dk sıfır veri kaybı geçişi)"
                              : "Günlük durum: %100 Operasyonel"
                          }
                          style={{
                            flex: 1,
                            borderRadius: "2px",
                            background: isMaint ? "#f59e0b" : "#22c55e",
                            opacity: isMaint ? 0.95 : 0.82,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Physical & Cloud Nodes, Storage & SSL Inspector */}
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "6px" }}>
            <span className="adm-card__title">
              <Server size={15} color="#0071e3" />
              Düğümler, Disk & Sertifika
            </span>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${infraTab === "nodes" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setInfraTab("nodes")}
              >
                Düğümler (4)
              </button>
              <button
                className={`adm-seg__btn ${infraTab === "storage" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setInfraTab("storage")}
              >
                NVMe & S3
              </button>
              <button
                className={`adm-seg__btn ${infraTab === "ssl" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setInfraTab("ssl")}
              >
                SSL & Ağ
              </button>
            </div>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {infraTab === "nodes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {[
                  {
                    host: "izm-k8s-master-01",
                    spec: "İzmir Tier-3 • AMD EPYC 32C / 64GB",
                    cpu: 28,
                    ram: 42,
                    temp: "46°C",
                    badge: "Birincil",
                  },
                  {
                    host: "izm-db-nvme-01",
                    spec: "İzmir Tier-3 • PostgreSQL 16 RAID-10",
                    cpu: 24,
                    ram: 47,
                    temp: "44°C",
                    badge: "DB Master",
                  },
                  {
                    host: "fra-dr-failover-01",
                    spec: "Frankfurt EU-1 • Hot-Standby Replica",
                    cpu: 15,
                    ram: 31,
                    temp: "41°C",
                    badge: "Yedek Küme",
                  },
                  {
                    host: "global-edge-gateway",
                    spec: "Anycast CDN • HTTP/3 + WAF Koruması",
                    cpu: 18,
                    ram: 26,
                    temp: "Edge",
                    badge: "32 PoP",
                  },
                ].map((node, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "9px 11px",
                      borderRadius: "8px",
                      background: "var(--adm-surface-2)",
                      border: "1px solid var(--adm-border-subtle)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "var(--adm-text)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            background: "#1a9e4b",
                          }}
                        />
                        {node.host}
                      </span>
                      <span className="adm-badge adm-badge--info">{node.badge}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>{node.spec}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        color: "var(--adm-text-secondary)",
                      }}
                    >
                      <span>CPU: %{node.cpu}</span>
                      <span>RAM: %{node.ram}</span>
                      <span>Sıcaklık: {node.temp}</span>
                    </div>
                    <div className="adm-progress">
                      <div
                        className="adm-progress__fill"
                        style={{ width: `${node.cpu}%`, background: "#0071e3" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {infraTab === "storage" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px" }}>
                {[
                  {
                    vol: "İzmir Birincil NVMe RAID-10 (Veritabanı)",
                    used: "1.42 TB / 4.00 TB",
                    pct: 35.5,
                    meta: "Okuma: 6.4 GB/sn • Yazma: 5.1 GB/sn • 0 Bad Sector",
                    col: "#0071e3",
                  },
                  {
                    vol: "Frankfurt S3 Şifreli Yedekleme Havuzu",
                    used: "2.85 TB / 10.0 TB",
                    pct: 28.5,
                    meta: "AES-256-GCM • 90 Günlük Versiyonlu Saklama",
                    col: "#1a9e4b",
                  },
                  {
                    vol: "Docker / K8s Container & Log Disk Alanı",
                    used: "340 GB / 1.00 TB",
                    pct: 34.0,
                    meta: "Otomatik Log Rotasyonu: 30 Gün",
                    col: "#9a5cf5",
                  },
                  {
                    vol: "3D Model, Kurumsal Doküman & Medya CDN",
                    used: "185 GB / 1.00 TB",
                    pct: 18.5,
                    meta: "Brotli + Draco Sıkıştırma Aktif",
                    col: "#f59e0b",
                  },
                ].map((st, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 600 }}>{st.vol}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px" }}>
                        {st.used} (%{st.pct})
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>{st.meta}</div>
                    <div className="adm-progress">
                      <div className="adm-progress__fill" style={{ width: `${st.pct}%`, background: st.col }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {infraTab === "ssl" && (
              <div className="adm-status-list">
                <div className="adm-status-item">
                  <div className="adm-status-item__left">
                    <span className="adm-status-item__dot" />
                    <span>*.efesoft.com.tr (TLS 1.3 Wildcard)</span>
                  </div>
                  <span className="adm-status-item__val">284 Gün • Otomatik</span>
                </div>

                <div className="adm-status-item">
                  <div className="adm-status-item__left">
                    <span className="adm-status-item__dot" />
                    <span>*.efeerp.com Kurumsal mTLS</span>
                  </div>
                  <span className="adm-status-item__val">ECDSA P-384 • Aktif</span>
                </div>

                <div className="adm-status-item">
                  <div className="adm-status-item__left">
                    <span className="adm-status-item__dot" />
                    <span>DNSSEC & Anycast Route53</span>
                  </div>
                  <span className="adm-status-item__val">4ms Çözümleme</span>
                </div>

                <div className="adm-status-item">
                  <div className="adm-status-item__left">
                    <span className="adm-status-item__dot" />
                    <span>L3/L4/L7 DDoS Kalkanı</span>
                  </div>
                  <span className="adm-status-item__val">Her Zaman Açık</span>
                </div>

                <div className="adm-status-item">
                  <div className="adm-status-item__left">
                    <span className="adm-status-item__dot" />
                    <span>HSTS & CSP Güvenlik Başlıkları</span>
                  </div>
                  <span className="adm-status-item__val">A+ Güvenlik Skoru</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Microservices, Databases & API Endpoints Table */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card__title">
              <Network size={15} color="var(--adm-primary)" />
              Mikroservisler, Veritabanı Kümeleri & API Uç Noktaları
            </span>
            <span className="adm-badge adm-badge--success">
              {filteredServices.length} / {INITIAL_SERVICES.length} Servis Sağlıklı
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Servis, port veya uç nokta ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  height: "28px",
                  padding: "0 10px 0 28px",
                  borderRadius: "6px",
                  border: "1px solid var(--adm-border)",
                  background: "var(--adm-surface-2)",
                  fontSize: "11.5px",
                  color: "var(--adm-text)",
                  outline: "none",
                  width: "215px",
                }}
              />
            </div>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${serviceCategory === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setServiceCategory("all")}
              >
                Tümü (8)
              </button>
              <button
                className={`adm-seg__btn ${serviceCategory === "core" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setServiceCategory("core")}
              >
                Altyapı & Lisans (3)
              </button>
              <button
                className={`adm-seg__btn ${serviceCategory === "product" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setServiceCategory("product")}
              >
                Ürün Kümeleri (3)
              </button>
              <button
                className={`adm-seg__btn ${serviceCategory === "data" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setServiceCategory("data")}
              >
                Veritabanı & Cache (2)
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Servis ID</th>
                <th>Servis / Mikroservis & Uç Nokta</th>
                <th>Veri Merkezi / Küme</th>
                <th>Sürüm & Uptime</th>
                <th>CPU & Bellek</th>
                <th>Gecikme (p95 / p99)</th>
                <th>Durum & SLA</th>
                <th style={{ textAlign: "right" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((svc) => {
                const isExpanded = expandedServiceId === svc.id;
                const isPinged = pingedId === svc.id;
                return (
                  <Fragment key={svc.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "11px",
                          color: "var(--adm-text-secondary)",
                        }}
                      >
                        {svc.id}
                      </td>

                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#1a9e4b",
                              boxShadow: "0 0 6px rgba(26, 158, 75, 0.65)",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>{svc.name}</div>
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10.5px",
                                color: "var(--adm-text-muted)",
                              }}
                            >
                              {svc.endpoint}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span style={{ fontSize: "11.5px", fontWeight: 500 }}>{svc.regionLabel}</span>
                      </td>

                      <td>
                        <div style={{ fontSize: "11.5px" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{svc.version}</div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            Kesintisiz: {svc.uptime}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "110px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "11px",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>CPU %{svc.cpu}</span>
                            <span style={{ color: "var(--adm-text-muted)" }}>{svc.ram}</span>
                          </div>
                          <div className="adm-progress">
                            <div
                              className="adm-progress__fill"
                              style={{
                                width: `${svc.cpu}%`,
                                background: svc.cpu > 70 ? "#f59e0b" : "#0071e3",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px" }}>
                          <span style={{ fontWeight: 700, color: "#1a9e4b" }}>{svc.latencyP95}ms</span>
                          <span style={{ color: "var(--adm-text-muted)" }}> / {svc.latencyP99}ms</span>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                            {svc.rps} req/sn
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="adm-badge adm-badge--success">Operasyonel • {svc.sla}</span>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            className="adm-table__action-btn"
                            onClick={() => handlePingService(svc.id)}
                            style={{
                              color: isPinged ? "#1a9e4b" : undefined,
                              borderColor: isPinged ? "rgba(26, 158, 75, 0.4)" : undefined,
                            }}
                          >
                            {isPinged ? `PONG (${svc.latencyP95}ms) ✓` : "Ping Test"}
                          </button>
                          <button
                            className="adm-table__action-btn"
                            onClick={() => setExpandedServiceId(isExpanded ? null : svc.id)}
                            style={{
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            {isExpanded ? "Logu Gizle" : "Canlı Log"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr style={{ background: "#f8fafc" }}>
                        <td colSpan={8} style={{ padding: "12px 18px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              borderLeft: "3px solid var(--adm-primary)",
                              paddingLeft: "14px",
                            }}
                          >
                            {/* Top Telemetry Header */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    color: "var(--adm-text)",
                                  }}
                                >
                                  <Terminal size={13} color="var(--adm-primary)" />
                                  {svc.name} — Canlı Telemetri & Denetim Kayıtları
                                </span>
                                <span className="adm-badge adm-badge--success">Healthcheck: 200 OK</span>
                              </div>

                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "11px",
                                  color: "var(--adm-text-secondary)",
                                  background: "#ffffff",
                                  border: "1px solid var(--adm-border)",
                                  padding: "2px 8px",
                                  borderRadius: "5px",
                                }}
                              >
                                {svc.endpoint}
                              </span>
                            </div>

                            {/* 3-Card Structured Event Grid */}
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                gap: "8px",
                              }}
                            >
                              {svc.logs.map((lg, lIdx) => (
                                <div
                                  key={lIdx}
                                  style={{
                                    padding: "9px 11px",
                                    borderRadius: "8px",
                                    background: "#ffffff",
                                    border: "1px solid var(--adm-border)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      className={`adm-badge ${
                                        lg.level === "OK"
                                          ? "adm-badge--success"
                                          : lg.level === "WARN"
                                          ? "adm-badge--warning"
                                          : "adm-badge--info"
                                      }`}
                                    >
                                      {lg.level === "OK" ? "DOĞRULANDI" : lg.level === "WARN" ? "UYARI" : "SİSTEM BİLGİSİ"}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10.5px",
                                        color: "var(--adm-text-muted)",
                                      }}
                                    >
                                      Saat {lg.time}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "11.5px",
                                      color: "var(--adm-text)",
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {lg.msg}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Backups & DR, Background Job Queues & DevOps Incident Log (3 Columns) */}
      <div className="adm-grid-3col">
        {/* Col 1: Automated Database Backups & Disaster Recovery */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <HardDrive size={15} color="#0071e3" />
              Veritabanı Yedekleme & S3 Kasası
            </span>
            <button
              onClick={handleManualSnapshot}
              className="adm-table__action-btn"
              style={{
                color: snapshotStatus === "done" ? "#1a9e4b" : "var(--adm-primary)",
                fontWeight: 600,
              }}
            >
              {snapshotStatus === "running"
                ? "Yedekleniyor..."
                : snapshotStatus === "done"
                ? "Snapshot Alındı ✓"
                : "+ Şimdi Yedekle"}
            </button>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {[
              {
                title: "PostgreSQL 16 — Tam Küme Snapshot",
                meta: "Bugün 15:00 • 48.4 GB (Sıkıştırılmış)",
                target: "Frankfurt S3 + İzmir NVMe",
                hash: "SHA-256 Doğrulandı",
              },
              {
                title: "EfeOS Lisans Anahtar Kasası (KMS)",
                meta: "Bugün 15:30 • 1.8 GB (AES-256-GCM)",
                target: "Çoklu Bölge Soğuk Kasa",
                hash: "SHA-256 Doğrulandı",
              },
              {
                title: "Müşteri ERP & E-Fatura Arşiv Yedeği",
                meta: "Bugün 12:00 • 312.0 GB",
                target: "Frankfurt Object Storage",
                hash: "SHA-256 Doğrulandı",
              },
            ].map((bk, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "var(--adm-surface-2)",
                  border: "1px solid var(--adm-border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "12px", color: "var(--adm-text)" }}>
                    {bk.title}
                  </span>
                  <span className="adm-badge adm-badge--success" style={{ fontSize: "9.5px" }}>
                    {bk.hash}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{bk.meta}</div>
                <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)", fontFamily: "var(--font-mono)" }}>
                  Hedef: {bk.target}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Background Workers & Queue Pipelines */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Cpu size={15} color="#9a5cf5" />
              Arka Plan İş Kuyrukları (BullMQ)
            </span>
            <span className="adm-badge adm-badge--purple">0 Bekleyen Hata</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                q: "Teklif & CRM Bildirim Kuyruğu",
                rate: "1.420 iş/gün • 0 sırada",
                pct: 99,
                col: "#1a9e4b",
              },
              {
                q: "EfeERP E-Fatura & GİB Senkronizasyonu",
                rate: "18.900 belge/gün • 2 işleniyor",
                pct: 96,
                col: "#0071e3",
              },
              {
                q: "Lisans Telemetri & Heartbeat İşleyici",
                rate: "1.248 aktif istemci • 12ms",
                pct: 100,
                col: "#9a5cf5",
              },
              {
                q: "Otomatik Gece İndeks & Vacuum Bakımı",
                rate: "Son çalışma: 04:00 (Başarılı)",
                pct: 100,
                col: "#06b6d4",
              },
            ].map((wk, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{wk.q}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                    {wk.rate}
                  </span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${wk.pct}%`, background: wk.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: DevOps & Infrastructure Audit Stream */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Clock size={15} color="#f59e0b" />
              Altyapı & DevOps Olay Günlüğü
            </span>
            <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>Son 24 Saat</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-activity-feed">
              {[
                {
                  col: "#1a9e4b",
                  title: "Frankfurt S3 Saatlik WAL Yedeği",
                  desc: "PostgreSQL 16 artımlı veritabanı yedeği şifrelenerek doğrulandı.",
                  time: "18 dakika önce • Otomatik DR",
                },
                {
                  col: "#0071e3",
                  title: "Zero-Downtime K8s Dağıtımı (v6.4.0)",
                  desc: "EfeERP uygulama podları kesintisiz rolling-update ile güncellendi.",
                  time: "2 saat önce • CI/CD Pipeline",
                },
                {
                  col: "#9a5cf5",
                  title: "WAF Kural Seti Güncellemesi",
                  desc: "İzmir ve Frankfurt kenar güvenlik duvarı bot imzaları yenilendi.",
                  time: "5 saat önce • Güvenlik",
                },
                {
                  col: "#f59e0b",
                  title: "Otomatik Ölçekleme (HPA) Tetiklendi",
                  desc: "Sabah mesai başlangıcında EfePOS sync pod sayısı 8 -> 12'ye çıkarıldı.",
                  time: "09:05 • Kubernetes HPA",
                },
              ].map((ev, idx) => (
                <div key={idx} className="adm-activity-item">
                  <span className="adm-activity-item__dot" style={{ background: ev.col }} />
                  <div className="adm-activity-item__content">
                    <div className="adm-activity-item__text">
                      <b>{ev.title}:</b> {ev.desc}
                    </div>
                    <div className="adm-activity-item__time">{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

