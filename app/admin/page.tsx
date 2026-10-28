"use client";

import { Fragment, useState } from "react";
import {
  Download,
  Inbox,
  KeyRound,
  Rocket,
  CircleDollarSign,
  Zap,
  BarChart3,
  Target,
  PhoneCall,
  FileText,
  FolderKanban,
  Activity,
  Clock,
  Send,
} from "lucide-react";

const DASHBOARD_KPI_BY_RANGE: Record<
  string,
  { leads: string; leadsDelta: string; licenses: string; projects: string; mrr: string; sla: string }
> = {
  today: {
    leads: "14 Talep",
    leadsDelta: "+18.2%",
    licenses: "1.248 Lisans",
    projects: "18 Aktif",
    mrr: "₺64.000",
    sla: "12 Dakika",
  },
  week: {
    leads: "42 Talep",
    leadsDelta: "+24.6%",
    licenses: "1.248 Lisans",
    projects: "18 Aktif",
    mrr: "₺460.000",
    sla: "14 Dakika",
  },
  month: {
    leads: "148 Talep",
    leadsDelta: "+22.4%",
    licenses: "1.248 Lisans",
    projects: "18 Aktif",
    mrr: "₺1.840.000",
    sla: "16 Dakika",
  },
  year: {
    leads: "1.420 Talep",
    leadsDelta: "+38.5%",
    licenses: "1.248 Lisans",
    projects: "46 Teslim",
    mrr: "₺22.100.000",
    sla: "15 Dakika",
  },
};

export default function AdminDashboard() {
  const [leadFilter, setLeadFilter] = useState("all");
  const [dateRange, setDateRange] = useState("month");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>("LEAD-1082");
  const [sentIds, setSentIds] = useState<Record<string, boolean>>({});
  const currentKpi = DASHBOARD_KPI_BY_RANGE[dateRange] || DASHBOARD_KPI_BY_RANGE.month;

  // Sample real-world leads populated from website inquiries
  const leads = [
    {
      id: "LEAD-1082",
      company: "Borusan Lojistik A.Ş.",
      contact: "Kerem Arslan (IT Direktörü)",
      phone: "+90 532 890 12 44",
      email: "kerem.arslan@borusan.com.tr",
      service: "Özel Lojistik ERP & Filo API Entegrasyonu",
      budget: "₺750.000 - ₺1.200.000",
      time: "4 dk önce",
      status: "new",
      statusText: "Yeni Talep",
    },
    {
      id: "LEAD-1081",
      company: "Atlas Holding",
      contact: "Selin Yalçın (Satın Alma Md.)",
      phone: "+90 533 112 40 80",
      email: "selin@atlasholding.com",
      service: "EfeERP Kurumsal Bulut + 120 Lisans",
      budget: "₺320.000 / yıl",
      time: "28 dk önce",
      status: "new",
      statusText: "Yeni Talep",
    },
    {
      id: "LEAD-1080",
      company: "Ege Perakende Zinciri",
      contact: "Ahmet Bulut (Genel Müdür)",
      phone: "+90 542 334 91 22",
      email: "ahmet@egeperakende.com",
      service: "EfePOS 45 Mağaza Dağıtımı & Donanım",
      budget: "₺480.000",
      time: "1 saat önce",
      status: "in-progress",
      statusText: "İletişimde",
    },
    {
      id: "LEAD-1079",
      company: "Medikal Park Klinikleri",
      contact: "Dr. Zeynep Koç",
      phone: "+90 530 678 99 10",
      email: "zeynep.koc@medikalpark.com",
      service: "Tele-Tıp & Hasta Takip Mobil Uygulaması",
      budget: "₺850.000",
      time: "2 saat önce",
      status: "proposal",
      statusText: "Teklif Sunuldu",
    },
    {
      id: "LEAD-1078",
      company: "Yılmaz Lojistik",
      contact: "Murat Yılmaz (Operasyon Md.)",
      phone: "+90 535 220 18 33",
      email: "murat@yilmazlojistik.com",
      service: "Depo Barkod & Sayım Sistemi Entegrasyonu",
      budget: "₺190.000",
      time: "3 saat önce",
      status: "meeting",
      statusText: "Görüşme Planlandı",
    },
    {
      id: "LEAD-1077",
      company: "Nova Tekstil A.Ş.",
      contact: "Cemal Kaya (Yönetim Kurulu Üyesi)",
      phone: "+90 532 994 55 12",
      email: "cemal@novatekstil.com",
      service: "EfeCRM Satış Portalı & B2B Sipariş Ağı",
      budget: "₺260.000",
      time: "5 saat önce",
      status: "won",
      statusText: "Onaylandı",
    },
  ];

  const filteredLeads = leads.filter((item) => {
    if (leadFilter === "new") return item.status === "new";
    if (leadFilter === "active") return item.status === "in-progress" || item.status === "meeting";
    if (leadFilter === "proposal") return item.status === "proposal";
    if (leadFilter === "won") return item.status === "won";
    return true;
  });

  return (
    <div className="adm-content">
      {/* Dense Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <h1 className="adm-header__title">Yönetim Paneli & Operasyon Özeti</h1>
          <p className="adm-header__subtitle">
            27 Ekim 2026 • 8 yeni talep yanıt bekliyor • 18 devam eden özel proje • 1.248 aktif lisans
          </p>
        </div>

        <div className="adm-header__controls">
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${dateRange === "today" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDateRange("today")}
            >
              Bugün
            </button>
            <button
              className={`adm-seg__btn ${dateRange === "week" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDateRange("week")}
            >
              Bu Hafta
            </button>
            <button
              className={`adm-seg__btn ${dateRange === "month" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDateRange("month")}
            >
              Bu Ay
            </button>
            <button
              className={`adm-seg__btn ${dateRange === "year" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDateRange("year")}
            >
              2026
            </button>
          </div>

          <button className="adm-topbar__btn" title="Dışa Aktar" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Download size={13} />
            <span>Rapor (CSV/PDF)</span>
          </button>
        </div>
      </div>

      {/* 5-Column High-Density KPI Row */}
      <div key={dateRange} className="adm-kpi-grid adm-data-switch">
        {/* KPI 1 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Gelen Teklif Talepleri</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Inbox size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{currentKpi.leads}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">{currentKpi.leadsDelta}</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>8 bekleyen yanıt</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Aktif Kurumsal Lisans</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <KeyRound size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{currentKpi.licenses}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">+42 bu ay</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%99.8 SLA</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Özel Yazılım Projeleri</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Rocket size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{currentKpi.projects}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">4 Teslim Haftası</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%96 zamanında</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Tekrarlayan Ciro (MRR/ARR)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <CircleDollarSign size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{currentKpi.mrr}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">+14.8%</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>₺22.1M ARR</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ortalama Yanıt Hızı</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Zap size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{currentKpi.sla}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">Hedef: &lt;30 dk</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%99.2 SLA</span>
          </div>
        </div>
      </div>

      {/* Row 1: Revenue Trends & Lead Channels (2 Columns) */}
      <div className="adm-grid-2col">
        {/* Left: Monthly Revenue & Custom Dev Volume */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <BarChart3 size={15} color="var(--adm-primary)" />
              Aylık Gelir & Teklif Performansı
            </span>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "var(--adm-text-muted)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#0071e3" }} />
                Özel Yazılım
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#9a5cf5" }} />
                Hazır Ürün Lisansları
              </span>
            </div>
          </div>

          <div className="adm-card__body">
            {/* Compact Bar Chart representation */}
            <div key={dateRange} className="adm-chart-row adm-data-switch">
              {[
                { m: "Oca", v1: 45, v2: 25 },
                { m: "Şub", v1: 52, v2: 30 },
                { m: "Mar", v1: 60, v2: 35 },
                { m: "Nis", v1: 58, v2: 42 },
                { m: "May", v1: 72, v2: 48 },
                { m: "Haz", v1: 80, v2: 52 },
                { m: "Tem", v1: 75, v2: 56 },
                { m: "Ağu", v1: 88, v2: 60 },
                { m: "Eyl", v1: 94, v2: 66 },
                { m: "Eki", v1: 100, v2: 74 },
              ].map((item, idx) => (
                <div key={idx} className="adm-chart-col">
                  <div className="adm-chart-bar-wrap" title={`${item.m}: ₺${item.v1 * 12 + item.v2 * 10}K`}>
                    <div
                      className="adm-chart-bar"
                      style={{
                        height: `${item.v1 * 0.7 + item.v2 * 0.4}%`,
                        background: idx === 9 ? "linear-gradient(180deg, #0071e3, #5e5ce6)" : "#cbd5e1",
                      }}
                    />
                  </div>
                  <span className="adm-chart-label" style={{ fontWeight: idx === 9 ? 700 : 500 }}>
                    {item.m}
                  </span>
                </div>
              ))}
            </div>

            {/* Product Revenue Breakdown */}
            <div className="adm-product-breakdown" style={{ marginTop: "14px" }}>
              <div className="adm-product-row">
                <div className="adm-product-row__info">
                  <span className="adm-product-row__name">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0071e3" }} />
                    Özel Kurumsal Yazılım Projeleri
                  </span>
                  <span className="adm-product-row__val">₺920.000 (%50.0)</span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: "50%", background: "#0071e3" }} />
                </div>
              </div>

              <div className="adm-product-row">
                <div className="adm-product-row__info">
                  <span className="adm-product-row__name">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff2d55" }} />
                    EfeERP Enterprise Bulut Lisansları
                  </span>
                  <span className="adm-product-row__val">₺480.000 (%26.1)</span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: "26.1%", background: "#ff2d55" }} />
                </div>
              </div>

              <div className="adm-product-row">
                <div className="adm-product-row__info">
                  <span className="adm-product-row__name">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#af52de" }} />
                    EfeCRM & Müşteri Deneyimi Paketi
                  </span>
                  <span className="adm-product-row__val">₺260.000 (%14.1)</span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: "14.1%", background: "#af52de" }} />
                </div>
              </div>

              <div className="adm-product-row">
                <div className="adm-product-row__info">
                  <span className="adm-product-row__name">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#30d158" }} />
                    EfePOS Perakende & Donanım Entegrasyonu
                  </span>
                  <span className="adm-product-row__val">₺180.000 (%9.8)</span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: "9.8%", background: "#30d158" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Lead Conversion Funnel & Sources */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <Target size={15} color="#1a9e4b" />
              Ziyaretçi & Teklif Dönüşümü
            </span>
            <span className="adm-badge adm-badge--success">%4.6 Dönüşüm</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "var(--adm-surface-2)", borderRadius: "8px", padding: "10px 12px", border: "1px solid var(--adm-border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--adm-text-muted)" }}>
                <span>Toplam Tekil Ziyaretçi</span>
                <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>34.820 kişi</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--adm-text-muted)", marginTop: "4px" }}>
                <span>Forma Ulaşan Kullanıcı</span>
                <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>3.180 kişi (%9.1)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--adm-text-muted)", marginTop: "4px" }}>
                <span>Oluşturulan Görüşme Talebi</span>
                <span style={{ fontWeight: 600, color: "#1a9e4b" }}>148 Talep (%4.6)</span>
              </div>
            </div>

            <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
              Müşteri Edinme Kanalları
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Google Arama & SEO</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>%38 • 56 Talep</span>
              </div>
              <div className="adm-progress">
                <div className="adm-progress__fill" style={{ width: "38%", background: "#0071e3" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Müşteri Tavsiyesi & Referans</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>%28 • 41 Talep</span>
              </div>
              <div className="adm-progress">
                <div className="adm-progress__fill" style={{ width: "28%", background: "#1a9e4b" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Doğrudan Marka Araması</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>%22 • 33 Talep</span>
              </div>
              <div className="adm-progress">
                <div className="adm-progress__fill" style={{ width: "22%", background: "#9a5cf5" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>LinkedIn B2B İletişim</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>%12 • 18 Talep</span>
              </div>
              <div className="adm-progress">
                <div className="adm-progress__fill" style={{ width: "12%", background: "#f59e0b" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Comprehensive Live Inquiries & Lead Management Table */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <Inbox size={15} color="var(--adm-primary)" />
              Gelen Teklif Talepleri & Müşteri Görüşmeleri
            </span>
            <span className="adm-badge adm-badge--info">Toplam: 148</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${leadFilter === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setLeadFilter("all")}
              >
                Tümü (148)
              </button>
              <button
                className={`adm-seg__btn ${leadFilter === "new" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setLeadFilter("new")}
              >
                Yeni (8)
              </button>
              <button
                className={`adm-seg__btn ${leadFilter === "active" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setLeadFilter("active")}
              >
                Görüşülen (14)
              </button>
              <button
                className={`adm-seg__btn ${leadFilter === "proposal" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setLeadFilter("proposal")}
              >
                Teklif Sunulan (12)
              </button>
              <button
                className={`adm-seg__btn ${leadFilter === "won" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setLeadFilter("won")}
              >
                Onaylanan (6)
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Talep ID</th>
                <th>Müşteri / Kurum</th>
                <th>İletişim Bilgileri</th>
                <th>Talep Edilen Çözüm</th>
                <th>Bütçe Aralığı</th>
                <th>Zaman</th>
                <th>Durum</th>
                <th style={{ textAlign: "right" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody key={leadFilter} className="adm-data-switch">
              {filteredLeads.map((item) => {
                const isExpanded = expandedLeadId === item.id;
                const isSent = sentIds[item.id];
                return (
                  <Fragment key={item.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                        {item.id}
                      </td>
                      <td>
                        <div className="adm-table__client">
                          <div className="adm-table__client-avatar">
                            {item.company.charAt(0)}
                          </div>
                          <div className="adm-table__client-meta">
                            <div className="adm-table__client-name">{item.company}</div>
                            <div className="adm-table__client-sub">{item.contact}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: "11.5px" }}>
                          <div>{item.email}</div>
                          <div style={{ color: "var(--adm-text-muted)", fontFamily: "var(--font-mono)" }}>{item.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 500 }}>{item.service}</span>
                      </td>
                      <td>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{item.budget}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>{item.time}</span>
                      </td>
                      <td>
                        <span
                          className={`adm-badge ${
                            item.status === "new"
                              ? "adm-badge--info"
                              : item.status === "won"
                              ? "adm-badge--success"
                              : item.status === "proposal"
                              ? "adm-badge--purple"
                              : "adm-badge--warning"
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                          <a
                            href={`tel:${item.phone}`}
                            className="adm-table__action-btn"
                            title="İletişime Geç"
                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <PhoneCall size={12} />
                            Ara
                          </a>
                          <button
                            type="button"
                            onClick={() => setExpandedLeadId(isExpanded ? null : item.id)}
                            className="adm-table__action-btn"
                            title="Teklif Hazırla"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            <FileText size={12} />
                            {isExpanded ? "Kapat" : "Teklif"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}>
                      <td colSpan={8} className="adm-expand-cell">
                        <div className="adm-expand-grid">
                          <div className="adm-expand-inner">
                            <div
                              className="adm-expand-body"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "14px",
                                flexWrap: "wrap",
                                borderLeft: "3px solid var(--adm-primary)",
                              }}
                            >
                              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                  Hızlı Teklif & Kapsam Özeti — {item.company} ({item.id})
                                </span>
                                <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>
                                  Talep Edilen Çözüm: <b>{item.service}</b> • Tahmini Bütçe: <b>{item.budget}</b> • Yetkili: {item.contact}
                                </span>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <button
                                  type="button"
                                  onClick={() => setSentIds((prev) => ({ ...prev, [item.id]: true }))}
                                  className="adm-topbar__btn adm-topbar__btn--primary"
                                  style={{
                                    background: isSent ? "#1a9e4b" : undefined,
                                    borderColor: isSent ? "#1a9e4b" : undefined,
                                  }}
                                >
                                  <Send size={12} />
                                  <span>{isSent ? "Kurumsal Teklif PDF Gönderildi ✓" : "Hızlı Kurumsal Teklif Gönder"}</span>
                                </button>
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

      {/* Row 3: Ongoing Projects, Server Diagnostics & Live Activity Stream (3 Columns) */}
      <div className="adm-grid-3col">
        {/* Col 1: Active Custom Software Projects */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <FolderKanban size={15} color="#9a5cf5" />
              Devam Eden Özel Projeler (18)
            </span>
            <span style={{ fontSize: "11px", color: "var(--adm-primary)", cursor: "pointer", fontWeight: 600 }}>
              Tümünü Gör →
            </span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { name: "Borusan Lojistik — Akıllı Filo API", prog: 85, sprint: "Sprint 4", date: "3 Gün Kaldı", state: "normal" },
              { name: "Akdeniz Finans — Açık Bankacılık", prog: 68, sprint: "Sprint 2", date: "12 Gün Kaldı", state: "normal" },
              { name: "Tekstil Global — B2B Bayi Sipariş Ağı", prog: 94, sprint: "QA Test", date: "Yarın Teslim", state: "urgent" },
              { name: "Medikal Park — Hasta Takip Mobil", prog: 45, sprint: "Sprint 1", date: "3 Hafta Kaldı", state: "normal" },
            ].map((proj, idx) => (
              <div key={idx} style={{ padding: "8px 10px", borderRadius: "8px", background: "var(--adm-surface-2)", border: "1px solid var(--adm-border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "12px", color: "var(--adm-text)" }}>{proj.name}</span>
                  <span
                    className={`adm-badge ${proj.state === "urgent" ? "adm-badge--warning" : "adm-badge--info"}`}
                    style={{ fontSize: "10px" }}
                  >
                    {proj.date}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--adm-text-muted)", marginTop: "4px" }}>
                  <span>{proj.sprint}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>%{proj.prog}</span>
                </div>
                <div className="adm-progress" style={{ marginTop: "4px" }}>
                  <div
                    className="adm-progress__fill"
                    style={{
                      width: `${proj.prog}%`,
                      background: proj.prog > 90 ? "#1a9e4b" : "#0071e3",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Server & Infrastructure Status */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <Activity size={15} color="#0071e3" />
              Canlı Sunucu & Altyapı
            </span>
            <span className="adm-badge adm-badge--success">%99.98 Uptime</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-status-list">
              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>İzmir Web Gateway (Nginx)</span>
                </div>
                <span className="adm-status-item__val">18ms • 0 Hata</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Frankfurt DB (PostgreSQL 16)</span>
                </div>
                <span className="adm-status-item__val">%24 CPU • %42 RAM</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>3D Model & WebGL CDN</span>
                </div>
                <span className="adm-status-item__val">Global Edge • 99.98%</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Lisans Doğrulama Microservice</span>
                </div>
                <span className="adm-status-item__val">1.248 Bağlantı Aktif</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>SSL Güvenlik Sertifikası</span>
                </div>
                <span className="adm-status-item__val">284 Gün Geçerli</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Live Realtime Audit & Operation Stream */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <Clock size={15} color="#f59e0b" />
              Canlı Operasyon Akışı
            </span>
            <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>Gerçek Zamanlı</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-activity-feed">
              <div className="adm-activity-item">
                <span className="adm-activity-item__dot" style={{ background: "#0071e3" }} />
                <div className="adm-activity-item__content">
                  <div className="adm-activity-item__text">
                    <b>Borusan Lojistik</b> web sitesi formundan yeni teklif talebi gönderdi.
                  </div>
                  <div className="adm-activity-item__time">4 dakika önce • Web Formu</div>
                </div>
              </div>

              <div className="adm-activity-item">
                <span className="adm-activity-item__dot" style={{ background: "#1a9e4b" }} />
                <div className="adm-activity-item__content">
                  <div className="adm-activity-item__text">
                    <b>Atlas Holding</b> 50 adet ek lisans anahtarı başarıyla aktif etti.
                  </div>
                  <div className="adm-activity-item__time">28 dakika önce • Otomatik Lisanslama</div>
                </div>
              </div>

              <div className="adm-activity-item">
                <span className="adm-activity-item__dot" style={{ background: "#9a5cf5" }} />
                <div className="adm-activity-item__content">
                  <div className="adm-activity-item__text">
                    <b>EfePOS v2.1.4</b> güncellemesi 45 perakende mağazasına dağıtıldı.
                  </div>
                  <div className="adm-activity-item__time">1 saat önce • OTA Dağıtımı</div>
                </div>
              </div>

              <div className="adm-activity-item">
                <span className="adm-activity-item__dot" style={{ background: "#f59e0b" }} />
                <div className="adm-activity-item__content">
                  <div className="adm-activity-item__text">
                    Frankfurt kümesi günlük veritabanı yedeği S3 deposuna yazıldı.
                  </div>
                  <div className="adm-activity-item__time">2 saat önce • Sistem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
