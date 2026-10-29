"use client";

import { useState, useMemo, Fragment } from "react";
import { AdminModal } from "../AdminModal";
import {
  Monitor,
  Laptop,
  Server,
  Calendar,
  Clock,
  Activity,
  Zap,
  TrendingUp,
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Video,
  Play,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
  Send,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Share2,
  Terminal,
  FileText,
  BadgeCheck,
  SlidersHorizontal,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

export type DemoProduct = "erp" | "crm" | "pos" | "ai";
export type DemoType = "guided_call" | "self_sandbox" | "hybrid";
export type DemoStatus = "pending" | "scheduled" | "sandbox_active" | "completed" | "converted";

export interface DemoRecord {
  id: string;
  company: string;
  companyCode: string;
  sector: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  product: DemoProduct;
  productName: string;
  productTheme: string;
  demoType: DemoType;
  demoTypeLabel: string;
  status: DemoStatus;
  statusLabel: string;
  requestedAt: string;
  scheduledDate?: string;
  assignedEngineer?: string;
  meetingPlatform?: "Google Meet" | "Microsoft Teams" | "Efesoft WebRTC";
  meetingLink?: string;
  sandbox?: {
    subdomain: string;
    fullUrl: string;
    status: "running" | "provisioning" | "expired" | "not_provisioned";
    expiresAt: string;
    daysRemaining: number;
    activeSessions: number;
    datacenter: string;
    clusterNode: string;
    dataProfile: string;
    username: string;
    tempPass: string;
  };
  modules: string[];
  leadNotes: string;
  dealPotentialFormatted: string;
}

/* -------------------------------------------------------------------------- */
/*  MOCK DATA: 12 REALISTIC TURKISH ENTERPRISE DEMO REQUESTS                   */
/* -------------------------------------------------------------------------- */

const INITIAL_DEMOS: DemoRecord[] = [
  {
    id: "DEMO-2026-9041",
    company: "KoçSistem Bilgi Teknolojileri A.Ş.",
    companyCode: "KOC-842",
    sector: "Bilişim & Sistem Entegrasyonu",
    contactName: "Selim Kara",
    contactTitle: "CTO / Altyapı Direktörü",
    contactEmail: "selim.kara@kocsistem.com.tr",
    contactPhone: "+90 532 941 82 00",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    demoType: "hybrid",
    demoTypeLabel: "Sunum + Canlı Sandbox",
    status: "sandbox_active",
    statusLabel: "Aktif Sandbox Devrede",
    requestedAt: "Dün 14:20",
    scheduledDate: "30 Eki 2026, 14:00",
    assignedEngineer: "Emirhan Demir (Baş Mimar)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-koc-demo",
    sandbox: {
      subdomain: "kocsistem-sandbox.efesoft.com.tr",
      fullUrl: "https://kocsistem-sandbox.efesoft.com.tr",
      status: "running",
      expiresAt: "05.11.2026",
      daysRemaining: 7,
      activeSessions: 6,
      datacenter: "Frankfurt DC (Zone-A)",
      clusterNode: "k8s-pod-efes-sbx-419a",
      dataProfile: "Üretim & İmalat ERP Veri Seti",
      username: "demo_admin",
      tempPass: "KocSistem@2026!Demo",
    },
    modules: ["GİB e-Dönüşüm (e-Fatura / e-Arşiv)", "WMS Akıllı Depo & El Terminali", "MRP-II Üretim & Reçete", "B2B Bayi Portalı"],
    leadNotes: "Mevcut SAP mimarisinden EfeERP'ye geçiş fizibilitesi yapılıyor. WMS barkodlu terminal hızını ve offline POS entegrasyonunu canlı görmek istiyorlar.",
    dealPotentialFormatted: "₺1.440.000 / Yıl",
  },
  {
    id: "DEMO-2026-9042",
    company: "Getir Perakende Lojistik A.Ş.",
    companyCode: "GTR-104",
    sector: "Hızlı Teslimat & Perakende",
    contactName: "Nazlı Kaya",
    contactTitle: "IT Operasyon & Kasa Sistemleri Müdürü",
    contactEmail: "nazli.kaya@getir.com",
    contactPhone: "+90 533 118 40 21",
    product: "pos",
    productName: "EfePOS Yeni Nesil Kasa & Perakende",
    productTheme: "#10b981",
    demoType: "guided_call",
    demoTypeLabel: "Rehberli Canlı Sunum",
    status: "scheduled",
    statusLabel: "Randevu Verildi",
    requestedAt: "Bugün 09:15",
    scheduledDate: "Yarın, 11:30",
    assignedEngineer: "Selin Yılmaz (Kıdemli Danışman)",
    meetingPlatform: "Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/efe-getir-pos",
    sandbox: {
      subdomain: "getir-pos-preview.efesoft.com.tr",
      fullUrl: "https://getir-pos-preview.efesoft.com.tr",
      status: "provisioning",
      expiresAt: "03.11.2026",
      daysRemaining: 5,
      activeSessions: 0,
      datacenter: "İzmir Veri Merkezi (Cloud-1)",
      clusterNode: "k8s-pod-efes-pos-814",
      dataProfile: "Omnichannel Perakende & Hızlı Kasa",
      username: "demo_getir",
      tempPass: "GetirPos@2026!Safe",
    },
    modules: ["Offline SQLite Kasa Senkronizasyonu", "GİB Yeni Nesil ÖKC Entegrasyonu", "Hızlı Barkod & Terazili Satış", "Merkezi Fiyat Yönetimi"],
    leadNotes: "1.200 dark store ve fiziksel perakende noktası için internet kesildiğinde durmayan offline POS motoru arıyorlar.",
    dealPotentialFormatted: "₺980.000 / Yıl",
  },
  {
    id: "DEMO-2026-9043",
    company: "Trendyol Marketplace Lojistik",
    companyCode: "TRN-902",
    sector: "E-Ticaret Pazaryeri & Depolama",
    contactName: "Barış Özkan",
    contactTitle: "Veri Grubu & AI Direktörü",
    contactEmail: "baris.ozkan@trendyol.com",
    contactPhone: "+90 542 389 77 12",
    product: "ai",
    productName: "EfeAI Kurumsal Karar Destek & Veri Ajanı",
    productTheme: "#f59e0b",
    demoType: "self_sandbox",
    demoTypeLabel: "İzole Test Ortamı",
    status: "sandbox_active",
    statusLabel: "Aktif Sandbox Devrede",
    requestedAt: "2 gün önce",
    scheduledDate: "31 Eki 2026, 16:00",
    assignedEngineer: "Emirhan Demir (Baş Mimar)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-ai-rag-demo",
    sandbox: {
      subdomain: "trendyol-ai-sandbox.efesoft.com.tr",
      fullUrl: "https://trendyol-ai-sandbox.efesoft.com.tr",
      status: "running",
      expiresAt: "08.11.2026",
      daysRemaining: 10,
      activeSessions: 8,
      datacenter: "Frankfurt DC (Zone-A)",
      clusterNode: "k8s-pod-efes-rag-991",
      dataProfile: "Doğal Dil SQL & Stok Anomali Seti",
      username: "data_lead",
      tempPass: "TrendyolAI@2026!Token",
    },
    modules: ["Doğal Dil ile SQL Sorgulama", "Finans & Sözleşme RAG Motoru", "Stok Anomali & Talep Tahminleme", "Kurumsal Veri İzolasyon Katmanı"],
    leadNotes: "Milyonlarca satırlık sipariş verisinde yöneticilerin doğal dille 'Geçen hafta en çok kâr bırakan 5 kategori hangisi?' gibi sorguları canlı test etmek istiyorlar.",
    dealPotentialFormatted: "₺640.000 / Yıl",
  },
  {
    id: "DEMO-2026-9044",
    company: "Borusan Otomotiv İthalat A.Ş.",
    companyCode: "BRS-312",
    sector: "Otomotiv & Lüks Dağıtım",
    contactName: "Melis Erdem",
    contactTitle: "Müşteri Deneyimi & Satış GMY",
    contactEmail: "melis.erdem@borusanotomotiv.com",
    contactPhone: "+90 530 650 91 44",
    product: "crm",
    productName: "EfeCRM Akıllı Müşteri & Satış Yönetimi",
    productTheme: "#8b5cf6",
    demoType: "guided_call",
    demoTypeLabel: "Rehberli Canlı Sunum",
    status: "pending",
    statusLabel: "Yeni Talep (İnceleniyor)",
    requestedAt: "35 dakika önce",
    modules: ["Görsel Kanban Satış Pipeline", "Resmi WhatsApp Cloud API Şablonları", "WebRTC Santral & Ses Kayıt", "Dinamik PDF Teklif Motoru"],
    leadNotes: "Premium araç satış sürecinde WhatsApp üzerinden teklif gönderme ve WebRTC çağrı merkezi entegrasyonu sunumu talep edildi.",
    dealPotentialFormatted: "₺520.000 / Yıl",
  },
  {
    id: "DEMO-2026-9045",
    company: "Eczacıbaşı Holding A.Ş.",
    companyCode: "ECZ-710",
    sector: "Holding & Tüketim Ürünleri",
    contactName: "Cengiz Aksoy",
    contactTitle: "Mali İşler & Dijital Dönüşüm Direktörü",
    contactEmail: "cengiz.aksoy@eczacibasi.com.tr",
    contactPhone: "+90 532 441 55 90",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    demoType: "hybrid",
    demoTypeLabel: "Sunum + Canlı Sandbox",
    status: "scheduled",
    statusLabel: "Randevu Verildi",
    requestedAt: "Dün 17:10",
    scheduledDate: "Cuma, 10:00",
    assignedEngineer: "Caner Kurt (ERP Çözüm Mimarı)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-eczacibasi-erp",
    sandbox: {
      subdomain: "eczacibasi-preview.efesoft.com.tr",
      fullUrl: "https://eczacibasi-preview.efesoft.com.tr",
      status: "running",
      expiresAt: "06.11.2026",
      daysRemaining: 8,
      activeSessions: 3,
      datacenter: "Frankfurt DC (Zone-A)",
      clusterNode: "k8s-pod-efes-erp-204",
      dataProfile: "Holding Konsolidasyon & e-Dönüşüm",
      username: "admin_ecz",
      tempPass: "Eczacibasi!2026Demo",
    },
    modules: ["Konsolide Çoklu Şirket Mali Tabloları", "GİB e-Defter & e-İrsaliye", "Satınalma & Tedarikçi Portalı", "Gelişmiş Banka MT940 Entegrasyonu"],
    leadNotes: "Grup şirketlerinin 14 ayrı tüzel kişiliğini tek EfeERP çatısında konsolide etme senaryosu üzerinde canlı oturum yapılacak.",
    dealPotentialFormatted: "₺1.850.000 / Yıl",
  },
  {
    id: "DEMO-2026-9046",
    company: "Mavi Giyim Sanayi ve Ticaret A.Ş.",
    companyCode: "MAV-440",
    sector: "Moda & Tekstil Perakendeciliği",
    contactName: "Zeynep Çelik",
    contactTitle: "Mağazacılık Teknolojileri Müdürü",
    contactEmail: "zeynep.celik@mavi.com",
    contactPhone: "+90 533 220 19 88",
    product: "pos",
    productName: "EfePOS Yeni Nesil Kasa & Perakende",
    productTheme: "#10b981",
    demoType: "hybrid",
    demoTypeLabel: "Sunum + Canlı Sandbox",
    status: "converted",
    statusLabel: "Satışa Dönüştü (Sözleşmede)",
    requestedAt: "1 hafta önce",
    scheduledDate: "Tamamlandı",
    assignedEngineer: "Selin Yılmaz (Kıdemli Danışman)",
    meetingPlatform: "Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/efe-mavi-pos-archive",
    sandbox: {
      subdomain: "mavi-pos-poc.efesoft.com.tr",
      fullUrl: "https://mavi-pos-poc.efesoft.com.tr",
      status: "running",
      expiresAt: "15.11.2026",
      daysRemaining: 17,
      activeSessions: 14,
      datacenter: "İzmir Veri Merkezi (Cloud-1)",
      clusterNode: "k8s-pod-efes-pos-440",
      dataProfile: "Tekstil & Barkod / Renk / Beden Matrisi",
      username: "mavi_admin",
      tempPass: "MaviPos@2026!Live",
    },
    modules: ["Renk / Beden / Drop Matris Barkodlama", "Sadakat & Puan Kampanya Motoru", "Mobil Mağaza İçi Satış & Ödeme", "Merkezi Envanter Sayımı"],
    leadNotes: "POC süreci 10 mağazada başarıyla tamamlandı. 340 mağaza için yıllık kurumsal lisans sözleşmesi imza aşamasına geçti.",
    dealPotentialFormatted: "₺1.120.000 / Yıl",
  },
  {
    id: "DEMO-2026-9047",
    company: "Şişecam Kurumsal Teknolojileri",
    companyCode: "SIS-603",
    sector: "Cam Sanayii & Küresel Üretim",
    contactName: "Murat Taner",
    contactTitle: "Endüstri 4.0 & Üretim Planlama Şefi",
    contactEmail: "mtaner@sisecam.com",
    contactPhone: "+90 535 712 00 45",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    demoType: "self_sandbox",
    demoTypeLabel: "İzole Test Ortamı",
    status: "sandbox_active",
    statusLabel: "Aktif Sandbox Devrede",
    requestedAt: "3 gün önce",
    scheduledDate: "02 Kas 2026, 15:00",
    assignedEngineer: "Caner Kurt (ERP Çözüm Mimarı)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-sisecam-demo",
    sandbox: {
      subdomain: "sisecam-sandbox.efesoft.com.tr",
      fullUrl: "https://sisecam-sandbox.efesoft.com.tr",
      status: "running",
      expiresAt: "12.11.2026",
      daysRemaining: 14,
      activeSessions: 5,
      datacenter: "Frankfurt DC (Zone-A)",
      clusterNode: "k8s-pod-efes-mrp-603",
      dataProfile: "Ağır Sanayi & Vardiya / Reçete Planlama",
      username: "sisecam_lead",
      tempPass: "Sisecam@2026!Secure",
    },
    modules: ["MRP-II Sonsuz Kapasite Çizelgeleme", "Fırın & Hat Bakım Takibi", "WMS Hammadde & Hurda Fire Kontrolü", "IoT Sensör Veri Bağlantısı"],
    leadNotes: "Fabrika hattındaki vardiya planlama ve reçete optimizasyonu sandbox ortamında 4 mühendis tarafından test ediliyor.",
    dealPotentialFormatted: "₺1.680.000 / Yıl",
  },
  {
    id: "DEMO-2026-9048",
    company: "Kibar Holding Dış Ticaret A.Ş.",
    companyCode: "KBR-219",
    sector: "Metal, İhracat & Tedarik Zinciri",
    contactName: "Aylin Güneş",
    contactTitle: "B2B Satış Operasyonları Müdürü",
    contactEmail: "aylin.gunes@kibar.com",
    contactPhone: "+90 544 901 34 29",
    product: "crm",
    productName: "EfeCRM Akıllı Müşteri & Satış Yönetimi",
    productTheme: "#8b5cf6",
    demoType: "guided_call",
    demoTypeLabel: "Rehberli Canlı Sunum",
    status: "pending",
    statusLabel: "Yeni Talep (İnceleniyor)",
    requestedAt: "2 saat önce",
    modules: ["B2B Bayi Ağı & Özel Fiyat Listeleri", "Dövizli Teklif & Kur Korumalı Sözleşmeler", "Outlook & Google Workspace Senkronizasyonu", "Satış Performans Skorlaması"],
    leadNotes: "42 ülkeye yapılan ihracat operasyonlarında çoklu para birimli teklif onay mekanizmasını canlı incelemek istiyorlar.",
    dealPotentialFormatted: "₺460.000 / Yıl",
  },
  {
    id: "DEMO-2026-9049",
    company: "LC Waikiki Perakende Hizmetleri",
    companyCode: "LCW-521",
    sector: "Hazır Giyim & Mağazacılık",
    contactName: "Ozan Bulut",
    contactTitle: "Perakende Altyapı & Otomasyon Lideri",
    contactEmail: "ozan.bulut@lcwaikiki.com",
    contactPhone: "+90 532 884 10 93",
    product: "pos",
    productName: "EfePOS Yeni Nesil Kasa & Perakende",
    productTheme: "#10b981",
    demoType: "self_sandbox",
    demoTypeLabel: "İzole Test Ortamı",
    status: "completed",
    statusLabel: "Sunum & Test Tamamlandı",
    requestedAt: "5 gün önce",
    scheduledDate: "Tamamlandı (28 Eki)",
    assignedEngineer: "Selin Yılmaz (Kıdemli Danışman)",
    meetingPlatform: "Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/efe-lcw-pos",
    sandbox: {
      subdomain: "lcw-sandbox.efesoft.com.tr",
      fullUrl: "https://lcw-sandbox.efesoft.com.tr",
      status: "expired",
      expiresAt: "28.10.2026",
      daysRemaining: 0,
      activeSessions: 0,
      datacenter: "İzmir Veri Merkezi (Cloud-1)",
      clusterNode: "k8s-pod-efes-pos-521",
      dataProfile: "Yüksek Trafikli Kasa Simülasyonu",
      username: "lcw_eval",
      tempPass: "LcwPos@2026!Poc",
    },
    modules: ["Saniyede 40 Fiş Kesme Stres Testi", "Merkezi Kampanya Senkronizasyonu", "GİB e-Arşiv Fatura Kuyruklama", "Masaüstü & Dokunmatik Hibrit UI"],
    leadNotes: "POC stres testleri başarılı geçti. 2027 bütçe planlamasına EfePOS lisanslama paketi teklifi sunuldu.",
    dealPotentialFormatted: "₺2.400.000 / Yıl",
  },
  {
    id: "DEMO-2026-9050",
    company: "Doğuş Otomotiv Servis ve Ticaret",
    companyCode: "DGS-882",
    sector: "Otomotiv Dağıtım & Servis Ağı",
    contactName: "Kerem Aydın",
    contactTitle: "CRM & Müşteri Bağlılığı Süreç Yöneticisi",
    contactEmail: "kerem.aydin@dogusotomotiv.com.tr",
    contactPhone: "+90 530 190 42 11",
    product: "crm",
    productName: "EfeCRM Akıllı Müşteri & Satış Yönetimi",
    productTheme: "#8b5cf6",
    demoType: "guided_call",
    demoTypeLabel: "Rehberli Canlı Sunum",
    status: "scheduled",
    statusLabel: "Randevu Verildi",
    requestedAt: "Dün 11:00",
    scheduledDate: "Pazartesi, 15:30",
    assignedEngineer: "Emirhan Demir (Baş Mimar)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-dogus-crm",
    modules: ["Yetkili Servis Randevu & Çağrı Entegrasyonu", "Otomatik SMS & WhatsApp Servis Bildirimi", "VIP Müşteri Yaşam Döngüsü Skorlama", "Merkezi Müşteri Şikayet Masası"],
    leadNotes: "Audi, VW ve Porsche servis ağındaki randevu bildirimleri ve müşteri memnuniyet anketleri için canlı demo yapılacak.",
    dealPotentialFormatted: "₺780.000 / Yıl",
  },
  {
    id: "DEMO-2026-9051",
    company: "Anadolu Efes İçecek Grubu",
    companyCode: "EFS-109",
    sector: "Hızlı Tüketim & Dağıtım Ağı",
    contactName: "Hande Öztürk",
    contactTitle: "Tedarik Zinciri & Lojistik Planlama Müdürü",
    contactEmail: "hande.ozturk@anadoluefes.com",
    contactPhone: "+90 533 502 98 14",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    demoType: "guided_call",
    demoTypeLabel: "Rehberli Canlı Sunum",
    status: "pending",
    statusLabel: "Yeni Talep (İnceleniyor)",
    requestedAt: "4 saat önce",
    modules: ["WMS Palet & Seri No İzlenebilirliği", "Rotalı Araç Yükleme & Sevkiyat", "GİB e-İrsaliye Entegrasyonu", "Konsolide Stok Sayım Motoru"],
    leadNotes: "Depolardaki palet barkodlama ve sevkiyat araçlarının rotalama algoritmalarını EfeERP üzerinden incelemek istiyorlar.",
    dealPotentialFormatted: "₺890.000 / Yıl",
  },
  {
    id: "DEMO-2026-9052",
    company: "Defacto Perakende Mağazacılık A.Ş.",
    companyCode: "DEF-331",
    sector: "Perakende & Küresel Moda",
    contactName: "Serdar Polat",
    contactTitle: "IT Altyapı & Mağaza Sistemleri Şefi",
    contactEmail: "serdar.polat@defacto.com.tr",
    contactPhone: "+90 532 674 81 20",
    product: "ai",
    productName: "EfeAI Kurumsal Karar Destek & Veri Ajanı",
    productTheme: "#f59e0b",
    demoType: "self_sandbox",
    demoTypeLabel: "İzole Test Ortamı",
    status: "sandbox_active",
    statusLabel: "Aktif Sandbox Devrede",
    requestedAt: "4 gün önce",
    scheduledDate: "03 Kas 2026, 11:00",
    assignedEngineer: "Emirhan Demir (Baş Mimar)",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/efe-defacto-ai",
    sandbox: {
      subdomain: "defacto-ai-poc.efesoft.com.tr",
      fullUrl: "https://defacto-ai-poc.efesoft.com.tr",
      status: "running",
      expiresAt: "01.11.2026",
      daysRemaining: 3,
      activeSessions: 4,
      datacenter: "Frankfurt DC (Zone-A)",
      clusterNode: "k8s-pod-efes-ai-331",
      dataProfile: "Haftalık Talep Tahmini & Sezonsallık",
      username: "defacto_bi",
      tempPass: "DefactoAI@2026!Key",
    },
    modules: ["Hava Durumu & Sezon Bazlı Satış Tahmini", "Mağaza İçi Stok Transfer Önerileri", "Görsel BI Dashboardları", "Doğal Dil SQL Rapor Üreteci"],
    leadNotes: "500 mağazada haftalık ceket/mont sevkiyat miktarlarını EfeAI tahminleme algoritmalarıyla karşılaştırmak istiyorlar.",
    dealPotentialFormatted: "₺750.000 / Yıl",
  },
];

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT: ADMIN DEMOS & SANDBOX CONTROLLER                          */
/* -------------------------------------------------------------------------- */

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<DemoRecord[]>(INITIAL_DEMOS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<"all" | DemoProduct>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | DemoStatus>("all");
  const [selectedType, setSelectedType] = useState<"all" | DemoType>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Interaction States
  const [expandedDemoId, setExpandedDemoId] = useState<string | null>("DEMO-2026-9041");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isScanningCluster, setIsScanningCluster] = useState(false);
  const [clusterToast, setClusterToast] = useState<string | null>(null);

  // Modals
  const [showProvisionModal, setShowProvisionModal] = useState<DemoRecord | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionDuration, setProvisionDuration] = useState("7");
  const [provisionDatacenter, setProvisionDatacenter] = useState("Frankfurt DC (Zone-A)");
  const [provisionDataProfile, setProvisionDataProfile] = useState("Üretim & İmalat ERP Veri Seti");

  const [showScheduleModal, setShowScheduleModal] = useState<DemoRecord | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("2026-11-02");
  const [scheduleTime, setScheduleTime] = useState("14:30");
  const [scheduleEngineer, setScheduleEngineer] = useState("Emirhan Demir (Baş Mimar)");
  const [schedulePlatform, setSchedulePlatform] = useState<"Google Meet" | "Microsoft Teams" | "Efesoft WebRTC">("Google Meet");

  const [showContactModal, setShowContactModal] = useState<DemoRecord | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const [showExtendModal, setShowExtendModal] = useState<DemoRecord | null>(null);
  const [extendDays, setExtendDays] = useState(3);
  const [isExtending, setIsExtending] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newProduct, setNewProduct] = useState<DemoProduct>("erp");
  const [newType, setNewType] = useState<DemoType>("hybrid");
  const [newNotes, setNewNotes] = useState("");

  // ---------------------------------------------------------------------------
  // FILTERING LOGIC
  // ---------------------------------------------------------------------------
  const filteredDemos = useMemo(() => {
    return demos.filter((d) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          d.company.toLowerCase().includes(q) ||
          d.companyCode.toLowerCase().includes(q) ||
          d.contactName.toLowerCase().includes(q) ||
          d.contactEmail.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.leadNotes.toLowerCase().includes(q) ||
          d.productName.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Product
      if (selectedProduct !== "all" && d.product !== selectedProduct) {
        return false;
      }

      // Status
      if (selectedStatus !== "all" && d.status !== selectedStatus) {
        return false;
      }

      // Type
      if (selectedType !== "all" && d.demoType !== selectedType) {
        return false;
      }

      return true;
    });
  }, [demos, searchQuery, selectedProduct, selectedStatus, selectedType]);

  // ---------------------------------------------------------------------------
  // KPI CALCULATIONS
  // ---------------------------------------------------------------------------
  const kpis = useMemo(() => {
    const totalRequests = 48; // Total this month
    const newPending = demos.filter((d) => d.status === "pending").length;
    const activeSandboxes = demos.filter((d) => d.status === "sandbox_active" && d.sandbox?.status === "running").length;
    const scheduledMeetings = demos.filter((d) => d.status === "scheduled").length;
    const convertedCount = demos.filter((d) => d.status === "converted").length;

    return {
      totalRequests,
      newPending,
      activeSandboxes,
      scheduledMeetings,
      convertedCount,
      winRate: "41.6%",
    };
  }, [demos]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Cluster ping test
  const handleScanCluster = () => {
    setIsScanningCluster(true);
    setTimeout(() => {
      setIsScanningCluster(false);
      setClusterToast("14 izole Docker tenantı tarandı. Tüm Frankfurt & İzmir node'ları aktif, 0 anomali ✓");
      setTimeout(() => setClusterToast(null), 4500);
    }, 1000);
  };

  // Handle Provisioning Sandbox
  const handleDeploySandbox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showProvisionModal) return;

    setIsProvisioning(true);
    setTimeout(() => {
      const cleanPrefix = showProvisionModal.company
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 10);
      const subdomain = `${cleanPrefix}-sandbox.efesoft.com.tr`;
      const fullUrl = `https://${subdomain}`;
      const days = parseInt(provisionDuration, 10);

      const updatedRecord: DemoRecord = {
        ...showProvisionModal,
        status: "sandbox_active",
        statusLabel: "Aktif Sandbox Devrede",
        sandbox: {
          subdomain,
          fullUrl,
          status: "running",
          expiresAt: `${days} Gün Sonra`,
          daysRemaining: days,
          activeSessions: 1,
          datacenter: provisionDatacenter,
          clusterNode: `k8s-pod-efes-sbx-${Math.floor(100 + Math.random() * 900)}`,
          dataProfile: provisionDataProfile,
          username: "demo_admin",
          tempPass: `Efesoft@2026!${cleanPrefix.toUpperCase().slice(0, 4)}`,
        },
      };

      setDemos((prev) => prev.map((d) => (d.id === showProvisionModal.id ? updatedRecord : d)));
      setIsProvisioning(false);
      setShowProvisionModal(null);
      setExpandedDemoId(updatedRecord.id);
      setClusterToast(`${showProvisionModal.company} için izole tenant (${subdomain}) 12 saniyede ayağa kaldırıldı ✓`);
      setTimeout(() => setClusterToast(null), 5000);
    }, 1200);
  };

  // Handle Scheduling Meeting
  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showScheduleModal) return;

    setIsScheduling(true);
    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 6);
      const generatedLink =
        schedulePlatform === "Google Meet"
          ? `https://meet.google.com/efe-${randomCode}-live`
          : schedulePlatform === "Microsoft Teams"
          ? `https://teams.microsoft.com/l/meetup-join/efe-${randomCode}`
          : `https://meet.efesoft.com.tr/room/${randomCode}`;

      const formattedDateString = `${scheduleDate.split("-").reverse().join(".")} ${scheduleTime}`;

      setDemos((prev) =>
        prev.map((d) =>
          d.id === showScheduleModal.id
            ? {
                ...d,
                status: "scheduled",
                statusLabel: "Randevu Verildi",
                scheduledDate: formattedDateString,
                assignedEngineer: scheduleEngineer,
                meetingPlatform: schedulePlatform,
                meetingLink: generatedLink,
              }
            : d
        )
      );

      setIsScheduling(false);
      setShowScheduleModal(null);
      setClusterToast(`${showScheduleModal.company} için canlı demo sunumu takvime işlendi ve davet oluşturuldu ✓`);
      setTimeout(() => setClusterToast(null), 4500);
    }, 900);
  };

  // Handle Extending Sandbox
  const handleExtendSandbox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showExtendModal || !showExtendModal.sandbox) return;

    setIsExtending(true);
    setTimeout(() => {
      const newDays = (showExtendModal.sandbox?.daysRemaining || 0) + extendDays;
      setDemos((prev) =>
        prev.map((d) =>
          d.id === showExtendModal.id && d.sandbox
            ? {
                ...d,
                sandbox: {
                  ...d.sandbox,
                  status: "running",
                  daysRemaining: newDays,
                  expiresAt: `${newDays} Gün Kaldı`,
                },
              }
            : d
        )
      );

      setIsExtending(false);
      setShowExtendModal(null);
      setClusterToast(`${showExtendModal.company} sandbox süresi +${extendDays} gün uzatıldı ✓`);
      setTimeout(() => setClusterToast(null), 4000);
    }, 700);
  };

  // Handle Converting to Deal
  const handleConvertToDeal = (demo: DemoRecord) => {
    setDemos((prev) =>
      prev.map((d) =>
        d.id === demo.id
          ? {
              ...d,
              status: "converted",
              statusLabel: "Satışa Dönüştü (Sözleşmede)",
            }
          : d
      )
    );
    setClusterToast(`🎉 Tebrikler! ${demo.company} talebi satış sözleşmesi aşamasına aktarıldı!`);
    setTimeout(() => setClusterToast(null), 5000);
  };

  // Handle Creating New Demo Request Manually
  const handleCreateDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newContact.trim()) return;

    setIsCreating(true);
    setTimeout(() => {
      const randomId = `DEMO-2026-${Math.floor(9053 + Math.random() * 900)}`;
      const prefix = newCompany.substring(0, 3).toUpperCase();
      const code = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;

      const newRecord: DemoRecord = {
        id: randomId,
        company: newCompany,
        companyCode: code,
        sector: "Kurumsal İşletme",
        contactName: newContact,
        contactTitle: "Yönetici / Yetkili",
        contactEmail: newEmail || `${prefix.toLowerCase()}@firma.com.tr`,
        contactPhone: newPhone || "+90 532 000 00 00",
        product: newProduct,
        productName:
          newProduct === "erp"
            ? "EfeERP Kurumsal Kaynak Planlama"
            : newProduct === "crm"
            ? "EfeCRM Akıllı Müşteri & Satış"
            : newProduct === "pos"
            ? "EfePOS Yeni Nesil Kasa & Perakende"
            : "EfeAI Kurumsal Karar Destek",
        productTheme:
          newProduct === "erp"
            ? "#0071e3"
            : newProduct === "crm"
            ? "#8b5cf6"
            : newProduct === "pos"
            ? "#10b981"
            : "#f59e0b",
        demoType: newType,
        demoTypeLabel:
          newType === "hybrid"
            ? "Sunum + Canlı Sandbox"
            : newType === "guided_call"
            ? "Rehberli Canlı Sunum"
            : "İzole Test Ortamı",
        status: "pending",
        statusLabel: "Yeni Talep (İnceleniyor)",
        requestedAt: "Az önce",
        modules: ["Temel Kurumsal Modül Paketi", "GİB & e-Dönüşüm Bağlantısı", "EfeOS Lisans Güvencesi"],
        leadNotes: newNotes || "Kullanıcı talebi manuel olarak kontrol merkezine eklendi.",
        dealPotentialFormatted: "₺750.000 / Yıl",
      };

      setDemos([newRecord, ...demos]);
      setIsCreating(false);
      setShowCreateModal(false);
      setExpandedDemoId(newRecord.id);

      // Reset form
      setNewCompany("");
      setNewContact("");
      setNewEmail("");
      setNewPhone("");
      setNewNotes("");

      setClusterToast(`Yeni demo talebi (${newRecord.company}) başarıyla sisteme kaydedildi ✓`);
      setTimeout(() => setClusterToast(null), 4500);
    }, 800);
  };

  return (
    <div className="adm-page" style={{ padding: "20px 24px", maxWidth: "1600px", margin: "0 auto" }}>
      {/* -------------------------------------------------------------------- */}
      {/*  HEADER & HERO ACTION BAR                                            */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              className="adm-badge adm-badge--blue"
              style={{
                fontSize: "10.5px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.03em",
                padding: "2px 8px",
              }}
            >
              EfeOS Sandbox Engine v4.2
            </span>
            <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>·</span>
            <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", fontWeight: 500 }}>
              Canlı Demo &amp; İzole Tenant Orchestrator
            </span>
          </div>

          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--adm-text)",
              margin: 0,
            }}
          >
            Canlı Demo İstekleri &amp; Sandbox Yönetimi
          </h1>
          <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "var(--adm-text-secondary)" }}>
            Kurumsal potansiyel müşterilerin interaktif sunum randevuları, izole Docker sandbox ortamları ve POC deneme süreçleri.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            className="adm-topbar__btn"
            onClick={handleScanCluster}
            disabled={isScanningCluster}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            title="Tüm çalışan Docker/K8s sandbox ortamlarının sağlık durumunu ve aktif kullanıcı oturumlarını sorgular"
          >
            <RefreshCw size={13} className={isScanningCluster ? "spin-animate" : ""} />
            <span>{isScanningCluster ? "Node'lar Taranıyor..." : "Tüm Sandboxları Tara"}</span>
          </button>

          <button
            type="button"
            className="adm-topbar__btn adm-topbar__btn--primary"
            onClick={() => setShowCreateModal(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={13} />
            <span>+ Yeni Demo / Sandbox Başlat</span>
          </button>
        </div>
      </div>

      {/* Global Cluster Toast */}
      {clusterToast && (
        <div
          style={{
            padding: "9px 14px",
            background: "rgba(22, 163, 74, 0.08)",
            border: "1px solid rgba(22, 163, 74, 0.25)",
            borderRadius: "8px",
            color: "#166534",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <CheckCircle2 size={15} color="#16a34a" />
          <span>{clusterToast}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  KPI METRIC CARDS                                                    */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-kpi-grid">
        {/* KPI 1 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Toplam Demo Talebi (Bu Ay)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Monitor size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">48 Talep</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#0071e3", fontWeight: 600 }}>3 Yeni Bekleyen</span> · %100 Yanıtlama Oranı
          </div>
        </div>

        {/* KPI 2 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Aktif Canlı Sandboxlar</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(22, 163, 74, 0.1)", color: "#16a34a" }}>
              <Server size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">14 İzole Tenant</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>84 Canlı Kullanıcı</span> · Frankfurt &amp; İzmir DC
          </div>
        </div>

        {/* KPI 3 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Randevusu Verilen Sunumlar</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
              <Calendar size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">9 Toplantı</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#8b5cf6", fontWeight: 600 }}>4&apos;ü Bugün</span> · Google Meet &amp; Teams
          </div>
        </div>

        {/* KPI 4 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Demo Satışa Dönüşüm (Win Rate)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
              <TrendingUp size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%41.6 Win Rate</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>₺3.84M Pipeline</span> · Sektör Ortalaması: %24
          </div>
        </div>

        {/* KPI 5 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ort. Sandbox Deneme Süresi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
              <Clock size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">4.2 Gün / Oturum</div>
          <div className="adm-kpi-card__sub">
            En Popüler: <span style={{ fontWeight: 600 }}>EfeERP &amp; WMS</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  FILTER & SEARCH TOOLBAR                                             */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="adm-card"
        style={{
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "1 1 340px", flexWrap: "wrap" }}>
          {/* Search Box */}
          <div className="adm-search" style={{ width: "280px" }}>
            <Search size={13} className="adm-search__icon" />
            <input
              type="text"
              placeholder="Şirket adı, yönetici, e-posta veya demo ID ara..."
              className="adm-search__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="adm-search__clear"
                title="Aramayı Temizle"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Product Segment Filter */}
          <div className="adm-seg">
            {[
              { id: "all", label: "Tüm Ürünler" },
              { id: "erp", label: "EfeERP" },
              { id: "crm", label: "EfeCRM" },
              { id: "pos", label: "EfePOS" },
              { id: "ai", label: "EfeAI" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`adm-seg__btn ${selectedProduct === tab.id ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSelectedProduct(tab.id as typeof selectedProduct)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Dropdown Filter */}
          <select
            className="adm-input"
            style={{ width: "185px", height: "30px", fontSize: "12px", padding: "0 10px" }}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
          >
            <option value="all">Tüm Durumlar ({demos.length})</option>
            <option value="pending">🟡 Yeni Talepler (3)</option>
            <option value="scheduled">🔵 Randevu Verildi (3)</option>
            <option value="sandbox_active">🟢 Aktif Sandboxlar (4)</option>
            <option value="converted">🟣 Satışa Dönüşenler (1)</option>
            <option value="completed">⚪ Tamamlananlar (1)</option>
          </select>
        </div>

        {/* View Switcher: Table vs Cards */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="adm-seg">
            <button
              type="button"
              className={`adm-seg__btn ${viewMode === "table" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              Tablo
            </button>
            <button
              type="button"
              className={`adm-seg__btn ${viewMode === "cards" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("cards")}
            >
              Kartlar
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  VIEW MODE 1: DATA TABLE                                             */}
      {/* -------------------------------------------------------------------- */}
      {viewMode === "table" ? (
        <div className="adm-card" style={{ padding: "0", overflow: "hidden", marginTop: "14px" }}>
          <div className="adm-table-wrap">
            <table className="adm-table" style={{ width: "100%", minWidth: "1120px" }}>
              <thead>
                <tr>
                  <th style={{ width: "36px", textAlign: "center" }}></th>
                  <th style={{ width: "230px", whiteSpace: "nowrap" }}>Şirket &amp; Talep No</th>
                  <th style={{ width: "170px", whiteSpace: "nowrap" }}>İletişim &amp; Yetkili</th>
                  <th style={{ width: "160px", whiteSpace: "nowrap" }}>İlgilenilen Ürün</th>
                  <th style={{ width: "140px", whiteSpace: "nowrap" }}>Talep Türü</th>
                  <th style={{ width: "150px", whiteSpace: "nowrap" }}>Durum / Randevu</th>
                  <th style={{ width: "170px", whiteSpace: "nowrap" }}>Sandbox Tenant</th>
                  <th style={{ width: "110px", whiteSpace: "nowrap" }}>Potansiyel</th>
                  <th style={{ width: "130px", textAlign: "right", whiteSpace: "nowrap" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody key={`${selectedProduct}-${selectedStatus}-${selectedType}`} className="adm-data-switch">
                {filteredDemos.map((demo) => {
                  const isExpanded = expandedDemoId === demo.id;

                  return (
                    <Fragment key={demo.id}>
                      <tr
                        style={{
                          background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                          cursor: "pointer",
                        }}
                        onClick={() => setExpandedDemoId(isExpanded ? null : demo.id)}
                      >
                        {/* Expand Toggle */}
                        <td style={{ width: "36px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button
                            type="button"
                            style={{
                              background: "none",
                              border: "none",
                              color: isExpanded ? "var(--adm-primary)" : "var(--adm-text-secondary)",
                              cursor: "pointer",
                              padding: "4px",
                              display: "inline-grid",
                              placeItems: "center",
                              borderRadius: "4px",
                              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease",
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                            title={isExpanded ? "Detayları Kapat" : "Detayları İncele"}
                          >
                            <ChevronDown size={14} />
                          </button>
                        </td>

                        {/* Company & ID */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "7px",
                                background: demo.productTheme,
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {demo.product.toUpperCase()}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 600, color: "var(--adm-text)", whiteSpace: "nowrap" }}>
                                {demo.company}
                              </div>
                              <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                                <span>{demo.companyCode}</span>
                                <span>·</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{demo.id}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact Person */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ fontWeight: 500, color: "var(--adm-text)", whiteSpace: "nowrap" }}>
                            {demo.contactName}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", whiteSpace: "nowrap" }}>
                            {demo.contactTitle}
                          </div>
                        </td>

                        {/* Product */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}>
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: demo.productTheme,
                              }}
                            />
                            <span style={{ fontWeight: 600, fontSize: "12px", color: "var(--adm-text)" }}>
                              {demo.product === "erp"
                                ? "EfeERP"
                                : demo.product === "crm"
                                ? "EfeCRM"
                                : demo.product === "pos"
                                ? "EfePOS"
                                : "EfeAI"}
                            </span>
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", whiteSpace: "nowrap" }}>
                            {demo.requestedAt}
                          </div>
                        </td>

                        {/* Demo Type */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span
                            className="adm-badge"
                            style={{
                              background:
                                demo.demoType === "hybrid"
                                  ? "rgba(139, 92, 246, 0.09)"
                                  : demo.demoType === "guided_call"
                                  ? "rgba(0, 113, 227, 0.08)"
                                  : "rgba(16, 185, 129, 0.08)",
                              color:
                                demo.demoType === "hybrid"
                                  ? "#7c3aed"
                                  : demo.demoType === "guided_call"
                                  ? "#0071e3"
                                  : "#059669",
                              fontSize: "11px",
                            }}
                          >
                            {demo.demoTypeLabel}
                          </span>
                        </td>

                        {/* Status & Date */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                            <span
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background:
                                  demo.status === "pending"
                                    ? "#f59e0b"
                                    : demo.status === "scheduled"
                                    ? "#0071e3"
                                    : demo.status === "sandbox_active"
                                    ? "#16a34a"
                                    : demo.status === "converted"
                                    ? "#9333ea"
                                    : "#64748b",
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ fontWeight: 600, fontSize: "11.5px", color: "var(--adm-text)" }}>
                              {demo.statusLabel}
                            </span>
                          </div>
                          {demo.scheduledDate && (
                            <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)", marginTop: "1px" }}>
                              📅 {demo.scheduledDate}
                            </div>
                          )}
                        </td>

                        {/* Sandbox Tenant Status */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          {demo.sandbox && demo.sandbox.status === "running" ? (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "11px",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  background: "rgba(22, 163, 74, 0.08)",
                                  color: "#166534",
                                  border: "1px solid rgba(22, 163, 74, 0.2)",
                                }}
                              >
                                {demo.sandbox.daysRemaining} gün kaldı
                              </span>
                              <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                                {demo.sandbox.activeSessions} aktif
                              </span>
                            </div>
                          ) : demo.sandbox && demo.sandbox.status === "provisioning" ? (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#b45309",
                                background: "rgba(245, 158, 11, 0.1)",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              ⏳ Dağıtılıyor...
                            </span>
                          ) : (
                            <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                              Ortam Başlatılmadı
                            </span>
                          )}
                        </td>

                        {/* Deal Potential */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ fontWeight: 600, color: "var(--adm-text)", fontFamily: "var(--font-mono)", fontSize: "11.5px" }}>
                            {demo.dealPotentialFormatted}
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: "right", whiteSpace: "nowrap" }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", whiteSpace: "nowrap" }}>
                            {/* Deploy Sandbox Button */}
                            {(!demo.sandbox || demo.sandbox.status !== "running") && (
                              <button
                                type="button"
                                className="adm-topbar__btn"
                                style={{ height: "26px", padding: "0 7px", fontSize: "11px" }}
                                onClick={() => setShowProvisionModal(demo)}
                                title="İzole sandbox ortamı ayağa kaldır"
                              >
                                <Play size={11} />
                                <span style={{ marginLeft: "4px" }}>Sandbox</span>
                              </button>
                            )}

                            {/* Schedule Call Button */}
                            {demo.status === "pending" && (
                              <button
                                type="button"
                                className="adm-topbar__btn adm-topbar__btn--primary"
                                style={{ height: "26px", padding: "0 7px", fontSize: "11px" }}
                                onClick={() => setShowScheduleModal(demo)}
                                title="Canlı sunum için randevu takvimi oluştur"
                              >
                                <Calendar size={11} />
                                <span style={{ marginLeft: "4px" }}>Randevu</span>
                              </button>
                            )}

                            {/* Contact / WhatsApp Button */}
                            <button
                              type="button"
                              className="adm-topbar__btn"
                              style={{ height: "26px", padding: "0 7px", fontSize: "11px" }}
                              onClick={() => setShowContactModal(demo)}
                              title="Giriş bilgilerini WhatsApp / E-Posta ile ilet"
                            >
                              <Send size={11} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* ------------------------------------------------------------ */}
                      {/*  SMOOTH ANIMATED 360° INSPECTION DRAWER                      */}
                      {/* ------------------------------------------------------------ */}
                      <tr className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}>
                        <td colSpan={9} className="adm-expand-cell">
                          <div className="adm-expand-grid">
                            <div className="adm-expand-inner">
                              <div className="adm-expand-body">
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1.4fr 1.2fr 1.2fr",
                                    gap: "16px",
                                    background: "#ffffff",
                                    padding: "16px 18px",
                                    borderRadius: "10px",
                                    border: "1px solid var(--adm-border)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                                    borderLeft: `3px solid ${demo.productTheme}`,
                                  }}
                                >
                                  {/* Col 1: Sandbox Canlı Telemetrisi & Giriş */}
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: "var(--adm-text-secondary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                        marginBottom: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                      }}
                                    >
                                      <Server size={12} />
                                      <span>İzole Sandbox Durumu &amp; Telemetri</span>
                                    </div>

                                    {demo.sandbox && demo.sandbox.status === "running" ? (
                                      <div style={{ display: "grid", gap: "8px", fontSize: "11.5px" }}>
                                        <div>
                                          <span style={{ color: "var(--adm-text-secondary)" }}>Tenant URL:</span>
                                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                                            <a
                                              href={demo.sandbox.fullUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              style={{
                                                fontWeight: 600,
                                                color: "var(--adm-primary)",
                                                fontFamily: "var(--font-mono)",
                                                textDecoration: "none",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                              }}
                                            >
                                              <span>{demo.sandbox.subdomain}</span>
                                              <ExternalLink size={12} />
                                            </a>
                                          </div>
                                        </div>

                                        <div
                                          style={{
                                            background: "var(--adm-surface-2)",
                                            padding: "8px 10px",
                                            borderRadius: "6px",
                                            border: "1px solid var(--adm-border)",
                                            display: "grid",
                                            gap: "4px",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "11px",
                                          }}
                                        >
                                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ color: "var(--adm-text-secondary)" }}>Kullanıcı:</span>
                                            <span style={{ fontWeight: 600 }}>{demo.sandbox.username}</span>
                                          </div>
                                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ color: "var(--adm-text-secondary)" }}>Geçici Şifre:</span>
                                            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                              <span style={{ fontWeight: 600, color: "#0071e3" }}>{demo.sandbox.tempPass}</span>
                                              <button
                                                type="button"
                                                onClick={() => handleCopy(demo.sandbox?.tempPass || "", `pass-${demo.id}`)}
                                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)", padding: "1px" }}
                                                title="Şifreyi Kopyala"
                                              >
                                                {copiedKey === `pass-${demo.id}` ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                                          <span>📍 {demo.sandbox.datacenter}</span>
                                          <span>·</span>
                                          <span>📦 {demo.sandbox.clusterNode}</span>
                                        </div>

                                        <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                                          <a
                                            href={demo.sandbox.fullUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="adm-topbar__btn adm-topbar__btn--primary"
                                            style={{ height: "26px", fontSize: "11px", textDecoration: "none" }}
                                          >
                                            Yönetici Olarak Gir ↗
                                          </a>
                                          <button
                                            type="button"
                                            className="adm-topbar__btn"
                                            style={{ height: "26px", fontSize: "11px" }}
                                            onClick={() => setShowExtendModal(demo)}
                                          >
                                            Süreyi Uzat (+3 Gün)
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          padding: "14px",
                                          borderRadius: "6px",
                                          background: "var(--adm-surface-2)",
                                          border: "1px dashed var(--adm-border)",
                                          textAlign: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)", marginBottom: "8px" }}>
                                          Bu talep için henüz izole bir sandbox ortamı dağıtılmadı.
                                        </div>
                                        <button
                                          type="button"
                                          className="adm-topbar__btn adm-topbar__btn--primary"
                                          onClick={() => setShowProvisionModal(demo)}
                                          style={{ height: "28px", fontSize: "11.5px" }}
                                        >
                                          ⚡ Anında 7 Günlük Sandbox Başlat
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Col 2: Randevu & Danışman Bilgileri */}
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: "var(--adm-text-secondary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                        marginBottom: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                      }}
                                    >
                                      <Video size={12} />
                                      <span>Sunum &amp; Görüşme Detayları</span>
                                    </div>

                                    <div style={{ display: "grid", gap: "8px", fontSize: "11.5px" }}>
                                      <div>
                                        <span style={{ color: "var(--adm-text-secondary)" }}>Atanan Çözüm Danışmanı:</span>
                                        <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                                          {demo.assignedEngineer || "Henüz atanmadı"}
                                        </div>
                                      </div>

                                      <div>
                                        <span style={{ color: "var(--adm-text-secondary)" }}>Toplantı Zamanı &amp; Platform:</span>
                                        <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                                          {demo.scheduledDate ? `${demo.scheduledDate} (${demo.meetingPlatform})` : "Randevu bekleniyor"}
                                        </div>
                                      </div>

                                      {demo.meetingLink && (
                                        <div>
                                          <span style={{ color: "var(--adm-text-secondary)" }}>Toplantı Bağlantısı:</span>
                                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                                            <a
                                              href={demo.meetingLink}
                                              target="_blank"
                                              rel="noreferrer"
                                              style={{
                                                fontSize: "11px",
                                                fontFamily: "var(--font-mono)",
                                                color: "#0071e3",
                                                textDecoration: "none",
                                              }}
                                            >
                                              {demo.meetingLink}
                                            </a>
                                            <button
                                              type="button"
                                              onClick={() => handleCopy(demo.meetingLink || "", `meet-${demo.id}`)}
                                              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)", padding: "1px" }}
                                              title="Linki Kopyala"
                                            >
                                              {copiedKey === `meet-${demo.id}` ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                                            </button>
                                          </div>
                                        </div>
                                      )}

                                      <div style={{ marginTop: "4px" }}>
                                        <button
                                          type="button"
                                          className="adm-topbar__btn"
                                          style={{ height: "26px", fontSize: "11px" }}
                                          onClick={() => setShowScheduleModal(demo)}
                                        >
                                          📅 {demo.scheduledDate ? "Randevuyu Yeniden Planla" : "Randevu Belirle"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Col 3: Müşteri Notları & Satış Dönüşümü */}
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: "var(--adm-text-secondary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                        marginBottom: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                      }}
                                    >
                                      <FileText size={12} />
                                      <span>Müşteri İhtiyacı &amp; Aksiyonlar</span>
                                    </div>

                                    <div
                                      style={{
                                        fontSize: "11.5px",
                                        color: "var(--adm-text)",
                                        background: "var(--adm-surface-2)",
                                        padding: "8px 10px",
                                        borderRadius: "6px",
                                        border: "1px solid var(--adm-border)",
                                        lineHeight: 1.45,
                                        marginBottom: "10px",
                                      }}
                                    >
                                      &ldquo;{demo.leadNotes}&rdquo;
                                    </div>

                                    <div style={{ marginBottom: "10px" }}>
                                      <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)", marginBottom: "4px" }}>
                                        Talep Edilen Özel Modüller ({demo.modules.length}):
                                      </div>
                                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                        {demo.modules.map((mod, idx) => (
                                          <span
                                            key={idx}
                                            style={{
                                              fontSize: "10px",
                                              background: "#ffffff",
                                              border: "1px solid var(--adm-border)",
                                              padding: "2px 6px",
                                              borderRadius: "4px",
                                              color: "var(--adm-text-secondary)",
                                            }}
                                          >
                                            {mod}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "6px" }}>
                                      <button
                                        type="button"
                                        className="adm-topbar__btn"
                                        style={{ height: "26px", fontSize: "11px" }}
                                        onClick={() => setShowContactModal(demo)}
                                      >
                                        <MessageSquare size={11} style={{ marginRight: "4px" }} />
                                        WhatsApp Bilgisi
                                      </button>

                                      {demo.status !== "converted" && (
                                        <button
                                          type="button"
                                          className="adm-topbar__btn adm-topbar__btn--primary"
                                          style={{ height: "26px", fontSize: "11px" }}
                                          onClick={() => handleConvertToDeal(demo)}
                                        >
                                          Satışa Dönüştür ✓
                                        </button>
                                      )}
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
      ) : (
        /* ------------------------------------------------------------------ */
        /*  VIEW MODE 2: CARDS GRID                                           */
        /* ------------------------------------------------------------------ */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "14px",
            marginTop: "14px",
          }}
        >
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="adm-card"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderTop: `3px solid ${demo.productTheme}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: demo.productTheme,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {demo.product.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)", fontSize: "13.5px" }}>
                      {demo.company}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                      {demo.contactName} · {demo.contactTitle}
                    </div>
                  </div>
                </div>

                <span
                  className="adm-badge"
                  style={{
                    fontSize: "10.5px",
                    background:
                      demo.status === "pending"
                        ? "rgba(245, 158, 11, 0.1)"
                        : demo.status === "scheduled"
                        ? "rgba(0, 113, 227, 0.1)"
                        : demo.status === "sandbox_active"
                        ? "rgba(22, 163, 74, 0.1)"
                        : "rgba(100, 116, 139, 0.1)",
                    color:
                      demo.status === "pending"
                        ? "#b45309"
                        : demo.status === "scheduled"
                        ? "#0071e3"
                        : demo.status === "sandbox_active"
                        ? "#166534"
                        : "#475569",
                  }}
                >
                  {demo.statusLabel}
                </span>
              </div>

              {/* Sandbox or Meeting Pill */}
              {demo.sandbox && demo.sandbox.status === "running" ? (
                <div
                  style={{
                    background: "var(--adm-surface-2)",
                    border: "1px solid var(--adm-border)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                    fontSize: "11px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Sandbox: </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{demo.sandbox.subdomain}</span>
                  </div>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>{demo.sandbox.daysRemaining} gün</span>
                </div>
              ) : demo.scheduledDate ? (
                <div
                  style={{
                    background: "var(--adm-surface-2)",
                    border: "1px solid var(--adm-border)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                    fontSize: "11px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Sunum: </span>
                    <span style={{ fontWeight: 600 }}>{demo.scheduledDate}</span>
                  </div>
                  <span style={{ color: "#0071e3" }}>{demo.meetingPlatform}</span>
                </div>
              ) : (
                <div
                  style={{
                    background: "var(--adm-surface-2)",
                    border: "1px dashed var(--adm-border)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                    fontSize: "11px",
                    color: "var(--adm-text-secondary)",
                    textAlign: "center",
                  }}
                >
                  Henüz randevu veya sandbox tanımlanmadı
                </div>
              )}

              {/* Note Snippet */}
              <div
                style={{
                  fontSize: "11.5px",
                  color: "var(--adm-text-secondary)",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {demo.leadNotes}
              </div>

              {/* Footer Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  borderTop: "1px solid var(--adm-border-subtle)",
                }}
              >
                <div style={{ fontSize: "11.5px", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                  {demo.dealPotentialFormatted}
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    className="adm-topbar__btn"
                    style={{ height: "26px", fontSize: "11px" }}
                    onClick={() => {
                      setExpandedDemoId(demo.id);
                      setViewMode("table");
                    }}
                  >
                    360° İncele
                  </button>
                  <button
                    type="button"
                    className="adm-topbar__btn adm-topbar__btn--primary"
                    style={{ height: "26px", fontSize: "11px" }}
                    onClick={() => setShowContactModal(demo)}
                  >
                    İletişim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 1: PROVISION / DEPLOY SANDBOX TENANT                          */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showProvisionModal}
        onClose={() => setShowProvisionModal(null)}
        maxWidth="520px"
      >
        {showProvisionModal && (
          <form onSubmit={handleDeploySandbox}>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Server size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">İzole Sandbox Tenantı Başlat</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowProvisionModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "14px" }}>
              <div
                style={{
                  background: "var(--adm-surface-2)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--adm-border)",
                  fontSize: "12px",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                  {showProvisionModal.company}
                </div>
                <div style={{ color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                  {showProvisionModal.contactName} · {showProvisionModal.productName}
                </div>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Test &amp; Deneme Süresi</label>
                <select
                  className="adm-input"
                  value={provisionDuration}
                  onChange={(e) => setProvisionDuration(e.target.value)}
                >
                  <option value="3">3 Gün (Hızlı Değerlendirme)</option>
                  <option value="7">7 Gün (Standart POC - Tavsiye Edilen)</option>
                  <option value="14">14 Gün (Genişletilmiş Enterprise Pilot)</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Ön Yüklü Örnek Veri Seti (Profile)</label>
                <select
                  className="adm-input"
                  value={provisionDataProfile}
                  onChange={(e) => setProvisionDataProfile(e.target.value)}
                >
                  <option value="Üretim & İmalat ERP Veri Seti">Üretim &amp; İmalat ERP (Reçete, WMS, Makine)</option>
                  <option value="Omnichannel Perakende & Hızlı Kasa">Omnichannel Perakende &amp; Mağaza POS</option>
                  <option value="Holding Konsolidasyon & e-Dönüşüm">Holding Konsolidasyon &amp; Maliye e-Dönüşüm</option>
                  <option value="B2B Bayi Ağı & CRM Satış">B2B Bayi Ağı &amp; Saha Satış Pipeline</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Dağıtım Veri Merkezi (Datacenter)</label>
                <select
                  className="adm-input"
                  value={provisionDatacenter}
                  onChange={(e) => setProvisionDatacenter(e.target.value)}
                >
                  <option value="Frankfurt DC (Zone-A)">Frankfurt DC (Zone-A) — Dedicated Isolated Pod</option>
                  <option value="İzmir Veri Merkezi (Cloud-1)">İzmir Veri Merkezi (Cloud-1) — Yerel KVKK Uyumlu</option>
                </select>
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "var(--adm-text-secondary)",
                  background: "rgba(0, 113, 227, 0.05)",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(0, 113, 227, 0.15)",
                }}
              >
                ℹ️ Sandbox ortamı izole Kubernetes podunda oluşturulur. Müşteriye özel yönetici şifresi ve veritabanı anında tanımlanır.
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowProvisionModal(null)}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="adm-topbar__btn adm-topbar__btn--primary"
                disabled={isProvisioning}
              >
                {isProvisioning ? "Tenant Ayağa Kaldırılıyor..." : "Ortamı Yayına Al (Deploy)"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 2: SCHEDULE GUIDED DEMO CALL                                  */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showScheduleModal}
        onClose={() => setShowScheduleModal(null)}
        maxWidth="500px"
      >
        {showScheduleModal && (
          <form onSubmit={handleScheduleMeeting}>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">Canlı Sunum Randevusu Belirle</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowScheduleModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "14px" }}>
              <div
                style={{
                  background: "var(--adm-surface-2)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--adm-border)",
                  fontSize: "12px",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                  {showScheduleModal.company}
                </div>
                <div style={{ color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                  {showScheduleModal.contactName} ({showScheduleModal.contactTitle}) · {showScheduleModal.contactPhone}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div className="adm-form-group">
                  <label className="adm-label">Görüşme Tarihi</label>
                  <input
                    type="date"
                    className="adm-input"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Saat</label>
                  <input
                    type="time"
                    className="adm-input"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Atanan Efesoft Çözüm Danışmanı</label>
                <select
                  className="adm-input"
                  value={scheduleEngineer}
                  onChange={(e) => setScheduleEngineer(e.target.value)}
                >
                  <option value="Emirhan Demir (Baş Mimar)">Emirhan Demir (Kurucu &amp; Baş Mimar)</option>
                  <option value="Selin Yılmaz (Kıdemli Danışman)">Selin Yılmaz (Kıdemli CRM &amp; POS Danışmanı)</option>
                  <option value="Caner Kurt (ERP Çözüm Mimarı)">Caner Kurt (ERP Çözüm Mimarı)</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Toplantı Platformu</label>
                <select
                  className="adm-input"
                  value={schedulePlatform}
                  onChange={(e) => setSchedulePlatform(e.target.value as typeof schedulePlatform)}
                >
                  <option value="Google Meet">Google Meet (Otomatik Link Üretilir)</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Efesoft WebRTC">Efesoft Güvenli WebRTC Odası</option>
                </select>
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowScheduleModal(null)}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="adm-topbar__btn adm-topbar__btn--primary"
                disabled={isScheduling}
              >
                {isScheduling ? "Takvime İşleniyor..." : "Randevuyu Onayla"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 3: DISPATCH CREDENTIALS (WHATSAPP / EMAIL)                    */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showContactModal}
        onClose={() => setShowContactModal(null)}
        maxWidth="540px"
      >
        {showContactModal && (
          <div>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Send size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">Erişim &amp; Randevu Bilgilerini İlet</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowContactModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "14px" }}>
              <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)" }}>
                Aşağıdaki hazır şablon müşterinin telefonuna ({showContactModal.contactPhone}) ve kurumsal e-postasına ({showContactModal.contactEmail}) iletilebilir:
              </div>

              <div
                style={{
                  background: "var(--adm-surface-2)",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--adm-border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  color: "var(--adm-text)",
                }}
              >
{`Sayın ${showContactModal.contactName},

Efesoft ${showContactModal.productName} canlı demo talebiniz onaylanmıştır.

${showContactModal.sandbox?.status === "running" ? `🌐 Canlı Test Ortamınız:
URL: ${showContactModal.sandbox.fullUrl}
Kullanıcı: ${showContactModal.sandbox.username}
Şifre: ${showContactModal.sandbox.tempPass}
Geçerlilik: ${showContactModal.sandbox.daysRemaining} Gün
` : ""}${showContactModal.scheduledDate ? `📅 Görüşme Randevusu:
Tarih: ${showContactModal.scheduledDate}
Toplantı Linki: ${showContactModal.meetingLink || "https://meet.google.com/efe-live"}
Danışman: ${showContactModal.assignedEngineer || "Emirhan Demir"}
` : ""}
Sorularınız için bu mesaja yanıt verebilir veya +90 850 000 00 00 numaralı destek hattımızdan bize ulaşabilirsiniz.

Efesoft Kurumsal Çözümler Ekibi`}
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => {
                  const text = `Sayın ${showContactModal.contactName}, Efesoft ${showContactModal.productName} canlı demo detaylarınız: ${showContactModal.sandbox?.fullUrl || ""}`;
                  navigator.clipboard.writeText(text);
                  setCopiedTemplate(true);
                  setTimeout(() => setCopiedTemplate(false), 2000);
                }}
              >
                {copiedTemplate ? "Kopyalandı ✓" : "Metni Kopyala"}
              </button>

              <a
                href={`https://wa.me/${showContactModal.contactPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Sayın ${showContactModal.contactName}, Efesoft ${showContactModal.productName} canlı demo erişim bilgileriniz: ${showContactModal.sandbox?.fullUrl || showContactModal.meetingLink || ""}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="adm-topbar__btn adm-topbar__btn--primary"
                style={{ textDecoration: "none" }}
              >
                WhatsApp Web&apos;de Aç ↗
              </a>
            </div>
          </div>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 4: EXTEND TRIAL DURATION                                      */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showExtendModal}
        onClose={() => setShowExtendModal(null)}
        maxWidth="440px"
      >
        {showExtendModal && (
          <form onSubmit={handleExtendSandbox}>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">Sandbox Süresini Uzat</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowExtendModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "14px" }}>
              <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)" }}>
                <strong>{showExtendModal.company}</strong> için aktif olan izole tenant süresine ilave gün tanımlayın:
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Eklenecek Gün Sayısı</label>
                <select
                  className="adm-input"
                  value={extendDays}
                  onChange={(e) => setExtendDays(parseInt(e.target.value, 10))}
                >
                  <option value={3}>+3 Gün Uzat</option>
                  <option value={7}>+7 Gün Uzat (Standart)</option>
                  <option value={14}>+14 Gün Uzat (Genişletilmiş)</option>
                </select>
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowExtendModal(null)}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="adm-topbar__btn adm-topbar__btn--primary"
                disabled={isExtending}
              >
                {isExtending ? "Uzatılıyor..." : "Süreyi Tanımla"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 5: CREATE NEW DEMO / SANDBOX REQUEST MANUALLY                 */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        maxWidth="540px"
      >
        <form onSubmit={handleCreateDemo}>
          <div className="adm-modal-head">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={16} color="var(--adm-primary)" />
              <span className="adm-modal-title">Yeni Canlı Demo / Sandbox Talebi Ekle</span>
            </div>
            <button
              type="button"
              className="adm-modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              ✕
            </button>
          </div>

          <div className="adm-modal-body" style={{ display: "grid", gap: "12px" }}>
            <div className="adm-form-group">
              <label className="adm-label">
                Şirket / Kurum Adı <span className="adm-label-required">*</span>
              </label>
              <input
                type="text"
                placeholder="Örn: Aselsan Savunma Sistemleri A.Ş."
                className="adm-input"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="adm-form-group">
                <label className="adm-label">
                  Yetkili İsim &amp; Soyisim <span className="adm-label-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Örn: Ahmet Yılmaz"
                  className="adm-input"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">İlgilenilen Ürün</label>
                <select
                  className="adm-input"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value as DemoProduct)}
                >
                  <option value="erp">EfeERP Kurumsal Kaynak Planlama</option>
                  <option value="crm">EfeCRM Akıllı Müşteri &amp; Satış</option>
                  <option value="pos">EfePOS Yeni Nesil Kasa &amp; Perakende</option>
                  <option value="ai">EfeAI Kurumsal Karar Destek</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="adm-form-group">
                <label className="adm-label">Kurumsal E-Posta</label>
                <input
                  type="email"
                  placeholder="ahmet@firma.com.tr"
                  className="adm-input"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Telefon Numarası</label>
                <input
                  type="tel"
                  placeholder="+90 532 000 00 00"
                  className="adm-input"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Demo Tercih Türü</label>
              <select
                className="adm-input"
                value={newType}
                onChange={(e) => setNewType(e.target.value as DemoType)}
              >
                <option value="hybrid">Sunum + İzole Canlı Sandbox (Tavsiye Edilen)</option>
                <option value="guided_call">Yalnızca Canlı Danışman Eşliğinde Sunum</option>
                <option value="self_sandbox">Yalnızca 72 Saatlik İzole Test Ortamı</option>
              </select>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Gereksinim / Müşteri Notları</label>
              <textarea
                className="adm-input"
                placeholder="Müşterinin çözmek istediği temel problem, mevcut kullandığı ERP/POS yazılımı ve talep ettiği modüller..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="adm-modal-foot">
            <button
              type="button"
              className="adm-topbar__btn"
              onClick={() => setShowCreateModal(false)}
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="adm-topbar__btn adm-topbar__btn--primary"
              disabled={isCreating}
            >
              {isCreating ? "Kaydediliyor..." : "Talebi Kaydet"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
