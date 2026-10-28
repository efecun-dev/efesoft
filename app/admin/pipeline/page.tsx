"use client";

import { Fragment, useState } from "react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock,
  FileText,
  Filter,
  Layers,
  Mail,
  PhoneCall,
  Plus,
  Presentation,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

type DealStage = "discovery" | "demo" | "proposal" | "negotiation" | "won";

interface PipelineDeal {
  id: string;
  company: string;
  industry: string;
  city: string;
  title: string;
  productTag: string;
  productBadge: "info" | "purple" | "success" | "warning";
  amount: number;
  amountFormatted: string;
  probability: number;
  stage: DealStage;
  stageLabel: string;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
  owner: string;
  nextMeeting: string;
  meetingType: string;
  closeDate: string;
  daysInStage: number;
  priority: "high" | "normal";
  stakeholders: string[];
  meetingNotes: string;
  modules: string[];
}

const STAGE_META: {
  key: DealStage;
  label: string;
  shortLabel: string;
  defaultProb: number;
  color: string;
  softBg: string;
  badgeClass: string;
}[] = [
  {
    key: "discovery",
    label: "1. Keşif & İhtiyaç Analizi",
    shortLabel: "Keşif & Analiz",
    defaultProb: 25,
    color: "#0071e3",
    softBg: "rgba(0, 113, 227, 0.08)",
    badgeClass: "adm-badge--info",
  },
  {
    key: "demo",
    label: "2. Teknik Demo & PoC",
    shortLabel: "Demo & PoC",
    defaultProb: 50,
    color: "#9a5cf5",
    softBg: "rgba(154, 92, 245, 0.1)",
    badgeClass: "adm-badge--purple",
  },
  {
    key: "proposal",
    label: "3. Mimari & Fiyat Teklifi",
    shortLabel: "Teklif Sunuldu",
    defaultProb: 70,
    color: "#0284c7",
    softBg: "rgba(2, 132, 199, 0.1)",
    badgeClass: "adm-badge--info",
  },
  {
    key: "negotiation",
    label: "4. Sözleşme Müzakeresi",
    shortLabel: "Müzakere",
    defaultProb: 85,
    color: "#d97706",
    softBg: "rgba(245, 158, 11, 0.12)",
    badgeClass: "adm-badge--warning",
  },
  {
    key: "won",
    label: "5. Kazanıldı & İmza",
    shortLabel: "Kazanıldı ✓",
    defaultProb: 100,
    color: "#1a9e4b",
    softBg: "rgba(26, 158, 75, 0.12)",
    badgeClass: "adm-badge--success",
  },
];

const INITIAL_DEALS: PipelineDeal[] = [
  {
    id: "DEAL-4092",
    company: "Borusan Lojistik A.Ş.",
    industry: "Lojistik & Tedarik Zinciri",
    city: "İstanbul",
    title: "Özel Filo Telemetri ERP & SAP S/4HANA Köprüsü",
    productTag: "Özel Yazılım + ERP",
    productBadge: "info",
    amount: 1450000,
    amountFormatted: "₺1.450.000",
    probability: 85,
    stage: "negotiation",
    stageLabel: "Müzakere",
    contactName: "Kerem Arslan",
    contactRole: "IT & Dijital Dönüşüm Direktörü",
    phone: "+90 532 890 12 44",
    email: "kerem.arslan@borusan.com.tr",
    owner: "Emirhan Demir",
    nextMeeting: "Yarın 14:00",
    meetingType: "Hukuk & SLA Son Müzakere (Teams)",
    closeDate: "04 Kasım 2026",
    daysInStage: 4,
    priority: "high",
    stakeholders: ["Kerem Arslan (IT Dir.)", "Hakan Çelik (CFO)", "Borusan Hukuk Müşavirliği"],
    meetingNotes:
      "850 ağır vasıta için canlı GPS/OBD-II telemetri PoC testi %100 başarıyla tamamlandı. SLA maddelerinde 15dk kritik müdahale garantisi üzerinde mutabık kalındı, imza aşamasına geçiliyor.",
    modules: ["Gerçek Zamanlı Filo API", "SAP S/4HANA Çift Yönlü Sync", "İzmir Dedicated K8s Kümesi"],
  },
  {
    id: "DEAL-4091",
    company: "SOCAR Türkiye Enerji A.Ş.",
    industry: "Enerji & Petrokimya",
    city: "İzmir (Aliağa)",
    title: "Rafineri Saha Bakım, İSG & Mobil Denetim Platformu",
    productTag: "Özel Kurumsal",
    productBadge: "purple",
    amount: 2100000,
    amountFormatted: "₺2.100.000",
    probability: 70,
    stage: "proposal",
    stageLabel: "Teklif Sunuldu",
    contactName: "Elif Şahin",
    contactRole: "Operasyonel Mükemmellik Grup Md.",
    phone: "+90 530 441 88 20",
    email: "elif.sahin@socar.com.tr",
    owner: "Emirhan Demir",
    nextMeeting: "30 Ekim 11:00",
    meetingType: "Yönetim Kurulu Bütçe Sunumu",
    closeDate: "15 Kasım 2026",
    daysInStage: 6,
    priority: "high",
    stakeholders: ["Elif Şahin (Grup Md.)", "Tamer Karadağ (Bilgi Güvenliği Md.)"],
    meetingNotes:
      "Aliağa tesislerinde çevrimdışı (offline-first) çalışabilen iOS/Android tablet denetim uygulaması ve ISO-27001 on-premise sunucu mimarisi teklifi sunuldu.",
    modules: ["Offline-First iOS/Android", "On-Premise K8s Kurulumu", "AI Anomali Raporlama"],
  },
  {
    id: "DEAL-4090",
    company: "Ege Perakende Mağazacılık A.Ş.",
    industry: "Perakende Zinciri",
    city: "İzmir",
    title: "65 Mağaza EfePOS Bulut Kasa & Merkez Depo Geçişi",
    productTag: "EfePOS Enterprise",
    productBadge: "warning",
    amount: 780000,
    amountFormatted: "₺780.000",
    probability: 85,
    stage: "negotiation",
    stageLabel: "Müzakere",
    contactName: "Ahmet Bulut",
    contactRole: "Genel Müdür",
    phone: "+90 542 334 91 22",
    email: "ahmet@egeperakende.com",
    owner: "Burak Yılmaz",
    nextMeeting: "Bugün 16:30",
    meetingType: "Ödeme Planı & Donanım Teslim (Ofis)",
    closeDate: "02 Kasım 2026",
    daysInStage: 3,
    priority: "high",
    stakeholders: ["Ahmet Bulut (GM)", "Sinan Koç (Perakende Operasyon Md.)"],
    meetingNotes:
      "3 pilot mağazada EfePOS hızlı kasa ve Ingenico ÖKC entegrasyonu test edildi. Kalan 62 mağazanın 2 haftada sıfır kesintiyle devreye alınması için sözleşme son okumasında.",
    modules: ["EfePOS 130 Terminal Lisansı", "Merkezi Stok & Fiyat Motoru", "GİB E-Arşiv Otomasyonu"],
  },
  {
    id: "DEAL-4089",
    company: "Medikal Park Sağlık Grubu",
    industry: "Sağlık & Hastane Ağı",
    city: "Ankara",
    title: "Tele-Tıp, Hasta Randevu & Doktor Mobil Portalı",
    productTag: "Özel Mobil & Web",
    productBadge: "purple",
    amount: 1150000,
    amountFormatted: "₺1.150.000",
    probability: 50,
    stage: "demo",
    stageLabel: "Demo & PoC",
    contactName: "Dr. Zeynep Koç",
    contactRole: "Medikal Dijitalleşme Direktörü",
    phone: "+90 530 678 99 10",
    email: "zeynep.koc@medikalpark.com",
    owner: "Zeynep Kaya",
    nextMeeting: "29 Ekim 15:00",
    meetingType: "Canlı HBYS & Görüntülü Muayene PoC",
    closeDate: "20 Kasım 2026",
    daysInStage: 5,
    priority: "normal",
    stakeholders: ["Dr. Zeynep Koç", "Cenk Aydın (HBYS Altyapı Yöneticisi)"],
    meetingNotes:
      "KVKK sağlık verisi şifreleme standartları ve uçtan uca WebRTC görüntülü görüşme modülü için canlı PoC ortamı hazırlandı.",
    modules: ["WebRTC Görüntülü Muayene", "HBYS HL7/FHIR Entegrasyonu", "iOS & Android Hasta App"],
  },
  {
    id: "DEAL-4088",
    company: "Vestel Elektronik Sanayi A.Ş.",
    industry: "Üretim & Elektronik",
    city: "Manisa",
    title: "Yetkili Servis & Yedek Parça B2B Bayi Sipariş Ağı",
    productTag: "EfeCRM + B2B Portal",
    productBadge: "success",
    amount: 1680000,
    amountFormatted: "₺1.680.000",
    probability: 50,
    stage: "demo",
    stageLabel: "Demo & PoC",
    contactName: "Murat Çetin",
    contactRole: "Satış Sonrası Sistemler Müdürü",
    phone: "+90 533 210 44 19",
    email: "murat.cetin@vestel.com.tr",
    owner: "Emirhan Demir",
    nextMeeting: "31 Ekim 10:30",
    meetingType: "Manisa Kampüs Teknik Mimari Sunumu",
    closeDate: "25 Kasım 2026",
    daysInStage: 7,
    priority: "high",
    stakeholders: ["Murat Çetin", "Ayşe Demir (Tedarik Zinciri Bşk.)"],
    meetingNotes:
      "Türkiye genelindeki 420 yetkili servisin anlık yedek parça siparişi, garanti takibi ve cari mutabakatını yönetecek yüksek trafikli B2B portal demosu yapılacak.",
    modules: ["EfeCRM B2B Bayi Ağı", "Garanti & RMA Motoru", "Çoklu Döviz & Cari Hesap"],
  },
  {
    id: "DEAL-4087",
    company: "Atlas Holding A.Ş.",
    industry: "Holding & Çoklu Sektör",
    city: "İstanbul",
    title: "EfeERP Enterprise 250 Kullanıcı + Konsolide Bilanço",
    productTag: "EfeERP Enterprise",
    productBadge: "info",
    amount: 1280000,
    amountFormatted: "₺1.280.000",
    probability: 100,
    stage: "won",
    stageLabel: "Kazanıldı ✓",
    contactName: "Selin Yalçın",
    contactRole: "Grup Finans & ERP Koordinatörü",
    phone: "+90 533 112 40 80",
    email: "selin@atlasholding.com",
    owner: "Emirhan Demir",
    nextMeeting: "Tamamlandı",
    meetingType: "Sözleşme İmzalandı • Kick-off",
    closeDate: "26 Ekim 2026",
    daysInStage: 2,
    priority: "high",
    stakeholders: ["Selin Yalçın", "Orhan Atlas (Yönetim Kurulu Bşk. Vekili)"],
    meetingNotes:
      "6 grup şirketinin tek merkezden finansal konsolidasyonu ve EfeERP Enterprise 250 koltuk lisansı sözleşmesi imzalandı. İlk yıl lisans bedeli tahsil edildi.",
    modules: ["EfeERP 250 Kurumsal Koltuk", "Holding Konsolidasyon Modülü", "VIP 7/24 Dedicated SLA"],
  },
  {
    id: "DEAL-4086",
    company: "Kuzey Kimya Sanayi A.Ş.",
    industry: "Kimya & Üretim",
    city: "Kocaeli (Gebze OSB)",
    title: "Üretim Reçetesi (BOM), Lot Takip & Kalite Kontrol ERP",
    productTag: "EfeERP Üretim",
    productBadge: "info",
    amount: 640000,
    amountFormatted: "₺640.000",
    probability: 70,
    stage: "proposal",
    stageLabel: "Teklif Sunuldu",
    contactName: "Serkan Özkan",
    contactRole: "Fabrika Direktörü",
    phone: "+90 532 612 09 55",
    email: "s.ozkan@kuzeykimya.com.tr",
    owner: "Burak Yılmaz",
    nextMeeting: "01 Kasım 14:00",
    meetingType: "Kalite Laboratuvarı Entegrasyon Görüşmesi",
    closeDate: "18 Kasım 2026",
    daysInStage: 8,
    priority: "normal",
    stakeholders: ["Serkan Özkan (Fabrika Dir.)", "Derya Ulu (Ar-Ge & Kalite Md.)"],
    meetingNotes:
      "Tehlikeli madde (ADR) lot izlenebilirliği ve laboratuvar spektrometre cihazlarından otomatik kalite sonucu çekilmesi için özel konektör dahil teklif iletildi.",
    modules: ["EfeERP Kimya & Reçete", "Barkodlu Lot İzlenebilirlik", "LIMS Cihaz Entegrasyonu"],
  },
  {
    id: "DEAL-4085",
    company: "Anadolu Gıda Dağıtım A.Ş.",
    industry: "Hızlı Tüketim (FMCG)",
    city: "Bursa",
    title: "80 Saha Satış Tableti (Van-Selling) & Rota Optimizasyonu",
    productTag: "EfePOS + Saha CRM",
    productBadge: "warning",
    amount: 520000,
    amountFormatted: "₺520.000",
    probability: 25,
    stage: "discovery",
    stageLabel: "Keşif & Analiz",
    contactName: "Kemal Aydın",
    contactRole: "Saha Satış Direktörü",
    phone: "+90 535 778 34 12",
    email: "kemal@anadolugida.com.tr",
    owner: "Mert Aksoy",
    nextMeeting: "29 Ekim 11:30",
    meetingType: "Keşif & Saha Operasyon Analizi (Google Meet)",
    closeDate: "05 Aralık 2026",
    daysInStage: 3,
    priority: "normal",
    stakeholders: ["Kemal Aydın (Satış Dir.)", "Tolga Şen (Lojistik Şefi)"],
    meetingNotes:
      "Bursa ve Güney Marmara bölgesinde 80 dağıtım aracında sıcak/soğuk satış, araç içi mobil fatura basımı ve yapay zeka destekli günlük rut optimizasyonu talep ediliyor.",
    modules: ["EfePOS Saha Satış Mobil", "AI Rota Optimizasyonu", "Bluetooth Mobil Yazıcı SDK"],
  },
  {
    id: "DEAL-4084",
    company: "Folkart Yapı & Gayrimenkul A.Ş.",
    industry: "İnşaat & Gayrimenkul",
    city: "İzmir",
    title: "Yatırımcı CRM, Yurt Dışı Satış & Sözleşme Takip Sistemi",
    productTag: "EfeCRM Kurumsal",
    productBadge: "success",
    amount: 890000,
    amountFormatted: "₺890.000",
    probability: 25,
    stage: "discovery",
    stageLabel: "Keşif & Analiz",
    contactName: "Canan Erdem",
    contactRole: "Pazarlama ve Satış Genel Md. Yrd.",
    phone: "+90 532 409 81 70",
    email: "c.erdem@folkart.com.tr",
    owner: "Zeynep Kaya",
    nextMeeting: "30 Ekim 16:00",
    meetingType: "İzmir Merkez Ofis — Keşif Toplantısı",
    closeDate: "10 Aralık 2026",
    daysInStage: 2,
    priority: "high",
    stakeholders: ["Canan Erdem (CMO)", "Barış Kaya (Dijital Pazarlama Md.)"],
    meetingNotes:
      "3D kat planı üzerinden anlık daire/ofis rezervasyonu, çok dilli yatırımcı portalı ve senet/tahsilat takibi için kapsamlı ihtiyaç analizi yapılıyor.",
    modules: ["EfeCRM Gayrimenkul Paketi", "3D Kat Planı Rezervasyon", "Omnichannel WhatsApp/Call"],
  },
  {
    id: "DEAL-4083",
    company: "Nova Tekstil İhracat A.Ş.",
    industry: "Tekstil & Konfeksiyon",
    city: "Denizli",
    title: "Avrupa B2B Müşteri Sipariş & Koleksiyon Numune Portalı",
    productTag: "EfeCRM + B2B",
    productBadge: "success",
    amount: 740000,
    amountFormatted: "₺740.000",
    probability: 100,
    stage: "won",
    stageLabel: "Kazanıldı ✓",
    contactName: "Cemal Kaya",
    contactRole: "Yönetim Kurulu Üyesi",
    phone: "+90 532 994 55 12",
    email: "cemal@novatekstil.com",
    owner: "Burak Yılmaz",
    nextMeeting: "Tamamlandı",
    meetingType: "Canlıya Geçiş Tamamlandı",
    closeDate: "24 Ekim 2026",
    daysInStage: 4,
    priority: "normal",
    stakeholders: ["Cemal Kaya", "Pınar Ak (İhracat Md.)"],
    meetingNotes:
      "Almanya, İngiltere ve Hollanda'daki toptan alıcıların 3D kumaş kartelası seçip doğrudan üretim siparişi geçebildiği B2B portal sözleşmesi onaylandı.",
    modules: ["Çok Dilli B2B İhracat Portalı", "EfeERP Üretim Köprüsü", "SEPA & Swift Ödeme Takibi"],
  },
];

export default function AdminPipelinePage() {
  const [deals, setDeals] = useState<PipelineDeal[]>(INITIAL_DEALS);
  const [viewMode, setViewMode] = useState<"both" | "board" | "table">("both");
  const [stageFilter, setStageFilter] = useState<"all" | DealStage>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDealId, setExpandedDealId] = useState<string | null>("DEAL-4092");
  const [deckSentIds, setDeckSentIds] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Quick-add deal form state
  const [newCompany, setNewCompany] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newStage, setNewStage] = useState<DealStage>("discovery");

  const moveDealToStage = (dealId: string, targetStage: DealStage) => {
    const meta = STAGE_META.find((s) => s.key === targetStage);
    if (!meta) return;

    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? {
              ...d,
              stage: targetStage,
              stageLabel: meta.shortLabel,
              probability: meta.defaultProb,
              daysInStage: 1,
            }
          : d
      )
    );
  };

  const stepDealStage = (dealId: string, dir: -1 | 1) => {
    const current = deals.find((d) => d.id === dealId);
    if (!current) return;
    const idx = STAGE_META.findIndex((s) => s.key === current.stage);
    const nextIdx = Math.max(0, Math.min(STAGE_META.length - 1, idx + dir));
    if (nextIdx !== idx) {
      moveDealToStage(dealId, STAGE_META[nextIdx].key);
    }
  };

  const handleSendPresentation = (dealId: string) => {
    setDeckSentIds((prev) => ({ ...prev, [dealId]: true }));
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newTitle.trim()) return;

    const numericAmount =
      Number(newAmount.replace(/[^0-9]/g, "")) > 0
        ? Number(newAmount.replace(/[^0-9]/g, ""))
        : 650000;
    const formatted = `₺${numericAmount.toLocaleString("tr-TR")}`;
    const meta = STAGE_META.find((s) => s.key === newStage) || STAGE_META[0];

    const created: PipelineDeal = {
      id: `DEAL-${4093 + deals.length}`,
      company: newCompany.trim(),
      industry: "Kurumsal B2B",
      city: "İstanbul / İzmir",
      title: newTitle.trim(),
      productTag: "Özel Yazılım + Lisans",
      productBadge: "info",
      amount: numericAmount,
      amountFormatted: formatted,
      probability: meta.defaultProb,
      stage: newStage,
      stageLabel: meta.shortLabel,
      contactName: newContact.trim() || "Kurumsal Satın Alma Yetkilisi",
      contactRole: "Proje Sponsoru",
      phone: "+90 532 000 00 00",
      email: "iletisim@kurumsal.com.tr",
      owner: "Emirhan Demir",
      nextMeeting: "Yarın 15:00",
      meetingType: "Keşif & Mimari Toplantısı",
      closeDate: "30 Kasım 2026",
      daysInStage: 1,
      priority: "high",
      stakeholders: [newContact.trim() || "Proje Sponsoru", "IT Altyapı Ekibi"],
      meetingNotes:
        "Yeni satış fırsatı yönetim panelinden oluşturuldu. Teknik keşif sunumu ve lisans kapsam dökümü hazırlanıyor.",
      modules: ["EfeERP Kurumsal", "Özel API Entegrasyonu"],
    };

    setDeals((prev) => [created, ...prev]);
    setExpandedDealId(created.id);
    setNewCompany("");
    setNewTitle("");
    setNewAmount("");
    setNewContact("");
    setShowAddModal(false);
  };

  const filteredDeals = deals.filter((d) => {
    if (stageFilter !== "all" && d.stage !== stageFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        d.company.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.contactName.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.productTag.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPipelineAmount = deals.reduce((acc, d) => acc + d.amount, 0);
  const weightedPipelineAmount = deals.reduce(
    (acc, d) => acc + Math.round((d.amount * d.probability) / 100),
    0
  );
  const wonAmount = deals
    .filter((d) => d.stage === "won")
    .reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="adm-content">
      {/* Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Satış Görüşmeleri & Kurumsal Pipeline</h1>
            <span className="adm-badge adm-badge--success">
              Q4 Hedef Gerçekleşme: %86.4 • ₺{(totalPipelineAmount / 1000000).toFixed(2)}M Pipeline
            </span>
          </div>
          <p className="adm-header__subtitle">
            Kurumsal keşif toplantıları, teknik PoC demoları, sözleşme müzakereleri ve olasılık ağırlıklı gelir tahmini (Weighted Forecast)
          </p>
        </div>

        <div className="adm-header__controls">
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${viewMode === "both" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("both")}
            >
              Hibrit Görünüm
            </button>
            <button
              className={`adm-seg__btn ${viewMode === "board" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("board")}
            >
              Kanban Panosu (5 Aşama)
            </button>
            <button
              className={`adm-seg__btn ${viewMode === "table" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              Müzakere Tablosu
            </button>
          </div>

          <button
            onClick={() => setShowAddModal((v) => !v)}
            className="adm-topbar__btn adm-topbar__btn--primary"
          >
            <Plus size={14} />
            <span>Yeni Satış Fırsatı Ekle</span>
          </button>
        </div>
      </div>

      {/* Quick-Add Opportunity Bar */}
      {showAddModal && (
        <form
          onSubmit={handleCreateDeal}
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
            Yeni Pipeline Fırsatı:
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
              flex: "1 1 170px",
            }}
          />
          <input
            type="text"
            placeholder="Fırsat / Proje Başlığı *"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
            placeholder="Karar Verici Yetkili"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            style={{
              height: "30px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
              width: "150px",
            }}
          />
          <input
            type="text"
            placeholder="Tutar (Örn: 950000)"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            style={{
              height: "30px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
              width: "135px",
            }}
          />
          <select
            value={newStage}
            onChange={(e) => setNewStage(e.target.value as DealStage)}
            style={{
              height: "30px",
              padding: "0 8px",
              borderRadius: "6px",
              border: "1px solid var(--adm-border)",
              fontSize: "12px",
              background: "#ffffff",
            }}
          >
            {STAGE_META.map((st) => (
              <option key={st.key} value={st.key}>
                {st.shortLabel} (%{st.defaultProb})
              </option>
            ))}
          </select>
          <button type="submit" className="adm-topbar__btn adm-topbar__btn--primary">
            Pipeline&apos;a Ekle
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="adm-topbar__btn"
          >
            İptal
          </button>
        </form>
      )}

      {/* 5-Column High-Density KPI Row */}
      <div className="adm-kpi-grid">
        <div className="adm-kpi-card" style={{ borderColor: "rgba(0, 113, 227, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Toplam Pipeline Hacmi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Briefcase size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">
            ₺{totalPipelineAmount.toLocaleString("tr-TR")}
          </div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">{deals.length} Aktif Fırsat</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>
              Ort. ₺{Math.round(totalPipelineAmount / deals.length).toLocaleString("tr-TR")}
            </span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ağırlıklı Tahmini Gelir</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Sparkles size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">
            ₺{weightedPipelineAmount.toLocaleString("tr-TR")}
          </div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">
              %{Math.round((weightedPipelineAmount / totalPipelineAmount) * 100)} Ağırlıklı
            </span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Q4 Kapanış Tahmini</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Bu Hafta Satış Görüşmeleri</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Video size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">14 Toplantı</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">5 Canlı PoC Demo</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>3 YK Sunumu</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Onaylanan & İmzalanan</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <CheckCircle2 size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺{wonAmount.toLocaleString("tr-TR")}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">%34.8 Win Rate</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>+4.2% geçen çeyreğe göre</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ort. Satış Döngüsü Hızı</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <Clock size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">26 Gün</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--warning">Hedef: &lt;30 Gün</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Hazır Ürün: 12 gün</span>
          </div>
        </div>
      </div>

      {/* 5-Stage Interactive Kanban Pipeline Board */}
      {(viewMode === "both" || viewMode === "board") && (
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span className="adm-card__title">
                <Layers size={15} color="var(--adm-primary)" />
                5 Aşamalı Kurumsal Satış Panosu (Kanban Pipeline)
              </span>
              <span className="adm-badge adm-badge--info">
                Kartları Aşamalar Arası Taşıyabilirsiniz
              </span>
            </div>

            <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>
              Toplam Açık Fırsat: <b>{deals.length} Şirket</b> • Ağırlıklı Beklenti:{" "}
              <b style={{ fontFamily: "var(--font-mono)", color: "#1a9e4b" }}>
                ₺{weightedPipelineAmount.toLocaleString("tr-TR")}
              </b>
            </div>
          </div>

          <div
            className="adm-card__body"
            style={{
              overflowX: "auto",
              padding: "14px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(235px, 1fr))",
                gap: "12px",
                minWidth: "1180px",
              }}
            >
              {STAGE_META.map((stage, stageIdx) => {
                const stageDeals = deals.filter((d) => d.stage === stage.key);
                const stageSum = stageDeals.reduce((acc, d) => acc + d.amount, 0);
                const stageWeighted = Math.round((stageSum * stage.defaultProb) / 100);

                return (
                  <div
                    key={stage.key}
                    style={{
                      background: "var(--adm-surface-2)",
                      border: "1px solid var(--adm-border)",
                      borderRadius: "9px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                    }}
                  >
                    {/* Stage Column Header */}
                    <div
                      style={{
                        paddingBottom: "8px",
                        borderBottom: "1px solid var(--adm-border-subtle)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}>
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
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: stage.color,
                              flexShrink: 0,
                            }}
                          />
                          {stage.shortLabel}
                        </span>
                        <span className={`adm-badge ${stage.badgeClass}`}>
                          {stageDeals.length} Fırsat • %{stage.defaultProb}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          color: "var(--adm-text-secondary)",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: "var(--adm-text)" }}>
                          ₺{stageSum.toLocaleString("tr-TR")}
                        </span>
                        <span>Ağırlıklı: ₺{(stageWeighted / 1000).toFixed(0)}K</span>
                      </div>
                    </div>

                    {/* Deal Cards inside Stage */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {stageDeals.map((deal) => {
                        const isSelected = expandedDealId === deal.id;
                        return (
                          <div
                            key={deal.id}
                            style={{
                              background: "#ffffff",
                              border: isSelected
                                ? `1.5px solid ${stage.color}`
                                : "1px solid var(--adm-border)",
                              borderRadius: "8px",
                              padding: "10px 11px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "7px",
                              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10.5px",
                                  fontWeight: 700,
                                  color: "var(--adm-text-muted)",
                                }}
                              >
                                {deal.id}
                              </span>
                              <span className={`adm-badge adm-badge--${deal.productBadge}`}>
                                {deal.productTag}
                              </span>
                            </div>

                            <div>
                              <div style={{ fontWeight: 700, fontSize: "12.5px", color: "var(--adm-text)" }}>
                                {deal.company}
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "var(--adm-text-secondary)",
                                  marginTop: "2px",
                                  lineHeight: 1.35,
                                }}
                              >
                                {deal.title}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "5px 8px",
                                borderRadius: "6px",
                                background: stage.softBg,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontWeight: 700,
                                  fontSize: "12.5px",
                                  color: "var(--adm-text)",
                                }}
                              >
                                ₺{deal.amount.toLocaleString("tr-TR")}
                              </span>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10.5px",
                                  fontWeight: 700,
                                  color: stage.color,
                                }}
                              >
                                %{deal.probability} Olasılık
                              </span>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "10.5px",
                                color: "var(--adm-text-muted)",
                              }}
                            >
                              <span>👤 {deal.contactName}</span>
                              <span>📅 {deal.nextMeeting}</span>
                            </div>

                            {/* Card Footer Controls: Move Left / Right + Open Workspace */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "4px",
                                paddingTop: "5px",
                                borderTop: "1px solid var(--adm-border-subtle)",
                              }}
                            >
                              <div style={{ display: "flex", gap: "4px" }}>
                                {stageIdx > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => stepDealStage(deal.id, -1)}
                                    className="adm-table__action-btn"
                                    style={{ padding: "3px 6px" }}
                                    title="Önceki Aşamaya Taşı"
                                  >
                                    <ChevronLeft size={12} />
                                  </button>
                                )}
                                {stageIdx < STAGE_META.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => stepDealStage(deal.id, 1)}
                                    className="adm-table__action-btn"
                                    style={{ padding: "3px 7px", color: "var(--adm-primary)" }}
                                    title="Sonraki Aşamaya İlerlet"
                                  >
                                    <span>İlerlet</span>
                                    <ChevronRight size={12} />
                                  </button>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setExpandedDealId(deal.id);
                                  if (viewMode === "board") setViewMode("both");
                                }}
                                className="adm-table__action-btn"
                                style={{
                                  background: isSelected ? "var(--adm-primary)" : "#ffffff",
                                  color: isSelected ? "#ffffff" : "var(--adm-text-secondary)",
                                  borderColor: isSelected ? "var(--adm-primary)" : "var(--adm-border)",
                                }}
                              >
                                Görüşme Odası
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Pipeline & Negotiation Table with Expandable Meeting Room */}
      {(viewMode === "both" || viewMode === "table") && (
        <div className="adm-card">
          <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span className="adm-card__title">
                <Presentation size={15} color="var(--adm-primary)" />
                Aktif Satış Görüşmeleri & Sözleşme Müzakere Listesi
              </span>
              <span className="adm-badge adm-badge--info">{filteredDeals.length} Fırsat</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Search
                  size={13}
                  style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
                />
                <input
                  type="text"
                  placeholder="Şirket, proje, yetkili veya kod ara..."
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
                  className={`adm-seg__btn ${stageFilter === "all" ? "adm-seg__btn--active" : ""}`}
                  onClick={() => setStageFilter("all")}
                >
                  Tümü ({deals.length})
                </button>
                {STAGE_META.map((st) => (
                  <button
                    key={st.key}
                    className={`adm-seg__btn ${stageFilter === st.key ? "adm-seg__btn--active" : ""}`}
                    onClick={() => setStageFilter(st.key)}
                  >
                    {st.shortLabel} ({deals.filter((d) => d.stage === st.key).length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Fırsat Kodu</th>
                  <th>Şirket & Satış Fırsatı Başlığı</th>
                  <th>Karar Verici & İletişim</th>
                  <th>Teklif Tutarı & Ağırlıklı</th>
                  <th>Aşama & Olasılık</th>
                  <th>Sıradaki Görüşme / Demo</th>
                  <th>Hedef Kapanış</th>
                  <th style={{ textAlign: "right" }}>Müzakere</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => {
                  const isExpanded = expandedDealId === deal.id;
                  const isDeckSent = deckSentIds[deal.id];
                  const weightedVal = Math.round((deal.amount * deal.probability) / 100);
                  const stageObj = STAGE_META.find((s) => s.key === deal.stage) || STAGE_META[0];

                  return (
                    <Fragment key={deal.id}>
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
                              {deal.id}
                            </span>
                            <span className={`adm-badge adm-badge--${deal.productBadge}`}>
                              {deal.productTag}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="adm-table__client">
                            <div className="adm-table__client-avatar">{deal.company.charAt(0)}</div>
                            <div className="adm-table__client-meta">
                              <div className="adm-table__client-name">{deal.company}</div>
                              <div className="adm-table__client-sub" style={{ fontWeight: 500, color: "var(--adm-text-secondary)" }}>
                                {deal.title}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div style={{ fontSize: "11.5px" }}>
                            <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                              {deal.contactName}
                            </div>
                            <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                              {deal.contactRole} • {deal.city}
                            </div>
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
                              ₺{deal.amount.toLocaleString("tr-TR")}
                            </span>
                            <span
                              style={{
                                fontSize: "10.5px",
                                fontFamily: "var(--font-mono)",
                                color: "var(--adm-text-muted)",
                              }}
                            >
                              Ağırlıklı: ₺{weightedVal.toLocaleString("tr-TR")}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "150px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                              <span className={`adm-badge ${stageObj.badgeClass}`}>
                                {deal.stageLabel}
                              </span>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10.5px",
                                  fontWeight: 700,
                                  color: stageObj.color,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                %{deal.probability}
                              </span>
                            </div>
                            <div className="adm-progress">
                              <div
                                className="adm-progress__fill"
                                style={{
                                  width: `${deal.probability}%`,
                                  background: stageObj.color,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontWeight: 600, fontSize: "11.5px", color: "var(--adm-primary)" }}>
                              {deal.nextMeeting}
                            </span>
                            <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                              {deal.meetingType}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11.5px" }}>
                              {deal.closeDate}
                            </span>
                            <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                              Mimar: {deal.owner}
                            </span>
                          </div>
                        </td>

                        <td style={{ textAlign: "right" }}>
                          <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                            <button
                              className="adm-table__action-btn"
                              onClick={() => setExpandedDealId(isExpanded ? null : deal.id)}
                              style={{
                                background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                                color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                                borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                              }}
                            >
                              {isExpanded ? "Odayı Kapat" : "Görüşme Odası"}
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
                                gridTemplateColumns: "1.3fr 1fr 1fr",
                                gap: "12px",
                                borderLeft: "3px solid var(--adm-primary)",
                                paddingLeft: "14px",
                              }}
                            >
                              {/* Col 1: Executive Meeting Notes, Stakeholders & Modules */}
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
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                      Son Toplantı Özeti & Karar Verici Kurul ({deal.id})
                                    </span>
                                    <span className="adm-badge adm-badge--neutral">{deal.industry}</span>
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
                                    {deal.meetingNotes}
                                  </p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                    {deal.modules.map((mod, idx) => (
                                      <span key={idx} className="adm-badge adm-badge--info">
                                        ✓ {mod}
                                      </span>
                                    ))}
                                  </div>
                                  <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                                    <b>Katılımcılar:</b> {deal.stakeholders.join(" • ")}
                                  </div>
                                </div>
                              </div>

                              {/* Col 2: Pipeline Stage Switcher & Forecast Metrics */}
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
                                    Pipeline Aşaması & Olasılık Yönetimi
                                  </span>

                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "11.5px",
                                      padding: "4px 0",
                                      borderBottom: "1px solid var(--adm-border-subtle)",
                                    }}
                                  >
                                    <span style={{ color: "var(--adm-text-muted)" }}>Ağırlıklı Gelir Katkısı:</span>
                                    <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#1a9e4b" }}>
                                      ₺{weightedVal.toLocaleString("tr-TR")} (%{deal.probability})
                                    </span>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "11.5px",
                                      padding: "4px 0",
                                      borderBottom: "1px solid var(--adm-border-subtle)",
                                    }}
                                  >
                                    <span style={{ color: "var(--adm-text-muted)" }}>Sıradaki Toplantı:</span>
                                    <span style={{ fontWeight: 600 }}>{deal.nextMeeting}</span>
                                  </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                  <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                                    Fırsat Aşamasını Değiştir:
                                  </span>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                    {STAGE_META.map((st) => (
                                      <button
                                        key={st.key}
                                        type="button"
                                        onClick={() => moveDealToStage(deal.id, st.key)}
                                        className="adm-table__action-btn"
                                        style={{
                                          background: deal.stage === st.key ? "var(--adm-primary)" : "#ffffff",
                                          color: deal.stage === st.key ? "#ffffff" : "var(--adm-text-secondary)",
                                          borderColor:
                                            deal.stage === st.key ? "var(--adm-primary)" : "var(--adm-border)",
                                        }}
                                      >
                                        {st.shortLabel}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Col 3: Executive Presentation Deck & Direct Contact */}
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
                                    Toplantı & Teklif Aksiyon Merkezi
                                  </span>
                                  <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                    Karar Verici: {deal.contactName} ({deal.email})
                                  </span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  <button
                                    type="button"
                                    onClick={() => handleSendPresentation(deal.id)}
                                    className="adm-topbar__btn adm-topbar__btn--primary"
                                    style={{
                                      width: "100%",
                                      justifyContent: "center",
                                      background: isDeckSent ? "#1a9e4b" : undefined,
                                      borderColor: isDeckSent ? "#1a9e4b" : undefined,
                                    }}
                                  >
                                    <Send size={13} />
                                    <span>
                                      {isDeckSent
                                        ? "Sunum Paketi & Takvim Daveti Gönderildi ✓"
                                        : "Toplantı Daveti & Mimari Sunum Gönder"}
                                    </span>
                                  </button>

                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <a
                                      href={`tel:${deal.phone}`}
                                      className="adm-topbar__btn"
                                      style={{ flex: 1, justifyContent: "center" }}
                                    >
                                      <PhoneCall size={12} />
                                      <span>Yetkiliyi Ara</span>
                                    </a>
                                    <a
                                      href={`mailto:${deal.email}?subject=${encodeURIComponent(
                                        `Efesoft Kurumsal Çözüm & Sözleşme Görüşmesi - ${deal.company}`
                                      )}`}
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
      )}

      {/* Bottom 3-Column Row: Weekly Executive Meetings, Stage Funnel & Sales Team Leaderboard */}
      <div className="adm-grid-3col">
        {/* Col 1: Upcoming Sales & PoC Meetings Calendar */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Calendar size={15} color="#0071e3" />
              Bu Haftanın Kritik Görüşme Takvimi
            </span>
            <span className="adm-badge adm-badge--info">14 Toplantı</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                company: "Ege Perakende Mağazacılık A.Ş.",
                topic: "65 Mağaza EfePOS Sözleşme & Donanım Teslim Planı",
                time: "Bugün 16:30 • İzmir Merkez Ofis",
                badge: "Sözleşme İmza",
                badgeType: "adm-badge--warning",
              },
              {
                company: "Borusan Lojistik A.Ş.",
                topic: "Filo ERP & SAP S/4HANA SLA Son Müzakeresi",
                time: "Yarın 14:00 • Microsoft Teams",
                badge: "Son Müzakere",
                badgeType: "adm-badge--success",
              },
              {
                company: "Medikal Park Sağlık Grubu",
                topic: "Canlı Tele-Tıp & HBYS Entegrasyon PoC Demosu",
                time: "29 Ekim 15:00 • Google Meet",
                badge: "Canlı PoC",
                badgeType: "adm-badge--purple",
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "12px", color: "var(--adm-text)" }}>
                    {mt.company}
                  </span>
                  <span className={`adm-badge ${mt.badgeType}`}>{mt.badge}</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{mt.topic}</div>
                <div style={{ fontSize: "10.5px", color: "var(--adm-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  ⏰ {mt.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Stage Conversion & Volume Funnel */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Target size={15} color="#1a9e4b" />
              Aşama Bazlı Huni & Dönüşüm Oranı
            </span>
            <span className="adm-badge adm-badge--success">%34.8 Kazanım</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {STAGE_META.map((st) => {
              const stDeals = deals.filter((d) => d.stage === st.key);
              const stSum = stDeals.reduce((acc, d) => acc + d.amount, 0);
              const sharePct = Math.max(
                10,
                Math.round((stSum / Math.max(1, totalPipelineAmount)) * 100)
              );

              return (
                <div key={st.key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", gap: "8px" }}>
                    <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{st.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                      {stDeals.length} Fırsat • ₺{(stSum / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="adm-progress">
                    <div
                      className="adm-progress__fill"
                      style={{ width: `${sharePct}%`, background: st.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Col 3: Solution Architects & Sales Team Quota Attainment */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <TrendingUp size={15} color="#9a5cf5" />
              Çözüm Mimarları & Satış Ekibi Kotası
            </span>
            <span className="adm-badge adm-badge--purple">Q4 2026</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                name: "Emirhan Demir (Kurucu & Baş Mimar)",
                vol: "₺6.510.000 Pipeline • 4 Enterprise Fırsat",
                pct: 94,
                col: "#0071e3",
              },
              {
                name: "Burak Yılmaz (Kurumsal ERP & POS)",
                vol: "₺2.160.000 Pipeline • 3 Aktif Fırsat",
                pct: 86,
                col: "#1a9e4b",
              },
              {
                name: "Zeynep Kaya (Özel Yazılım & Mobil)",
                vol: "₺2.040.000 Pipeline • 2 Aktif Fırsat",
                pct: 82,
                col: "#9a5cf5",
              },
              {
                name: "Mert Aksoy (Saha Satış & KOBİ)",
                vol: "₺1.420.000 Pipeline • 4 Aktif Fırsat",
                pct: 76,
                col: "#f59e0b",
              },
            ].map((rep, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", gap: "8px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{rep.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: rep.col }}>
                    %{rep.pct} Hedef
                  </span>
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>{rep.vol}</div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${rep.pct}%`, background: rep.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
