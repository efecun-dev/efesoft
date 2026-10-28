"use client";

import { Fragment, useState } from "react";
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Download,
  FileText,
  Globe,
  KeyRound,
  Layers,
  Mail,
  MapPin,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

type ClientTier = "enterprise" | "midmarket" | "retail";
type ClientStatus = "active" | "project" | "renewal";

interface ClientAccount {
  id: string;
  name: string;
  taxInfo: string;
  industry: string;
  city: string;
  tier: ClientTier;
  tierLabel: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  products: string[];
  seatUsage: string;
  seatCount: number;
  seatLimit: number;
  arr: string;
  ltv: string;
  renewalDate: string;
  daysToRenewal: number;
  healthScore: number;
  status: ClientStatus;
  statusText: string;
  accountManager: string;
  tenantNode: string;
  lastNote: string;
}

const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: "CLI-2041",
    name: "Borusan Lojistik Dağıtım Depolama A.Ş.",
    taxInfo: "Büyük Mükellefler V.D. • 1800492810",
    industry: "Lojistik & Tedarik Zinciri",
    city: "İstanbul",
    tier: "enterprise",
    tierLabel: "Enterprise VIP",
    contactName: "Kerem Arslan",
    contactRole: "IT & Dijital Dönüşüm Direktörü",
    email: "kerem.arslan@borusan.com.tr",
    phone: "+90 532 890 12 44",
    products: ["Özel Filo API", "EfeERP Enterprise", "SAP Köprü Modülü"],
    seatUsage: "240 / 250 Kullanıcı",
    seatCount: 240,
    seatLimit: 250,
    arr: "₺1.450.000 / yıl",
    ltv: "₺4.120.000",
    renewalDate: "15 Oca 2027",
    daysToRenewal: 79,
    healthScore: 98,
    status: "project",
    statusText: "Aktif + Ek Proje",
    accountManager: "Emirhan Demir",
    tenantNode: "izm-dedicated-borusan-01 (İzmir İzole Küme)",
    lastNote: "Sprint 4 canlıya alındı. 450 tır ve çekici için gerçek zamanlı telemetri entegrasyonu %99.99 uptime ile çalışıyor.",
  },
  {
    id: "CLI-2038",
    name: "Atlas Holding & Endüstriyel Yatırımlar A.Ş.",
    taxInfo: "Hasan Tahsin V.D. • 0940812345",
    industry: "Holding & Üretim Sanayi",
    city: "İzmir",
    tier: "enterprise",
    tierLabel: "Enterprise VIP",
    contactName: "Selin Yalçın",
    contactRole: "Grup Satın Alma Müdürü",
    email: "selin.yalcin@atlasholding.com",
    phone: "+90 533 112 40 80",
    products: ["EfeERP Enterprise", "Üretim MRP II", "E-Fatura / E-Defter"],
    seatUsage: "170 / 180 Kullanıcı",
    seatCount: 170,
    seatLimit: 180,
    arr: "₺890.000 / yıl",
    ltv: "₺2.480.000",
    renewalDate: "01 Mar 2027",
    daysToRenewal: 124,
    healthScore: 96,
    status: "active",
    statusText: "Aktif Abonelik",
    accountManager: "Emirhan Demir",
    tenantNode: "izm-erp-cluster-02 (Yüksek Erişilebilirlik)",
    lastNote: "Bu hafta 50 adet ek kullanıcı lisansı başarıyla tanımlandı. 3 fabrika konsolide bilanço modülünü aktif kullanıyor.",
  },
  {
    id: "CLI-2035",
    name: "Ege Perakende Mağazacılık Ticaret A.Ş.",
    taxInfo: "Konak V.D. • 3250918442",
    industry: "Perakende & Mağaza Zinciri",
    city: "İzmir",
    tier: "retail",
    tierLabel: "Perakende Zinciri",
    contactName: "Ahmet Bulut",
    contactRole: "Genel Müdür",
    email: "ahmet@egeperakende.com",
    phone: "+90 542 334 91 22",
    products: ["EfePOS Bulut", "Merkez Depo Senkron", "Sadakat & Kampanya"],
    seatUsage: "135 / 140 Kasa Terminali",
    seatCount: 135,
    seatLimit: 140,
    arr: "₺640.000 / yıl",
    ltv: "₺1.750.000",
    renewalDate: "18 Kas 2026",
    daysToRenewal: 21,
    healthScore: 92,
    status: "renewal",
    statusText: "Yenileme Yaklaştı",
    accountManager: "Mert Aydın",
    tenantNode: "global-pos-sync-01 (İzmir + Frankfurt)",
    lastNote: "Yıllık lisans yenilemesine 21 gün kaldı. Yeni açılacak 12 mağaza için ek terminal paketi teklife eklendi.",
  },
  {
    id: "CLI-2031",
    name: "Akdeniz Finans & Faktoring Hizmetleri A.Ş.",
    taxInfo: "Maslak V.D. • 0190448712",
    industry: "Finans & Açık Bankacılık",
    city: "İstanbul",
    tier: "enterprise",
    tierLabel: "Enterprise VIP",
    contactName: "Cenk Soydan",
    contactRole: "CTO / Teknolojiden Sorumlu GMY",
    email: "cenk.soydan@akdenizfinans.com.tr",
    phone: "+90 532 611 90 10",
    products: ["Özel Açık Bankacılık API", "EfeCRM Kurumsal", "BDDK Raporlama"],
    seatUsage: "95 / 100 Kullanıcı",
    seatCount: 95,
    seatLimit: 100,
    arr: "₺1.180.000 / yıl",
    ltv: "₺3.200.000",
    renewalDate: "10 Nis 2027",
    daysToRenewal: 164,
    healthScore: 97,
    status: "project",
    statusText: "Aktif + Ek Proje",
    accountManager: "Emirhan Demir",
    tenantNode: "izm-fin-vault-01 (BDDK Uyumlu İzole Düğüm)",
    lastNote: "Açık bankacılık faz-2 entegrasyonu %68 tamamlandı. Sızma testi (Pentest) başarıyla geçti.",
  },
  {
    id: "CLI-2026",
    name: "Nova Tekstil ve İhracat Sanayi A.Ş.",
    taxInfo: "Nilüfer V.D. • 6310992108",
    industry: "Tekstil & Dış Ticaret",
    city: "Bursa",
    tier: "midmarket",
    tierLabel: "Kurumsal KOBİ",
    contactName: "Cemal Kaya",
    contactRole: "Yönetim Kurulu Üyesi",
    email: "cemal@novatekstil.com",
    phone: "+90 532 994 55 12",
    products: ["EfeCRM Satış Portalı", "Avrupa B2B Sipariş Ağı", "Varyant & Kartela"],
    seatUsage: "62 / 75 Kullanıcı",
    seatCount: 62,
    seatLimit: 75,
    arr: "₺420.000 / yıl",
    ltv: "₺980.000",
    renewalDate: "22 Şub 2027",
    daysToRenewal: 117,
    healthScore: 95,
    status: "active",
    statusText: "Aktif Abonelik",
    accountManager: "Selin Kaya",
    tenantNode: "izm-b2b-cluster-01",
    lastNote: "Almanya ve Hollanda bayileri için çok dilli sipariş ekranları devreye alındı.",
  },
  {
    id: "CLI-2019",
    name: "Medikal Park Özel Sağlık Yatırımları A.Ş.",
    taxInfo: "Çankaya V.D. • 6140883920",
    industry: "Sağlık & Hastane Grubu",
    city: "Ankara",
    tier: "enterprise",
    tierLabel: "Enterprise VIP",
    contactName: "Dr. Zeynep Koç",
    contactRole: "Medikal & Dijital Direktör",
    email: "zeynep.koc@medikalpark.com",
    phone: "+90 530 678 99 10",
    products: ["Tele-Tıp Mobil App", "EfeCRM Çağrı Merkezi", "Randevu Motoru"],
    seatUsage: "150 / 160 Kullanıcı",
    seatCount: 150,
    seatLimit: 160,
    arr: "₺940.000 / yıl",
    ltv: "₺2.150.000",
    renewalDate: "05 May 2027",
    daysToRenewal: 189,
    healthScore: 94,
    status: "active",
    statusText: "Aktif Abonelik",
    accountManager: "Emirhan Demir",
    tenantNode: "izm-health-kvkk-01 (KVKK Şifreli)",
    lastNote: "7 klinikte hasta çağrı ve randevu hatırlatma otomasyonu %34 randevu kaçırma düşüşü sağladı.",
  },
  {
    id: "CLI-2012",
    name: "Yılmaz Uluslararası Antrepo & Lojistik Ltd.",
    taxInfo: "Uray V.D. • 9480221560",
    industry: "Depolama & Gümrük",
    city: "Mersin",
    tier: "midmarket",
    tierLabel: "Kurumsal KOBİ",
    contactName: "Murat Yılmaz",
    contactRole: "Operasyon Müdürü",
    email: "murat@yilmazlojistik.com",
    phone: "+90 535 220 18 33",
    products: ["EfeERP WMS Depo", "Android El Terminali", "Karekod Sevkiyat"],
    seatUsage: "48 / 50 Kullanıcı",
    seatCount: 48,
    seatLimit: 50,
    arr: "₺310.000 / yıl",
    ltv: "₺790.000",
    renewalDate: "19 Kas 2026",
    daysToRenewal: 22,
    healthScore: 89,
    status: "renewal",
    statusText: "Yenileme Yaklaştı",
    accountManager: "Selin Kaya",
    tenantNode: "izm-erp-cluster-01",
    lastNote: "El terminali sayısını 50'den 75'e çıkarmak için yenileme teklifi iletildi.",
  },
  {
    id: "CLI-2004",
    name: "Anadolu Gıda ve İçecek Dağıtım A.Ş.",
    taxInfo: "Mevlana V.D. • 0680551923",
    industry: "Hızlı Tüketim (FMCG) & Dağıtım",
    city: "Konya",
    tier: "retail",
    tierLabel: "Saha & Dağıtım",
    contactName: "Serkan Demirci",
    contactRole: "Satış Operasyon Direktörü",
    email: "s.demirci@anadolugida.com.tr",
    phone: "+90 532 710 44 88",
    products: ["EfePOS Saha Satış", "EfeERP Muhasebe", "Sıcak/Soğuk Satış"],
    seatUsage: "110 / 120 Saha Tableti",
    seatCount: 110,
    seatLimit: 120,
    arr: "₺580.000 / yıl",
    ltv: "₺1.640.000",
    renewalDate: "30 Haz 2027",
    daysToRenewal: 245,
    healthScore: 95,
    status: "active",
    statusText: "Aktif Abonelik",
    accountManager: "Mert Aydın",
    tenantNode: "izm-erp-cluster-02",
    lastNote: "110 saha dağıtım aracı günlük 8.500 e-irsaliye ve tahsilat işlemini sorunsuz senkronize ediyor.",
  },
];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientAccount[]>(INITIAL_CLIENTS);
  const [tierFilter, setTierFilter] = useState<"all" | ClientTier>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ClientStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClientId, setExpandedClientId] = useState<string | null>("CLI-2041");
  const [renewalSentIds, setRenewalSentIds] = useState<Record<string, boolean>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  // Quick-add state
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newCity, setNewCity] = useState("İstanbul");
  const [newArr, setNewArr] = useState("₺480.000 / yıl");

  const handleUpgradeSeats = (id: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextLimit = c.seatLimit + 10;
        return {
          ...c,
          seatLimit: nextLimit,
          seatUsage: `${c.seatCount} / ${nextLimit} Kullanıcı`,
        };
      })
    );
  };

  const handleSendRenewalNotice = (id: string) => {
    setRenewalSentIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newContactName.trim()) return;
    const created: ClientAccount = {
      id: `CLI-${2042 + clients.length - 8}`,
      name: newCompanyName.trim(),
      taxInfo: "Kurumsal V.D. • 4920118390",
      industry: "Kurumsal Teknoloji & Üretim",
      city: newCity.trim() || "İstanbul",
      tier: "enterprise",
      tierLabel: "Enterprise VIP",
      contactName: newContactName.trim(),
      contactRole: "Genel Müdür / IT Yöneticisi",
      email: "yonetim@kurumsalsirket.com.tr",
      phone: "+90 532 000 00 00",
      products: ["EfeERP Enterprise", "Özel API Entegrasyonu"],
      seatUsage: "50 / 50 Kullanıcı",
      seatCount: 50,
      seatLimit: 50,
      arr: newArr.trim() || "₺480.000 / yıl",
      ltv: "₺480.000",
      renewalDate: "28 Eki 2027",
      daysToRenewal: 365,
      healthScore: 100,
      status: "active",
      statusText: "Aktif Abonelik",
      accountManager: "Emirhan Demir",
      tenantNode: "izm-erp-cluster-01",
      lastNote: "Yeni kurumsal müşteri hesabı ve ilk 50 kullanıcı lisansı tanımlandı.",
    };
    setClients((prev) => [created, ...prev]);
    setExpandedClientId(created.id);
    setNewCompanyName("");
    setNewContactName("");
    setShowAddForm(false);
  };

  const filteredClients = clients.filter((c) => {
    if (tierFilter !== "all" && c.tier !== tierFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.products.some((p) => p.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const activeCount = clients.filter((c) => c.status === "active").length;
  const projectCount = clients.filter((c) => c.status === "project").length;
  const renewalCount = clients.filter((c) => c.status === "renewal").length;

  return (
    <div className="adm-content">
      {/* Dense Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Müşteriler & Kurumsal Şirketler (CRM)</h1>
            <span className="adm-badge adm-badge--success" style={{ padding: "2px 8px" }}>
              164 Aktif Şirket • %98.4 Müşteri Sadakati
            </span>
          </div>
          <p className="adm-header__subtitle">
            Kurumsal lisans aboneleri, özel yazılım müşterileri, sözleşme yenileme takvimi, kullanıcı kotaları ve 360° şirket kartları
          </p>
        </div>

        <div className="adm-header__controls" style={{ flexWrap: "wrap" }}>
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${tierFilter === "all" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTierFilter("all")}
            >
              Tüm Segmentler
            </button>
            <button
              className={`adm-seg__btn ${tierFilter === "enterprise" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTierFilter("enterprise")}
            >
              Enterprise VIP
            </button>
            <button
              className={`adm-seg__btn ${tierFilter === "midmarket" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTierFilter("midmarket")}
            >
              Kurumsal KOBİ
            </button>
            <button
              className={`adm-seg__btn ${tierFilter === "retail" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setTierFilter("retail")}
            >
              Perakende & Saha
            </button>
          </div>

          <button className="adm-topbar__btn" title="Müşteri Portföyünü İndir">
            <Download size={13} />
            <span>Portföy (Excel/CSV)</span>
          </button>

          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="adm-topbar__btn adm-topbar__btn--primary"
          >
            <Plus size={14} />
            <span>Yeni Şirket Ekle</span>
          </button>
        </div>
      </div>

      {/* Quick-Add Client Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddClient}
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
            Yeni Kurumsal Müşteri:
          </span>
          <input
            type="text"
            placeholder="Resmi Şirket Ünvanı *"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            required
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
            placeholder="Ana Yetkili Adı Soyadı *"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            required
            style={{
              height: "30px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
              flex: "1 1 160px",
            }}
          />
          <input
            type="text"
            placeholder="Şehir"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            style={{
              height: "30px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
              width: "120px",
            }}
          />
          <input
            type="text"
            placeholder="Yıllık Sözleşme (ARR)"
            value={newArr}
            onChange={(e) => setNewArr(e.target.value)}
            style={{
              height: "30px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
              width: "140px",
            }}
          />
          <button type="submit" className="adm-topbar__btn adm-topbar__btn--primary">
            Şirketi Oluştur
          </button>
          <button type="button" onClick={() => setShowAddForm(false)} className="adm-topbar__btn">
            İptal
          </button>
        </form>
      )}

      {/* 5-Column High-Density KPI Row */}
      <div className="adm-kpi-grid">
        <div className="adm-kpi-card" style={{ borderColor: "rgba(0, 113, 227, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Aktif Kurumsal Şirketler</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Building2 size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">164 Şirket</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">68 Enterprise</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>96 KOBİ & Zincir</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Yıllık Sözleşme Hacmi (ARR)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <CircleDollarSign size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺22.080.000</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">+18.4% YoY</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>₺1.84M Aylık MRR</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Net Müşteri Tutundurma (NRR)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Award size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%98.4</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">1.248 Koltuk</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>%1.6 yıllık kayıp</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">30 Günde Yenilenecekler</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <Calendar size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">9 Sözleşme</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--warning">₺1.42M Değer</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>2 tanesi bu hafta</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ort. Müşteri Sağlık Skoru</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <ShieldCheck size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">94.8 / 100</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">VIP SLA Aktif</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>0 kritik şikayet</span>
          </div>
        </div>
      </div>

      {/* Main Enterprise Client Table with 360° Expandable Account Inspector */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card__title">
              <Users size={15} color="var(--adm-primary)" />
              Kurumsal Müşteri & Şirket Envanteri
            </span>
            <span className="adm-badge adm-badge--info">{filteredClients.length} Şirket Listeleniyor</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Şirket, yetkili, şehir veya ürün ara..."
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

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${statusFilter === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                Tümü ({clients.length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "active" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("active")}
              >
                Aktif Aboneler ({activeCount})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "project" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("project")}
              >
                Ek Proje Sürecinde ({projectCount})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "renewal" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("renewal")}
              >
                Yenilemesi Yaklaşan ({renewalCount})
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Müşteri ID</th>
                <th>Şirket Ünvanı & Sektör</th>
                <th>Ana Yetkili & İletişim</th>
                <th>Kullanılan Ürünler & Kota</th>
                <th>Yıllık Ciro (ARR)</th>
                <th>Yenileme Tarihi</th>
                <th>Sağlık & Durum</th>
                <th style={{ textAlign: "right" }}>İnceleme</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => {
                const isExpanded = expandedClientId === client.id;
                const isRenewalSent = renewalSentIds[client.id];
                const seatPct = Math.min(100, Math.round((client.seatCount / client.seatLimit) * 100));

                return (
                  <Fragment key={client.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontWeight: 700,
                              fontSize: "11px",
                              color: "var(--adm-text)",
                            }}
                          >
                            {client.id}
                          </span>
                          <span
                            className={`adm-badge ${
                              client.tier === "enterprise"
                                ? "adm-badge--info"
                                : client.tier === "retail"
                                ? "adm-badge--purple"
                                : "adm-badge--neutral"
                            }`}
                            style={{ fontSize: "9.5px", width: "fit-content" }}
                          >
                            {client.tierLabel}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="adm-table__client">
                          <div className="adm-table__client-avatar">{client.name.charAt(0)}</div>
                          <div className="adm-table__client-meta">
                            <div className="adm-table__client-name">{client.name}</div>
                            <div className="adm-table__client-sub">
                              {client.industry} • {client.city}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: "11.5px" }}>
                          <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                            {client.contactName}
                          </div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            {client.contactRole} • {client.phone}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "290px" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {client.products.map((prod, pIdx) => (
                              <span
                                key={pIdx}
                                className="adm-badge adm-badge--neutral"
                                style={{ fontSize: "10px" }}
                              >
                                {prod}
                              </span>
                            ))}
                          </div>
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontFamily: "var(--font-mono)",
                              color: "var(--adm-text-secondary)",
                            }}
                          >
                            Kota: {client.seatUsage} (%{seatPct})
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontWeight: 700,
                              color: "var(--adm-text)",
                            }}
                          >
                            {client.arr}
                          </span>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            Toplam LTV: {client.ltv}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11.5px" }}>
                            {client.renewalDate}
                          </span>
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontWeight: 600,
                              color: client.daysToRenewal <= 30 ? "#d97706" : "var(--adm-text-muted)",
                            }}
                          >
                            {client.daysToRenewal} gün kaldı
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "155px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                            <span
                              className={`adm-badge ${
                                client.status === "renewal"
                                  ? "adm-badge--warning"
                                  : client.status === "project"
                                  ? "adm-badge--info"
                                  : "adm-badge--success"
                              }`}
                            >
                              {client.statusText}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10.5px",
                                fontWeight: 700,
                                color: "#1a9e4b",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {client.healthScore}/100
                            </span>
                          </div>
                          <div className="adm-progress">
                            <div
                              className="adm-progress__fill"
                              style={{
                                width: `${client.healthScore}%`,
                                background: client.healthScore >= 92 ? "#1a9e4b" : "#0071e3",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            className="adm-table__action-btn"
                            onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                            style={{
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            {isExpanded ? "Kartı Kapat" : "360° Müşteri Kartı"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr style={{ background: "#f8fafc" }}>
                        <td colSpan={8} style={{ padding: "14px 18px" }}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1.2fr 1.1fr 1fr",
                              gap: "12px",
                              borderLeft: "3px solid var(--adm-primary)",
                              paddingLeft: "14px",
                            }}
                          >
                            {/* Col 1: Tax Info, Dedicated Server Node & Seat Quota */}
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
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                    Kurumsal Kimlik & Sunucu Altyapısı
                                  </span>
                                  <span className="adm-badge adm-badge--success">SLA: %99.98</span>
                                </div>

                                <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>
                                  <b>Vergi / Sicil:</b> {client.taxInfo}
                                </div>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--adm-primary)",
                                    background: "var(--adm-surface-2)",
                                    padding: "5px 8px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--adm-border-subtle)",
                                  }}
                                >
                                  Düğüm: {client.tenantNode}
                                </div>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "11.5px", fontWeight: 600 }}>
                                  Aktif Kota: {client.seatUsage}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpgradeSeats(client.id)}
                                  className="adm-table__action-btn"
                                  style={{ color: "var(--adm-primary)", fontWeight: 600 }}
                                >
                                  +10 Kullanıcı Ekle
                                </button>
                              </div>
                            </div>

                            {/* Col 2: Account Manager Note & Operational Summary */}
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
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                    Müşteri Başarı Notu & Durum Özeti
                                  </span>
                                  <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                    Temsilci: <b>{client.accountManager}</b>
                                  </span>
                                </div>

                                <p
                                  style={{
                                    fontSize: "11.5px",
                                    color: "var(--adm-text-secondary)",
                                    lineHeight: 1.48,
                                    margin: 0,
                                    background: "var(--adm-surface-2)",
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--adm-border-subtle)",
                                  }}
                                >
                                  {client.lastNote}
                                </p>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "11px",
                                  color: "var(--adm-text-muted)",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                <span>Yıllık ARR: {client.arr}</span>
                                <span>Toplam LTV: {client.ltv}</span>
                              </div>
                            </div>

                            {/* Col 3: Direct Renewal & Communication Actions */}
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
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                  Sözleşme & İletişim İşlemleri
                                </span>
                                <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                  Yetkili: {client.contactName} ({client.email})
                                </span>
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <button
                                  type="button"
                                  onClick={() => handleSendRenewalNotice(client.id)}
                                  className="adm-topbar__btn adm-topbar__btn--primary"
                                  style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    background: isRenewalSent ? "#1a9e4b" : undefined,
                                    borderColor: isRenewalSent ? "#1a9e4b" : undefined,
                                  }}
                                >
                                  <Send size={13} />
                                  <span>
                                    {isRenewalSent
                                      ? "Yenileme & Ek Lisans Teklifi Gönderildi ✓"
                                      : "Sözleşme Yenileme / Upsell Teklifi Gönder"}
                                  </span>
                                </button>

                                <div style={{ display: "flex", gap: "6px" }}>
                                  <a
                                    href={`tel:${client.phone}`}
                                    className="adm-topbar__btn"
                                    style={{ flex: 1, justifyContent: "center" }}
                                  >
                                    <PhoneCall size={12} />
                                    <span>Yetkiliyi Ara</span>
                                  </a>
                                  <a
                                    href={`mailto:${client.email}`}
                                    className="adm-topbar__btn"
                                    style={{ flex: 1, justifyContent: "center" }}
                                  >
                                    <Mail size={12} />
                                    <span>E-Posta</span>
                                  </a>
                                </div>
                              </div>
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

      {/* Row 3: Industry ARR Breakdown, Upcoming Renewals & Expansion Stream (3 Columns) */}
      <div className="adm-grid-3col">
        {/* Col 1: Industry Revenue Share */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Layers size={15} color="#0071e3" />
              Sektörel Müşteri & Ciro Dağılımı
            </span>
            <span className="adm-badge adm-badge--info">₺22.1M ARR</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { ind: "Üretim Sanayi & Holdingler (OSB)", count: "52 Şirket (%36)", arr: "₺7.95M", pct: 36, col: "#0071e3" },
              { ind: "Lojistik, Filo & Antrepo", count: "38 Şirket (%26)", arr: "₺5.74M", pct: 26, col: "#1a9e4b" },
              { ind: "Perakende & Mağaza Zincirleri", count: "44 Şirket (%22)", arr: "₺4.86M", pct: 22, col: "#9a5cf5" },
              { ind: "Finans, Sağlık & Kurumsal Hizmet", count: "30 Şirket (%16)", arr: "₺3.53M", pct: 16, col: "#f59e0b" },
            ].map((row, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{row.ind}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                    {row.count} • {row.arr}
                  </span>
                </div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${row.pct}%`, background: row.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Upcoming Contract & License Renewals */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Calendar size={15} color="#f59e0b" />
              Yaklaşan Sözleşme Yenilemeleri
            </span>
            <span className="adm-badge adm-badge--warning">30 Gün İçinde</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                company: "Ege Perakende Mağazacılık A.Ş.",
                plan: "EfePOS 135 Kasa Terminali • ₺640.000/yıl",
                due: "18 Kasım 2026 (21 Gün Kaldı)",
                state: "Teklif İletildi",
              },
              {
                company: "Yılmaz Uluslararası Antrepo Ltd.",
                plan: "EfeERP WMS + 50 El Terminali • ₺310.000/yıl",
                due: "19 Kasım 2026 (22 Gün Kaldı)",
                state: "+25 Ek Kota Talebi",
              },
              {
                company: "Kuzey Kimya Sanayi A.Ş.",
                plan: "EfeERP Enterprise 60 Kullanıcı • ₺470.000/yıl",
                due: "25 Kasım 2026 (28 Gün Kaldı)",
                state: "Otomatik Yenileme",
              },
            ].map((rn, idx) => (
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
                    {rn.company}
                  </span>
                  <span className="adm-badge adm-badge--info" style={{ fontSize: "9.5px" }}>
                    {rn.state}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{rn.plan}</div>
                <div style={{ fontSize: "10.5px", color: "#d97706", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  Bitiş: {rn.due}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Account Expansion (Upsell) & Activity Feed */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <TrendingUp size={15} color="#1a9e4b" />
              Müşteri Genişleme & Lisans Hareketleri
            </span>
            <span className="adm-badge adm-badge--success">Canlı CRM</span>
          </div>

          <div className="adm-card__body">
            <div className="adm-activity-feed">
              {[
                {
                  col: "#1a9e4b",
                  company: "Atlas Holding A.Ş.",
                  action: "mevcut EfeERP aboneliğine +50 yeni kullanıcı koltuğu ekledi (+₺180.000/yıl).",
                  time: "Bugün • Lisans Genişleme (Upsell)",
                },
                {
                  col: "#0071e3",
                  company: "Borusan Lojistik A.Ş.",
                  action: "Özel Filo API projesinin 4. Sprint teslimatını onayladı.",
                  time: "Dün • Kurumsal Proje",
                },
                {
                  col: "#9a5cf5",
                  company: "Nova Tekstil A.Ş.",
                  action: "Avrupa B2B Sipariş Portalı modülü için yıllık bakım sözleşmesini yeniledi.",
                  time: "2 gün önce • Sözleşme",
                },
                {
                  col: "#f59e0b",
                  company: "Anadolu Gıda Dağıtım",
                  action: "20 adet yeni Android saha satış tableti için EfePOS lisansı aktive etti.",
                  time: "4 gün önce • Saha Satış",
                },
              ].map((act, idx) => (
                <div key={idx} className="adm-activity-item">
                  <span className="adm-activity-item__dot" style={{ background: act.col }} />
                  <div className="adm-activity-item__content">
                    <div className="adm-activity-item__text">
                      <b>{act.company}</b> {act.action}
                    </div>
                    <div className="adm-activity-item__time">{act.time}</div>
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

