"use client";

import { Fragment, useState, useMemo } from "react";
import {
  Package,
  Layers,
  Cpu,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Zap,
  Activity,
  Users,
  Building2,
  CreditCard,
  Tag,
  Terminal,
  GitBranch,
  Cloud,
  RefreshCw,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  Grid3X3,
  List,
  Play,
  X,
  Pencil,
  CheckSquare,
  Flame,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

type ProductCategory = "all" | "erp" | "crm" | "pos" | "ai";
type DeploymentFilter = "all" | "saas" | "private" | "onprem" | "offline";
type ProductStatus = "active" | "beta" | "maintenance";

interface ProductModule {
  id: string;
  name: string;
  code: string;
  description: string;
  includedInTiers: ("Starter" | "Professional" | "Enterprise")[];
  isAddon?: boolean;
  addonPriceMonthly?: number;
  status: "active" | "beta" | "stable";
  category: "core" | "compliance" | "integration" | "ai";
}

interface ProductPricingTier {
  tierId: "starter" | "pro" | "enterprise";
  tierName: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  monthlyPriceFormatted: string;
  annualPriceFormatted: string;
  seatsText: string;
  summary: string;
  features: string[];
}

interface ProductTenantSample {
  name: string;
  industry: string;
  seats: number;
  deployment: string;
  version: string;
  uptime: string;
}

interface ProductRecord {
  id: string;
  code: string;
  name: string;
  category: "erp" | "crm" | "pos" | "ai";
  categoryLabel: string;
  tagline: string;
  description: string;
  version: string;
  status: ProductStatus;
  statusLabel: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  badgeType: "blue" | "purple" | "green" | "amber";
  deploymentTypes: string[];
  activeTenantsCount: number;
  activeSeatsCount: number;
  monthlyRevenue: number;
  monthlyRevenueFormatted: string;
  annualRunRateFormatted: string;
  basePriceFormatted: string;
  uptimePercentage: string;
  avgLatency: string;
  releaseDate: string;
  lastCommitHash: string;
  dockerImage: string;
  slaTerms: string;
  techStack: { label: string; value: string }[];
  modules: ProductModule[];
  pricingTiers: ProductPricingTier[];
  tenants: ProductTenantSample[];
  changelog: { version: string; date: string; changes: string[] }[];
}

/* -------------------------------------------------------------------------- */
/*  INITIAL ENTERPRISE PRODUCTS CATALOG                                       */
/* -------------------------------------------------------------------------- */

const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: "efe-erp",
    code: "EFE-ERP-CORE",
    name: "EfeERP Kurumsal Kaynak Planlama",
    category: "erp",
    categoryLabel: "Kurumsal ERP & Finans",
    tagline: "GİB onaylı e-dönüşüm, üretim, WMS ve finansal konsolidasyon omurgası.",
    description:
      "Türkiye mevzuatına tam uyumlu (GİB e-Fatura, e-İrsaliye, e-Defter, KDV2), çoklu şirket ve şube konsolidasyonlu, SAP/Oracle RFC köprülerine sahip kurumsal ERP çekirdeği.",
    version: "v4.8.2 LTS",
    status: "active",
    statusLabel: "Yayında (Stable)",
    themeColor: "#0071e3",
    themeBg: "rgba(0, 113, 227, 0.07)",
    themeBorder: "rgba(0, 113, 227, 0.22)",
    badgeType: "blue",
    deploymentTypes: ["SaaS Multi-tenant", "Dedicated Private Cloud", "On-Premise Bare-Metal"],
    activeTenantsCount: 42,
    activeSeatsCount: 540,
    monthlyRevenue: 680000,
    monthlyRevenueFormatted: "₺680.000",
    annualRunRateFormatted: "₺8.160.000",
    basePriceFormatted: "₺24.000 / Ay'dan başlayan",
    uptimePercentage: "%99.99",
    avgLatency: "14ms",
    releaseDate: "18 Ekim 2026",
    lastCommitHash: "9f84b2c",
    dockerImage: "registry.efesoft.com.tr/efe-erp:4.8.2-lts",
    slaTerms: "%99.98 Uptime · 15 Dk Kritik Müdahale (7/24 SRE)",
    techStack: [
      { label: "Backend", value: "Go 1.23 + gRPC Mikroservis" },
      { label: "Veritabanı", value: "PostgreSQL 16 HA + Citus Sharding" },
      { label: "Kuyruk & Event", value: "Apache Kafka + Redis 7 Cluster" },
      { label: "İstemciler", value: "Next.js Web + iOS/Android Depo WMS" },
    ],
    modules: [
      {
        id: "erp-mod-1",
        name: "Genel Muhasebe & Finans",
        code: "MOD-FIN-01",
        description: "Tekdüzen hesap planı, mizan, bilanço, nakit akışı ve dövizli değerleme.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "erp-mod-2",
        name: "GİB e-Dönüşüm (e-Fatura / e-Arşiv / e-Defter)",
        code: "MOD-EINV-02",
        description: "Gelir İdaresi Başkanlığı doğrudan entegratör köprüsü, otomatik imzalama.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "compliance",
      },
      {
        id: "erp-mod-3",
        name: "WMS Akıllı Depo & Barkodlu Sevkiyat",
        code: "MOD-WMS-03",
        description: "El terminali RF okuma, FIFO/LIFO parti-lot takibi, raf optimizasyonu.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "erp-mod-4",
        name: "MRP-II Üretim & Reçete Planlama",
        code: "MOD-MRP-04",
        description: "Çok katmanlı mamul reçeteleri, iş istasyonu kapasite yükleme, fason takibi.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "erp-mod-5",
        name: "Satınalma & Tedarikçi Portalı",
        code: "MOD-PURCH-05",
        description: "Talep onay mekanizmaları, tedarikçi teklif toplama, sözleşme eşleştirme.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "erp-mod-6",
        name: "İnsan Kaynakları & Bordro (HRM)",
        code: "MOD-HRM-06",
        description: "SGK uyumlu otomatik bordro hesaplama, izin ve zimmet takibi, masraf onayı.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "compliance",
      },
      {
        id: "erp-mod-7",
        name: "SAP S/4HANA & Oracle Çift Yönlü Köprü",
        code: "MOD-RFC-07",
        description: "Büyük kurumsal ERP sistemleriyle çift yönlü gerçek zamanlı RFC senkronu.",
        includedInTiers: ["Enterprise"],
        isAddon: true,
        addonPriceMonthly: 18000,
        status: "stable",
        category: "integration",
      },
      {
        id: "erp-mod-8",
        name: "Yapay Zeka Nakit Akış & Bütçe Tahmini",
        code: "MOD-AI-CASH-08",
        description: "Gelecek 90 günün gelir-gider projeksiyonu ve tahsilat gecikme risk skoru.",
        includedInTiers: ["Enterprise"],
        isAddon: true,
        addonPriceMonthly: 12000,
        status: "beta",
        category: "ai",
      },
    ],
    pricingTiers: [
      {
        tierId: "starter",
        tierName: "Starter ERP",
        monthlyPrice: 24000,
        monthlyPriceFormatted: "₺24.000",
        annualPriceFormatted: "₺240.000 / Yıl (%17 Avantajlı)",
        seatsText: "10 Aktif Kullanıcı Dahil",
        summary: "Büyüyen KOBİ'ler için finans, e-fatura ve satınalma temel paketi.",
        features: [
          "10 Kullanıcı Lisansı (Koltuk)",
          "Genel Muhasebe & Finans Çekirdeği",
          "GİB e-Fatura / e-Arşiv / e-Defter",
          "Satınalma & Tedarik Yönetimi",
          "Günlük Otomatik Şifreli Bulut Yedekleme",
          "E-posta & Ticket Destek (SLA: 4 Saat)",
        ],
      },
      {
        tierId: "pro",
        tierName: "Professional ERP",
        isPopular: true,
        badge: "En Çok Tercih Edilen",
        monthlyPrice: 48000,
        monthlyPriceFormatted: "₺48.000",
        annualPriceFormatted: "₺480.000 / Yıl (%17 Avantajlı)",
        seatsText: "35 Aktif Kullanıcı Dahil",
        summary: "Üretim yapan ve depo yöneten orta-büyük ölçekli işletmeler için tam paket.",
        features: [
          "35 Kullanıcı Lisansı (Genişletilebilir)",
          "WMS Barkodlu Depo & El Terminali",
          "MRP-II Üretim & Reçete Motoru",
          "İnsan Kaynakları & Bordro Modülü",
          "Banka API Doğrudan Hesap Hareket Senkronu",
          "Dedicated DB Örneği & %99.98 Uptime",
          "7/24 Telefon & Öncelikli Mühendis Desteği",
        ],
      },
      {
        tierId: "enterprise",
        tierName: "Enterprise Suite",
        monthlyPrice: 95000,
        monthlyPriceFormatted: "₺95.000",
        annualPriceFormatted: "₺950.000 / Yıl",
        seatsText: "Sınırsız Kullanıcı / Özel Altyapı",
        summary: "Holdingler ve çoklu şirket konsolidasyonu gerektiren global kurumsal altyapılar.",
        features: [
          "Sınırsız Kullanıcı Koltuğu",
          "Dedicated Private Cloud veya On-Premise Kurulum",
          "SAP / Oracle Çift Yönlü RFC Entegrasyonu",
          "AI Nakit Akış & Tahminleme Motoru Dahil",
          "Yıllık Kaynak Kod Escrow Güvencesi",
          "Dedicated Müşteri Başarı Yöneticisi & SRE Ekibi",
          "%99.99 Finansal Uptime Garantisi (SLA)",
        ],
      },
    ],
    tenants: [
      { name: "Borusan Lojistik A.Ş.", industry: "Lojistik & Filo", seats: 140, deployment: "Private Cloud", version: "v4.8.2", uptime: "%99.99" },
      { name: "Kordsa Global A.Ş.", industry: "Tekstil & Kimya", seats: 110, deployment: "On-Premise", version: "v4.8.2", uptime: "%100" },
      { name: "Siemens Türkiye Tedarik", industry: "Sanayi & Enerji", seats: 85, deployment: "Private Cloud", version: "v4.7.9", uptime: "%99.98" },
      { name: "Eczacıbaşı Yapı Çözümleri", industry: "İmalat & Yapı", seats: 75, deployment: "SaaS", version: "v4.8.2", uptime: "%99.99" },
    ],
    changelog: [
      { version: "v4.8.2", date: "18 Ekim 2026", changes: ["GİB 2026 yeni e-Defter XML şeması entegrasyonu tamamlandı", "PostgreSQL Citus partition tabanlı rapor sorgularında %42 hızlanma", "WMS Android el terminali kamera barkod okuyucu tepki süresi 60ms'ye indirildi"] },
      { version: "v4.8.0", date: "02 Eylül 2026", changes: ["Çoklu para birimli holding konsolidasyon motoru eklendi", "Banka açık bankacılık (Fast/EFT) webhooks altyapısı Go mikroservisine taşındı"] },
    ],
  },
  {
    id: "efe-crm",
    code: "EFE-CRM-SUITE",
    name: "EfeCRM Akıllı Müşteri & Satış Yönetimi",
    category: "crm",
    categoryLabel: "CRM, Satış & İletişim",
    tagline: "WhatsApp Cloud API, WebRTC PBX santral ve dinamik teklif & sözleşme motoru.",
    description:
      "Tüm müşteri temas noktalarını (WhatsApp, Çağrı Merkezi, E-posta, Web Formları) tek bir 360° müşteri zaman tüneline toplayan, yapay zeka satış koçlu omnichannel CRM.",
    version: "v3.9.0 Stable",
    status: "active",
    statusLabel: "Yayında (Stable)",
    themeColor: "#8b5cf6",
    themeBg: "rgba(139, 92, 246, 0.07)",
    themeBorder: "rgba(139, 92, 246, 0.22)",
    badgeType: "purple",
    deploymentTypes: ["SaaS Multi-tenant", "Dedicated Private Cloud"],
    activeTenantsCount: 68,
    activeSeatsCount: 380,
    monthlyRevenue: 340000,
    monthlyRevenueFormatted: "₺340.000",
    annualRunRateFormatted: "₺4.080.000",
    basePriceFormatted: "₺12.000 / Ay'dan başlayan",
    uptimePercentage: "%99.98",
    avgLatency: "18ms",
    releaseDate: "12 Ekim 2026",
    lastCommitHash: "b319a4e",
    dockerImage: "registry.efesoft.com.tr/efe-crm:3.9.0",
    slaTerms: "%99.98 Uptime · Realtime WebSocket Sync",
    techStack: [
      { label: "Backend", value: "Node.js 22 LTS + Fastify + Rust Workers" },
      { label: "Veritabanı", value: "PostgreSQL 16 + Redis Caching" },
      { label: "İletişim", value: "Meta WhatsApp Cloud API + FreePBX WebRTC" },
      { label: "Mobil", value: "Swift (iOS) & Kotlin (Android) Saha CRM" },
    ],
    modules: [
      {
        id: "crm-mod-1",
        name: "Görsel Kanban Satış Pipeline",
        code: "MOD-PIPE-01",
        description: "Aşama bazlı ağırlıklı ciro tahmini, otomatik görev ve takip hatırlatıcıları.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "crm-mod-2",
        name: "360° Müşteri & Şirket Kartı",
        code: "MOD-360-02",
        description: "Teklifler, faturalar, geçmiş görüşme kayıtları ve finansal risk skoru.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "crm-mod-3",
        name: "Resmi WhatsApp Cloud API Entegrasyonu",
        code: "MOD-WABA-03",
        description: "Mavi tikli kurumsal WhatsApp hesabı, otomatik şablon mesajları, çoklu temsilci.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "integration",
      },
      {
        id: "crm-mod-4",
        name: "WebRTC Santral & Ses Kayıt Motoru",
        code: "MOD-VOIP-04",
        description: "Tarayıcıdan tek tıkla arama yapma, otomatik ses kaydı ve MP3 arşivleme.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "integration",
      },
      {
        id: "crm-mod-5",
        name: "Dinamik PDF Teklif & E-İmza Üretici",
        code: "MOD-QUOT-05",
        description: "Ürün kataloğundan sürükle-bırak teklif hazırlama, SMS onaylı elektronik imza.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "crm-mod-6",
        name: "Saha Satış Canlı GPS & Rota Takibi",
        code: "MOD-FIELD-06",
        description: "Saha temsilcilerinin müşteri ziyaret check-in'leri ve optimum günlük rota.",
        includedInTiers: ["Enterprise"],
        isAddon: true,
        addonPriceMonthly: 8500,
        status: "stable",
        category: "core",
      },
    ],
    pricingTiers: [
      {
        tierId: "starter",
        tierName: "Starter CRM",
        monthlyPrice: 12000,
        monthlyPriceFormatted: "₺12.000",
        annualPriceFormatted: "₺120.000 / Yıl",
        seatsText: "5 Satış Temsilcisi Dahil",
        summary: "Hızlı satış döngüsüne sahip butik satış ekipleri için temel CRM.",
        features: [
          "5 Kullanıcı Lisansı",
          "Kanban Pipeline & Fırsat Yönetimi",
          "360° Müşteri Kartları & İletişim Geçmişi",
          "PDF Teklif Şablonları & E-posta Gönderimi",
          "Google & Outlook Takvim Senkronizasyonu",
        ],
      },
      {
        tierId: "pro",
        tierName: "Growth CRM",
        isPopular: true,
        badge: "En Popüler Satış Paketi",
        monthlyPrice: 28000,
        monthlyPriceFormatted: "₺28.000",
        annualPriceFormatted: "₺280.000 / Yıl",
        seatsText: "20 Satış Temsilcisi Dahil",
        summary: "WhatsApp ve santral üzerinden yoğun sıcak satış yapan ekipler.",
        features: [
          "20 Kullanıcı Lisansı (Genişletilebilir)",
          "Meta WhatsApp Cloud API Doğrudan Entegrasyonu",
          "WebRTC IP Santral (Arama Yapma & Ses Kaydı)",
          "E-İmza & SMS Doğrulamalı Teklif Takibi",
          "EfeERP Çift Yönlü Sipariş & Fatura Entegrasyonu",
          "Gelişmiş Satış Performans & Prim Raporları",
        ],
      },
      {
        tierId: "enterprise",
        tierName: "Enterprise Suite",
        monthlyPrice: 54000,
        monthlyPriceFormatted: "₺54.000",
        annualPriceFormatted: "₺540.000 / Yıl",
        seatsText: "Sınırsız Temsilci & Özel Entegrasyon",
        summary: "Kurumsal çağrı merkezi ve geniş bayi ağı yöneten organizasyonlar.",
        features: [
          "Sınırsız Satış & Destek Temsilcisi",
          "Saha Satış GPS & Rota Optimizasyon Modülü",
          "Özel Santral Trunking & Dedicated Medya Sunucusu",
          "Yapay Zeka Satış Koçu & Görüşme Duygu Analizi",
          "Dedicated SLA & Özel Veri Saklama Politikası",
        ],
      },
    ],
    tenants: [
      { name: "Turkcell Kurumsal İş Ortaklığı", industry: "Telekom", seats: 95, deployment: "Private Cloud", version: "v3.9.0", uptime: "%99.99" },
      { name: "Garanti Filo Satış Dağıtım", industry: "Otomotiv & Filo", seats: 80, deployment: "Private Cloud", version: "v3.9.0", uptime: "%99.98" },
      { name: "Akdeniz Finans Faktoring", industry: "Finans", seats: 50, deployment: "SaaS", version: "v3.8.8", uptime: "%99.98" },
      { name: "Trend Mağazacılık Satış Ekibi", industry: "Perakende", seats: 45, deployment: "SaaS", version: "v3.9.0", uptime: "%99.99" },
    ],
    changelog: [
      { version: "v3.9.0", date: "12 Ekim 2026", changes: ["Meta Cloud API v20.0 güncellendi; interaktif buton mesajları eklendi", "WebRTC gürültü engelleme algoritması tarayıcı tarafına optimize edildi"] },
    ],
  },
  {
    id: "efe-pos",
    code: "EFE-POS-HYBRID",
    name: "EfePOS Yeni Nesil Kasa & Perakende Otomasyonu",
    category: "pos",
    categoryLabel: "Perakende, Mağaza & Restoran",
    tagline: "İnternet kopsa da durmayan SQLite yerel senkronizasyonlu kasa & ÖKC GMP-3 mimarisi.",
    description:
      "Perakende mağazaları, süpermarketler ve zincir restoranlar için donanım bağımsız (Ingenico, Beko, Hugin, Sunmi, PAX) çalışan, sıfır internet bağımlılığına sahip yeni nesil kasa ve restoran otomasyon sistemi.",
    version: "v5.2.1 Stable",
    status: "active",
    statusLabel: "Yayında (Stable)",
    themeColor: "#10b981",
    themeBg: "rgba(16, 185, 129, 0.07)",
    themeBorder: "rgba(16, 185, 129, 0.22)",
    badgeType: "green",
    deploymentTypes: ["Offline-First Yerel Sync", "SaaS Multi-tenant", "On-Premise Kasa LAN"],
    activeTenantsCount: 18,
    activeSeatsCount: 680,
    monthlyRevenue: 280000,
    monthlyRevenueFormatted: "₺280.000",
    annualRunRateFormatted: "₺3.360.000",
    basePriceFormatted: "₺850 / Ay / Terminal'den başlayan",
    uptimePercentage: "%100",
    avgLatency: "4ms (Yerel)",
    releaseDate: "20 Ekim 2026",
    lastCommitHash: "7a91fc3",
    dockerImage: "registry.efesoft.com.tr/efe-pos-hub:5.2.1",
    slaTerms: "%100 Kasa Çalışma Garantisi · 0 Kesinti Riski",
    techStack: [
      { label: "Masaüstü/Terminal", value: "Flutter Desktop (Windows/Linux/Android)" },
      { label: "Yerel Veritabanı", value: "SQLite 3 + WAL Modu (Sıfır Gecikme)" },
      { label: "Senkron Motoru", value: "MQTT P2P LAN Sync + HTTPS Batch Upload" },
      { label: "Donanım Protokolü", value: "ÖKC GMP-3 / RS232 / USB HID / ESC-POS" },
    ],
    modules: [
      {
        id: "pos-mod-1",
        name: "Offline-First SQLite Yerel Kasa Motoru",
        code: "MOD-OFFLINE-01",
        description: "İnternet bağlantısı tamamen kopsa dahi kasada satış, fiş kesme ve stok düşümü durmaz.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "pos-mod-2",
        name: "GİB Onaylı ÖKC / GMP-3 Yazar Kasa Entegratörü",
        code: "MOD-GMP3-02",
        description: "Ingenico, Beko ve Hugin yazar kasa POS cihazlarıyla kablolu/kablosuz haberleşme.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "compliance",
      },
      {
        id: "pos-mod-3",
        name: "Dokunmatik Hızlı Satış & Barkod / Terazi",
        code: "MOD-TOUCH-03",
        description: "Kısayol ürün butonları, gramajlı tartım terazisi entegrasyonu, iade ve fiş bekletme.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "pos-mod-4",
        name: "Restoran Masa & Garson El Terminali",
        code: "MOD-REST-04",
        description: "Kroki üzerinden masa yönetimi, adisyon bölme, garson Android el terminali.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "pos-mod-5",
        name: "Mutfak Ekranı (KDS - Kitchen Display)",
        code: "MOD-KDS-05",
        description: "Siparişlerin hazırlanma süreleri, gecikme uyarıları ve aşçı dokunmatik ekranı.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "core",
      },
      {
        id: "pos-mod-6",
        name: "Merkez ERP Çoklu Şube Fiyat & Kampanya Motoru",
        code: "MOD-SYNC-06",
        description: "Merkezden tüm şube ve kasalara anlık fiyat güncelleme ve promosyon tanımlama.",
        includedInTiers: ["Enterprise"],
        status: "stable",
        category: "integration",
      },
    ],
    pricingTiers: [
      {
        tierId: "starter",
        tierName: "Tek Kasa Esnaf",
        monthlyPrice: 1450,
        monthlyPriceFormatted: "₺1.450",
        annualPriceFormatted: "₺14.500 / Yıl",
        seatsText: "1 Kasa Terminali",
        summary: "Tek mağazalı butik perakendeciler ve kafeler için kompakt çözüm.",
        features: [
          "1 Kasa Terminal Lisansı",
          "Offline-First SQLite Kesintisiz Satış",
          "ÖKC GMP-3 Yazar Kasa Sürücüsü",
          "Barkod & Fiş Yazıcı Desteği",
          "Gün Sonu Z Raporu Raporlama",
        ],
      },
      {
        tierId: "pro",
        tierName: "Perakende Zinciri",
        isPopular: true,
        badge: "Mağaza & Restoran Paketi",
        monthlyPrice: 1150,
        monthlyPriceFormatted: "₺1.150 / Kasa",
        annualPriceFormatted: "₺11.500 / Yıl / Kasa",
        seatsText: "5+ Kasa Terminali",
        summary: "Çoklu şubeye ve restoran operasyonuna sahip işletmeler.",
        features: [
          "Kasa Başına Lisanslama (Minimum 5 Kasa)",
          "Restoran Masa & Garson El Terminali Modülü",
          "Mutfak Ekranı (KDS) Entegrasyonu",
          "Şubeler Arası Stok Transferi & Konsolidasyon",
          "EfeERP & EfeCRM ile Otomatik Senkronizasyon",
          "7/24 Saha Donanım Müdahale Desteği",
        ],
      },
      {
        tierId: "enterprise",
        tierName: "Kurumsal Enterprise",
        monthlyPrice: 850,
        monthlyPriceFormatted: "₺850 / Kasa",
        annualPriceFormatted: "₺8.500 / Yıl / Kasa",
        seatsText: "50+ Kasa & Özel Protokol",
        summary: "Büyük süpermarket zincirleri ve ulusal perakende markaları.",
        features: [
          "Toplu Kasa İskontosu (50+ Kasa İçin)",
          "Merkez Veri Ambarı Doğrudan Kafka Streaming",
          "Özel Donanım Protokolleri & Terazi Ağı",
          "Sadakat & Müşteri Kartı Puan Sistemi",
          "Dedicated Yerinde Kurulum & Saha Eğitimi",
          "%100 Kesintisiz Satış SLA Taahhüdü",
        ],
      },
    ],
    tenants: [
      { name: "Ege Perakende Mağazacılık A.Ş.", industry: "Süpermarket & Gıda", seats: 195, deployment: "Offline Sync", version: "v5.2.1", uptime: "%100" },
      { name: "Getir Yerel Market Depoları", industry: "Hızlı Teslimat", seats: 180, deployment: "Offline Sync", version: "v5.2.1", uptime: "%100" },
      { name: "Köfteci Efe Zincir Restoranları", industry: "Restoran & Kafe", seats: 120, deployment: "Offline LAN", version: "v5.2.0", uptime: "%100" },
      { name: "İzmir Doğal Ürünler Kooperatifi", industry: "Gurme Perakende", seats: 45, deployment: "Offline Sync", version: "v5.2.1", uptime: "%100" },
    ],
    changelog: [
      { version: "v5.2.1", date: "20 Ekim 2026", changes: ["Ingenico Lane/5000 serisi Ethernet bağlantı kararlılığı %30 artırıldı", "Kasa yerel SQLite veritabanı vakum süresi arka plana alındı, sıfır takılma"] },
    ],
  },
  {
    id: "efe-ai",
    code: "EFE-AI-ENTERPRISE",
    name: "EfeAI Kurumsal Karar Destek & Veri Ajanı",
    category: "ai",
    categoryLabel: "Yapay Zeka & Altyapı",
    tagline: "ERP ve CRM veritabanlarıyla doğal dille konuşan RAG ve otonom karar destek motoru.",
    description:
      "Şirket yöneticilerinin ve çalışanlarının 'Geçen ay en çok kâr getiren 5 müşterimiz kim?' gibi doğal sorularını saniyeler içinde yetkili SQL sorgularına ve görsel raporlara dönüştüren, şirket içi dokümanları RAG ile okuyan yeni nesil kurumsal yapay zeka omurgası.",
    version: "v2.1.0 Beta",
    status: "beta",
    statusLabel: "Beta (Erken Erişim)",
    themeColor: "#f59e0b",
    themeBg: "rgba(245, 158, 11, 0.07)",
    themeBorder: "rgba(245, 158, 11, 0.22)",
    badgeType: "amber",
    deploymentTypes: ["Dedicated Private LLM", "SaaS AI Gateway", "On-Premises GPU Cluster"],
    activeTenantsCount: 14,
    activeSeatsCount: 128,
    monthlyRevenue: 120000,
    monthlyRevenueFormatted: "₺120.000",
    annualRunRateFormatted: "₺1.440.000",
    basePriceFormatted: "₺18.000 / Ay'dan başlayan",
    uptimePercentage: "%99.95",
    avgLatency: "320ms",
    releaseDate: "24 Ekim 2026",
    lastCommitHash: "e4d2801",
    dockerImage: "registry.efesoft.com.tr/efe-ai-gateway:2.1.0-beta",
    slaTerms: "%99.95 Uptime · Sıfır Veri Sızıntısı (KVKK Uyumlu)",
    techStack: [
      { label: "Çekirdek LLM", value: "Gemini 2.0 Flash / Pro + Llama 3.3 70B On-Prem" },
      { label: "Vektör & RAG", value: "pgvector + Hybrid BM25 Sparse Search" },
      { label: "Framework", value: "Python 3.12 + FastAPI + vLLM Inference" },
      { label: "Güvenlik", value: "Tenant İçi Row-Level-Security (RLS) & PII Maskeleme" },
    ],
    modules: [
      {
        id: "ai-mod-1",
        name: "Doğal Dil ile SQL & BI Raporlama",
        code: "MOD-TEXT2SQL-01",
        description: "Yöneticilerin sorularını anında yetkilendirilmiş SQL sorgularına ve tablolara dönüştürür.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "beta",
        category: "ai",
      },
      {
        id: "ai-mod-2",
        name: "Fatura, Sözleşme & OCR Belge Okuyucu",
        code: "MOD-OCR-RAG-02",
        description: "PDF ve taranmış belgelerdeki kalemleri, KDV'leri ve imzaları %99.4 doğrulukla ayrıştırır.",
        includedInTiers: ["Starter", "Professional", "Enterprise"],
        status: "stable",
        category: "ai",
      },
      {
        id: "ai-mod-3",
        name: "Şirket İçi RAG Doküman Bilgi Bankası",
        code: "MOD-CORP-RAG-03",
        description: "Şirket prosedürleri, İK yönergeleri ve ürün katalogları üzerinde anlık soru-cevap.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "beta",
        category: "ai",
      },
      {
        id: "ai-mod-4",
        name: "Otonom Müşteri Destek Chatbotu",
        code: "MOD-CHATBOT-04",
        description: "WhatsApp ve web üzerinden müşterilerin sipariş sorgularını otonom çözer.",
        includedInTiers: ["Professional", "Enterprise"],
        status: "stable",
        category: "integration",
      },
      {
        id: "ai-mod-5",
        name: "Stok Anomali & Talep Tahminleme",
        code: "MOD-PREDICT-05",
        description: "Mevsimsellik ve satış trendlerini inceleyerek hammadde tükenme alarmları üretir.",
        includedInTiers: ["Enterprise"],
        status: "beta",
        category: "ai",
      },
    ],
    pricingTiers: [
      {
        tierId: "starter",
        tierName: "Pilot Suite",
        monthlyPrice: 18000,
        monthlyPriceFormatted: "₺18.000",
        annualPriceFormatted: "₺180.000 / Yıl",
        seatsText: "10 Kullanıcı / 250.000 Token / Ay",
        summary: "Doğal dil SQL raporlaması ve temel belge OCR'ı denemek isteyen kurumlar.",
        features: [
          "Doğal Dilden SQL Üretici (Text-to-SQL)",
          "Aylık 2.500 Sayfa Fatura / Belge OCR Okuma",
          "EfeERP & EfeCRM Doğrudan Konnektörü",
          "KVKK Uyumlu Otomatik PII Maskeleme",
          "Standart Bulut SLA (%99.9)",
        ],
      },
      {
        tierId: "pro",
        tierName: "Pro Engine",
        isPopular: true,
        badge: "Gelişmiş AI Asistanı",
        monthlyPrice: 42000,
        monthlyPriceFormatted: "₺42.000",
        annualPriceFormatted: "₺420.000 / Yıl",
        seatsText: "50 Kullanıcı / 1.5M Token / Ay",
        summary: "Kurumsal RAG bilgi bankası ve otonom müşteri botu kullanan şirketler.",
        features: [
          "Şirket İçi Vektör RAG Bilgi Bankası (10.000 Doküman)",
          "WhatsApp Otonom Müşteri Destek Ajanı",
          "Ayda 15.000 Sayfa Yüksek Çözünürlüklü OCR",
          "Öncelikli GPU İnfereans Kuyruğu (<300ms)",
          "Özel Prompt & Firma Sözlüğü Ayarları",
        ],
      },
      {
        tierId: "enterprise",
        tierName: "Dedicated On-Prem LLM",
        monthlyPrice: 110000,
        monthlyPriceFormatted: "₺110.000",
        annualPriceFormatted: "₺1.100.000 / Yıl",
        seatsText: "Sınırsız Token / Şirket İçi GPU",
        summary: "Verisi hiçbir şekilde dışarı çıkamayacak savunma sanayii ve finans kuruluşları.",
        features: [
          "Kurum İçi Sunucularda (On-Premises NVIDIA GPU) Yerel Kurulum",
          "Sıfır Dış Ağ Bağımlılığı (Hava Boşluklu / Air-Gapped Çalışma)",
          "Açık Kaynak Llama 3.3 / Mistral Şirkete Özel İnce Ayar (Fine-Tuning)",
          "Sınırsız Token & Eşzamanlı Sorgulama",
          "Dedicated Yapay Zeka Mühendisi Tahsisi",
        ],
      },
    ],
    tenants: [
      { name: "Trendyol Entegratörleri", industry: "E-Ticaret", seats: 45, deployment: "SaaS AI Gateway", version: "v2.1.0", uptime: "%99.98" },
      { name: "Aselsan AR-GE Tedarikçi", industry: "Savunma Sanayii", seats: 30, deployment: "On-Premises GPU", version: "v2.0.4", uptime: "%100" },
      { name: "Eczacıbaşı Lojistik Analitik", industry: "Tedarik Zinciri", seats: 25, deployment: "Private LLM", version: "v2.1.0", uptime: "%99.95" },
      { name: "Ege Perakende Talep Tahmin", industry: "Perakende", seats: 28, deployment: "SaaS AI Gateway", version: "v2.1.0", uptime: "%99.96" },
    ],
    changelog: [
      { version: "v2.1.0", date: "24 Ekim 2026", changes: ["Gemini 2.0 Flash entegrasyonuyla Text-to-SQL yanıt süresi 780ms'den 290ms'ye indirildi", "GİB e-İrsaliye ve e-Müstahsil makbuzu OCR ayrıştırma doğruluğu %99.4'e ulaştı"] },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                            */
/* -------------------------------------------------------------------------- */

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>("all");
  const [deploymentFilter, setDeploymentFilter] = useState<DeploymentFilter>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Expanded Product in Table / Details View
  const [expandedProductId, setExpandedProductId] = useState<string | null>("efe-erp");
  const [activeDetailTab, setActiveDetailTab] = useState<"modules" | "pricing" | "tenants" | "tech">("modules");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMatrixModal, setShowMatrixModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState<ProductRecord | null>(null);
  const [showDemoModal, setShowDemoModal] = useState<ProductRecord | null>(null);
  const [demoUrlCopied, setDemoUrlCopied] = useState(false);

  // Success Feedback Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // New Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCode, setNewProdCode] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<"erp" | "crm" | "pos" | "ai">("erp");
  const [newProdVersion, setNewProdVersion] = useState("v1.0.0");
  const [newProdTagline, setNewProdTagline] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("20000");

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdCode.trim()) return;

    const colors: Record<string, { themeColor: string; themeBg: string; themeBorder: string; badgeType: "blue" | "purple" | "green" | "amber" }> = {
      erp: { themeColor: "#0071e3", themeBg: "rgba(0, 113, 227, 0.08)", themeBorder: "rgba(0, 113, 227, 0.22)", badgeType: "blue" },
      crm: { themeColor: "#8b5cf6", themeBg: "rgba(139, 92, 246, 0.08)", themeBorder: "rgba(139, 92, 246, 0.22)", badgeType: "purple" },
      pos: { themeColor: "#10b981", themeBg: "rgba(16, 185, 129, 0.08)", themeBorder: "rgba(16, 185, 129, 0.22)", badgeType: "green" },
      ai: { themeColor: "#f59e0b", themeBg: "rgba(245, 158, 11, 0.08)", themeBorder: "rgba(245, 158, 11, 0.22)", badgeType: "amber" },
    };

    const c = colors[newProdCategory];
    const categoryLabels: Record<string, string> = {
      erp: "Kurumsal ERP & Finans",
      crm: "CRM, Satış & İletişim",
      pos: "Perakende, Mağaza & Restoran",
      ai: "Yapay Zeka & Altyapı",
    };

    const priceNum = parseInt(newProdPrice, 10) || 20000;

    const newRecord: ProductRecord = {
      id: `prod-${Date.now()}`,
      code: newProdCode.toUpperCase().trim(),
      name: newProdName.trim(),
      category: newProdCategory,
      categoryLabel: categoryLabels[newProdCategory],
      tagline: newProdTagline.trim() || "Kurumsal EfeOS ekosistem modülü.",
      description: "Yeni oluşturulan ürün kaydı. Detaylı modül konfigürasyonu ve lisans matrisi tanımlanmaya hazır.",
      version: newProdVersion.trim() || "v1.0.0",
      status: "beta",
      statusLabel: "Beta (Yeni)",
      themeColor: c.themeColor,
      themeBg: c.themeBg,
      themeBorder: c.themeBorder,
      badgeType: c.badgeType,
      deploymentTypes: ["SaaS Multi-tenant", "Dedicated Private Cloud"],
      activeTenantsCount: 1,
      activeSeatsCount: 10,
      monthlyRevenue: priceNum,
      monthlyRevenueFormatted: `₺${priceNum.toLocaleString("tr-TR")}`,
      annualRunRateFormatted: `₺${(priceNum * 12).toLocaleString("tr-TR")}`,
      basePriceFormatted: `₺${priceNum.toLocaleString("tr-TR")} / Ay'dan başlayan`,
      uptimePercentage: "%100",
      avgLatency: "15ms",
      releaseDate: "Yeni Eklendi",
      lastCommitHash: "c019da8",
      dockerImage: `registry.efesoft.com.tr/${newProdCode.toLowerCase()}:1.0.0`,
      slaTerms: "%99.98 Uptime · 15 Dk Kritik Müdahale",
      techStack: [
        { label: "Mimari", value: "EfeOS Go / Node.js Engine" },
        { label: "Veritabanı", value: "PostgreSQL 16 HA" },
      ],
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          name: "Temel Çekirdek Modülü",
          code: "MOD-CORE-01",
          description: "Sistem kimlik doğrulama, RBAC yetkilendirme ve audit logging omurgası.",
          includedInTiers: ["Starter", "Professional", "Enterprise"],
          status: "stable",
          category: "core",
        },
      ],
      pricingTiers: [
        {
          tierId: "starter",
          tierName: "Starter Paket",
          monthlyPrice: priceNum,
          monthlyPriceFormatted: `₺${priceNum.toLocaleString("tr-TR")}`,
          annualPriceFormatted: `₺${(priceNum * 10).toLocaleString("tr-TR")} / Yıl`,
          seatsText: "10 Kullanıcı Lisansı",
          summary: "Temel modüller ve başlangıç seviyesi lisans.",
          features: ["Temel Çekirdek Lisansı", "Günlük Otomatik Yedekleme", "E-posta Destek (SLA: 4 Saat)"],
        },
      ],
      tenants: [
        { name: "Efesoft İç Geliştirme Tenantı", industry: "Yazılım", seats: 10, deployment: "SaaS", version: newProdVersion, uptime: "%100" },
      ],
      changelog: [
        { version: newProdVersion, date: "Bugün", changes: ["Ürün ilk kez oluşturuldu ve EfeOS lisans kataloğuna eklendi"] },
      ],
    };

    setProducts((prev) => [newRecord, ...prev]);
    setShowAddModal(false);
    setNewProdName("");
    setNewProdCode("");
    setNewProdTagline("");
    showToast(`"${newRecord.name}" başarıyla ürün kataloğuna eklendi!`);
  };

  // Release simulation
  const [releaseVersion, setReleaseVersion] = useState("");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeployRelease = (prod: ProductRecord) => {
    if (!releaseVersion) return;
    setIsDeploying(true);

    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === prod.id) {
            return {
              ...p,
              version: releaseVersion,
              changelog: [
                {
                  version: releaseVersion,
                  date: "Yeni Yayınlandı",
                  changes: releaseNotes ? releaseNotes.split("\n").filter(Boolean) : ["Performans optimizasyonu ve güvenlik yamaları uygulandı"],
                },
                ...p.changelog,
              ],
            };
          }
          return p;
        })
      );
      setIsDeploying(false);
      setShowReleaseModal(null);
      setReleaseVersion("");
      setReleaseNotes("");
      showToast(`${prod.name} için ${releaseVersion} sürümü tüm tenant kümelerine başarıyla dağıtıldı!`);
    }, 1200);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modules.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;

      const matchesDeploy =
        deploymentFilter === "all" ||
        (deploymentFilter === "saas" && p.deploymentTypes.some((d) => d.includes("SaaS"))) ||
        (deploymentFilter === "private" && p.deploymentTypes.some((d) => d.includes("Private"))) ||
        (deploymentFilter === "onprem" && p.deploymentTypes.some((d) => d.includes("On-Premise"))) ||
        (deploymentFilter === "offline" && p.deploymentTypes.some((d) => d.includes("Offline")));

      return matchesSearch && matchesCat && matchesDeploy;
    });
  }, [products, searchQuery, categoryFilter, deploymentFilter]);

  // Aggregate Metrics
  const totalSeats = products.reduce((acc, p) => acc + p.activeSeatsCount, 0);
  const totalRevenue = products.reduce((acc, p) => acc + p.monthlyRevenue, 0);
  const totalTenants = products.reduce((acc, p) => acc + p.activeTenantsCount, 0);
  const totalModules = products.reduce((acc, p) => acc + p.modules.length, 0);

  return (
    <div className="adm-page adm-tab-transition">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            background: "#1e293b",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 500,
            boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "admToastIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <CheckCircle2 size={16} color="#30d158" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  PAGE HEADER & ACTIONS                                               */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-page__header" style={{ marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span className="adm-badge adm-badge--info">EfeOS v4.8 Ürün Kataloğu &amp; Lisans Motoru</span>
            <span className="adm-badge adm-badge--success">Tüm Sistemler Uptime %99.98</span>
          </div>
          <h1 className="adm-page__title" style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Ürün Yönetimi &amp; Lisans Mimarisi
          </h1>
          <p className="adm-page__desc" style={{ fontSize: "13.5px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
            Efesoft tescilli kurumsal yazılım ürünleri (ERP, CRM, POS, AI), modül mimarileri, paket fiyatlandırmaları ve lisans kural motoru.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="adm-btn adm-btn--secondary"
            onClick={() => setShowMatrixModal(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <SlidersHorizontal size={14} />
            <span>Paket &amp; Fiyat Matrisi</span>
          </button>

          <button
            type="button"
            className="adm-btn adm-btn--primary"
            onClick={() => setShowAddModal(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={15} />
            <span>Yeni Ürün / Modül Tanımla</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  TOP EXECUTIVE METRIC CARDS                                          */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {/* KPI 1 */}
        <div className="adm-card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Aktif Ürün &amp; Çekirdek
            </span>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(0,113,227,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0071e3" }}>
              <Package size={15} />
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--adm-text)" }}>
            {products.length} Ana Ürün
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="adm-badge adm-badge--blue" style={{ padding: "1px 5px", fontSize: "10px" }}>{totalModules} Modül</span>
            <span>EfeOS Ekosistem Çekirdeği</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="adm-card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Lisanslı Koltuk (Seats)
            </span>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>
              <Users size={15} />
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--adm-text)" }}>
            {totalSeats.toLocaleString("tr-TR")} Koltuk
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="adm-badge adm-badge--purple" style={{ padding: "1px 5px", fontSize: "10px" }}>{totalTenants} Kurumsal Müşteri</span>
            <span>+%28 Yıllık Büyüme</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="adm-card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Yazılım MRR (Aylık Düzenli Gelir)
            </span>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
              <CreditCard size={15} />
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "#16a34a" }}>
            ₺{totalRevenue.toLocaleString("tr-TR")}
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--adm-text-secondary)" }}> / Ay</span>
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", marginTop: "4px" }}>
            Yıllık ARR: <strong>₺{(totalRevenue * 12).toLocaleString("tr-TR")}</strong> (%34 Brüt Marj)
          </div>
        </div>

        {/* KPI 4 */}
        <div className="adm-card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Altyapı &amp; Güvenlik SLA
            </span>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}>
              <ShieldCheck size={15} />
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--adm-text)" }}>
            %99.98 Uptime
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="adm-badge adm-badge--success" style={{ padding: "1px 5px", fontSize: "10px" }}>0 Güvenlik Açığı</span>
            <span>mTLS v2 Ağ Geçidi</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  SEARCH & FILTER TOOLBAR                                             */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="adm-card"
        style={{
          padding: "12px 16px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "1 1 300px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: "11px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--adm-text-secondary)",
              }}
            />
            <input
              type="text"
              placeholder="Ürün adı, modül, kod veya teknoloji ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="adm-input"
              style={{ paddingLeft: "32px", fontSize: "13px", height: "34px", width: "100%" }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--adm-text-secondary)",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", overflowX: "auto" }}>
            {[
              { id: "all", label: "Tümü" },
              { id: "erp", label: "ERP & Finans" },
              { id: "crm", label: "CRM & Satış" },
              { id: "pos", label: "POS & Kasa" },
              { id: "ai", label: "Yapay Zeka" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id as ProductCategory)}
                style={{
                  padding: "5px 11px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: categoryFilter === cat.id ? 600 : 500,
                  border: "1px solid",
                  borderColor: categoryFilter === cat.id ? "var(--adm-primary)" : "var(--adm-border)",
                  background: categoryFilter === cat.id ? "var(--adm-primary-soft)" : "transparent",
                  color: categoryFilter === cat.id ? "var(--adm-primary)" : "var(--adm-text-secondary)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--adm-bg)",
              border: "1px solid var(--adm-border)",
              borderRadius: "7px",
              padding: "2px",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Kart Görünümü"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "5px",
                border: "none",
                background: viewMode === "grid" ? "#ffffff" : "transparent",
                color: viewMode === "grid" ? "var(--adm-primary)" : "var(--adm-text-secondary)",
                boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                cursor: "pointer",
              }}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Detaylı Tablo Görünümü"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "5px",
                border: "none",
                background: viewMode === "table" ? "#ffffff" : "transparent",
                color: viewMode === "table" ? "var(--adm-primary)" : "var(--adm-text-secondary)",
                boxShadow: viewMode === "table" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                cursor: "pointer",
              }}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  VIEW MODE 1: BENTO / GRID CARDS                                     */}
      {/* -------------------------------------------------------------------- */}
      {viewMode === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {filteredProducts.map((prod, idx) => {
            const isExpanded = expandedProductId === prod.id;
            return (
              <div
                key={prod.id}
                className="adm-card adm-row-cascade"
                style={{
                  padding: "0",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  border: isExpanded ? `1.5px solid ${prod.themeColor}` : "1px solid var(--adm-border)",
                  boxShadow: isExpanded ? `0 8px 24px -6px ${prod.themeColor}33` : "var(--adm-card-shadow)",
                  transition: "border 0.2s ease, box-shadow 0.2s ease",
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                {/* Header Banner */}
                <div
                  style={{
                    padding: "18px 20px 14px",
                    borderBottom: "1px solid var(--adm-border)",
                    background: `linear-gradient(180deg, ${prod.themeBg} 0%, rgba(255,255,255,0) 100%)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: prod.themeColor,
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${prod.themeColor}40`,
                        }}
                      >
                        {prod.category === "erp" && <Layers size={20} />}
                        {prod.category === "crm" && <Users size={20} />}
                        {prod.category === "pos" && <CreditCard size={20} />}
                        {prod.category === "ai" && <Sparkles size={20} />}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--adm-text)" }}>
                            {prod.name}
                          </h3>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--adm-text-secondary)" }}>
                            {prod.code}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--adm-border)" }}>•</span>
                          <span className={`adm-badge adm-badge--${prod.badgeType}`} style={{ padding: "0.5px 6px", fontSize: "10.5px" }}>
                            {prod.version}
                          </span>
                          <span className="adm-badge adm-badge--success" style={{ padding: "0.5px 6px", fontSize: "10px" }}>
                            {prod.statusLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a" }}>
                        {prod.monthlyRevenueFormatted}
                        <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--adm-text-secondary)" }}>/Ay</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                        {prod.activeTenantsCount} Müşteri · {prod.activeSeatsCount} Koltuk
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "var(--adm-text-secondary)", lineHeight: 1.45, marginTop: "6px" }}>
                    {prod.tagline}
                  </p>
                </div>

                {/* Key Metrics Row */}
                <div
                  style={{
                    padding: "10px 20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "8px",
                    borderBottom: "1px solid var(--adm-border)",
                    background: "rgba(0,0,0,0.015)",
                    fontSize: "11.5px",
                  }}
                >
                  <div>
                    <div style={{ color: "var(--adm-text-secondary)", fontSize: "10.5px" }}>BAŞLANGIÇ</div>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>{prod.basePriceFormatted}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--adm-text-secondary)", fontSize: "10.5px" }}>UPTIME &amp; SLA</div>
                    <div style={{ fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "3px" }}>
                      <Activity size={12} /> {prod.uptimePercentage} ({prod.avgLatency})
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "var(--adm-text-secondary)", fontSize: "10.5px" }}>AKTİF MODÜLLER</div>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>{prod.modules.length} Paket Bileşeni</div>
                  </div>
                </div>

                {/* Modules Snippet Chips */}
                <div style={{ padding: "12px 20px", flex: 1 }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--adm-text-secondary)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Öne Çıkan Modüller
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {prod.modules.slice(0, 5).map((m) => (
                      <span
                        key={m.id}
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          borderRadius: "5px",
                          background: "var(--adm-bg)",
                          border: "1px solid var(--adm-border)",
                          color: "var(--adm-text)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: m.category === "compliance" ? "#16a34a" : m.category === "ai" ? "#f59e0b" : prod.themeColor }} />
                        {m.name}
                      </span>
                    ))}
                    {prod.modules.length > 5 && (
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "3px 7px",
                          borderRadius: "5px",
                          background: "transparent",
                          color: "var(--adm-primary)",
                          fontWeight: 600,
                        }}
                      >
                        +{prod.modules.length - 5} modül daha
                      </span>
                    )}
                  </div>

                  {/* Deployment Chips */}
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "10px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>Dağıtım:</span>
                    {prod.deploymentTypes.map((d) => (
                      <span key={d} className="adm-badge adm-badge--neutral" style={{ fontSize: "10px", padding: "1px 6px" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div
                  style={{
                    padding: "10px 16px",
                    borderTop: "1px solid var(--adm-border)",
                    background: "rgba(0,0,0,0.01)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      type="button"
                      className="adm-btn adm-btn--secondary"
                      onClick={() => setShowDemoModal(prod)}
                      style={{ height: "28px", padding: "0 10px", fontSize: "11.5px", display: "flex", alignItems: "center", gap: "4px" }}
                      title="Anlık demo sandbox ortamı başlat"
                    >
                      <Play size={12} color="#0071e3" />
                      <span>Demo Başlat</span>
                    </button>

                    <button
                      type="button"
                      className="adm-btn adm-btn--secondary"
                      onClick={() => {
                        setShowReleaseModal(prod);
                        setReleaseVersion(prod.version.replace(/(\d+)$/, (n) => String(Number(n) + 1)));
                      }}
                      style={{ height: "28px", padding: "0 10px", fontSize: "11.5px", display: "flex", alignItems: "center", gap: "4px" }}
                      title="Yeni patch veya sürüm yayınla"
                    >
                      <GitBranch size={12} />
                      <span>Sürüm Dağıt</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedProductId(isExpanded ? null : prod.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: isExpanded ? prod.themeColor : "var(--adm-primary)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{isExpanded ? "Detayları Kapat" : "360° İncele"}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ------------------------------------------------------------------ */
        /*  VIEW MODE 2: COMPACT DATA TABLE                                   */
        /* ------------------------------------------------------------------ */
        <div className="adm-card" style={{ padding: "0", overflow: "hidden", marginBottom: "24px" }}>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Ürün &amp; Kod</th>
                  <th>Kategori</th>
                  <th>Sürüm &amp; Durum</th>
                  <th>Müşteri &amp; Koltuk</th>
                  <th>Aylık Ciro (MRR)</th>
                  <th>Uptime / SLA</th>
                  <th style={{ textAlign: "right" }}>Aksiyonlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => {
                  const isExpanded = expandedProductId === prod.id;
                  return (
                    <Fragment key={prod.id}>
                      <tr
                        style={{
                          background: isExpanded ? "rgba(0,113,227,0.03)" : undefined,
                          cursor: "pointer",
                        }}
                        onClick={() => setExpandedProductId(isExpanded ? null : prod.id)}
                      >
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "8px",
                                background: prod.themeColor,
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {prod.category === "erp" && <Layers size={16} />}
                              {prod.category === "crm" && <Users size={16} />}
                              {prod.category === "pos" && <CreditCard size={16} />}
                              {prod.category === "ai" && <Sparkles size={16} />}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>{prod.name}</div>
                              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--adm-text-secondary)" }}>
                                {prod.code}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: "12px", color: "var(--adm-text)" }}>{prod.categoryLabel}</span>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span className={`adm-badge adm-badge--${prod.badgeType}`} style={{ fontSize: "10px" }}>
                              {prod.version}
                            </span>
                            <span className="adm-badge adm-badge--success" style={{ fontSize: "9.5px" }}>
                              {prod.statusLabel}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: "12.5px" }}>
                            {prod.activeTenantsCount} Müşteri
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                            {prod.activeSeatsCount} Koltuk
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: "#16a34a", fontSize: "13px" }}>
                            {prod.monthlyRevenueFormatted}
                          </div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                            ARR: {prod.annualRunRateFormatted}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Activity size={12} /> {prod.uptimePercentage}
                          </div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                            {prod.avgLatency} gecikme
                          </div>
                        </td>
                        <td style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                            <button
                              type="button"
                              className="adm-btn adm-btn--secondary"
                              onClick={() => setShowDemoModal(prod)}
                              style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                            >
                              Demo
                            </button>
                            <button
                              type="button"
                              className="adm-btn adm-btn--secondary"
                              onClick={() => {
                                setShowReleaseModal(prod);
                                setReleaseVersion(prod.version.replace(/(\d+)$/, (n) => String(Number(n) + 1)));
                              }}
                              style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                            >
                              Yayınla
                            </button>
                            <button
                              type="button"
                              onClick={() => setExpandedProductId(isExpanded ? null : prod.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "var(--adm-text-secondary)",
                                padding: "4px",
                                cursor: "pointer",
                              }}
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
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
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  EXPANDED 360° PRODUCT INSPECTOR & ACCORDION DRAWER                  */}
      {/* -------------------------------------------------------------------- */}
      {expandedProductId && (() => {
        const prod = products.find((p) => p.id === expandedProductId);
        if (!prod) return null;

        return (
          <div
            className="adm-card adm-row-cascade"
            style={{
              padding: "24px",
              marginBottom: "32px",
              border: `1.5px solid ${prod.themeColor}`,
              boxShadow: `0 12px 36px -8px ${prod.themeColor}26`,
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--adm-border)",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: prod.themeColor,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 14px ${prod.themeColor}40`,
                  }}
                >
                  {prod.category === "erp" && <Layers size={22} />}
                  {prod.category === "crm" && <Users size={22} />}
                  {prod.category === "pos" && <CreditCard size={22} />}
                  {prod.category === "ai" && <Sparkles size={22} />}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--adm-text)" }}>
                      {prod.name}
                    </h2>
                    <span className={`adm-badge adm-badge--${prod.badgeType}`}>{prod.version}</span>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
                    {prod.description}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  type="button"
                  className="adm-btn adm-btn--secondary"
                  onClick={() => setShowDemoModal(prod)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}
                >
                  <Play size={13} color="#0071e3" />
                  <span>Sandbox Demo Başlat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedProductId(null)}
                  style={{
                    background: "var(--adm-bg)",
                    border: "1px solid var(--adm-border)",
                    borderRadius: "6px",
                    padding: "6px",
                    color: "var(--adm-text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Segmented Control Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid var(--adm-border)",
                paddingBottom: "12px",
                marginBottom: "20px",
                overflowX: "auto",
              }}
            >
              {[
                { id: "modules", label: `Modül Kataloğu (${prod.modules.length})`, icon: <Package size={14} /> },
                { id: "pricing", label: `Paketler & Fiyatlandırma (${prod.pricingTiers.length})`, icon: <CreditCard size={14} /> },
                { id: "tenants", label: `Canlı Müşteri Kümeleri (${prod.tenants.length})`, icon: <Building2 size={14} /> },
                { id: "tech", label: "Teknoloji Stack & API", icon: <Terminal size={14} /> },
              ].map((tab) => {
                const isActive = activeDetailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveDetailTab(tab.id as typeof activeDetailTab)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 14px",
                      borderRadius: "7px",
                      fontSize: "12.5px",
                      fontWeight: isActive ? 600 : 500,
                      border: "none",
                      background: isActive ? prod.themeColor : "transparent",
                      color: isActive ? "#ffffff" : "var(--adm-text-secondary)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: MODULES */}
            {activeDetailTab === "modules" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "12px" }}>
                {prod.modules.map((mod) => (
                  <div
                    key={mod.id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "10px",
                      border: "1px solid var(--adm-border)",
                      background: "var(--adm-bg)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--adm-text-secondary)" }}>
                          {mod.code}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          {mod.isAddon && (
                            <span className="adm-badge adm-badge--amber" style={{ fontSize: "9.5px", padding: "1px 5px" }}>
                              Ek Eklenti
                            </span>
                          )}
                          <span className={`adm-badge adm-badge--${mod.status === "beta" ? "warning" : "success"}`} style={{ fontSize: "9.5px", padding: "1px 5px" }}>
                            {mod.status === "beta" ? "Beta" : "Aktif"}
                          </span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: "14px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                        {mod.name}
                      </h4>
                      <p style={{ fontSize: "12px", color: "var(--adm-text-secondary)", lineHeight: 1.45 }}>
                        {mod.description}
                      </p>
                    </div>

                    <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px dashed var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px" }}>
                      <span style={{ color: "var(--adm-text-secondary)" }}>
                        Dahil: {mod.includedInTiers.join(", ")}
                      </span>
                      {mod.addonPriceMonthly && (
                        <strong style={{ color: "#16a34a" }}>+₺{mod.addonPriceMonthly.toLocaleString("tr-TR")}/Ay</strong>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: PRICING TIERS */}
            {activeDetailTab === "pricing" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {prod.pricingTiers.map((tier) => (
                  <div
                    key={tier.tierId}
                    style={{
                      padding: "20px",
                      borderRadius: "12px",
                      border: tier.isPopular ? `2px solid ${prod.themeColor}` : "1px solid var(--adm-border)",
                      background: tier.isPopular ? `linear-gradient(180deg, ${prod.themeBg} 0%, rgba(255,255,255,0) 40%)` : "var(--adm-bg)",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {tier.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "16px",
                          background: prod.themeColor,
                          color: "#ffffff",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {tier.badge}
                      </div>
                    )}

                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--adm-text)" }}>{tier.tierName}</h3>
                      <p style={{ fontSize: "12px", color: "var(--adm-text-secondary)", marginTop: "3px" }}>{tier.summary}</p>

                      <div style={{ margin: "16px 0 12px" }}>
                        <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--adm-text)", letterSpacing: "-0.03em" }}>
                          {tier.monthlyPriceFormatted}
                          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--adm-text-secondary)" }}> / Ay</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
                          {tier.annualPriceFormatted}
                        </div>
                        <div style={{ fontSize: "11.5px", fontWeight: 600, color: prod.themeColor, marginTop: "4px" }}>
                          ✓ {tier.seatsText}
                        </div>
                      </div>

                      <div style={{ borderTop: "1px solid var(--adm-border)", paddingTop: "12px" }}>
                        <div style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "8px" }}>
                          Paket Kapsamı:
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px" }}>
                          {tier.features.map((feat, i) => (
                            <li key={i} style={{ fontSize: "12px", color: "var(--adm-text-secondary)", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                              <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <button
                        type="button"
                        className="adm-btn adm-btn--secondary"
                        onClick={() => showToast(`"${tier.tierName}" teklif şablonu satış motoruna yüklendi.`)}
                        style={{ width: "100%", justifyContent: "center", fontSize: "12px" }}
                      >
                        Teklif Hazırla
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: TENANTS */}
            {activeDetailTab === "tenants" && (
              <div>
                <div style={{ fontSize: "13px", color: "var(--adm-text-secondary)", marginBottom: "12px" }}>
                  Bu ürün mimarisinde çalışan aktif kurumsal müşteri kümeleri ve barındırma modelleri:
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Şirket Adı</th>
                        <th>Sektör</th>
                        <th>Kullanıcı / Koltuk</th>
                        <th>Barındırma Modeli</th>
                        <th>Sürüm</th>
                        <th>Canlı Uptime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prod.tenants.map((t, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600, color: "var(--adm-text)" }}>{t.name}</td>
                          <td><span className="adm-badge adm-badge--neutral">{t.industry}</span></td>
                          <td><strong>{t.seats} Koltuk</strong></td>
                          <td><span className="adm-badge adm-badge--blue">{t.deployment}</span></td>
                          <td><span className="adm-badge adm-badge--purple">{t.version}</span></td>
                          <td><span className="adm-badge adm-badge--success">{t.uptime}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: TECH & API */}
            {activeDetailTab === "tech" && (
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
                {/* Tech Stack Details */}
                <div style={{ padding: "16px", borderRadius: "10px", background: "var(--adm-bg)", border: "1px solid var(--adm-border)" }}>
                  <h4 style={{ fontSize: "13.5px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Server size={15} color={prod.themeColor} />
                    <span>Mimari &amp; Dağıtım Spesifikasyonları</span>
                  </h4>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {prod.techStack.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px dashed var(--adm-border)", paddingBottom: "6px" }}>
                        <span style={{ color: "var(--adm-text-secondary)" }}>{item.label}:</span>
                        <strong style={{ color: "var(--adm-text)", fontFamily: "var(--font-mono)" }}>{item.value}</strong>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px dashed var(--adm-border)", paddingBottom: "6px" }}>
                      <span style={{ color: "var(--adm-text-secondary)" }}>Docker İmajı:</span>
                      <strong style={{ color: "var(--adm-text)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>{prod.dockerImage}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px dashed var(--adm-border)", paddingBottom: "6px" }}>
                      <span style={{ color: "var(--adm-text-secondary)" }}>Son Commit Hash:</span>
                      <strong style={{ color: "var(--adm-text)", fontFamily: "var(--font-mono)" }}>#{prod.lastCommitHash} ({prod.releaseDate})</strong>
                    </div>
                  </div>
                </div>

                {/* API Example Terminal */}
                <div style={{ padding: "16px", borderRadius: "10px", background: "#0f172a", color: "#f8fafc", fontFamily: "var(--font-mono)", fontSize: "11.5px", border: "1px solid #1e293b" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", borderBottom: "1px solid #334155", paddingBottom: "6px" }}>
                    <span style={{ color: "#94a3b8" }}>// EfeOS License Verify Endpoint</span>
                    <span style={{ color: "#30d158" }}>HTTPS mTLS v2</span>
                  </div>
                  <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "#e2e8f0" }}>
{`curl -X POST https://license.efesoft.com.tr/v2/verify \\
  -H "Authorization: Bearer efe_live_${prod.lastCommitHash}" \\
  -H "X-Tenant-Code: BORUSAN-LOG-TR" \\
  -d '{
    "product_code": "${prod.code}",
    "client_version": "${prod.version}",
    "seats_requested": 140
  }'`}
                  </pre>
                  <div style={{ marginTop: "12px", color: "#38bdf8", borderTop: "1px dashed #334155", paddingTop: "8px" }}>
                    Response: 200 OK · {prod.avgLatency} (Signature Valid)
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 1: ADD NEW PRODUCT / MODULE                                   */}
      {/* -------------------------------------------------------------------- */}
      <div className={`adm-modal-overlay ${showAddModal ? "adm-modal-overlay--open" : ""}`} onClick={() => setShowAddModal(false)}>
        <div className="adm-modal-card" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Package size={18} color="#0071e3" />
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Yeni Ürün / Modül Paketi Tanımla</h3>
            </div>
            <button type="button" onClick={() => setShowAddModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleCreateProduct} style={{ padding: "20px" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                  Ürün Adı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="örn: EfeWMS Akıllı Depo Otomasyonu"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="adm-input"
                  style={{ width: "100%", height: "36px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    Ürün Kodu *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="örn: EFE-WMS-STANDALONE"
                    value={newProdCode}
                    onChange={(e) => setNewProdCode(e.target.value)}
                    className="adm-input"
                    style={{ width: "100%", height: "36px", fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    Kategori *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as typeof newProdCategory)}
                    className="adm-input"
                    style={{ width: "100%", height: "36px" }}
                  >
                    <option value="erp">Kurumsal ERP &amp; Finans</option>
                    <option value="crm">CRM, Satış &amp; İletişim</option>
                    <option value="pos">Perakende, Mağaza &amp; POS</option>
                    <option value="ai">Yapay Zeka &amp; Altyapı</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    İlk Sürüm
                  </label>
                  <input
                    type="text"
                    value={newProdVersion}
                    onChange={(e) => setNewProdVersion(e.target.value)}
                    className="adm-input"
                    style={{ width: "100%", height: "36px", fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    Taban Fiyat (₺ / Ay)
                  </label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="adm-input"
                    style={{ width: "100%", height: "36px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                  Kısa Slogan &amp; Açıklama
                </label>
                <textarea
                  rows={2}
                  placeholder="Ürünün çözdüğü temel problemi ve faydasını 1-2 cümleyle özetleyin..."
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  className="adm-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button type="button" className="adm-btn adm-btn--secondary" onClick={() => setShowAddModal(false)}>
                İptal
              </button>
              <button type="submit" className="adm-btn adm-btn--primary">
                Ürünü Kaydet &amp; Kataloğa Ekle
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 2: PRICING & TIER MATRIX COMPARISON                          */}
      {/* -------------------------------------------------------------------- */}
      <div className={`adm-modal-overlay ${showMatrixModal ? "adm-modal-overlay--open" : ""}`} onClick={() => setShowMatrixModal(false)}>
        <div className="adm-modal-card" style={{ maxWidth: "880px" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>EfeOS Çapraz Ürün &amp; Paket Fiyatlandırma Matrisi</h3>
              <p style={{ fontSize: "12px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
                Kurumsal müşterilere verilecek tekliflerde kullanılacak güncel taban liste fiyatları.
              </p>
            </div>
            <button type="button" onClick={() => setShowMatrixModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: "20px", maxHeight: "65vh", overflowY: "auto" }}>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Starter Paket</th>
                    <th>Professional Paket</th>
                    <th>Enterprise Suite</th>
                    <th>Özel Mimari / On-Prem</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const starter = p.pricingTiers.find((t) => t.tierId === "starter");
                    const pro = p.pricingTiers.find((t) => t.tierId === "pro");
                    const ent = p.pricingTiers.find((t) => t.tierId === "enterprise");

                    return (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{p.code}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{starter ? starter.monthlyPriceFormatted + "/Ay" : "-"}</div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>{starter?.seatsText}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: p.themeColor }}>{pro ? pro.monthlyPriceFormatted + "/Ay" : "-"}</div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>{pro?.seatsText}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: "#16a34a" }}>{ent ? ent.monthlyPriceFormatted + "/Ay" : "-"}</div>
                          <div style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>{ent?.seatsText}</div>
                        </td>
                        <td>
                          <span className="adm-badge adm-badge--neutral">Teklif İsteyiniz</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: "14px 24px", borderTop: "1px solid var(--adm-border)", display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="adm-btn adm-btn--secondary" onClick={() => setShowMatrixModal(false)}>
              Kapat
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 3: DEPLOY RELEASE                                             */}
      {/* -------------------------------------------------------------------- */}
      {showReleaseModal && (
        <div className="adm-modal-overlay adm-modal-overlay--open" onClick={() => !isDeploying && setShowReleaseModal(null)}>
          <div className="adm-modal-card" style={{ maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <GitBranch size={17} color="#8b5cf6" />
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Yeni Sürüm (Release) Dağıt</h3>
              </div>
              {!isDeploying && (
                <button type="button" onClick={() => setShowReleaseModal(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}>
                  <X size={18} />
                </button>
              )}
            </div>

            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "13px", color: "var(--adm-text-secondary)", marginBottom: "14px" }}>
                <strong>{showReleaseModal.name}</strong> için tüm tenant cluster&apos;larına canlı sıfır kesintili (zero-downtime rolling update) sürüm dağıtımı yapılacak.
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    Hedef Sürüm Etiketi (SemVer)
                  </label>
                  <input
                    type="text"
                    required
                    value={releaseVersion}
                    onChange={(e) => setReleaseVersion(e.target.value)}
                    className="adm-input"
                    style={{ width: "100%", height: "36px", fontFamily: "var(--font-mono)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--adm-text)", marginBottom: "4px" }}>
                    Changelog / Değişiklik Notları
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Her satıra bir yenilik veya bugfix yazın..."
                    value={releaseNotes}
                    onChange={(e) => setReleaseNotes(e.target.value)}
                    className="adm-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "12.5px" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" disabled={isDeploying} className="adm-btn adm-btn--secondary" onClick={() => setShowReleaseModal(null)}>
                  İptal
                </button>
                <button
                  type="button"
                  disabled={isDeploying || !releaseVersion}
                  className="adm-btn adm-btn--primary"
                  onClick={() => handleDeployRelease(showReleaseModal)}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw size={14} className="adm-spin" />
                      <span>Cluster&apos;a Dağıtılıyor...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={14} />
                      <span>Rolling Update Başlat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 4: SANDBOX DEMO ENVIRONMENT GENERATOR                         */}
      {/* -------------------------------------------------------------------- */}
      {showDemoModal && (
        <div className="adm-modal-overlay adm-modal-overlay--open" onClick={() => setShowDemoModal(null)}>
          <div className="adm-modal-card" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Play size={17} color="#0071e3" />
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Canlı Demo / Sandbox Ortamı</h3>
              </div>
              <button type="button" onClick={() => setShowDemoModal(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "13px", color: "var(--adm-text-secondary)", marginBottom: "14px" }}>
                <strong>{showDemoModal.name}</strong> için izole bir test tenant&apos;ı ve geçici yönetici kimlik bilgisi hazırlandı:
              </div>

              <div style={{ padding: "14px", borderRadius: "8px", background: "var(--adm-bg)", border: "1px solid var(--adm-border)", display: "grid", gap: "8px", fontSize: "12.5px" }}>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Sandbox URL:</span>
                  <div style={{ fontWeight: 600, color: "#0071e3", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                    https://demo.efesoft.com.tr/{showDemoModal.id}-sandbox-8491
                  </div>
                </div>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Demo Kullanıcı:</span>
                  <div style={{ fontFamily: "var(--font-mono)", marginTop: "2px" }}>demo.admin@efesoft.com.tr</div>
                </div>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Geçici Şifre:</span>
                  <div style={{ fontFamily: "var(--font-mono)", marginTop: "2px" }}>EfeOS_Demo_2026!</div>
                </div>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Kalan Geçerlilik:</span>
                  <div style={{ color: "#b45309", fontWeight: 600, marginTop: "2px" }}>72 Saat (Otomatik Sıfırlanır)</div>
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  className="adm-btn adm-btn--secondary"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `https://demo.efesoft.com.tr/${showDemoModal.id}-sandbox-8491\nKullanıcı: demo.admin@efesoft.com.tr\nŞifre: EfeOS_Demo_2026!`
                    );
                    setDemoUrlCopied(true);
                    setTimeout(() => setDemoUrlCopied(false), 2000);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {demoUrlCopied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                  <span>{demoUrlCopied ? "Kopyalandı!" : "Bilgileri Kopyala"}</span>
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--primary"
                  onClick={() => {
                    window.open(`https://license.efesoft.com.tr:8443/demo?product=${showDemoModal.code}`, "_blank");
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <ExternalLink size={14} />
                  <span>Demoya Git</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}