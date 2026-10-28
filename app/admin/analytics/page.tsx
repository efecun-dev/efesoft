"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  Download,
  Eye,
  Filter,
  Globe,
  Laptop,
  Layers,
  MapPin,
  MousePointerClick,
  Pause,
  Play,
  Radio,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

interface VisitorSession {
  id: string;
  ip: string;
  org: string;
  isCorporate: boolean;
  city: string;
  country: string;
  deviceType: "mobile" | "desktop";
  deviceLabel: string;
  browser: string;
  currentSection: string;
  sectionBadge: "info" | "purple" | "success" | "warning";
  lastAction: string;
  source: string;
  duration: string;
  pageCount: number;
  intentScore: number;
  status: "active" | "form" | "idle";
  journey: { time: string; page: string; event: string }[];
}

const INITIAL_SESSIONS: VisitorSession[] = [
  {
    id: "SES-9488",
    ip: "195.175.44.18",
    org: "KoçSistem Bilgi ve İletişim A.Ş.",
    isCorporate: true,
    city: "İstanbul (Üsküdar)",
    country: "TR",
    deviceType: "desktop",
    deviceLabel: "MacBook Pro M3 Max",
    browser: "Safari 18.2 (macOS)",
    currentSection: "/#iletisim • Teklif Formu",
    sectionBadge: "success",
    lastAction: "Özel ERP projesi için bütçe aralığı seçiyor",
    source: "Google (\"kurumsal özel erp yazılımı\")",
    duration: "06dk 14sn",
    pageCount: 5,
    intentScore: 96,
    status: "form",
    journey: [
      { time: "15:25:10", page: "/ (Ana Sayfa)", event: "Google organik aramadan giriş yaptı" },
      { time: "15:26:04", page: "/#hizmetler", event: "Kurumsal Mimari & AI Bento kartlarını inceledi" },
      { time: "15:27:42", page: "/#urunler", event: "EfeERP 3D sahnesini ve modülleri görüntüledi" },
      { time: "15:29:18", page: "/#lisanslama", event: "Kurumsal kaynak kodu devri opsiyonunu inceledi" },
      { time: "15:30:55", page: "/#iletisim", event: "Teklif formunu açtı (Şirket & E-posta girildi)" },
    ],
  },
  {
    id: "SES-9487",
    ip: "212.156.88.104",
    org: "SOCAR Türkiye Enerji A.Ş.",
    isCorporate: true,
    city: "İzmir (Aliağa)",
    country: "TR",
    deviceType: "mobile",
    deviceLabel: "iPhone 16 Pro Max",
    browser: "iOS 26.1 Safari (WebKit)",
    currentSection: "/#urunler • EfeERP 3D Sahnesi",
    sectionBadge: "info",
    lastAction: "EfeERP 3D modelini döndürdü & teknik özellikleri açtı",
    source: "LinkedIn B2B Kampanyası",
    duration: "04dk 38sn",
    pageCount: 4,
    intentScore: 89,
    status: "active",
    journey: [
      { time: "15:27:02", page: "/ (Ana Sayfa)", event: "LinkedIn sponsorlu bağlantıdan giriş yaptı" },
      { time: "15:28:15", page: "/#urunler", event: "EfeERP ve EfeCRM sekmeleri arasında geçiş yaptı" },
      { time: "15:30:10", page: "/#mimari", event: "PostgreSQL & Mikroservis mimarisi sekmesini okudu" },
      { time: "15:31:12", page: "/#urunler", event: "Canlı Demo İste butonunun üzerine geldi" },
    ],
  },
  {
    id: "SES-9486",
    ip: "176.235.19.72",
    org: "Bireysel Ziyaretçi (Turkcell Superonline)",
    isCorporate: false,
    city: "İstanbul (Kadıköy)",
    country: "TR",
    deviceType: "mobile",
    deviceLabel: "iPhone 15 Pro",
    browser: "iOS Safari (WebKit)",
    currentSection: "/ • 3D Hero & Navbar",
    sectionBadge: "purple",
    lastAction: "Hero 3D sahnesini ve hız göstergelerini inceliyor",
    source: "Doğrudan Giriş (efesoft.com.tr)",
    duration: "01dk 52sn",
    pageCount: 2,
    intentScore: 62,
    status: "active",
    journey: [
      { time: "15:29:48", page: "/ (Ana Sayfa)", event: "Doğrudan URL yazarak siteye giriş yaptı" },
      { time: "15:30:40", page: "/#hizmetler", event: "Mobil Uygulama & Web Geliştirme kartını okudu" },
    ],
  },
  {
    id: "SES-9485",
    ip: "85.29.114.209",
    org: "Garanti BBVA Teknoloji (Kurumsal Ağ)",
    isCorporate: true,
    city: "İstanbul (Pendik)",
    country: "TR",
    deviceType: "desktop",
    deviceLabel: "Windows 11 İş İstasyonu",
    browser: "Chrome 131.0 (Masaüstü)",
    currentSection: "/#mimari • Sistem Mimarisi",
    sectionBadge: "info",
    lastAction: "Güvenlik, SLA ve Kubernetes küme mimarisini inceliyor",
    source: "Google (\"yüksek erişilebilirlik kurumsal yazılım\")",
    duration: "05dk 19sn",
    pageCount: 4,
    intentScore: 84,
    status: "active",
    journey: [
      { time: "15:26:12", page: "/ (Ana Sayfa)", event: "Google organik aramadan giriş yaptı" },
      { time: "15:27:30", page: "/#mimari", event: "Backend & Cloud Native kod bloklarını inceledi" },
      { time: "15:29:50", page: "/#surec", event: "4 Adımlı Mühendislik Süreci 3D sahnesini inceledi" },
    ],
  },
  {
    id: "SES-9484",
    ip: "91.93.120.55",
    org: "Vestel Elektronik Sanayi ve Ticaret A.Ş.",
    isCorporate: true,
    city: "Manisa (Organize Sanayi)",
    country: "TR",
    deviceType: "desktop",
    deviceLabel: "Dell Precision • Windows 11",
    browser: "Edge 131.0 (Chromium)",
    currentSection: "/#iletisim • Teklif Formu",
    sectionBadge: "success",
    lastAction: "Navbar \"Teklif Al\" butonuna tıkladı, telefon numarası giriyor",
    source: "Müşteri Referansı (B2B)",
    duration: "07dk 45sn",
    pageCount: 6,
    intentScore: 94,
    status: "form",
    journey: [
      { time: "15:23:55", page: "/ (Ana Sayfa)", event: "Referans bağlantısından giriş yaptı" },
      { time: "15:25:10", page: "/#urunler", event: "EfePOS ve EfeERP entegrasyon detaylarını okudu" },
      { time: "15:28:40", page: "/#iletisim", event: "Navbar'daki \"Teklif Al\" butonuna tıkladı" },
    ],
  },
  {
    id: "SES-9483",
    ip: "145.253.80.14",
    org: "Deka Logistik GmbH",
    isCorporate: true,
    city: "Frankfurt am Main",
    country: "DE",
    deviceType: "desktop",
    deviceLabel: "MacBook Air M2",
    browser: "Chrome 131.0 (macOS)",
    currentSection: "/#surec • Mühendislik Süreci",
    sectionBadge: "purple",
    lastAction: "Sprint ve CI/CD teslimat süreci adımlarını inceliyor",
    source: "LinkedIn Kurumsal Profil",
    duration: "03dk 12sn",
    pageCount: 3,
    intentScore: 76,
    status: "active",
    journey: [
      { time: "15:28:20", page: "/ (Ana Sayfa)", event: "LinkedIn şirket sayfasından giriş yaptı" },
      { time: "15:29:45", page: "/#surec", event: "3D İş İstasyonu adımlarını kaydırarak inceledi" },
    ],
  },
  {
    id: "SES-9482",
    ip: "78.188.64.211",
    org: "Ege Seramik Sanayi ve Ticaret A.Ş.",
    isCorporate: true,
    city: "İzmir (Kemalpaşa)",
    country: "TR",
    deviceType: "mobile",
    deviceLabel: "iPhone 16",
    browser: "iOS 26 Safari (WebKit)",
    currentSection: "/#iletisim • Teklif Formu",
    sectionBadge: "success",
    lastAction: "EfeCRM + Bayi Portalı için mesaj yazıyor",
    source: "Google Ads (\"izmir kurumsal yazılım firması\")",
    duration: "04dk 05sn",
    pageCount: 4,
    intentScore: 91,
    status: "form",
    journey: [
      { time: "15:27:30", page: "/ (Ana Sayfa)", event: "Google Ads B2B kampanyasından giriş yaptı" },
      { time: "15:28:55", page: "/#urunler", event: "EfeCRM 3D kartını ve özelliklerini inceledi" },
      { time: "15:30:22", page: "/#iletisim", event: "İletişim formuna odaklandı" },
    ],
  },
  {
    id: "SES-9481",
    ip: "88.241.15.93",
    org: "Bireysel Ziyaretçi (Türk Telekom Fiber)",
    isCorporate: false,
    city: "Ankara (Çankaya)",
    country: "TR",
    deviceType: "mobile",
    deviceLabel: "Samsung Galaxy S24 Ultra",
    browser: "Android Chrome 131",
    currentSection: "/#hizmetler • Bento Hizmetler",
    sectionBadge: "warning",
    lastAction: "Yapay Zeka & Otomasyon kartında 45 saniyedir bekliyor",
    source: "Google (\"yapay zeka entegrasyonu yazılım\")",
    duration: "02dk 28sn",
    pageCount: 2,
    intentScore: 54,
    status: "idle",
    journey: [
      { time: "15:29:10", page: "/ (Ana Sayfa)", event: "Google aramadan giriş yaptı" },
      { time: "15:30:05", page: "/#hizmetler", event: "AI Otomasyon Bento kartını görüntüledi" },
    ],
  },
];

const INITIAL_MINUTE_BARS = [
  { t: "24dk", total: 26, mobile: 16, conv: 1 },
  { t: "22dk", total: 29, mobile: 18, conv: 1 },
  { t: "20dk", total: 28, mobile: 17, conv: 0 },
  { t: "18dk", total: 33, mobile: 20, conv: 2 },
  { t: "16dk", total: 35, mobile: 22, conv: 1 },
  { t: "14dk", total: 31, mobile: 19, conv: 1 },
  { t: "12dk", total: 36, mobile: 23, conv: 2 },
  { t: "10dk", total: 39, mobile: 25, conv: 2 },
  { t: "8dk", total: 38, mobile: 24, conv: 1 },
  { t: "6dk", total: 41, mobile: 26, conv: 2 },
  { t: "4dk", total: 44, mobile: 28, conv: 3 },
  { t: "2dk", total: 40, mobile: 25, conv: 2 },
  { t: "Şimdi", total: 42, mobile: 27, conv: 3 },
];

export default function AdminLiveTrafficPage() {
  const [isLive, setIsLive] = useState(true);
  const [timeRange, setTimeRange] = useState<"live" | "today" | "week" | "month">("live");
  const [chartMetric, setChartMetric] = useState<"visitors" | "mobile" | "funnel">("visitors");
  const [dimensionTab, setDimensionTab] = useState<"geo" | "device" | "source">("geo");
  const [sessionFilter, setSessionFilter] = useState<"all" | "corporate" | "form" | "mobile" | "high">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>("SES-9488");

  // Live telemetry state
  const [activeVisitors, setActiveVisitors] = useState(42);
  const [activeMobile, setActiveMobile] = useState(27);
  const [rps, setRps] = useState(124);
  const [bandwidth, setBandwidth] = useState(46.8);
  const [minuteBars, setMinuteBars] = useState(INITIAL_MINUTE_BARS);

  // Simulate subtle real-time WebSocket pulse when isLive is true
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setActiveVisitors((prev) => {
        const delta = Math.random() > 0.48 ? 1 : -1;
        const next = Math.max(38, Math.min(49, prev + delta));
        setActiveMobile(Math.round(next * 0.64));
        setMinuteBars((bars) => {
          const updated = [...bars];
          const last = { ...updated[updated.length - 1] };
          last.total = next;
          last.mobile = Math.round(next * 0.64);
          updated[updated.length - 1] = last;
          return updated;
        });
        return next;
      });
      setRps(Math.round(115 + Math.random() * 26));
      setBandwidth(Number((42 + Math.random() * 9.5).toFixed(1)));
    }, 3200);

    return () => clearInterval(interval);
  }, [isLive]);

  const periodStats = {
    live: { unique: "318 Kişi", views: "1.140", duration: "03dk 48sn", bounce: "%22.4", leads: "3 Teklif" },
    today: { unique: "1.482 Kişi", views: "4.910", duration: "03dk 42sn", bounce: "%23.8", leads: "8 Teklif" },
    week: { unique: "9.640 Kişi", views: "31.850", duration: "03dk 29sn", bounce: "%25.1", leads: "46 Teklif" },
    month: { unique: "34.820 Kişi", views: "112.400", duration: "03dk 36sn", bounce: "%24.6", leads: "148 Teklif" },
  }[timeRange];

  const filteredSessions = INITIAL_SESSIONS.filter((s) => {
    if (sessionFilter === "corporate" && !s.isCorporate) return false;
    if (sessionFilter === "form" && s.status !== "form") return false;
    if (sessionFilter === "mobile" && s.deviceType !== "mobile") return false;
    if (sessionFilter === "high" && s.intentScore < 85) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        s.org.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.ip.toLowerCase().includes(q) ||
        s.currentSection.toLowerCase().includes(q) ||
        s.deviceLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeDesktop = activeVisitors - activeMobile;

  return (
    <div className="adm-content">
      {/* Dense Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Canlı Trafik & Ziyaretçi Telemetrisi</h1>
            <span
              className={`adm-badge ${isLive ? "adm-badge--success" : "adm-badge--neutral"}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 8px" }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: isLive ? "#1a9e4b" : "#8c93a3",
                  boxShadow: isLive ? "0 0 6px rgba(26, 158, 75, 0.8)" : "none",
                }}
              />
              {isLive ? "WebSocket Canlı Akış (18ms)" : "Akış Duraklatıldı"}
            </span>
          </div>
          <p className="adm-header__subtitle">
            Gerçek zamanlı oturum izleme, Reverse-IP kurumsal şirket tespiti, 3D WebGL etkileşim metrikleri ve dönüşüm hunisi
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
            <span>{isLive ? "Canlı Akışı Duraklat" : "Canlı Akışı Başlat"}</span>
          </button>

          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${timeRange === "live" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTimeRange("live")}
            >
              Son 30 Dk
            </button>
            <button
              className={`adm-seg__btn ${timeRange === "today" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTimeRange("today")}
            >
              Bugün
            </button>
            <button
              className={`adm-seg__btn ${timeRange === "week" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTimeRange("week")}
            >
              7 Gün
            </button>
            <button
              className={`adm-seg__btn ${timeRange === "month" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTimeRange("month")}
            >
              30 Gün
            </button>
          </div>

          <button className="adm-topbar__btn" title="Trafik Raporunu İndir">
            <Download size={13} />
            <span>Log İndir (CSV)</span>
          </button>
        </div>
      </div>

      {/* 5-Column High-Density KPI Row */}
      <div key={timeRange} className="adm-kpi-grid adm-data-switch">
        {/* KPI 1: Active Visitors Right Now */}
        <div className="adm-kpi-card" style={{ borderColor: "rgba(26, 158, 75, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Şu Anda Sitede (Canlı)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.12)", color: "#1a9e4b" }}>
              <Radio size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val" style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span>{activeVisitors} Aktif</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#1a9e4b", fontFamily: "var(--font-mono)" }}>
              • CANLI
            </span>
          </div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">{activeMobile} Mobil</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>{activeDesktop} Masaüstü</span>
          </div>
        </div>

        {/* KPI 2: Unique Visitors */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Tekil Ziyaretçi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Users size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{periodStats.unique}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">+24.6%</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%68.4 yeni kullanıcı</span>
          </div>
        </div>

        {/* KPI 3: Total Pageviews & Session Duration */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Sayfa Görüntüleme</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Eye size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{periodStats.views}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">Ort. {periodStats.duration}</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>3.3 sayfa/oturum</span>
          </div>
        </div>

        {/* KPI 4: Engagement & Bounce Rate */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Hemen Çıkma (Bounce)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <MousePointerClick size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{periodStats.bounce}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">3D Etkileşim: %79.4</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Hedef &lt;%30</span>
          </div>
        </div>

        {/* KPI 5: Live Conversion & Funnel */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Canlı Teklif Hunisi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Target size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">3 Kişi Formda</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">{periodStats.leads}</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%4.8 dönüşüm</span>
          </div>
        </div>
      </div>

      {/* Row 1: Real-time Traffic Stream + Geo/Device/Source Breakdown */}
      <div className="adm-grid-2col">
        {/* Left: Real-Time Traffic Waveform & Top Active Sections */}
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "8px" }}>
            <span className="adm-card__title">
              <BarChart3 size={15} color="var(--adm-primary)" />
              Anlık Ziyaretçi Yoğunluğu & Bölüm Dağılımı
            </span>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${chartMetric === "visitors" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMetric("visitors")}
              >
                Toplam Aktif
              </button>
              <button
                className={`adm-seg__btn ${chartMetric === "mobile" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMetric("mobile")}
              >
                Mobil (iOS/Android)
              </button>
              <button
                className={`adm-seg__btn ${chartMetric === "funnel" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setChartMetric("funnel")}
              >
                Teklif Etkileşimi
              </button>
            </div>
          </div>

          <div className="adm-card__body">
            {/* Live Edge Telemetry Strip */}
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
                <div style={{ color: "var(--adm-text-muted)" }}>Anlık İstek Hızı</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--adm-text)" }}>
                  {rps} req/sn
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>Bant Genişliği</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#0071e3" }}>
                  {bandwidth} Mbps
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>Ort. Sayfa Açılış (LCP)</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#1a9e4b" }}>
                  0.78 sn (A+)
                </div>
              </div>
              <div>
                <div style={{ color: "var(--adm-text-muted)" }}>Kurumsal Ağ Oranı</div>
                <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#9a5cf5" }}>
                  %62.5 B2B IP
                </div>
              </div>
            </div>

            {/* Interactive Real-Time Bar Chart */}
            <div className="adm-chart-row" style={{ height: "126px" }}>
              {minuteBars.map((item, idx) => {
                const isLast = idx === minuteBars.length - 1;
                const val =
                  chartMetric === "visitors"
                    ? item.total
                    : chartMetric === "mobile"
                    ? item.mobile
                    : item.conv * 12;
                const pct = Math.min(100, Math.max(14, Math.round((val / 50) * 100)));

                return (
                  <div key={item.t} className="adm-chart-col">
                    <div
                      className="adm-chart-bar-wrap"
                      title={`${item.t}: ${item.total} Aktif (${item.mobile} Mobil, ${item.conv} Form Etkileşimi)`}
                    >
                      <div
                        className="adm-chart-bar"
                        style={{
                          height: `${pct}%`,
                          background: isLast
                            ? "linear-gradient(180deg, #1a9e4b, #0071e3)"
                            : chartMetric === "mobile"
                            ? "linear-gradient(180deg, #0071e3, #60a5fa)"
                            : chartMetric === "funnel"
                            ? "linear-gradient(180deg, #9a5cf5, #c084fc)"
                            : "#cbd5e1",
                        }}
                      />
                    </div>
                    <span
                      className="adm-chart-label"
                      style={{
                        fontWeight: isLast ? 700 : 500,
                        color: isLast ? "#1a9e4b" : "var(--adm-text-muted)",
                      }}
                    >
                      {item.t}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active Sections Breakdown */}
            <div style={{ marginTop: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  color: "var(--adm-text-secondary)",
                }}
              >
                <span>Şu Anda Ziyaretçilerin Bulunduğu Bölümler</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                  Toplam: {activeVisitors} Aktif Kullanıcı
                </span>
              </div>

              <div className="adm-product-breakdown">
                {[
                  {
                    path: "/ (Ana Sayfa & 3D Hero Deneyimi)",
                    active: Math.round(activeVisitors * 0.36),
                    views: "2.140 görüntüleme",
                    pct: 36,
                    color: "#0071e3",
                  },
                  {
                    path: "/#urunler (EfeERP, EfeCRM & EfePOS 3D Sahnesi)",
                    active: Math.round(activeVisitors * 0.28),
                    views: "1.390 görüntüleme",
                    pct: 28,
                    color: "#9a5cf5",
                  },
                  {
                    path: "/#iletisim (Özel Proje & Teklif Formu)",
                    active: Math.round(activeVisitors * 0.16),
                    views: "640 görüntüleme",
                    pct: 16,
                    color: "#1a9e4b",
                  },
                  {
                    path: "/#hizmetler (Kurumsal Yazılım & AI Bento)",
                    active: Math.round(activeVisitors * 0.12),
                    views: "490 görüntüleme",
                    pct: 12,
                    color: "#f59e0b",
                  },
                  {
                    path: "/#mimari & /#surec (Sistem Mimarisi & 3D İş İstasyonu)",
                    active: Math.max(1, activeVisitors - Math.round(activeVisitors * 0.92)),
                    views: "250 görüntüleme",
                    pct: 8,
                    color: "#ec4899",
                  },
                ].map((sec, i) => (
                  <div key={i} className="adm-product-row">
                    <div className="adm-product-row__info">
                      <span className="adm-product-row__name">
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: sec.color,
                          }}
                        />
                        {sec.path}
                      </span>
                      <span className="adm-product-row__val">
                        {sec.active} canlı • {sec.views} (%{sec.pct})
                      </span>
                    </div>
                    <div className="adm-progress">
                      <div
                        className="adm-progress__fill"
                        style={{ width: `${sec.pct}%`, background: sec.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Multi-Dimension Breakdown (Geo, Device/OS, Acquisition) */}
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "6px" }}>
            <span className="adm-card__title">
              <Globe size={15} color="#0071e3" />
              Dağılım & Cihaz Telemetrisi
            </span>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${dimensionTab === "geo" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setDimensionTab("geo")}
              >
                Şehir/Ülke
              </button>
              <button
                className={`adm-seg__btn ${dimensionTab === "device" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setDimensionTab("device")}
              >
                Cihaz/OS
              </button>
              <button
                className={`adm-seg__btn ${dimensionTab === "source" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setDimensionTab("source")}
              >
                Kaynak
              </button>
            </div>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div key={dimensionTab} className="adm-data-switch">
              {dimensionTab === "geo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "12px" }}>
                  {[
                    { loc: "🇹🇷 İstanbul, Türkiye", share: 38, count: "16 canlı • 564 bugün", color: "#0071e3" },
                    { loc: "🇹🇷 İzmir, Türkiye", share: 26, count: "11 canlı • 385 bugün", color: "#1a9e4b" },
                    { loc: "🇹🇷 Ankara, Türkiye", share: 14, count: "6 canlı • 208 bugün", color: "#9a5cf5" },
                    { loc: "🇩🇪 Frankfurt & Münih, Almanya", share: 11, count: "5 canlı • 162 bugün", color: "#f59e0b" },
                    { loc: "🇬🇧 Londra & 🇳🇱 Amsterdam", share: 7, count: "3 canlı • 104 bugün", color: "#06b6d4" },
                    { loc: "🇹🇷 Manisa, Bursa & Kocaeli OSB", share: 4, count: "1 canlı • 59 bugün", color: "#64748b" },
                  ].map((g, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 500 }}>{g.loc}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px" }}>
                          %{g.share} • {g.count}
                        </span>
                      </div>
                      <div className="adm-progress">
                        <div className="adm-progress__fill" style={{ width: `${g.share}%`, background: g.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dimensionTab === "device" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "12px" }}>
                  {[
                    {
                      dev: "iPhone • iOS Safari (Apple WebKit)",
                      share: 48,
                      count: "20 canlı • Liquid Glass GPU",
                      color: "#0071e3",
                    },
                    {
                      dev: "macOS & Windows • Google Chrome",
                      share: 34,
                      count: "14 canlı • Masaüstü WebGL",
                      color: "#1a9e4b",
                    },
                    {
                      dev: "Android • Chrome Mobile",
                      share: 12,
                      count: "5 canlı • Mobil",
                      color: "#9a5cf5",
                    },
                    {
                      dev: "Windows 11 • Microsoft Edge",
                      share: 6,
                      count: "3 canlı • Kurumsal PC",
                      color: "#f59e0b",
                    },
                  ].map((d, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 500 }}>{d.dev}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px" }}>
                          %{d.share} ({d.count})
                        </span>
                      </div>
                      <div className="adm-progress">
                        <div className="adm-progress__fill" style={{ width: `${d.share}%`, background: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dimensionTab === "source" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "12px" }}>
                  {[
                    { src: "Google Organik Arama (SEO)", share: 41, count: "17 canlı • %5.4 dönüşüm", color: "#0071e3" },
                    { src: "Doğrudan Giriş (efesoft.com.tr)", share: 25, count: "11 canlı • Marka araması", color: "#1a9e4b" },
                    { src: "LinkedIn Kurumsal B2B Kampanya", share: 19, count: "8 canlı • %6.8 dönüşüm", color: "#9a5cf5" },
                    { src: "Google Ads (Kurumsal ERP/CRM)", share: 10, count: "4 canlı • Sponsorlu", color: "#f59e0b" },
                    { src: "Müşteri Referansı & GitHub", share: 5, count: "2 canlı • B2B", color: "#06b6d4" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 500 }}>{s.src}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px" }}>
                          %{s.share} • {s.count}
                        </span>
                      </div>
                      <div className="adm-progress">
                        <div className="adm-progress__fill" style={{ width: `${s.share}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Organic Search Keywords Box */}
            <div
              style={{
                marginTop: "4px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "var(--adm-surface-2)",
                border: "1px solid var(--adm-border-subtle)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--adm-text)",
                }}
              >
                <span>En Çok Aranan B2B Kelimeler (Google)</span>
                <span style={{ color: "var(--adm-primary)", fontFamily: "var(--font-mono)" }}>GSC Canlı</span>
              </div>

              {[
                { kw: "\"kurumsal özel yazılım firması\"", clicks: "184 tıklama", pos: "#1.2" },
                { kw: "\"efeerp bulut erp lisans fiyatları\"", clicks: "142 tıklama", pos: "#1.0" },
                { kw: "\"izmir özel yazılım ve erp entegrasyonu\"", clicks: "98 tıklama", pos: "#1.4" },
              ].map((k, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "var(--adm-text-secondary)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)" }}>{k.kw}</span>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                    {k.clicks} • <span style={{ color: "#1a9e4b" }}>Sıra {k.pos}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Live Visitor Sessions & Corporate Reverse-IP Inspector Table */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card__title">
              <Building2 size={15} color="var(--adm-primary)" />
              Canlı Ziyaretçi Oturumları & Kurumsal IP Tespiti (Reverse-IP)
            </span>
            <span className="adm-badge adm-badge--success">{filteredSessions.length} Oturum Listeleniyor</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* Search Input */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Kurum, şehir, IP veya sayfa ara..."
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
                  width: "220px",
                }}
              />
            </div>

            {/* Filter Segmented Control */}
            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${sessionFilter === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSessionFilter("all")}
              >
                Tümü ({INITIAL_SESSIONS.length})
              </button>
              <button
                className={`adm-seg__btn ${sessionFilter === "corporate" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSessionFilter("corporate")}
              >
                Kurumsal Ağ (6)
              </button>
              <button
                className={`adm-seg__btn ${sessionFilter === "form" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSessionFilter("form")}
              >
                Teklif Formunda (3)
              </button>
              <button
                className={`adm-seg__btn ${sessionFilter === "mobile" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSessionFilter("mobile")}
              >
                Mobil / iPhone (4)
              </button>
              <button
                className={`adm-seg__btn ${sessionFilter === "high" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSessionFilter("high")}
              >
                Yüksek Niyet (4)
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Oturum / IP</th>
                <th>Ziyaretçi / Tespit Edilen Kurum</th>
                <th>Konum</th>
                <th>Cihaz & Tarayıcı</th>
                <th>Aktif Bölüm & Son Etkileşim</th>
                <th>Geliş Kaynağı</th>
                <th>Süre & Niyet Skoru</th>
                <th style={{ textAlign: "right" }}>İzleme</th>
              </tr>
            </thead>
            <tbody key={sessionFilter} className="adm-data-switch">
              {filteredSessions.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                return (
                  <Fragment key={session.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background:
                                session.status === "form"
                                  ? "#1a9e4b"
                                  : session.status === "active"
                                  ? "#0071e3"
                                  : "#f59e0b",
                              boxShadow:
                                session.status === "form"
                                  ? "0 0 6px rgba(26, 158, 75, 0.7)"
                                  : "none",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                fontSize: "11px",
                                color: "var(--adm-text)",
                              }}
                            >
                              {session.id}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10.5px",
                                color: "var(--adm-text-muted)",
                              }}
                            >
                              {session.ip}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="adm-table__client">
                          <div
                            className="adm-table__client-avatar"
                            style={{
                              background: session.isCorporate
                                ? "rgba(0, 113, 227, 0.1)"
                                : "var(--adm-surface-2)",
                              color: session.isCorporate ? "#0071e3" : "var(--adm-text-secondary)",
                            }}
                          >
                            {session.org.charAt(0)}
                          </div>
                          <div className="adm-table__client-meta">
                            <div
                              className="adm-table__client-name"
                              style={{ display: "flex", alignItems: "center", gap: "5px" }}
                            >
                              <span>{session.org}</span>
                              {session.isCorporate && (
                                <span className="adm-badge adm-badge--info">
                                  B2B Kurumsal
                                </span>
                              )}
                            </div>
                            <div className="adm-table__client-sub">
                              {session.pageCount} sayfa gezdi • Reverse-IP Doğrulandı
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                          <MapPin size={12} color="var(--adm-text-muted)" />
                          <span>{session.city}</span>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: "11.5px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: 600 }}>
                            {session.deviceType === "mobile" ? (
                              <Smartphone size={12} color="#0071e3" />
                            ) : (
                              <Laptop size={12} color="#5a5f6d" />
                            )}
                            <span>{session.deviceLabel}</span>
                          </div>
                          <div style={{ color: "var(--adm-text-muted)", fontSize: "11px" }}>
                            {session.browser}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <div>
                            <span className={`adm-badge adm-badge--${session.sectionBadge}`}>
                              {session.currentSection}
                            </span>
                          </div>
                          <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                            {session.lastAction}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>
                          {session.source}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "115px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                              {session.duration}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                color:
                                  session.intentScore >= 85
                                    ? "#1a9e4b"
                                    : session.intentScore >= 70
                                    ? "#0071e3"
                                    : "#d97706",
                              }}
                            >
                              %{session.intentScore} Niyet
                            </span>
                          </div>
                          <div className="adm-progress">
                            <div
                              className="adm-progress__fill"
                              style={{
                                width: `${session.intentScore}%`,
                                background:
                                  session.intentScore >= 85
                                    ? "#1a9e4b"
                                    : session.intentScore >= 70
                                    ? "#0071e3"
                                    : "#f59e0b",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            className="adm-table__action-btn"
                            onClick={() =>
                              setExpandedSessionId(isExpanded ? null : session.id)
                            }
                            style={{
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            {isExpanded ? "Akışı Gizle" : "Yolculuğu Gör"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr
                      key={`${session.id}-journey`}
                      className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}
                    >
                      <td colSpan={8} className="adm-expand-cell">
                        <div className="adm-expand-grid">
                          <div className="adm-expand-inner">
                            <div className="adm-expand-body">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  borderLeft: "3px solid var(--adm-primary)",
                                  paddingLeft: "12px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                  }}
                                >
                                  <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                    Canlı Tıklama & Gezinme Akışı (Clickstream) — {session.org} ({session.id})
                                  </span>
                                  <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                    Cihaz: {session.deviceLabel} • {session.browser}
                                  </span>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    marginTop: "2px",
                                  }}
                                >
                                  {session.journey.map((step, sIdx) => (
                                    <div
                                      key={sIdx}
                                      style={{
                                        padding: "7px 10px",
                                        borderRadius: "7px",
                                        background: "#ffffff",
                                        border: "1px solid var(--adm-border)",
                                        fontSize: "11.5px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                        minWidth: "190px",
                                        flex: "1 1 200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          fontSize: "10.5px",
                                          fontFamily: "var(--font-mono)",
                                        }}
                                      >
                                        <span style={{ fontWeight: 700, color: "var(--adm-primary)" }}>
                                          {sIdx + 1}. {step.page}
                                        </span>
                                        <span style={{ color: "var(--adm-text-muted)" }}>{step.time}</span>
                                      </div>
                                      <div style={{ color: "var(--adm-text)" }}>{step.event}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Live Event Stream, Scroll/Click Heatmap & WAF Bot Telemetry (3 Columns) */}
      <div className="adm-grid-3col">
        {/* Col 1: Real-time Micro-Interaction Stream */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Zap size={15} color="#0071e3" />
              Canlı Mikro-Etkileşim Akışı
            </span>
            <span className="adm-badge adm-badge--info">Gerçek Zamanlı</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-activity-feed">
              {[
                {
                  color: "#1a9e4b",
                  actor: "KoçSistem (SES-9488)",
                  action: "Teklif formunda \"Özel ERP & Entegrasyon\" seçeneğini işaretledi.",
                  time: "12 saniye önce • /#iletisim",
                },
                {
                  color: "#0071e3",
                  actor: "SOCAR Türkiye (SES-9487)",
                  action: "iPhone 16 Pro Max üzerinden EfeERP 3D modelini 360° döndürdü.",
                  time: "34 saniye önce • /#urunler",
                },
                {
                  color: "#9a5cf5",
                  actor: "Vestel A.Ş. (SES-9484)",
                  action: "Liquid Glass Navbar üzerindeki \"Teklif Al\" butonuna tıkladı.",
                  time: "1 dakika önce • Navbar CTA",
                },
                {
                  color: "#f59e0b",
                  actor: "Garanti BBVA (SES-9485)",
                  action: "Teknik Derinlik bölümünde \"Cloud & Güvenlik\" sekmesini açtı.",
                  time: "2 dakika önce • /#mimari",
                },
                {
                  color: "#06b6d4",
                  actor: "Ege Seramik (SES-9482)",
                  action: "EfeCRM Kurumsal Lisans karşılaştırma tablosunu inceledi.",
                  time: "3 dakika önce • /#lisanslama",
                },
              ].map((ev, i) => (
                <div key={i} className="adm-activity-item">
                  <span className="adm-activity-item__dot" style={{ background: ev.color }} />
                  <div className="adm-activity-item__content">
                    <div className="adm-activity-item__text">
                      <b>{ev.actor}</b> {ev.action}
                    </div>
                    <div className="adm-activity-item__time">{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Scroll Depth & Top Clicked Elements Heatmap */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Layers size={15} color="#9a5cf5" />
              Sayfa Kaydırma & Tıklama Isı Haritası
            </span>
            <span className="adm-badge adm-badge--purple">Isı Analizi</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Navbar \"Teklif Al\" CTA Butonu", clicks: "412 tıklama", ctr: "%14.2 CTR", pct: 88, col: "#0071e3" },
              { label: "Hero \"Özel Proje Başlat\" Butonu", clicks: "368 tıklama", ctr: "%12.6 CTR", pct: 79, col: "#1a9e4b" },
              { label: "Ürünler — EfeERP 3D Sahne Sekmesi", clicks: "520 etkileşim", ctr: "%18.4 Oran", pct: 92, col: "#9a5cf5" },
              { label: "Sayfa %75 Kaydırma Derinliği (Süreç & Mimari)", clicks: "2.640 ziyaretçi", ctr: "%64.0 Ulaşım", pct: 64, col: "#f59e0b" },
              { label: "Sayfa %100 Sonu (İletişim Formu)", clicks: "1.980 ziyaretçi", ctr: "%48.2 Ulaşım", pct: 48, col: "#06b6d4" },
            ].map((hm, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{hm.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                    {hm.clicks} ({hm.ctr})
                  </span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${hm.pct}%`, background: hm.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: WAF Security, Bot Mitigation & Edge Telemetry */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <ShieldCheck size={15} color="#1a9e4b" />
              WAF Güvenlik & Bot Filtreleme
            </span>
            <span className="adm-badge adm-badge--success">Korumalı</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-status-list">
              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Gerçek İnsan Trafiği Oranı</span>
                </div>
                <span className="adm-status-item__val">%96.8 Doğrulanmış</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" style={{ background: "#f59e0b" }} />
                  <span>Engellenen Scraper & Bot</span>
                </div>
                <span className="adm-status-item__val">142 İstek Engellendi</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>İzmir & Frankfurt Edge CDN</span>
                </div>
                <span className="adm-status-item__val">18ms TTFB • HTTP/3</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>WebGL & iOS Metal GPU Uyum</span>
                </div>
                <span className="adm-status-item__val">%99.4 Cihaz Desteği</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>KVKK & ÇerezAnonimleştirme</span>
                </div>
                <span className="adm-status-item__val">IP Maskeleme Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
