"use client";

import { Fragment, useState } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Inbox,
  Mail,
  MessageSquare,
  PhoneCall,
  Plus,
  Rocket,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Video,
  Zap,
} from "lucide-react";

type LeadStatus = "new" | "in-progress" | "proposal" | "won";
type ProductCategory = "custom" | "erp" | "crm" | "pos";

interface LeadItem {
  id: string;
  company: string;
  industry: string;
  city: string;
  contact: string;
  role: string;
  phone: string;
  email: string;
  category: ProductCategory;
  categoryLabel: string;
  service: string;
  modules: string[];
  budget: string;
  timeline: string;
  source: string;
  time: string;
  assignee: string;
  priority: "high" | "normal";
  status: LeadStatus;
  statusText: string;
  message: string;
  telemetry: string;
  estimatedDays: string;
}

const INITIAL_LEADS: LeadItem[] = [
  {
    id: "LEAD-1082",
    company: "Borusan Lojistik A.Ş.",
    industry: "Lojistik & Tedarik Zinciri",
    city: "İstanbul",
    contact: "Kerem Arslan",
    role: "IT & Dijital Dönüşüm Direktörü",
    phone: "+90 532 890 12 44",
    email: "kerem.arslan@borusan.com.tr",
    category: "custom",
    categoryLabel: "Özel Yazılım & API",
    service: "Özel Lojistik ERP & Gerçek Zamanlı Filo API Entegrasyonu",
    modules: ["GPS Telemetri API", "SAP Köprüsü", "iOS/Android Sürücü App", "Kaynak Kodu Devri"],
    budget: "₺850.000 - ₺1.200.000",
    timeline: "Q4 2026 (12 Hafta)",
    source: "Web Teklif Formu (/#iletisim)",
    time: "4 dk önce",
    assignee: "Emirhan Demir",
    priority: "high",
    status: "new",
    statusText: "Yeni Talep",
    message:
      "Merhaba, 450 araçlık ağır vasıta filomuzun mevcut SAP sistemimizle gerçek zamanlı haberleşmesini sağlayacak, sürücü mobil uygulaması dahil anahtar teslim bir operasyon platformu arıyoruz. Bu hafta teknik ekibinizle bir keşif toplantısı yapmak isteriz.",
    telemetry: "Reverse-IP: Kurumsal Ağ • 6 sayfa gezdi • %96 Niyet Skoru",
    estimatedDays: "90 Adam/Gün • 4 Sprint",
  },
  {
    id: "LEAD-1081",
    company: "Atlas Holding A.Ş.",
    industry: "Holding & Üretim",
    city: "İzmir",
    contact: "Selin Yalçın",
    role: "Grup Satın Alma Müdürü",
    phone: "+90 533 112 40 80",
    email: "selin.yalcin@atlasholding.com",
    category: "erp",
    categoryLabel: "EfeERP Enterprise",
    service: "EfeERP Kurumsal Bulut + 120 Kullanıcı Lisansı",
    modules: ["Üretim & MRP", "E-Fatura / E-Defter", "Çoklu Şirket Konsolidasyon", "İK & Bordro"],
    budget: "₺320.000 / yıl",
    timeline: "Hemen Başlangıç",
    source: "Canlı Demo Talebi",
    time: "28 dk önce",
    assignee: "Emirhan Demir",
    priority: "high",
    status: "new",
    statusText: "Yeni Talep",
    message:
      "Grubumuza bağlı 3 üretim fabrikası için EfeERP Enterprise paketini inceledik. 120 eşzamanlı kullanıcı için yıllık bulut lisanslama ve mevcut veritabanımızdan veri aktarımı (migration) dahil fiyat teklifinizi rica ederiz.",
    telemetry: "Google Organik SEO • EfeERP 3D sahnesini 4 dk inceledi",
    estimatedDays: "15 Gün Kurulum & Veri Göçü",
  },
  {
    id: "LEAD-1080",
    company: "Ege Perakende Mağazacılık",
    industry: "Perakende & Mağaza Zinciri",
    city: "İzmir",
    contact: "Ahmet Bulut",
    role: "Genel Müdür",
    phone: "+90 542 334 91 22",
    email: "ahmet@egeperakende.com",
    category: "pos",
    categoryLabel: "EfePOS Perakende",
    service: "EfePOS 45 Mağaza Dağıtımı & Merkez Stok Senkronizasyonu",
    modules: ["Çevrimdışı POS", "Yazarkasa ÖKC", "Merkez Depo", "Sadakat Kartı"],
    budget: "₺480.000",
    timeline: "Kasım 2026",
    source: "Telefon & Web Formu",
    time: "1 saat önce",
    assignee: "Mert Aydın",
    priority: "normal",
    status: "in-progress",
    statusText: "İletişimde",
    message:
      "Ege bölgesindeki 45 mağazamızda internet kesilse dahi çalışmaya devam eden ve merkez depoyla anlık stok eşitleyen EfePOS sistemine geçmek istiyoruz. Örnek mağaza kurulumu için görüşmek isteriz.",
    telemetry: "Doğrudan Giriş • Lisanslama sayfasını inceledi",
    estimatedDays: "10 Gün Pilot + Dağıtım",
  },
  {
    id: "LEAD-1079",
    company: "Medikal Park Sağlık Grubu",
    industry: "Sağlık & Hastane",
    city: "Ankara",
    contact: "Dr. Zeynep Koç",
    role: "Medikal Direktör",
    phone: "+90 530 678 99 10",
    email: "zeynep.koc@medikalpark.com",
    category: "custom",
    categoryLabel: "Özel Yazılım & Mobil",
    service: "Tele-Tıp, Online Randevu & Hasta Takip Mobil Uygulaması",
    modules: ["iOS & Android Native", "WebRTC Görüntülü Görüşme", "HBYS Entegrasyonu", "KVKK Şifreleme"],
    budget: "₺850.000",
    timeline: "Q1 2027 (14 Hafta)",
    source: "LinkedIn B2B Kampanya",
    time: "2 saat önce",
    assignee: "Emirhan Demir",
    priority: "high",
    status: "proposal",
    statusText: "Teklif Sunuldu",
    message:
      "Hastalarımızın laboratuvar sonuçlarını görebileceği, uzman hekimlerimizle görüntülü görüşebileceği ve mevcut HBYS sistemimizle entegre çalışacak yüksek güvenlikli bir mobil uygulama projesi için kapsamlı teklifinizi bekliyoruz.",
    telemetry: "LinkedIn B2B • %92 Niyet Skoru • PDF Teklif İndirildi",
    estimatedDays: "110 Adam/Gün • 5 Sprint",
  },
  {
    id: "LEAD-1078",
    company: "Yılmaz Uluslararası Lojistik",
    industry: "Depolama & Antrepo",
    city: "Mersin",
    contact: "Murat Yılmaz",
    role: "Operasyon Müdürü",
    phone: "+90 535 220 18 33",
    email: "murat@yilmazlojistik.com",
    category: "erp",
    categoryLabel: "EfeERP + WMS",
    service: "Depo Barkod, El Terminali & Antrepo Yönetim Sistemi",
    modules: ["WMS Depo", "El Terminali Android", "Gümrük EDI", "Karekod Takip"],
    budget: "₺240.000",
    timeline: "Aralık 2026",
    source: "Google Arama (SEO)",
    time: "3 saat önce",
    assignee: "Selin Kaya",
    priority: "normal",
    status: "in-progress",
    statusText: "Keşif Planlandı",
    message:
      "25.000 m² gümrüklü antrepomuzda el terminalleriyle hızlı mal kabul, raf adresleme ve sevkiyat takibi yapmak istiyoruz.",
    telemetry: "Google SEO • 4 sayfa gezdi",
    estimatedDays: "25 Adam/Gün",
  },
  {
    id: "LEAD-1077",
    company: "Nova Tekstil Sanayi A.Ş.",
    industry: "Tekstil & İhracat",
    city: "Bursa",
    contact: "Cemal Kaya",
    role: "Yönetim Kurulu Üyesi",
    phone: "+90 532 994 55 12",
    email: "cemal@novatekstil.com",
    category: "crm",
    categoryLabel: "EfeCRM & B2B Portal",
    service: "EfeCRM Satış Portalı & Çok Dilli B2B Bayi Sipariş Ağı",
    modules: ["B2B Bayi Portalı", "Çoklu Döviz (EUR/USD)", "Varyant & Kartela", "WhatsApp CRM"],
    budget: "₺290.000",
    timeline: "Onaylandı • Başladı",
    source: "Müşteri Referansı",
    time: "5 saat önce",
    assignee: "Emirhan Demir",
    priority: "high",
    status: "won",
    statusText: "Onaylandı",
    message:
      "Avrupa'daki 180 toptan müşterimizin kumaş kartelalarını inceleyip doğrudan döviz bazlı sipariş geçebileceği B2B portal ve EfeCRM kurulumunu onaylıyoruz.",
    telemetry: "Sözleşme İmzalandı • %50 Ön Ödeme Alındı",
    estimatedDays: "35 Adam/Gün",
  },
  {
    id: "LEAD-1076",
    company: "Ege Seramik Sanayi ve Ticaret A.Ş.",
    industry: "Seramik & Yapı Malzemeleri",
    city: "İzmir",
    contact: "Hakan Özkan",
    role: "Bilgi Sistemleri Yöneticisi",
    phone: "+90 532 410 88 19",
    email: "h.ozkan@egeseramik.com",
    category: "crm",
    categoryLabel: "EfeCRM Enterprise",
    service: "Yurt İçi & İhracat Bayi Yönetim ve Teklif Otomasyonu",
    modules: ["Bayi Kota & İskonto", "SAP Stok Senkron", "Mobil Saha Satış"],
    budget: "₺380.000",
    timeline: "Q4 2026",
    source: "Google Ads B2B",
    time: "6 saat önce",
    assignee: "Selin Kaya",
    priority: "high",
    status: "new",
    statusText: "Yeni Talep",
    message:
      "Türkiye genelindeki 320 yetkili bayimizin sipariş, iskonto ve cari hesap süreçlerini tek merkezden yönetecek EfeCRM Enterprise çözümü için demo talep ediyoruz.",
    telemetry: "Reverse-IP: Kurumsal Ağ • %91 Niyet Skoru",
    estimatedDays: "40 Adam/Gün",
  },
  {
    id: "LEAD-1075",
    company: "Kuzey Denizcilik & Gemi Acenteliği",
    industry: "Denizcilik & Liman",
    city: "İstanbul",
    contact: "Kaptan Levent Soylu",
    role: "Operasyon Direktörü",
    phone: "+90 533 780 65 40",
    email: "levent@kuzeyshipping.com",
    category: "custom",
    categoryLabel: "Özel Yazılım",
    service: "Liman Operasyon, Konteyner Takip & Acente Otomasyonu",
    modules: ["AIS Gemi Takip", "Dövizli Fatura", "Liman Evrak Otomasyonu"],
    budget: "₺540.000",
    timeline: "Aralık 2026",
    source: "Web Teklif Formu",
    time: "Dün 17:40",
    assignee: "Mert Aydın",
    priority: "normal",
    status: "proposal",
    statusText: "Teklif Sunuldu",
    message:
      "Gemi geliş-gidiş, liman masraf kalemleri ve acente faturalandırma süreçlerimizi tek ekranda toplayacak özel web tabanlı yazılım teklifinizi incelemeye aldık.",
    telemetry: "Teklif PDF #PR-409 gönderildi • İnceleniyor",
    estimatedDays: "65 Adam/Gün",
  },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>("LEAD-1082");
  const [sentProposalIds, setSentProposalIds] = useState<Record<string, boolean>>({});
  const [showNewModal, setShowNewModal] = useState(false);

  // Quick-add form state
  const [newCompany, setNewCompany] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newService, setNewService] = useState("");
  const [newBudget, setNewBudget] = useState("₺350.000");

  const handleStatusChange = (id: string, nextStatus: LeadStatus) => {
    const labelMap: Record<LeadStatus, string> = {
      new: "Yeni Talep",
      "in-progress": "İletişimde",
      proposal: "Teklif Sunuldu",
      won: "Onaylandı",
    };
    setLeads((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: nextStatus, statusText: labelMap[nextStatus] }
          : item
      )
    );
  };

  const handleSendProposal = (id: string) => {
    setSentProposalIds((prev) => ({ ...prev, [id]: true }));
    handleStatusChange(id, "proposal");
  };

  const handleCreateQuickLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newContact.trim()) return;
    const created: LeadItem = {
      id: `LEAD-${1083 + leads.length - 8}`,
      company: newCompany.trim(),
      industry: "Kurumsal İşletme",
      city: "İstanbul",
      contact: newContact.trim(),
      role: "Proje Yetkilisi",
      phone: "+90 532 000 00 00",
      email: "iletisim@kurum.com.tr",
      category: "custom",
      categoryLabel: "Özel Yazılım",
      service: newService.trim() || "Özel Kurumsal Yazılım & ERP Danışmanlığı",
      modules: ["Web & Mobil", "REST API", "Bulut Kurulum"],
      budget: newBudget.trim() || "₺350.000",
      timeline: "Q4 2026",
      source: "Manuel Kayıt (Telefon)",
      time: "Şimdi",
      assignee: "Emirhan Demir",
      priority: "high",
      status: "new",
      statusText: "Yeni Talep",
      message: "Telefon görüşmesi üzerinden alınan kurumsal yazılım ve lisanslama talebi.",
      telemetry: "Manuel CRM Kaydı • Doğrulandı",
      estimatedDays: "45 Adam/Gün",
    };
    setLeads((prev) => [created, ...prev]);
    setExpandedLeadId(created.id);
    setNewCompany("");
    setNewContact("");
    setNewService("");
    setShowNewModal(false);
  };

  const filteredLeads = leads.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        item.company.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const newCount = leads.filter((l) => l.status === "new").length;
  const inProgressCount = leads.filter((l) => l.status === "in-progress").length;
  const proposalCount = leads.filter((l) => l.status === "proposal").length;
  const wonCount = leads.filter((l) => l.status === "won").length;

  return (
    <div className="adm-content">
      {/* Dense Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Gelen Teklif Talepleri & Satış Öncesi (CRM)</h1>
            <span className="adm-badge adm-badge--info" style={{ padding: "2px 8px" }}>
              {newCount} Yeni Talep Yanıt Bekliyor
            </span>
          </div>
          <p className="adm-header__subtitle">
            Web sitesi teklif formu, canlı demo istekleri, kurumsal telefon ve LinkedIn B2B kanallarından gelen tüm proje talepleri
          </p>
        </div>

        <div className="adm-header__controls" style={{ flexWrap: "wrap" }}>
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${categoryFilter === "all" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              Tüm Çözümler
            </button>
            <button
              className={`adm-seg__btn ${categoryFilter === "custom" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setCategoryFilter("custom")}
            >
              Özel Yazılım
            </button>
            <button
              className={`adm-seg__btn ${categoryFilter === "erp" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setCategoryFilter("erp")}
            >
              EfeERP
            </button>
            <button
              className={`adm-seg__btn ${categoryFilter === "crm" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setCategoryFilter("crm")}
            >
              EfeCRM
            </button>
            <button
              className={`adm-seg__btn ${categoryFilter === "pos" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setCategoryFilter("pos")}
            >
              EfePOS
            </button>
          </div>

          <button className="adm-topbar__btn" title="Teklif Listesini Dışa Aktar">
            <Download size={13} />
            <span>Excel / CSV</span>
          </button>

          <button
            onClick={() => setShowNewModal((v) => !v)}
            className="adm-topbar__btn adm-topbar__btn--primary"
          >
            <Plus size={14} />
            <span>Yeni Talep Kaydı</span>
          </button>
        </div>
      </div>

      {/* Animated Quick-Add Bar */}
      <div className={`adm-collapse ${showNewModal ? "adm-collapse--open" : ""}`}>
        <div className="adm-collapse__inner">
          <form
            onSubmit={handleCreateQuickLead}
            className="adm-card"
            style={{
              padding: "12px 16px",
              borderColor: "rgba(0, 113, 227, 0.35)",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-primary)" }}>
              Hızlı Talep Oluştur:
            </span>
            <input
              type="text"
              placeholder="Şirket / Kurum Adı *"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              required
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                flex: "1 1 180px",
              }}
            />
            <input
              type="text"
              placeholder="Yetkili Adı Soyadı *"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              required
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                flex: "1 1 150px",
              }}
            />
            <input
              type="text"
              placeholder="Talep Edilen Proje / Lisans"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                flex: "2 1 220px",
              }}
            />
            <input
              type="text"
              placeholder="Tahmini Bütçe"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                width: "130px",
              }}
            />
            <button type="submit" className="adm-topbar__btn adm-topbar__btn--primary">
              Kaydet & Listeye Ekle
            </button>
            <button
              type="button"
              onClick={() => setShowNewModal(false)}
              className="adm-topbar__btn"
            >
              İptal
            </button>
          </form>
        </div>
      </div>

      {/* 5-Column High-Density KPI Row */}
      <div className="adm-kpi-grid">
        <div className="adm-kpi-card" style={{ borderColor: "rgba(0, 113, 227, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Bekleyen Yeni Talepler</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Inbox size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">{newCount} Yeni Talep</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">Acil: 2 Kurumsal</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>SLA: &lt;30 dk</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Bu Ay Toplam Talep</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <TrendingUp size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">148 Talep</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">+22.4%</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>92 kurumsal şirket</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Açık Teklif Hacmi (Pipeline)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <FileText size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺14.650.000</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">26 Aktif Teklif</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Ort. ₺563K</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Teklif → Sözleşme Oranı</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <Target size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%28.4</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">14 Kazanılan</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Bu ay onaylanan</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ortalama İlk Yanıt Süresi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <Zap size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">14 Dakika</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">%99.2 SLA</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Hedef: 30 dk</span>
          </div>
        </div>
      </div>

      {/* Main Lead Management Table with Expandable Proposal & Requirement Workspace */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card__title">
              <Inbox size={15} color="var(--adm-primary)" />
              Gelen Teklif & Proje Talepleri Listesi
            </span>
            <span className="adm-badge adm-badge--info">{filteredLeads.length} Kayıt</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Şirket, yetkili, şehir veya talep ara..."
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
                  width: "225px",
                }}
              />
            </div>

            {/* Status Filter */}
            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${statusFilter === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                Tümü ({leads.length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "new" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("new")}
              >
                Yeni ({newCount})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "in-progress" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("in-progress")}
              >
                İletişimde ({inProgressCount})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "proposal" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("proposal")}
              >
                Teklif Sunulan ({proposalCount})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "won" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("won")}
              >
                Onaylanan ({wonCount})
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Talep ID / Kanal</th>
                <th>Müşteri / Kurum & Yetkili</th>
                <th>İletişim</th>
                <th>Talep Edilen Çözüm & Modüller</th>
                <th>Bütçe & Takvim</th>
                <th>Sorumlu</th>
                <th>Durum</th>
                <th style={{ textAlign: "right" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody key={`${categoryFilter}-${statusFilter}`} className="adm-data-switch">
              {filteredLeads.map((item) => {
                const isExpanded = expandedLeadId === item.id;
                const isProposalSent = sentProposalIds[item.id];
                return (
                  <Fragment key={item.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                fontSize: "11px",
                                color: "var(--adm-text)",
                              }}
                            >
                              {item.id}
                            </span>
                            {item.priority === "high" && (
                              <span className="adm-badge adm-badge--warning">
                                Öncelikli
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            {item.time} • {item.source}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="adm-table__client">
                          <div className="adm-table__client-avatar">{item.company.charAt(0)}</div>
                          <div className="adm-table__client-meta">
                            <div className="adm-table__client-name">{item.company}</div>
                            <div className="adm-table__client-sub">
                              {item.contact} ({item.role}) • {item.city}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: "11.5px" }}>
                          <div>{item.email}</div>
                          <div style={{ color: "var(--adm-text-muted)", fontFamily: "var(--font-mono)" }}>
                            {item.phone}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "320px" }}>
                          <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>{item.service}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            <span className="adm-badge adm-badge--info" style={{ fontSize: "9.5px" }}>
                              {item.categoryLabel}
                            </span>
                            {item.modules.slice(0, 2).map((mod, mIdx) => (
                              <span
                                key={mIdx}
                                className="adm-badge adm-badge--neutral"
                                style={{ fontSize: "9.5px" }}
                              >
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--adm-text)" }}>
                            {item.budget}
                          </span>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            Hedef: {item.timeline}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--adm-text-secondary)" }}>
                          {item.assignee}
                        </span>
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
                          <button
                            className="adm-table__action-btn"
                            onClick={() => setExpandedLeadId(isExpanded ? null : item.id)}
                            style={{
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            {isExpanded ? "Detayı Kapat" : "İncele & Teklif Ver"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}>
                      <td colSpan={8} className="adm-expand-cell">
                        <div className="adm-expand-grid">
                          <div className="adm-expand-inner">
                            <div className="adm-expand-body">
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1.4fr 1fr 1fr",
                                  gap: "12px",
                                  borderLeft: "3px solid var(--adm-primary)",
                                  paddingLeft: "14px",
                                }}
                              >
                                {/* Col 1: Client Message & Technical Scope */}
                                <div
                                  style={{
                                    background: "#ffffff",
                                    border: "1px solid var(--adm-border)",
                                    borderRadius: "8px",
                                    padding: "11px 13px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                      Müşteri Mesajı & Teknik Kapsam ({item.id})
                                    </span>
                                    <span className="adm-badge adm-badge--neutral">{item.industry}</span>
                                  </div>

                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "var(--adm-text-secondary)",
                                      lineHeight: 1.5,
                                      margin: 0,
                                      background: "var(--adm-surface-2)",
                                      padding: "8px 10px",
                                      borderRadius: "6px",
                                      border: "1px solid var(--adm-border-subtle)",
                                    }}
                                  >
                                    &ldquo;{item.message}&rdquo;
                                  </p>

                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                    {item.modules.map((m, idx) => (
                                      <span key={idx} className="adm-badge adm-badge--info">
                                        ✓ {m}
                                      </span>
                                    ))}
                                  </div>

                                  <div style={{ fontSize: "11px", color: "var(--adm-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    Telemetri: {item.telemetry}
                                  </div>
                                </div>

                                {/* Col 2: Engineering Estimate & Stage Control */}
                                <div
                                  style={{
                                    background: "#ffffff",
                                    border: "1px solid var(--adm-border)",
                                    borderRadius: "8px",
                                    padding: "11px 13px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    gap: "8px",
                                  }}
                                >
                                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                    <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                      Mühendislik Analizi & Aşama Yönetimi
                                    </span>

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "11.5px",
                                        padding: "5px 0",
                                        borderBottom: "1px solid var(--adm-border-subtle)",
                                      }}
                                    >
                                      <span style={{ color: "var(--adm-text-muted)" }}>Tahmini Efor / Süre:</span>
                                      <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                                        {item.estimatedDays}
                                      </span>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "11.5px",
                                        padding: "5px 0",
                                        borderBottom: "1px solid var(--adm-border-subtle)",
                                      }}
                                    >
                                      <span style={{ color: "var(--adm-text-muted)" }}>Sorumlu Mimar:</span>
                                      <span style={{ fontWeight: 600 }}>{item.assignee}</span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                                      Talep Aşamasını Güncelle:
                                    </span>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                      {(
                                        [
                                          { k: "new", label: "Yeni" },
                                          { k: "in-progress", label: "İletişimde" },
                                          { k: "proposal", label: "Teklif Sunuldu" },
                                          { k: "won", label: "Onaylandı ✓" },
                                        ] as { k: LeadStatus; label: string }[]
                                      ).map((st) => (
                                        <button
                                          key={st.k}
                                          type="button"
                                          onClick={() => handleStatusChange(item.id, st.k)}
                                          className="adm-table__action-btn"
                                          style={{
                                            background: item.status === st.k ? "var(--adm-primary)" : "#ffffff",
                                            color: item.status === st.k ? "#ffffff" : "var(--adm-text-secondary)",
                                            borderColor:
                                              item.status === st.k ? "var(--adm-primary)" : "var(--adm-border)",
                                          }}
                                        >
                                          {st.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Col 3: Fast Proposal & Direct Contact Actions */}
                                <div
                                  style={{
                                    background: "#ffffff",
                                    border: "1px solid var(--adm-border)",
                                    borderRadius: "8px",
                                    padding: "11px 13px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    gap: "8px",
                                  }}
                                >
                                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                    <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                      Hızlı Teklif & İletişim Aksiyonları
                                    </span>
                                    <div style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                      Müşteriye kurumsal PDF teklif dosyası gönderebilir veya doğrudan keşif toplantısı başlatabilirsiniz.
                                    </div>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                    <button
                                      type="button"
                                      onClick={() => handleSendProposal(item.id)}
                                      className="adm-topbar__btn adm-topbar__btn--primary"
                                      style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        background: isProposalSent ? "#1a9e4b" : undefined,
                                        borderColor: isProposalSent ? "#1a9e4b" : undefined,
                                      }}
                                    >
                                      <Send size={13} />
                                      <span>
                                        {isProposalSent
                                          ? `PDF Teklif Gönderildi (${item.email}) ✓`
                                          : "Kurumsal PDF Teklif Hazırla & Gönder"}
                                      </span>
                                    </button>

                                    <div style={{ display: "flex", gap: "6px" }}>
                                      <a
                                        href={`tel:${item.phone}`}
                                        className="adm-topbar__btn"
                                        style={{ flex: 1, justifyContent: "center" }}
                                      >
                                        <PhoneCall size={12} />
                                        <span>Hemen Ara</span>
                                      </a>
                                      <a
                                        href={`mailto:${item.email}?subject=${encodeURIComponent(
                                          `Efesoft Yazılım & Lisans Teklifi - ${item.company}`
                                        )}`}
                                        className="adm-topbar__btn"
                                        style={{ flex: 1, justifyContent: "center" }}
                                      >
                                        <Mail size={12} />
                                        <span>E-Posta Gönder</span>
                                      </a>
                                    </div>
                                  </div>
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

      {/* Row 3: Demand by Product, Discovery Meetings & Sales Team SLA (3 Columns) */}
      <div className="adm-grid-3col">
        {/* Col 1: Breakdown by Requested Solution */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Rocket size={15} color="#0071e3" />
              Çözüm Bazlı Talep Dağılımı
            </span>
            <span className="adm-badge adm-badge--info">Bu Ay (148)</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { name: "Özel Kurumsal Yazılım & AI Projeleri", count: "62 Talep (%42)", vol: "₺8.4M Hacim", pct: 42, col: "#0071e3" },
              { name: "EfeERP Enterprise Bulut Lisansları", count: "44 Talep (%30)", vol: "₺3.6M Hacim", pct: 30, col: "#1a9e4b" },
              { name: "EfeCRM & B2B Bayi Sipariş Ağı", count: "25 Talep (%17)", vol: "₺1.5M Hacim", pct: 17, col: "#9a5cf5" },
              { name: "EfePOS Perakende & Donanım Paketi", count: "17 Talep (%11)", vol: "₺1.15M Hacim", pct: 11, col: "#f59e0b" },
            ].map((row, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{row.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                    {row.count} • {row.vol}
                  </span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${row.pct}%`, background: row.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Scheduled Discovery & Demo Calls */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Calendar size={15} color="#9a5cf5" />
              Planlanan Keşif & Demo Toplantıları
            </span>
            <span className="adm-badge adm-badge--purple">4 Toplantı</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                company: "Borusan Lojistik — Teknik Mimari Keşif",
                person: "Kerem Arslan (IT Direktörü)",
                time: "Bugün 16:30 • Google Meet",
                badge: "Başlıyor",
              },
              {
                company: "Atlas Holding — EfeERP 120 Kullanıcı Demo",
                person: "Selin Yalçın & Fabrika Ekibi",
                time: "Yarın 10:30 • Canlı Sunum",
                badge: "Planlandı",
              },
              {
                company: "Medikal Park — Tele-Tıp Mobil Kapsam",
                person: "Dr. Zeynep Koç",
                time: "Yarın 14:00 • Zoom",
                badge: "Teklif Sonrası",
              },
            ].map((mt, idx) => (
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
                    {mt.company}
                  </span>
                  <span className="adm-badge adm-badge--info" style={{ fontSize: "9.5px" }}>
                    {mt.badge}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{mt.person}</div>
                <div style={{ fontSize: "10.5px", color: "var(--adm-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  {mt.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Sales Engineering Team SLA & Performance */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <UserCheck size={15} color="#1a9e4b" />
              Satış & Çözüm Mimarları Performansı
            </span>
            <span className="adm-badge adm-badge--success">%99.2 SLA</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-status-list">
              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Emirhan Demir (Kurucu & Baş Mimar)</span>
                </div>
                <span className="adm-status-item__val">11 dk Ort. • 9 Kurumsal</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Selin Kaya (Kurumsal ERP Uzmanı)</span>
                </div>
                <span className="adm-status-item__val">14 dk Ort. • 12 Aktif</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Mert Aydın (POS & Saha Çözümleri)</span>
                </div>
                <span className="adm-status-item__val">17 dk Ort. • 8 Aktif</span>
              </div>

              <div className="adm-status-item">
                <div className="adm-status-item__left">
                  <span className="adm-status-item__dot" />
                  <span>Otomatik WhatsApp & E-Posta Karşılama</span>
                </div>
                <span className="adm-status-item__val">&lt;3 saniye • %100 Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

