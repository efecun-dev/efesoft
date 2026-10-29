"use client";

import { useState, useMemo, Fragment } from "react";
import { AdminModal } from "../AdminModal";
import {
  Key,
  ShieldCheck,
  Cpu,
  Server,
  Lock,
  Unlock,
  Copy,
  Check,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Terminal,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
  Users,
  Eye,
  EyeOff,
  FileCode2,
  Zap,
  SlidersHorizontal,
  Building2,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  HardDrive,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

export type ProductType = "erp" | "crm" | "pos" | "ai";
export type LicenseStatus = "active" | "expiring_soon" | "suspended" | "trial" | "expired";
export type LicenseTier = "enterprise" | "pro" | "starter" | "custom";
export type DeploymentType = "saas" | "dedicated" | "onprem";

export interface LicenseRecord {
  id: string;
  licenseKey: string;
  clientName: string;
  clientCode: string;
  taxNumber: string;
  product: string;
  productType: ProductType;
  productCode: string;
  themeColor: string;
  tier: LicenseTier;
  tierLabel: string;
  status: LicenseStatus;
  statusLabel: string;
  deployment: DeploymentType;
  deploymentLabel: string;
  allocatedSeats: number;
  activeSeats: number;
  issuedDate: string;
  validUntil: string;
  daysRemaining: number;
  annualValueFormatted: string;
  monthlyRevenueFormatted: string;
  boundTarget: {
    type: "domain" | "hwid" | "cluster";
    value: string;
  };
  modules: string[];
  crypto: {
    algorithm: string;
    sha256Fingerprint: string;
    signatureVerified: boolean;
    caSerial: string;
  };
  heartbeat: {
    lastPing: string;
    status: "healthy" | "idle" | "unreachable";
    datacenter: string;
    versionRunning: string;
    latencyMs: number;
  };
}

/* -------------------------------------------------------------------------- */
/*  MOCK DATA: 12 ENTERPRISE SOFTWARE LICENSES                                */
/* -------------------------------------------------------------------------- */

const INITIAL_LICENSES: LicenseRecord[] = [
  {
    id: "LIC-2026-8491",
    licenseKey: "EFES-8942-ERP-LTS-884A-91C0",
    clientName: "KoçSistem Bilgi Teknolojileri A.Ş.",
    clientCode: "KOC-842",
    taxNumber: "5720194821",
    product: "EfeERP Kurumsal Kaynak Planlama",
    productType: "erp",
    productCode: "EFE-ERP-CORE",
    themeColor: "#0071e3",
    tier: "enterprise",
    tierLabel: "Enterprise Suite",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "dedicated",
    deploymentLabel: "Dedicated Cloud",
    allocatedSeats: 180,
    activeSeats: 168,
    issuedDate: "15.01.2024",
    validUntil: "15.01.2027",
    daysRemaining: 261,
    annualValueFormatted: "₺1.440.000",
    monthlyRevenueFormatted: "₺120.000",
    boundTarget: {
      type: "domain",
      value: "kocsistem.efesoft.com.tr",
    },
    modules: [
      "Genel Muhasebe & Finans",
      "GİB e-Dönüşüm (e-Fatura / e-Arşiv / e-Defter)",
      "WMS Akıllı Depo & Barkodlu Sevkiyat",
      "MRP-II Üretim & Reçete Planlama",
      "Satınalma & Tedarikçi Portalı",
      "B2B Bayi Portalı & Sipariş Ağı",
    ],
    crypto: {
      algorithm: "Ed25519 + RSA-4096 Multi-Layer",
      sha256Fingerprint: "e84f9b2a71d8820c4119da0471b8492048aa124b89e7",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00418",
    },
    heartbeat: {
      lastPing: "1 dk önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v4.0.2 LTS",
      latencyMs: 18,
    },
  },
  {
    id: "LIC-2026-7720",
    licenseKey: "EFES-4410-POS-HYB-992B-33A1",
    clientName: "Migros Ticaret A.Ş.",
    clientCode: "MGR-512",
    taxNumber: "6210492810",
    product: "EfePOS Yeni Nesil Kasa & Perakende",
    productType: "pos",
    productCode: "EFE-POS-HYBRID",
    themeColor: "#10b981",
    tier: "enterprise",
    tierLabel: "Zincir Perakende",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "onprem",
    deploymentLabel: "On-Premises Edge",
    allocatedSeats: 820,
    activeSeats: 794,
    issuedDate: "01.03.2024",
    validUntil: "01.03.2027",
    daysRemaining: 306,
    annualValueFormatted: "₺2.460.000",
    monthlyRevenueFormatted: "₺205.000",
    boundTarget: {
      type: "hwid",
      value: "HWID-NODE-998A-PERAKENDE-HUB-04",
    },
    modules: [
      "Dokunmatik Kasa & Hızlı Barkod Satış",
      "GİB GMP-3 & ÖKÇ Entegrasyonu",
      "Anlık Mağaza & Kasa Stok Eşitleme",
      "Merkezi Fiyat & Kampanya Yönetimi",
      "Çevrimdışı (Offline-First) Kasa Modu",
    ],
    crypto: {
      algorithm: "Ed25519 Local Hardware Binding",
      sha256Fingerprint: "991b48ca110294fc87e81048b299c8014aef781920ac",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00109",
    },
    heartbeat: {
      lastPing: "30 sn önce",
      status: "healthy",
      datacenter: "İzmir Datacenter (Zone-B)",
      versionRunning: "v4.2.1 Stable",
      latencyMs: 8,
    },
  },
  {
    id: "LIC-2026-5832",
    licenseKey: "EFES-7120-ERP-COR-8819-20BA",
    clientName: "Borusan Lojistik Dağıtım A.Ş.",
    clientCode: "BRS-104",
    taxNumber: "1820491823",
    product: "EfeERP Kurumsal Kaynak Planlama",
    productType: "erp",
    productCode: "EFE-ERP-CORE",
    themeColor: "#0071e3",
    tier: "enterprise",
    tierLabel: "Enterprise Suite",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "saas",
    deploymentLabel: "SaaS Multi-Tenant",
    allocatedSeats: 120,
    activeSeats: 114,
    issuedDate: "10.02.2025",
    validUntil: "10.02.2027",
    daysRemaining: 287,
    annualValueFormatted: "₺960.000",
    monthlyRevenueFormatted: "₺80.000",
    boundTarget: {
      type: "domain",
      value: "borusan.efesoft.com.tr",
    },
    modules: [
      "Genel Muhasebe & Finans",
      "WMS Akıllı Depo & Barkodlu Sevkiyat",
      "Satınalma & Tedarikçi Portalı",
      "e-İrsaliye & Lojistik Takip",
    ],
    crypto: {
      algorithm: "Ed25519 + RSA-4096",
      sha256Fingerprint: "12fa09918bcde7419a408719cb4018274a1084ef7190",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00311",
    },
    heartbeat: {
      lastPing: "2 dk önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v4.0.2 LTS",
      latencyMs: 22,
    },
  },
  {
    id: "LIC-2026-9214",
    licenseKey: "EFES-3310-CRM-SUT-4481-901B",
    clientName: "Anadolu Grubu Holding",
    clientCode: "AGH-291",
    taxNumber: "0710394812",
    product: "EfeCRM Akıllı Müşteri & Satış",
    productType: "crm",
    productCode: "EFE-CRM-SUITE",
    themeColor: "#8b5cf6",
    tier: "enterprise",
    tierLabel: "Enterprise Suite",
    status: "expiring_soon",
    statusLabel: "Yenileme Yaklaşıyor (18 Gün)",
    deployment: "dedicated",
    deploymentLabel: "Dedicated Cloud",
    allocatedSeats: 95,
    activeSeats: 92,
    issuedDate: "16.11.2024",
    validUntil: "16.11.2026",
    daysRemaining: 18,
    annualValueFormatted: "₺760.000",
    monthlyRevenueFormatted: "₺63.300",
    boundTarget: {
      type: "domain",
      value: "anadolu.crm.efesoft.com.tr",
    },
    modules: [
      "Görsel Kanban Satış Hunisi (Pipeline)",
      "Resmi WhatsApp Cloud API Entegrasyonu",
      "WebRTC Santral & Sesli Arama Kaydı",
      "Dinamik PDF Teklif Motoru",
    ],
    crypto: {
      algorithm: "Ed25519 Multi-Tenant Token",
      sha256Fingerprint: "558190ac4718290bcde109284718491028374aefb019",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00084",
    },
    heartbeat: {
      lastPing: "5 dk önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-B)",
      versionRunning: "v3.6.0 Stable",
      latencyMs: 19,
    },
  },
  {
    id: "LIC-2026-3841",
    licenseKey: "EFES-1104-AI-ENT-7721-A894",
    clientName: "Şişecam Cam Sanayii A.Ş.",
    clientCode: "SIS-088",
    taxNumber: "8120491829",
    product: "EfeAI Kurumsal Karar Destek",
    productType: "ai",
    productCode: "EFE-AI-ENTERPRISE",
    themeColor: "#f59e0b",
    tier: "custom",
    tierLabel: "Özel AI GPU Cluster",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "onprem",
    deploymentLabel: "On-Premises GPU",
    allocatedSeats: 45,
    activeSeats: 41,
    issuedDate: "05.05.2025",
    validUntil: "05.05.2027",
    daysRemaining: 371,
    annualValueFormatted: "₺1.800.000",
    monthlyRevenueFormatted: "₺150.000",
    boundTarget: {
      type: "hwid",
      value: "GPU-CLUSTER-NVIDIA-H100-NODE-84",
    },
    modules: [
      "Doğal Dil ile SQL & BI Raporlama",
      "Fatura, Sözleşme & OCR Belge Okuyucu",
      "Şirket İçi RAG Doküman Bilgi Bankası",
      "Stok Anomali & Talep Tahminleme",
    ],
    crypto: {
      algorithm: "RSA-4096 Air-Gapped Signature",
      sha256Fingerprint: "77a8091bc2481093847291048bcaef102938471920ac",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00012",
    },
    heartbeat: {
      lastPing: "12 dk önce",
      status: "idle",
      datacenter: "İzmir Datacenter (Zone-A)",
      versionRunning: "v2.1.0 Beta",
      latencyMs: 11,
    },
  },
  {
    id: "LIC-2026-4490",
    licenseKey: "EFES-6620-POS-HYB-1194-CC08",
    clientName: "Mavi Giyim San. ve Tic. A.Ş.",
    clientCode: "MAV-640",
    taxNumber: "6130491820",
    product: "EfePOS Yeni Nesil Kasa & Perakende",
    productType: "pos",
    productCode: "EFE-POS-HYBRID",
    themeColor: "#10b981",
    tier: "enterprise",
    tierLabel: "Zincir Perakende",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "onprem",
    deploymentLabel: "Hybrid Cloud-Edge",
    allocatedSeats: 650,
    activeSeats: 618,
    issuedDate: "20.08.2024",
    validUntil: "20.08.2027",
    daysRemaining: 478,
    annualValueFormatted: "₺1.950.000",
    monthlyRevenueFormatted: "₺162.500",
    boundTarget: {
      type: "cluster",
      value: "mavi-pos-cluster.efesoft.com.tr",
    },
    modules: [
      "Dokunmatik Kasa & Hızlı Barkod Satış",
      "GİB GMP-3 & ÖKÇ Entegrasyonu",
      "Merkezi Fiyat & Kampanya Yönetimi",
      "Çevrimdışı (Offline-First) Kasa Modu",
    ],
    crypto: {
      algorithm: "Ed25519 Edge Signature",
      sha256Fingerprint: "aa441920bc84719028374aef09182374b109283746ab",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00192",
    },
    heartbeat: {
      lastPing: "40 sn önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v4.2.1 Stable",
      latencyMs: 16,
    },
  },
  {
    id: "LIC-2026-1934",
    licenseKey: "EFES-8821-AI-ENT-0012-DD49",
    clientName: "Pegasus Hava Taşımacılığı",
    clientCode: "PGS-310",
    taxNumber: "7280194821",
    product: "EfeAI Kurumsal Karar Destek",
    productType: "ai",
    productCode: "EFE-AI-ENTERPRISE",
    themeColor: "#f59e0b",
    tier: "enterprise",
    tierLabel: "Enterprise Suite",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "dedicated",
    deploymentLabel: "Dedicated Cloud",
    allocatedSeats: 60,
    activeSeats: 58,
    issuedDate: "12.01.2025",
    validUntil: "12.01.2027",
    daysRemaining: 258,
    annualValueFormatted: "₺720.000",
    monthlyRevenueFormatted: "₺60.000",
    boundTarget: {
      type: "domain",
      value: "ai.pegasus.efesoft.com.tr",
    },
    modules: [
      "Fatura, Sözleşme & OCR Belge Okuyucu",
      "Otonom Müşteri Destek Chatbotu",
      "Doğal Dil ile SQL & BI Raporlama",
    ],
    crypto: {
      algorithm: "Ed25519 + RSA-4096",
      sha256Fingerprint: "bc847109283746ab1920384756cde09182374b10928a",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00224",
    },
    heartbeat: {
      lastPing: "3 dk önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v2.1.0 Beta",
      latencyMs: 20,
    },
  },
  {
    id: "LIC-2026-7019",
    licenseKey: "EFES-5509-ERP-COR-3381-FF90",
    clientName: "Vestel Elektronik Sanayi",
    clientCode: "VST-701",
    taxNumber: "9250192841",
    product: "EfeERP Kurumsal Kaynak Planlama",
    productType: "erp",
    productCode: "EFE-ERP-CORE",
    themeColor: "#0071e3",
    tier: "custom",
    tierLabel: "On-Premises Fabrika",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "onprem",
    deploymentLabel: "On-Premise Air-Gapped",
    allocatedSeats: 240,
    activeSeats: 228,
    issuedDate: "01.07.2024",
    validUntil: "01.07.2027",
    daysRemaining: 428,
    annualValueFormatted: "₺1.680.000",
    monthlyRevenueFormatted: "₺140.000",
    boundTarget: {
      type: "hwid",
      value: "HWID-MANISA-FABRIKA-RACK-08",
    },
    modules: [
      "Genel Muhasebe & Finans",
      "MRP-II Üretim & Reçete Planlama",
      "WMS Akıllı Depo & Barkodlu Sevkiyat",
      "IoT Sensör Veri Ağı & PLC Entegrasyonu",
    ],
    crypto: {
      algorithm: "RSA-4096 Air-Gapped Signature",
      sha256Fingerprint: "338190283746ab1920384756cde09182374b109284fa",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00049",
    },
    heartbeat: {
      lastPing: "8 dk önce",
      status: "healthy",
      datacenter: "İzmir Datacenter (Zone-A)",
      versionRunning: "v4.0.2 LTS",
      latencyMs: 14,
    },
  },
  {
    id: "LIC-2026-8801",
    licenseKey: "EFES-1290-CRM-SUT-8841-KK33",
    clientName: "Bupa Acıbadem Sigorta",
    clientCode: "BUP-449",
    taxNumber: "1920491824",
    product: "EfeCRM Akıllı Müşteri & Satış",
    productType: "crm",
    productCode: "EFE-CRM-SUITE",
    themeColor: "#8b5cf6",
    tier: "enterprise",
    tierLabel: "Enterprise Suite",
    status: "suspended",
    statusLabel: "Askıya Alındı (Fatura İnceleme)",
    deployment: "saas",
    deploymentLabel: "SaaS Multi-Tenant",
    allocatedSeats: 85,
    activeSeats: 0,
    issuedDate: "10.01.2024",
    validUntil: "10.01.2027",
    daysRemaining: 256,
    annualValueFormatted: "₺680.000",
    monthlyRevenueFormatted: "₺56.600",
    boundTarget: {
      type: "domain",
      value: "bupa.crm.efesoft.com.tr",
    },
    modules: [
      "Görsel Kanban Satış Hunisi (Pipeline)",
      "WebRTC Santral & Sesli Arama Kaydı",
      "Dinamik PDF Teklif Motoru",
    ],
    crypto: {
      algorithm: "Ed25519 Token (Revoked)",
      sha256Fingerprint: "revoked-f84910283746ab1920384756cde09182374b10",
      signatureVerified: false,
      caSerial: "EFE-CA-ROOT-2026-00099",
    },
    heartbeat: {
      lastPing: "1 saat önce",
      status: "unreachable",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v3.6.0 Stable",
      latencyMs: 0,
    },
  },
  {
    id: "LIC-2026-9932",
    licenseKey: "EFES-7714-ERP-COR-0041-ZZ88",
    clientName: "Trendyol Lojistik & Kargo",
    clientCode: "TRN-902",
    taxNumber: "8490192840",
    product: "EfeERP Kurumsal Kaynak Planlama",
    productType: "erp",
    productCode: "EFE-ERP-CORE",
    themeColor: "#0071e3",
    tier: "custom",
    tierLabel: "High-Throughput WMS",
    status: "active",
    statusLabel: "Aktif & Doğrulandı",
    deployment: "dedicated",
    deploymentLabel: "Dedicated Cluster",
    allocatedSeats: 310,
    activeSeats: 298,
    issuedDate: "14.04.2025",
    validUntil: "14.04.2027",
    daysRemaining: 350,
    annualValueFormatted: "₺1.860.000",
    monthlyRevenueFormatted: "₺155.000",
    boundTarget: {
      type: "domain",
      value: "wms-hub.trendyol.efesoft.com.tr",
    },
    modules: [
      "Genel Muhasebe & Finans",
      "WMS Akıllı Depo & Barkodlu Sevkiyat",
      "Kargo & Sevkiyat API Entegratörü",
      "GİB e-Dönüşüm Paketi",
    ],
    crypto: {
      algorithm: "Ed25519 + RSA-4096",
      sha256Fingerprint: "447190283746ab1920384756cde09182374b10928aa1",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00277",
    },
    heartbeat: {
      lastPing: "45 sn önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v4.0.2 LTS",
      latencyMs: 15,
    },
  },
  {
    id: "LIC-2026-1049",
    licenseKey: "EFES-9901-AI-ENT-8841-TR21",
    clientName: "Eczacıbaşı Tüketim Ürünleri",
    clientCode: "ECZ-311",
    taxNumber: "3290192841",
    product: "EfeAI Kurumsal Karar Destek",
    productType: "ai",
    productCode: "EFE-AI-ENTERPRISE",
    themeColor: "#f59e0b",
    tier: "starter",
    tierLabel: "POC / Deneme Sürümü",
    status: "trial",
    statusLabel: "POC Deneme (14 Gün Kaldı)",
    deployment: "saas",
    deploymentLabel: "SaaS Multi-Tenant",
    allocatedSeats: 30,
    activeSeats: 24,
    issuedDate: "15.10.2026",
    validUntil: "15.11.2026",
    daysRemaining: 17,
    annualValueFormatted: "₺0 (Pilot POC)",
    monthlyRevenueFormatted: "₺0",
    boundTarget: {
      type: "domain",
      value: "eczacibasi-poc.efesoft.com.tr",
    },
    modules: [
      "Doğal Dil ile SQL & BI Raporlama",
      "Fatura, Sözleşme & OCR Belge Okuyucu",
    ],
    crypto: {
      algorithm: "Ed25519 Short-Lived Trial Key",
      sha256Fingerprint: "990182746ab1920384756cde09182374b109284f11aa",
      signatureVerified: true,
      caSerial: "EFE-CA-ROOT-2026-00441",
    },
    heartbeat: {
      lastPing: "18 dk önce",
      status: "healthy",
      datacenter: "Frankfurt DC (Zone-B)",
      versionRunning: "v2.1.0 Beta",
      latencyMs: 25,
    },
  },
  {
    id: "LIC-2026-2210",
    licenseKey: "EFES-4401-ERP-COR-9912-EXP1",
    clientName: "Atlas Lojistik Çözümleri",
    clientCode: "ATL-118",
    taxNumber: "0910192840",
    product: "EfeERP Kurumsal Kaynak Planlama",
    productType: "erp",
    productCode: "EFE-ERP-CORE",
    themeColor: "#0071e3",
    tier: "starter",
    tierLabel: "Starter Paket",
    status: "expired",
    statusLabel: "Süresi Doldu (Yenileme Bekliyor)",
    deployment: "saas",
    deploymentLabel: "SaaS Multi-Tenant",
    allocatedSeats: 25,
    activeSeats: 0,
    issuedDate: "20.10.2025",
    validUntil: "20.10.2026",
    daysRemaining: 0,
    annualValueFormatted: "₺280.000",
    monthlyRevenueFormatted: "₺0",
    boundTarget: {
      type: "domain",
      value: "atlaslojistik.efesoft.com.tr",
    },
    modules: [
      "Genel Muhasebe & Finans",
      "GİB e-Dönüşüm Paketi",
    ],
    crypto: {
      algorithm: "Ed25519 Token (Expired)",
      sha256Fingerprint: "expired-09182374b109284fa9910283746ab192038475",
      signatureVerified: false,
      caSerial: "EFE-CA-ROOT-2026-00072",
    },
    heartbeat: {
      lastPing: "2 gün önce",
      status: "unreachable",
      datacenter: "Frankfurt DC (Zone-A)",
      versionRunning: "v3.9.1 LTS",
      latencyMs: 0,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT: LICENSE KEYS MANAGEMENT & CRYPTO ENGINE                   */
/* -------------------------------------------------------------------------- */

export default function AdminLicensesPage() {
  const [licenses, setLicenses] = useState<LicenseRecord[]>(INITIAL_LICENSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<"all" | ProductType>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | LicenseStatus>("all");
  const [selectedDeployment, setSelectedDeployment] = useState<"all" | DeploymentType>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Expanded inspection row
  const [expandedLicenseId, setExpandedLicenseId] = useState<string | null>("LIC-2026-8491");

  // Unmasked keys state
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Modals state
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState<LicenseRecord | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState<LicenseRecord | null>(null);
  const [showRevokeModal, setShowRevokeModal] = useState<LicenseRecord | null>(null);
  const [showRootCaModal, setShowRootCaModal] = useState(false);

  // Key generator form state
  const [genClientName, setGenClientName] = useState("");
  const [genProduct, setGenProduct] = useState<ProductType>("erp");
  const [genTier, setGenTier] = useState<LicenseTier>("enterprise");
  const [genDeployment, setGenDeployment] = useState<DeploymentType>("dedicated");
  const [genSeats, setGenSeats] = useState<number>(50);
  const [genDurationYears, setGenDurationYears] = useState<number>(1);
  const [genBindingType, setGenBindingType] = useState<"domain" | "hwid">("domain");
  const [genBindingValue, setGenBindingValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccessKey, setGeneratedSuccessKey] = useState<string | null>(null);

  // Quota expansion form state
  const [updatedSeatsCount, setUpdatedSeatsCount] = useState<number>(100);
  const [isUpdatingQuota, setIsUpdatingQuota] = useState(false);

  // Revocation state
  const [revokeReason, setRevokeReason] = useState("Ödeme / Fatura Gecikmesi");

  // Global ping telemetry toast
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [pingSuccessMessage, setPingSuccessMessage] = useState<string | null>(null);

  /* -------------------------------------------------------------------------- */
  /*  CALCULATED METRICS & KPI COUNTERS                                         */
  /* -------------------------------------------------------------------------- */

  const kpis = useMemo(() => {
    const total = licenses.length;
    const active = licenses.filter((l) => l.status === "active").length;
    const expiringSoon = licenses.filter((l) => l.status === "expiring_soon").length;
    const trial = licenses.filter((l) => l.status === "trial").length;
    const suspended = licenses.filter((l) => l.status === "suspended").length;

    const totalAllocatedSeats = licenses.reduce((acc, l) => acc + l.allocatedSeats, 0);
    const totalActiveSeats = licenses.reduce((acc, l) => acc + l.activeSeats, 0);

    const healthyHeartbeats = licenses.filter((l) => l.heartbeat.status === "healthy").length;

    return {
      total,
      active,
      expiringSoon,
      trial,
      suspended,
      totalAllocatedSeats,
      totalActiveSeats,
      seatUtilizationPercent: Math.round((totalActiveSeats / totalAllocatedSeats) * 100),
      healthyHeartbeats,
    };
  }, [licenses]);

  /* -------------------------------------------------------------------------- */
  /*  FILTERING & SEARCH                                                        */
  /* -------------------------------------------------------------------------- */

  const filteredLicenses = useMemo(() => {
    return licenses.filter((lic) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesKey = lic.licenseKey.toLowerCase().includes(q);
        const matchesClient = lic.clientName.toLowerCase().includes(q);
        const matchesCode = lic.clientCode.toLowerCase().includes(q);
        const matchesProduct = lic.product.toLowerCase().includes(q);
        const matchesTarget = lic.boundTarget.value.toLowerCase().includes(q);
        if (!matchesKey && !matchesClient && !matchesCode && !matchesProduct && !matchesTarget) {
          return false;
        }
      }

      // Product match
      if (selectedProduct !== "all" && lic.productType !== selectedProduct) {
        return false;
      }

      // Status match
      if (selectedStatus !== "all" && lic.status !== selectedStatus) {
        return false;
      }

      // Deployment match
      if (selectedDeployment !== "all" && lic.deployment !== selectedDeployment) {
        return false;
      }

      return true;
    });
  }, [licenses, searchQuery, selectedProduct, selectedStatus, selectedDeployment]);

  /* -------------------------------------------------------------------------- */
  /*  HELPERS & HANDLERS                                                        */
  /* -------------------------------------------------------------------------- */

  const handleCopyKey = (key: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  };

  const toggleKeyReveal = (id: string) => {
    setRevealedKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const maskLicenseKey = (key: string) => {
    const parts = key.split("-");
    if (parts.length >= 4) {
      return `${parts[0]}-••••-••••-${parts[parts.length - 1]}`;
    }
    return "••••-••••-••••-••••";
  };

  // Generate new license
  const handleGenerateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
      const randomHex2 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const productPrefix = genProduct.toUpperCase();
      const newKeyString = `EFES-${randomHex}-${productPrefix}-${randomHex2}`;

      const clientCodeCalculated = genClientName.slice(0, 3).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);

      const newRecord: LicenseRecord = {
        id: `LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        licenseKey: newKeyString,
        clientName: genClientName,
        clientCode: clientCodeCalculated,
        taxNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        product:
          genProduct === "erp"
            ? "EfeERP Kurumsal Kaynak Planlama"
            : genProduct === "crm"
            ? "EfeCRM Akıllı Müşteri & Satış"
            : genProduct === "pos"
            ? "EfePOS Yeni Nesil Kasa & Perakende"
            : "EfeAI Kurumsal Karar Destek",
        productType: genProduct,
        productCode:
          genProduct === "erp"
            ? "EFE-ERP-CORE"
            : genProduct === "crm"
            ? "EFE-CRM-SUITE"
            : genProduct === "pos"
            ? "EFE-POS-HYBRID"
            : "EFE-AI-ENTERPRISE",
        themeColor:
          genProduct === "erp"
            ? "#0071e3"
            : genProduct === "crm"
            ? "#8b5cf6"
            : genProduct === "pos"
            ? "#10b981"
            : "#f59e0b",
        tier: genTier,
        tierLabel:
          genTier === "enterprise"
            ? "Enterprise Suite"
            : genTier === "pro"
            ? "Professional"
            : genTier === "starter"
            ? "Starter Paket"
            : "Özel Mimari",
        status: "active",
        statusLabel: "Aktif & Doğrulandı",
        deployment: genDeployment,
        deploymentLabel:
          genDeployment === "dedicated"
            ? "Dedicated Cloud"
            : genDeployment === "saas"
            ? "SaaS Multi-Tenant"
            : "On-Premises Edge",
        allocatedSeats: genSeats,
        activeSeats: 1,
        issuedDate: "Bugün",
        validUntil: `${genDurationYears} Yıl Sonra`,
        daysRemaining: genDurationYears * 365,
        annualValueFormatted: `₺${(genSeats * 8000).toLocaleString("tr-TR")}`,
        monthlyRevenueFormatted: `₺${Math.round((genSeats * 8000) / 12).toLocaleString("tr-TR")}`,
        boundTarget: {
          type: genBindingType,
          value: genBindingValue || `${genClientName.toLowerCase().replace(/[^a-z0-9]/g, "")}.efesoft.com.tr`,
        },
        modules: ["Temel Çekirdek Modülü", "EfeOS Lisans İmzası v4", "GİB & e-Dönüşüm Bağlantısı"],
        crypto: {
          algorithm: "Ed25519 + RSA-4096 Multi-Layer",
          sha256Fingerprint: `${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
          signatureVerified: true,
          caSerial: `EFE-CA-ROOT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        },
        heartbeat: {
          lastPing: "Henüz başlatılmadı",
          status: "idle",
          datacenter: "Frankfurt DC (Zone-A)",
          versionRunning: "v4.0.2 LTS",
          latencyMs: 16,
        },
      };

      setLicenses([newRecord, ...licenses]);
      setIsGenerating(false);
      setGeneratedSuccessKey(newKeyString);
      setExpandedLicenseId(newRecord.id);
    }, 1200);
  };

  // Quota upgrade handler
  const handleUpdateQuota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showQuotaModal) return;

    setIsUpdatingQuota(true);
    setTimeout(() => {
      setLicenses((prev) =>
        prev.map((l) =>
          l.id === showQuotaModal.id
            ? {
                ...l,
                allocatedSeats: updatedSeatsCount,
                annualValueFormatted: `₺${(updatedSeatsCount * 8000).toLocaleString("tr-TR")}`,
              }
            : l
        )
      );
      setIsUpdatingQuota(false);
      setShowQuotaModal(null);
    }, 800);
  };

  // Revoke / suspend license handler
  const handleConfirmRevocation = () => {
    if (!showRevokeModal) return;
    setLicenses((prev) =>
      prev.map((l) =>
        l.id === showRevokeModal.id
          ? {
              ...l,
              status: l.status === "suspended" ? "active" : "suspended",
              statusLabel: l.status === "suspended" ? "Aktif & Doğrulandı" : `Askıya Alındı (${revokeReason})`,
              heartbeat: {
                ...l.heartbeat,
                status: l.status === "suspended" ? "healthy" : "unreachable",
              },
            }
          : l
      )
    );
    setShowRevokeModal(null);
  };

  // Trigger cluster-wide ping test
  const handleTriggerClusterPing = () => {
    setIsPingingAll(true);
    setTimeout(() => {
      setIsPingingAll(false);
      setPingSuccessMessage("1.248 aktif lisans düğümü tarandı. Tüm Frankfurt ve İzmir uç noktaları senkronize edildi (0 anomali) ✓");
      setTimeout(() => setPingSuccessMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="adm-content adm-tab-transition">
      {/* -------------------------------------------------------------------- */}
      {/*  HEADER & GLOBAL ACTIONS                                             */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#0071e3",
                background: "rgba(0, 113, 227, 0.08)",
                padding: "2px 8px",
                borderRadius: "6px",
              }}
            >
              <Key size={12} />
              <span>EfeOS Cryptographic Key Management (KMS)</span>
            </span>
            <span className="adm-badge adm-badge--neutral" style={{ fontSize: "11px" }}>
              RSA-4096 &amp; Ed25519
            </span>
          </div>
          <h1 className="adm-header__title" style={{ marginTop: "4px" }}>
            Lisans Anahtarları &amp; Kriptografik Dağıtım Motoru
          </h1>
          <p className="adm-header__subtitle">
            EfeOS tescilli yazılımları (ERP, CRM, POS, AI) için donanım parmak izi (Machine ID) bağlama, anlık heartbeat doğrulama ve koltuk kotaları yönetimi.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="adm-topbar__btn"
            onClick={handleTriggerClusterPing}
            disabled={isPingingAll}
            title="Tüm tenant ve lisans düğümlerine anlık cryptographic heartbeat sinyali gönder"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <RefreshCw size={12} className={isPingingAll ? "adm-spin" : ""} />
            <span>{isPingingAll ? "Heartbeat Taranıyor..." : "Küme Doğrulama Pingi"}</span>
          </button>

          <button
            type="button"
            className="adm-topbar__btn"
            onClick={() => setShowRootCaModal(true)}
            title="Efesoft Kök Sertifika Otoritesi (CA) & Anahtar Çifti Detayı"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <ShieldCheck size={13} color="#16a34a" />
            <span>Root CA &amp; Kripto İmzaları</span>
          </button>

          <button
            type="button"
            className="adm-topbar__btn adm-topbar__btn--primary"
            onClick={() => {
              setGeneratedSuccessKey(null);
              setShowGenerateModal(true);
            }}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={13} />
            <span>+ Yeni Lisans Anahtarı Üret</span>
          </button>
        </div>
      </div>

      {/* Global Ping Success Toast */}
      {pingSuccessMessage && (
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
          }}
        >
          <CheckCircle2 size={15} color="#16a34a" />
          <span>{pingSuccessMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  KPI CARDS: ENTERPRISE LICENSING TELEMETRY                           */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-kpi-grid">
        {/* KPI 1 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Toplam Aktif Lisans</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <Key size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">1.248 Lisans</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>%94.2 Aktif</span> · 42 POC Deneme · 18 Askıda
          </div>
        </div>

        {/* KPI 2 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Koltuk Tahsisi (Seat Quota)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
              <Users size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">
            {kpis.totalActiveSeats.toLocaleString("tr-TR")} / {kpis.totalAllocatedSeats.toLocaleString("tr-TR")}
          </div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>%{kpis.seatUtilizationPercent} Doluluk</span> · Lisanslı Kullanıcı
          </div>
        </div>

        {/* KPI 3 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Canlı Heartbeat Telemetrisi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(22, 163, 74, 0.1)", color: "#16a34a" }}>
              <Activity size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">
            842 Canlı Düğüm
          </div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>%99.98 Uptime</span> · 14ms Avg Ping
          </div>
        </div>

        {/* KPI 4 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Yıllık Lisans Hacmi (ARR)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
              <Zap size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺18.420.000</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#0071e3", fontWeight: 600 }}>₺1.53M / Ay</span> · Kurumsal SLA Dahil
          </div>
        </div>

        {/* KPI 5 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Yenileme Bekleyenler (30 Gün)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
              <Clock size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val" style={{ color: "#b45309" }}>
            14 Müşteri
          </div>
          <div className="adm-kpi-card__sub">
            ₺1.84M Hacim · Otomatik Hatırlatma Aktif
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  FILTER & SEARCH BAR                                                 */}
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "1 1 320px", flexWrap: "wrap" }}>
          {/* Search Box */}
          <div className="adm-search" style={{ width: "270px" }}>
            <Search size={13} className="adm-search__icon" />
            <input
              type="text"
              placeholder="Lisans anahtarı, şirket, domain ara..."
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

          {/* Product Segment Buttons */}
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

          {/* Status Dropdown Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>Durum:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="adm-input"
              style={{ height: "30px", fontSize: "11.5px", padding: "0 28px 0 8px", width: "auto" }}
            >
              <option value="all">Tümü (1.248)</option>
              <option value="active">Aktif (1.176)</option>
              <option value="expiring_soon">Yenileme Yaklaşan (14)</option>
              <option value="trial">POC / Deneme (42)</option>
              <option value="suspended">Askıya Alınan (18)</option>
            </select>
          </div>
        </div>

        {/* Right: View Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
            Gösterilen: <b>{filteredLicenses.length}</b> lisans
          </span>
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
        <div className="adm-card" style={{ padding: "0", overflow: "hidden" }}>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: "32px" }}></th>
                  <th>Lisans &amp; Müşteri</th>
                  <th>Lisans Anahtarı</th>
                  <th>Ürün &amp; Paket</th>
                  <th>Koltuk (Seats)</th>
                  <th>Hedef / Dağıtım</th>
                  <th>Geçerlilik</th>
                  <th>Heartbeat</th>
                  <th style={{ textAlign: "right" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredLicenses.map((lic) => {
                  const isExpanded = expandedLicenseId === lic.id;
                  const isRevealed = revealedKeys[lic.id];
                  const seatPercent = Math.round((lic.activeSeats / lic.allocatedSeats) * 100);

                  return (
                    <Fragment key={lic.id}>
                      <tr
                        style={{
                          background: isExpanded ? "rgba(0, 113, 227, 0.02)" : undefined,
                          cursor: "pointer",
                        }}
                        onClick={() => setExpandedLicenseId(isExpanded ? null : lic.id)}
                      >
                        {/* Expand Toggle */}
                        <td>
                          <button
                            type="button"
                            style={{
                              background: "none",
                              border: "none",
                              color: isExpanded ? "var(--adm-primary)" : "var(--adm-text-secondary)",
                              cursor: "pointer",
                              padding: "2px",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>

                        {/* Client & ID */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "7px",
                                background: lic.themeColor,
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {lic.productType.toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                                {lic.clientName}
                              </div>
                              <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", display: "flex", gap: "6px" }}>
                                <span>{lic.clientCode}</span>
                                <span>·</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{lic.id}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* License Key with Unmask & Copy */}
                        <td onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "11.5px",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background: "var(--adm-surface-2)",
                                border: "1px solid var(--adm-border)",
                                letterSpacing: "0.03em",
                                color: isRevealed ? "#0f172a" : "#64748b",
                              }}
                            >
                              {isRevealed ? lic.licenseKey : maskLicenseKey(lic.licenseKey)}
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleKeyReveal(lic.id)}
                              title={isRevealed ? "Gizle" : "Anahtarı Göster"}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)", padding: "2px" }}
                            >
                              {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopyKey(lic.licenseKey, lic.id)}
                              title="Panoya Kopyala"
                              style={{ background: "none", border: "none", cursor: "pointer", color: copiedKeyId === lic.id ? "#16a34a" : "var(--adm-text-secondary)", padding: "2px" }}
                            >
                              {copiedKeyId === lic.id ? <Check size={13} /> : <Copy size={13} />}
                            </button>
                          </div>
                        </td>

                        {/* Product & Tier */}
                        <td>
                          <div style={{ fontWeight: 500 }}>{lic.product}</div>
                          <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                            <span className="adm-badge adm-badge--neutral" style={{ fontSize: "10px" }}>
                              {lic.tierLabel}
                            </span>
                            <span
                              className={`adm-badge adm-badge--${
                                lic.status === "active"
                                  ? "success"
                                  : lic.status === "expiring_soon"
                                  ? "warning"
                                  : lic.status === "trial"
                                  ? "blue"
                                  : "danger"
                              }`}
                              style={{ fontSize: "10px" }}
                            >
                              {lic.statusLabel}
                            </span>
                          </div>
                        </td>

                        {/* Seats */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                            <span style={{ fontWeight: 600 }}>{lic.activeSeats} / {lic.allocatedSeats}</span>
                            <span style={{ color: "var(--adm-text-secondary)" }}>%{seatPercent}</span>
                          </div>
                          <div style={{ width: "90px", height: "4px", background: "rgba(0,0,0,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                            <div
                              style={{
                                width: `${seatPercent}%`,
                                height: "100%",
                                background: seatPercent > 90 ? "#f59e0b" : "#16a34a",
                                borderRadius: "2px",
                              }}
                            />
                          </div>
                        </td>

                        {/* Deployment & Target */}
                        <td>
                          <div style={{ fontSize: "11.5px", fontWeight: 500 }}>{lic.deploymentLabel}</div>
                          <div
                            style={{
                              fontSize: "10.5px",
                              fontFamily: "var(--font-mono)",
                              color: "var(--adm-text-secondary)",
                              maxWidth: "140px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={lic.boundTarget.value}
                          >
                            {lic.boundTarget.value}
                          </div>
                        </td>

                        {/* Validity & Expiration */}
                        <td>
                          <div style={{ fontSize: "11.5px", fontWeight: 500 }}>{lic.validUntil}</div>
                          <div
                            style={{
                              fontSize: "10.5px",
                              fontWeight: 600,
                              color: lic.daysRemaining <= 30 && lic.daysRemaining > 0 ? "#b45309" : lic.daysRemaining === 0 ? "#dc2626" : "var(--adm-text-secondary)",
                            }}
                          >
                            {lic.daysRemaining === 0 ? "Süresi Doldu" : `${lic.daysRemaining} gün kaldı`}
                          </div>
                        </td>

                        {/* Heartbeat Status */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background:
                                  lic.heartbeat.status === "healthy"
                                    ? "#16a34a"
                                    : lic.heartbeat.status === "idle"
                                    ? "#f59e0b"
                                    : "#ef4444",
                                boxShadow: lic.heartbeat.status === "healthy" ? "0 0 6px rgba(22, 163, 74, 0.4)" : undefined,
                              }}
                            />
                            <span style={{ fontSize: "11px", fontWeight: 500 }}>
                              {lic.heartbeat.status === "healthy" ? "Canlı" : lic.heartbeat.status === "idle" ? "Boşta" : "Erişilemez"}
                            </span>
                          </div>
                          <div style={{ fontSize: "10px", color: "var(--adm-text-secondary)", marginTop: "1px" }}>
                            {lic.heartbeat.lastPing}
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                            <button
                              type="button"
                              className="adm-topbar__btn"
                              style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                              onClick={() => {
                                setShowQuotaModal(lic);
                                setUpdatedSeatsCount(lic.allocatedSeats);
                              }}
                              title="Koltuk & modül kotasını artır"
                            >
                              Kota
                            </button>
                            <button
                              type="button"
                              className="adm-topbar__btn"
                              style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                              onClick={() => setShowDownloadModal(lic)}
                              title="İmzalı .efekey dosyasını ve aktivasyon komutunu indir"
                            >
                              <Download size={11} />
                            </button>
                            <button
                              type="button"
                              className={`adm-topbar__btn ${lic.status === "suspended" ? "adm-topbar__btn--primary" : ""}`}
                              style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                              onClick={() => setShowRevokeModal(lic)}
                              title={lic.status === "suspended" ? "Lisansı Yeniden Aktive Et" : "Lisansı Askıya Al"}
                            >
                              {lic.status === "suspended" ? <Unlock size={11} /> : <Lock size={11} />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* ------------------------------------------------------------ */}
                      {/*  EXPANDED ROW: 360° CRYPTOGRAPHIC LICENSE INSPECTOR         */}
                      {/* ------------------------------------------------------------ */}
                      {isExpanded && (
                        <tr style={{ background: "#f8fafc" }}>
                          <td colSpan={9} style={{ padding: "16px 20px" }}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1.4fr 1.2fr 1.2fr",
                                gap: "16px",
                                background: "#ffffff",
                                padding: "16px",
                                borderRadius: "10px",
                                border: "1px solid var(--adm-border)",
                              }}
                            >
                              {/* Col 1: Cryptographic Signature & Fingerprint */}
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                                  Kriptografik İmza &amp; Donanım Kilidi
                                </div>

                                <div style={{ display: "grid", gap: "8px", fontSize: "11.5px" }}>
                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>İmza Algoritması:</span>
                                    <div style={{ fontWeight: 600, color: "var(--adm-text)", fontFamily: "var(--font-mono)" }}>
                                      {lic.crypto.algorithm}
                                    </div>
                                  </div>

                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>SHA-256 Anahtar Parmak İzi:</span>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#0284c7", wordBreak: "break-all" }}>
                                      {lic.crypto.sha256Fingerprint}
                                    </div>
                                  </div>

                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>Donanım / Domain Eşlemesi:</span>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: "var(--adm-text)" }}>
                                      [{lic.boundTarget.type.toUpperCase()}] {lic.boundTarget.value}
                                    </div>
                                  </div>

                                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                                    <span className="adm-badge adm-badge--success" style={{ fontSize: "10.5px" }}>
                                      Efesoft Root CA İmzalı ✓
                                    </span>
                                    <span style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)", fontFamily: "var(--font-mono)" }}>
                                      {lic.crypto.caSerial}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Col 2: Authorized Modules */}
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                                  Yetkili Ürün Modülleri ({lic.modules.length})
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                  {lic.modules.map((m) => (
                                    <span
                                      key={m}
                                      style={{
                                        fontSize: "11px",
                                        padding: "3px 8px",
                                        borderRadius: "5px",
                                        background: "var(--adm-surface-2)",
                                        border: "1px solid var(--adm-border)",
                                        color: "var(--adm-text)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                      }}
                                    >
                                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: lic.themeColor }} />
                                      {m}
                                    </span>
                                  ))}
                                </div>

                                <div style={{ marginTop: "12px", fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                                  <b>Yıllık Lisans Bedeli:</b> {lic.annualValueFormatted} / Yıl ({lic.monthlyRevenueFormatted}/Ay)
                                </div>
                              </div>

                              {/* Col 3: Realtime Telemetry & Heartbeat Details */}
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--adm-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                                  Canlı Node &amp; Heartbeat Takibi
                                </div>

                                <div style={{ display: "grid", gap: "6px", fontSize: "11.5px" }}>
                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>Bağlı Veri Merkezi:</span>
                                    <div style={{ fontWeight: 600 }}>{lic.heartbeat.datacenter}</div>
                                  </div>

                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>Çalışan Sürüm:</span>
                                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{lic.heartbeat.versionRunning}</div>
                                  </div>

                                  <div>
                                    <span style={{ color: "var(--adm-text-secondary)" }}>Ağ Gecikmesi (Latency):</span>
                                    <div style={{ fontWeight: 600, color: "#16a34a" }}>{lic.heartbeat.latencyMs} ms</div>
                                  </div>

                                  <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}>
                                    <button
                                      type="button"
                                      className="adm-topbar__btn adm-topbar__btn--primary"
                                      style={{ height: "28px", padding: "0 10px", fontSize: "11px" }}
                                      onClick={() => setShowDownloadModal(lic)}
                                    >
                                      <Terminal size={11} />
                                      <span>Aktivasyon Kılavuzu</span>
                                    </button>
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
      ) : (
        /* ------------------------------------------------------------------ */
        /*  VIEW MODE 2: CARD GRID                                            */
        /* ------------------------------------------------------------------ */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "14px" }}>
          {filteredLicenses.map((lic) => {
            const isRevealed = revealedKeys[lic.id];
            const seatPercent = Math.round((lic.activeSeats / lic.allocatedSeats) * 100);

            return (
              <div key={lic.id} className="adm-card" style={{ padding: "0", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--adm-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="adm-badge adm-badge--neutral" style={{ fontSize: "10.5px" }}>
                        {lic.productType.toUpperCase()}
                      </span>
                      <span className="adm-badge adm-badge--info" style={{ fontSize: "10.5px" }}>
                        {lic.tierLabel}
                      </span>
                    </div>

                    <span
                      className={`adm-badge adm-badge--${
                        lic.status === "active"
                          ? "success"
                          : lic.status === "expiring_soon"
                          ? "warning"
                          : lic.status === "trial"
                          ? "blue"
                          : "danger"
                      }`}
                    >
                      {lic.statusLabel}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 2px", color: "var(--adm-text)" }}>
                    {lic.clientName}
                  </h3>
                  <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>
                    {lic.product} · {lic.clientCode}
                  </div>
                </div>

                {/* Key box */}
                <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.015)", borderBottom: "1px solid var(--adm-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", color: "var(--adm-text-secondary)", textTransform: "uppercase", fontWeight: 600 }}>
                      Lisans Anahtarı
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <button
                        type="button"
                        onClick={() => toggleKeyReveal(lic.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
                      >
                        {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyKey(lic.licenseKey, lic.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: copiedKeyId === lic.id ? "#16a34a" : "var(--adm-text-secondary)" }}
                      >
                        {copiedKeyId === lic.id ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, color: isRevealed ? "#0f172a" : "#64748b", marginTop: "4px" }}>
                    {isRevealed ? lic.licenseKey : maskLicenseKey(lic.licenseKey)}
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "11px", flex: 1 }}>
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Kullanıcı Koltuğu:</span>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
                      {lic.activeSeats} / {lic.allocatedSeats} (%{seatPercent})
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Geçerlilik Bitiş:</span>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
                      {lic.validUntil}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Dağıtım Modeli:</span>
                    <div style={{ fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
                      {lic.deploymentLabel}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "var(--adm-text-secondary)" }}>Heartbeat:</span>
                    <div style={{ fontWeight: 600, color: lic.heartbeat.status === "healthy" ? "#16a34a" : "#dc2626", marginTop: "2px" }}>
                      {lic.heartbeat.lastPing} ({lic.heartbeat.latencyMs}ms)
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: "10px 16px", borderTop: "1px solid var(--adm-border)", background: "var(--adm-surface-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#16a34a" }}>
                    {lic.annualValueFormatted} / Yıl
                  </span>

                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      type="button"
                      className="adm-topbar__btn"
                      style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                      onClick={() => {
                        setShowQuotaModal(lic);
                        setUpdatedSeatsCount(lic.allocatedSeats);
                      }}
                    >
                      Kota
                    </button>
                    <button
                      type="button"
                      className="adm-topbar__btn adm-topbar__btn--primary"
                      style={{ height: "26px", padding: "0 8px", fontSize: "11px" }}
                      onClick={() => setShowDownloadModal(lic)}
                    >
                      .efekey
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 1: CRYPTOGRAPHIC LICENSE GENERATOR                            */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={showGenerateModal}
        onClose={() => !isGenerating && setShowGenerateModal(false)}
        maxWidth="560px"
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Key size={16} color="#0071e3" />
            <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Yeni Kriptografik Lisans Anahtarı Üret</h3>
          </div>
          {!isGenerating && (
            <button
              type="button"
              onClick={() => setShowGenerateModal(false)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
            >
              <X size={17} />
            </button>
          )}
        </div>

        {generatedSuccessKey ? (
          <div style={{ padding: "24px 20px", textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(22, 163, 74, 0.1)",
                color: "#16a34a",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 12px",
              }}
            >
              <CheckCircle2 size={26} />
            </div>

            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px" }}>
              Lisans Başarıyla Üretildi &amp; Kriptografik İmzalandı!
            </h3>
            <p style={{ fontSize: "12px", color: "var(--adm-text-secondary)", maxWidth: "420px", margin: "0 auto 16px" }}>
              Anahtar Efesoft Root CA tarafından imzalandı ve merkezi heartbeat kümesine kaydedildi.
            </p>

            <div
              style={{
                padding: "12px 14px",
                background: "var(--adm-surface-2)",
                border: "1px solid var(--adm-border)",
                borderRadius: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                fontWeight: 700,
                color: "#0071e3",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <span>{generatedSuccessKey}</span>
              <button
                type="button"
                className="adm-topbar__btn"
                style={{ height: "28px", padding: "0 8px" }}
                onClick={() => handleCopyKey(generatedSuccessKey, "success")}
              >
                {copiedKeyId === "success" ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setGeneratedSuccessKey(null)}
              >
                Yeni Bir Tane Daha Üret
              </button>
              <button
                type="button"
                className="adm-topbar__btn adm-topbar__btn--primary"
                onClick={() => setShowGenerateModal(false)}
              >
                Tamamla &amp; Listede Gör
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerateLicense} style={{ padding: "18px 20px" }}>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <label className="adm-label" style={{ marginBottom: "5px" }}>
                  Müşteri / Kurum Adı <span className="adm-label-required">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="örn: ASELSAN Elektronik Sanayi A.Ş."
                  value={genClientName}
                  onChange={(e) => setGenClientName(e.target.value)}
                  className="adm-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Yazılım Çözümü <span className="adm-label-required">*</span>
                  </label>
                  <select
                    value={genProduct}
                    onChange={(e) => setGenProduct(e.target.value as ProductType)}
                    className="adm-input"
                  >
                    <option value="erp">EfeERP Kurumsal Kaynak Planlama</option>
                    <option value="crm">EfeCRM Akıllı Müşteri &amp; Satış</option>
                    <option value="pos">EfePOS Yeni Nesil Kasa &amp; Perakende</option>
                    <option value="ai">EfeAI Kurumsal Karar Destek</option>
                  </select>
                </div>

                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Lisans Katmanı (Tier) <span className="adm-label-required">*</span>
                  </label>
                  <select
                    value={genTier}
                    onChange={(e) => setGenTier(e.target.value as LicenseTier)}
                    className="adm-input"
                  >
                    <option value="enterprise">Enterprise Suite (Tam Kapsam)</option>
                    <option value="pro">Professional Paket</option>
                    <option value="starter">Starter / Temel Paket</option>
                    <option value="custom">Özel Mimari / Dedicated</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Dağıtım Modeli
                  </label>
                  <select
                    value={genDeployment}
                    onChange={(e) => setGenDeployment(e.target.value as DeploymentType)}
                    className="adm-input"
                  >
                    <option value="dedicated">Dedicated Cloud</option>
                    <option value="saas">SaaS Multi-Tenant</option>
                    <option value="onprem">On-Premises Edge</option>
                  </select>
                </div>

                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Koltuk (Seats)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={genSeats}
                    onChange={(e) => setGenSeats(Number(e.target.value))}
                    className="adm-input"
                  />
                </div>

                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Geçerlilik Süresi
                  </label>
                  <select
                    value={genDurationYears}
                    onChange={(e) => setGenDurationYears(Number(e.target.value))}
                    className="adm-input"
                  >
                    <option value={1}>1 Yıl (Yıllık)</option>
                    <option value={2}>2 Yıl (Avantajlı)</option>
                    <option value={3}>3 Yıl (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }}>
                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Kripto Eşleme
                  </label>
                  <select
                    value={genBindingType}
                    onChange={(e) => setGenBindingType(e.target.value as "domain" | "hwid")}
                    className="adm-input"
                  >
                    <option value="domain">Cloud Domain</option>
                    <option value="hwid">Machine ID (HWID)</option>
                  </select>
                </div>
                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Hedef Değer
                  </label>
                  <input
                    type="text"
                    placeholder={genBindingType === "domain" ? "aselsan.efesoft.com.tr" : "HWID-NODE-88A9-CC41"}
                    value={genBindingValue}
                    onChange={(e) => setGenBindingValue(e.target.value)}
                    className="adm-input"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowGenerateModal(false)}
                disabled={isGenerating}
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isGenerating || !genClientName}
                className="adm-topbar__btn adm-topbar__btn--primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={13} className="adm-spin" />
                    <span>Ed25519 &amp; Root CA İmzalanıyor...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={13} />
                    <span>İmzala &amp; Lisans Anahtarı Üret</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 2: QUOTA UPGRADE MODAL                                        */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={Boolean(showQuotaModal)}
        onClose={() => !isUpdatingQuota && setShowQuotaModal(null)}
        maxWidth="460px"
      >
        {showQuotaModal && (
          <div>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={16} color="#0071e3" />
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Kullanıcı Kotasını Genişlet</h3>
              </div>
              {!isUpdatingQuota && (
                <button
                  type="button"
                  onClick={() => setShowQuotaModal(null)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <form onSubmit={handleUpdateQuota} style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)", marginBottom: "12px" }}>
                <strong>{showQuotaModal.clientName}</strong> için lisans anahtarını yeniden oluşturmaya gerek kalmadan canlı koltuk kotası güncellenecektir.
              </div>

              <div style={{ padding: "12px", background: "var(--adm-surface-2)", borderRadius: "8px", border: "1px solid var(--adm-border)", marginBottom: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px" }}>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Mevcut Kota:</span>
                  <div style={{ fontWeight: 600 }}>{showQuotaModal.allocatedSeats} Koltuk</div>
                </div>
                <div>
                  <span style={{ color: "var(--adm-text-secondary)" }}>Aktif Kullanılan:</span>
                  <div style={{ fontWeight: 600, color: "#16a34a" }}>{showQuotaModal.activeSeats} Koltuk</div>
                </div>
              </div>

              <div>
                <label className="adm-label" style={{ marginBottom: "5px" }}>
                  Yeni Toplam Koltuk Sayısı
                </label>
                <input
                  type="number"
                  min={showQuotaModal.activeSeats}
                  max={10000}
                  value={updatedSeatsCount}
                  onChange={(e) => setUpdatedSeatsCount(Number(e.target.value))}
                  className="adm-input"
                />
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", marginTop: "4px" }}>
                  Tahmini Yeni ARR: <b>₺{(updatedSeatsCount * 8000).toLocaleString("tr-TR")} / Yıl</b>
                </div>
              </div>

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  type="button"
                  className="adm-topbar__btn"
                  onClick={() => setShowQuotaModal(null)}
                  disabled={isUpdatingQuota}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingQuota}
                  className="adm-topbar__btn adm-topbar__btn--primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  {isUpdatingQuota ? (
                    <>
                      <RefreshCw size={13} className="adm-spin" />
                      <span>Güncelleniyor...</span>
                    </>
                  ) : (
                    <span>Kotayı Güncelle</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 3: DOWNLOAD .EFEKEY & ACTIVATION GUIDE                        */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={Boolean(showDownloadModal)}
        onClose={() => setShowDownloadModal(null)}
        maxWidth="600px"
      >
        {showDownloadModal && (
          <div>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileCode2 size={16} color="#0071e3" />
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  .efekey Lisans Dosyası &amp; Aktivasyon Kılavuzu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDownloadModal(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)", marginBottom: "12px" }}>
                <strong>{showDownloadModal.clientName}</strong> ({showDownloadModal.product}) için kriptografik olarak imzalanmış lisans dosyası JSON yapısı:
              </div>

              {/* JSON preview */}
              <div
                style={{
                  background: "#0f172a",
                  color: "#e2e8f0",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  lineHeight: 1.5,
                  overflowX: "auto",
                  maxHeight: "220px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <pre style={{ margin: 0 }}>
{`{
  "efesoft_license_version": "4.0",
  "license_id": "${showDownloadModal.id}",
  "key": "${showDownloadModal.licenseKey}",
  "client": "${showDownloadModal.clientName}",
  "tax_no": "${showDownloadModal.taxNumber}",
  "product_code": "${showDownloadModal.productCode}",
  "tier": "${showDownloadModal.tier}",
  "seats_allocated": ${showDownloadModal.allocatedSeats},
  "valid_until": "${showDownloadModal.validUntil}",
  "bound_target": "${showDownloadModal.boundTarget.value}",
  "signature": "${showDownloadModal.crypto.sha256Fingerprint}",
  "ca_serial": "${showDownloadModal.crypto.caSerial}"
}`}
                </pre>
              </div>

              {/* CLI Command */}
              <div style={{ marginTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)", marginBottom: "4px" }}>
                  DevOps Terminal Aktivasyon Komutu:
                </div>
                <div
                  style={{
                    background: "var(--adm-surface-2)",
                    border: "1px solid var(--adm-border)",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <code style={{ color: "#0071e3" }}>
                    efeos-cli license activate --key {showDownloadModal.licenseKey} --sync
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyKey(`efeos-cli license activate --key ${showDownloadModal.licenseKey} --sync`, "cli")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: copiedKeyId === "cli" ? "#16a34a" : "var(--adm-text-secondary)" }}
                  >
                    {copiedKeyId === "cli" ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  type="button"
                  className="adm-topbar__btn"
                  onClick={() => setShowDownloadModal(null)}
                >
                  Kapat
                </button>
                <button
                  type="button"
                  className="adm-topbar__btn adm-topbar__btn--primary"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        JSON.stringify(
                          {
                            efesoft_license_version: "4.0",
                            license_id: showDownloadModal.id,
                            key: showDownloadModal.licenseKey,
                            client: showDownloadModal.clientName,
                            product: showDownloadModal.product,
                            valid_until: showDownloadModal.validUntil,
                            signature: showDownloadModal.crypto.sha256Fingerprint,
                          },
                          null,
                          2
                        ),
                      ],
                      { type: "application/json" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${showDownloadModal.clientCode}-license.efekey`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Download size={13} />
                  <span>.efekey Dosyasını İndir</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 4: REVOKE / BLACKLIST LICENSE MODAL                           */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={Boolean(showRevokeModal)}
        onClose={() => setShowRevokeModal(null)}
        maxWidth="460px"
      >
        {showRevokeModal && (
          <div>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldAlert size={16} color={showRevokeModal.status === "suspended" ? "#16a34a" : "#dc2626"} />
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  {showRevokeModal.status === "suspended" ? "Lisansı Yeniden Aktive Et" : "Lisansı Askıya Al / İptal Et"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRevokeModal(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ padding: "18px 20px" }}>
              <p style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--adm-text-secondary)", margin: "0 0 12px" }}>
                <strong>{showRevokeModal.clientName}</strong> ({showRevokeModal.licenseKey}) için durum güncellemesi:
              </p>

              {showRevokeModal.status !== "suspended" && (
                <div>
                  <label className="adm-label" style={{ marginBottom: "5px" }}>
                    Askıya Alma Gerekçesi
                  </label>
                  <select
                    value={revokeReason}
                    onChange={(e) => setRevokeReason(e.target.value)}
                    className="adm-input"
                  >
                    <option>Ödeme / Fatura Gecikmesi</option>
                    <option>Sözleşme Feshi / Karşılıklı Ayrılık</option>
                    <option>Güvenlik / Şüpheli Node İhlali</option>
                    <option>Müşteri Talebiyle Dondurma</option>
                  </select>

                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px 12px",
                      background: "rgba(220, 38, 38, 0.08)",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                      borderRadius: "6px",
                      fontSize: "11px",
                      color: "#991b1b",
                    }}
                  >
                    <b>Dikkat:</b> Lisans askıya alındığında, müşterinin çalışan tüm instance&apos;ları 60 saniye içinde kilitlenir ve kullanıcı girişi durdurulur.
                  </div>
                </div>
              )}

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  type="button"
                  className="adm-topbar__btn"
                  onClick={() => setShowRevokeModal(null)}
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  className="adm-topbar__btn adm-topbar__btn--primary"
                  onClick={handleConfirmRevocation}
                  style={{
                    background: showRevokeModal.status === "suspended" ? "#16a34a" : "#dc2626",
                    borderColor: showRevokeModal.status === "suspended" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {showRevokeModal.status === "suspended" ? "Lisansı Yeniden Aç" : "Lisansı Kesin Olarak Askıya Al"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 5: ROOT CA & CRYPTO SUITE INSPECTOR                           */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={showRootCaModal}
        onClose={() => setShowRootCaModal(false)}
        maxWidth="540px"
      >
        <div>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={16} color="#16a34a" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Efesoft Kök Sertifika Otoritesi (Root CA)</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowRootCaModal(false)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
            >
              <X size={17} />
            </button>
          </div>

          <div style={{ padding: "18px 20px", display: "grid", gap: "10px", fontSize: "12px" }}>
            <div style={{ padding: "12px", background: "var(--adm-surface-2)", borderRadius: "8px", border: "1px solid var(--adm-border)" }}>
              <div style={{ fontWeight: 600, color: "var(--adm-text)" }}>Efesoft Enterprise Root CA (G4)</div>
              <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
                Geçerlilik: 2024 - 2039 · RSA 4096-bit Public Key + Ed25519 Elliptic Curve
              </div>
            </div>

            <div>
              <span style={{ color: "var(--adm-text-secondary)" }}>CA Fingerprint (SHA-256):</span>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "var(--adm-surface-2)", padding: "6px 8px", borderRadius: "5px", border: "1px solid var(--adm-border)", marginTop: "4px" }}>
                3F:8A:2C:99:B1:04:88:EC:71:A0:F4:29:11:82:94:01:BC:48:99:A2:51:74:02:99
              </div>
            </div>

            <div>
              <span style={{ color: "var(--adm-text-secondary)" }}>CRL (Certificate Revocation List) Endpoint:</span>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#0071e3", marginTop: "2px" }}>
                https://license.efesoft.com.tr/v2/crl.pem
              </div>
            </div>

            <div>
              <span style={{ color: "var(--adm-text-secondary)" }}>Air-Gapped Doğrulama Desteği:</span>
              <div style={{ fontSize: "11.5px", color: "var(--adm-text)", marginTop: "2px" }}>
                İnternet bağlantısı olmayan askeri ve bankacılık müşterileri (On-Premises Air-Gapped) için donanım USB HSM ve statik RSA açık anahtar paketi ile tam uyumludur.
              </div>
            </div>

            <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="adm-topbar__btn adm-topbar__btn--primary"
                onClick={() => setShowRootCaModal(false)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
