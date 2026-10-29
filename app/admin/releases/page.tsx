"use client";

import { useState, useMemo, Fragment } from "react";
import { AdminModal } from "../AdminModal";
import {
  GitBranch,
  Tag,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  Layers,
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Server,
  ShieldCheck,
  Terminal,
  FileText,
  RotateCcw,
  Sparkles,
  Bug,
  SlidersHorizontal,
  ArrowUpRight,
  Send,
  Download,
  Share2,
  Lock,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

export type ReleaseChannel = "stable" | "canary" | "hotfix" | "lts";
export type ReleaseProduct = "all" | "kernel" | "erp" | "crm" | "pos" | "ai";
export type ChangelogCategory = "feature" | "improvement" | "fix" | "security" | "breaking";

export interface ChangelogItem {
  id: string;
  category: ChangelogCategory;
  categoryLabel: string;
  text: string;
  impactScore?: "high" | "medium" | "low";
}

export interface ReleaseRecord {
  id: string;
  version: string;
  title: string;
  product: ReleaseProduct;
  productName: string;
  productTheme: string;
  channel: ReleaseChannel;
  channelLabel: string;
  releaseDate: string;
  commitHash: string;
  dockerImage: string;
  deployStatus: "deployed_100" | "canary_40" | "canary_85" | "draft" | "deprecated";
  deployStatusLabel: string;
  rolloutProgress: number; // 0 to 100
  activeTenantsCount: number;
  author: string;
  authorRole: string;
  summary: string;
  items: ChangelogItem[];
  breakingChangesCount: number;
}

/* -------------------------------------------------------------------------- */
/*  MOCK DATA: 8 DETAILED RELEASES & CHANGELOGS                               */
/* -------------------------------------------------------------------------- */

const INITIAL_RELEASES: ReleaseRecord[] = [
  {
    id: "REL-4200",
    version: "v4.2.0",
    title: "Akıllı WMS El Terminali & GİB 2026 e-Arşiv v2.4 Entegrasyonu",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    channel: "lts",
    channelLabel: "Long Term Support (LTS)",
    releaseDate: "Bugün, 10:30",
    commitHash: "e4f9b2a",
    dockerImage: "registry.efesoft.com.tr/efe-erp:v4.2.0-lts",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 1248,
    author: "Emirhan Demir",
    authorRole: "Kurucu & Baş Mimar",
    summary: "WMS barkodlu depo el terminalleri için sıfır gecikmeli WebSocket altyapısı ve GİB 2026 e-Arşiv v2.4 çoklu tevkifat protokolü yayına alındı.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c1",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "WMS Barkodlu El Terminalleri için Zero-Latency WebSocket Çekirdeği (10.000 cihaz eşzamanlı bağlantı desteği).",
        impactScore: "high",
      },
      {
        id: "c2",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "GİB e-Arşiv Fatura v2.4 protokolü: Dinamik KDV istisna kodları ve çoklu tevkifat otomatik hesaplama motoru.",
        impactScore: "high",
      },
      {
        id: "c3",
        category: "improvement",
        categoryLabel: "Performans",
        text: "PostgreSQL 17 ve Redis 7.4 önbellekleme ile 500.000 satırlık stok listesi filtreleme hızında %38 artış.",
        impactScore: "medium",
      },
      {
        id: "c4",
        category: "fix",
        categoryLabel: "Hata Çözümü",
        text: "Dövizli vadeli çek bordrosu muhasebeleştirme sürecinde oluşan 1 kuruşluk yuvarlama anomalisi düzeltildi.",
        impactScore: "low",
      },
      {
        id: "c5",
        category: "security",
        categoryLabel: "Güvenlik",
        text: "API Gateway JWT token rotasyon algoritması Ed25519 asimetrik anahtar şemasına yükseltildi.",
        impactScore: "high",
      },
    ],
  },
  {
    id: "REL-4180",
    version: "v4.1.8",
    title: "Çevrimdışı SQLite Kuyruk Kilit Çözümü & Beko ÖKC Sürücüsü",
    product: "pos",
    productName: "EfePOS Yeni Nesil Kasa & Perakende",
    productTheme: "#10b981",
    channel: "hotfix",
    channelLabel: "Kritik Hotfix Yaması",
    releaseDate: "Dün, 18:45",
    commitHash: "b817fa0",
    dockerImage: "registry.efesoft.com.tr/efe-pos:v4.1.8-hotfix",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 420,
    author: "Selin Yılmaz",
    authorRole: "Kıdemli Çözüm Danışmanı",
    summary: "İnternet kesildiğinde yerel SQLite WAL kuyruk dosyasında oluşan kilitlenme giderildi ve yeni nesil Hugin/Beko ÖKC sürücüsü güncellendi.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c6",
        category: "fix",
        categoryLabel: "Kritik Düzeltme",
        text: "İnternet kesintisi esnasında yerel SQLite WAL dosyasında eşzamanlı fiş yazma kuyruk kilidi (busy lock) tamamen çözüldü.",
        impactScore: "high",
      },
      {
        id: "c7",
        category: "fix",
        categoryLabel: "Donanım Yaması",
        text: "Beko 400TR ve Hugin ÖKC cihazlarında temassız kart okuma zaman aşımı (timeout) süresi optimize edildi.",
        impactScore: "medium",
      },
      {
        id: "c8",
        category: "improvement",
        categoryLabel: "Optimizasyon",
        text: "Kasa gün sonu Z-raporu döküm ve GİB kuyruk senkronizasyon süresi 1.8 saniyeden 350 milisaniyeye indirildi.",
        impactScore: "low",
      },
    ],
  },
  {
    id: "REL-4150",
    version: "v4.1.5",
    title: "Doğal Dil SQL Raporlama & Şirket İçi Sözleşme RAG Motoru",
    product: "ai",
    productName: "EfeAI Kurumsal Karar Destek & Veri Ajanı",
    productTheme: "#f59e0b",
    channel: "stable",
    channelLabel: "Kararlı Sürüm (Stable)",
    releaseDate: "24 Eki 2026",
    commitHash: "7ca219d",
    dockerImage: "registry.efesoft.com.tr/efe-ai:v4.1.5",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 180,
    author: "Emirhan Demir",
    authorRole: "Kurucu & Baş Mimar",
    summary: "ERP veritabanları üzerinde doğal dille SQL üreten RAG motoru yayınlandı. Gemini 2.5 Flash ile %42 token optimizasyonu sağlandı.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c9",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "Doğal Dil ile SQL Raporlama: Türkçe yönergeleri karmaşık ERP veritabanı sorgularına dönüştüren semantik ajan.",
        impactScore: "high",
      },
      {
        id: "c10",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "Şirket İçi Sözleşme Vektör Arama (RAG): PDF ve taranmış belgelerde madde ve ceza koşulu karşılaştırma.",
        impactScore: "high",
      },
      {
        id: "c11",
        category: "improvement",
        categoryLabel: "Performans",
        text: "Vektör indeksleme motoru Qdrant cluster altyapısına taşınarak sorgu yanıt süresi 420 milisaniyeye düşürüldü.",
        impactScore: "medium",
      },
    ],
  },
  {
    id: "REL-4100",
    version: "v4.1.0",
    title: "Resmi WhatsApp Cloud API & WebRTC Tarayıcı İçi Santral",
    product: "crm",
    productName: "EfeCRM Akıllı Müşteri & Satış",
    productTheme: "#8b5cf6",
    channel: "stable",
    channelLabel: "Kararlı Sürüm (Stable)",
    releaseDate: "18 Eki 2026",
    commitHash: "f193c4e",
    dockerImage: "registry.efesoft.com.tr/efe-crm:v4.1.0",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 680,
    author: "Caner Kurt",
    authorRole: "Kıdemli CRM Mimarı",
    summary: "Meta onaylı WhatsApp Cloud API şablon motoru ve tarayıcıdan doğrudan çalışan WebRTC çağrı merkezi santrali entegre edildi.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c12",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "Resmi Meta WhatsApp Business Cloud API şablonlu bildirim ve butonlu PDF teklif iletimi.",
        impactScore: "high",
      },
      {
        id: "c13",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "WebRTC tabanlı doğrudan tarayıcı içi çağrı karşılama, ses kaydı ve otomatik müşteri kartı eşleme.",
        impactScore: "high",
      },
      {
        id: "c14",
        category: "improvement",
        categoryLabel: "Performans",
        text: "Kanban satış panosunda 500+ fırsat kartında sanal liste (virtualization) ile 60 FPS akıcılık.",
        impactScore: "medium",
      },
      {
        id: "c15",
        category: "fix",
        categoryLabel: "Hata Çözümü",
        text: "Google Workspace takvim senkronizasyonunda yinelenen toplantı davetlerinin çift bildirim üretmesi giderildi.",
        impactScore: "low",
      },
    ],
  },
  {
    id: "REL-4020",
    version: "v4.0.2",
    title: "Kriptografik Lisans Mührü & Multi-Datacenter Heartbeat",
    product: "kernel",
    productName: "EfeOS Kernel & Güvenlik Çekirdeği",
    productTheme: "#0284c7",
    channel: "lts",
    channelLabel: "Long Term Support (LTS)",
    releaseDate: "05 Eki 2026",
    commitHash: "90da17c",
    dockerImage: "registry.efesoft.com.tr/efeos-kernel:v4.0.2",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 1248,
    author: "Emirhan Demir",
    authorRole: "Kurucu & Baş Mimar",
    summary: "Ed25519 donanım kilitli kriptografik lisans imzalama motoru ve Frankfurt-İzmir veri merkezleri arası heartbeat telemetrisi.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c16",
        category: "security",
        categoryLabel: "Kritik Güvenlik",
        text: "Lisans anahtarları için SHA-256 + RSA-4096 / Ed25519 çift katmanlı dijital kök sertifika CA mühür desteği.",
        impactScore: "high",
      },
      {
        id: "c17",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "Frankfurt DC (Zone-A) ve İzmir DC arasında 14 milisaniyelik anlık heartbeat telemetrisi ve otomatik node failover.",
        impactScore: "high",
      },
      {
        id: "c18",
        category: "fix",
        categoryLabel: "Hata Çözümü",
        text: "Docker swarm konteynerleri yeniden başlatıldığında HWID donanım parmak izinin sıfırlanma riski giderildi.",
        impactScore: "medium",
      },
    ],
  },
  {
    id: "REL-4300",
    version: "v4.3.0-rc1",
    title: "Çok Kanallı Pazaryeri Sipariş Konsolidasyonu & Stok Rezervasyonu",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    channel: "canary",
    channelLabel: "Canary / Beta Release",
    releaseDate: "Kademeli Dağıtımda (%40)",
    commitHash: "a104f32",
    dockerImage: "registry.efesoft.com.tr/efe-erp:v4.3.0-rc1",
    deployStatus: "canary_40",
    deployStatusLabel: "Canary Dağıtımda (%40)",
    rolloutProgress: 40,
    activeTenantsCount: 48,
    author: "Emirhan Demir",
    authorRole: "Kurucu & Baş Mimar",
    summary: "Trendyol, Hepsiburada, Amazon ve Shopify siparişlerinin tek ekranda anlık stok rezervasyonu ile senkronizasyonu.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c19",
        category: "feature",
        categoryLabel: "Yeni Özellik",
        text: "Pazaryeri Konsolidasyonu: Tüm platform siparişlerinde anlık depodan stok düşümü ve ters bakiye engelleme.",
        impactScore: "high",
      },
      {
        id: "c20",
        category: "improvement",
        categoryLabel: "Performans",
        text: "Redis tabanlı dağıtık kilit mimarisi ile aşırı yüksek trafikte çifte satış (overselling) riski sıfıra indirildi.",
        impactScore: "high",
      },
      {
        id: "c21",
        category: "breaking",
        categoryLabel: "Uyarı",
        text: "Eski XML pazaryeri sipariş formatı v2 desteği kaldırıldı; JSON REST v4 uç noktaları zorunlu kılındı.",
        impactScore: "medium",
      },
    ],
  },
  {
    id: "REL-4000",
    version: "v4.0.0",
    title: "Kurumsal 4. Nesil Mimari: Next.js 16, React 19 & Zero-Latency Redis",
    product: "kernel",
    productName: "EfeOS Kernel & Güvenlik Çekirdeği",
    productTheme: "#0284c7",
    channel: "lts",
    channelLabel: "Long Term Support (LTS)",
    releaseDate: "15 Eyl 2026",
    commitHash: "318cb91",
    dockerImage: "registry.efesoft.com.tr/efeos-kernel:v4.0.0",
    deployStatus: "deployed_100",
    deployStatusLabel: "Canlı Üretimde (%100)",
    rolloutProgress: 100,
    activeTenantsCount: 1248,
    author: "Emirhan Demir",
    authorRole: "Kurucu & Baş Mimar",
    summary: "Efesoft işletim omurgasının modern React 19 sunucu bileşenleri mimarisine ve çok kiracılı SaaS kümesine geçişi.",
    breakingChangesCount: 1,
    items: [
      {
        id: "c22",
        category: "feature",
        categoryLabel: "Major Mimari",
        text: "Next.js 16 App Router ve Turbopack motoruna tam geçiş; ilk sayfa yükleme süresi 480 milisaniyeye çekildi.",
        impactScore: "high",
      },
      {
        id: "c23",
        category: "security",
        categoryLabel: "Güvenlik",
        text: "Çok kiracılı (multi-tenant) veri izolasyonu için PostgreSQL Row-Level Security (RLS) politikaları aktif edildi.",
        impactScore: "high",
      },
      {
        id: "c24",
        category: "breaking",
        categoryLabel: "Kırıcı Değişiklik",
        text: "Eski SOAP tabanlı muhasebe servisleri devre dışı bırakıldı. Tüm istemciler OpenAPI 3.1 REST API'ye taşındı.",
        impactScore: "high",
      },
    ],
  },
  {
    id: "REL-3940",
    version: "v3.9.4",
    title: "Klasik Mimari 2025 Mevzuat Uyum Paketi & Banka MT940",
    product: "erp",
    productName: "EfeERP Kurumsal Kaynak Planlama",
    productTheme: "#0071e3",
    channel: "lts",
    channelLabel: "Eski LTS (Arşiv)",
    releaseDate: "12 Ağu 2026",
    commitHash: "44c9101",
    dockerImage: "registry.efesoft.com.tr/efe-erp:v3.9.4",
    deployStatus: "deployed_100",
    deployStatusLabel: "Stabil Arşiv Sürümü",
    rolloutProgress: 100,
    activeTenantsCount: 84,
    author: "Caner Kurt",
    authorRole: "Kıdemli ERP Mimarı",
    summary: "Önceki nesil dedicated sunucularda çalışan kurumlar için güvenlik yamaları ve banka MT940 ekstre entegrasyonu.",
    breakingChangesCount: 0,
    items: [
      {
        id: "c25",
        category: "feature",
        categoryLabel: "Entegrasyon",
        text: "Garanti BBVA, Akbank ve İş Bankası MT940 hesap hareketleri otomatik cari hesap eşleme kuralları.",
        impactScore: "medium",
      },
      {
        id: "c26",
        category: "fix",
        categoryLabel: "Hata Çözümü",
        text: "KDV 2 beyannamesi XML dökümünde vergi dairesi kod formatlama uyuşmazlığı giderildi.",
        impactScore: "low",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT: RELEASES & CHANGELOG MANAGEMENT                           */
/* -------------------------------------------------------------------------- */

export default function AdminReleasesPage() {
  const [releases, setReleases] = useState<ReleaseRecord[]>(INITIAL_RELEASES);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ReleaseProduct>("all");
  const [selectedChannel, setSelectedChannel] = useState<"all" | ReleaseChannel>("all");
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline");

  // Interaction States
  const [expandedReleaseId, setExpandedReleaseId] = useState<string | null>("REL-4200");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isScanningRegistry, setIsScanningRegistry] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Modals
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [newVersion, setNewVersion] = useState("v4.2.1");
  const [newTitle, setNewTitle] = useState("");
  const [newProduct, setNewProduct] = useState<ReleaseProduct>("erp");
  const [newChannel, setNewChannel] = useState<ReleaseChannel>("stable");
  const [newSummary, setNewSummary] = useState("");
  const [newNotesText, setNewNotesText] = useState("");

  const [showRolloutModal, setShowRolloutModal] = useState<ReleaseRecord | null>(null);
  const [rolloutPercentage, setRolloutPercentage] = useState(100);
  const [isUpdatingRollout, setIsUpdatingRollout] = useState(false);

  const [showRollbackModal, setShowRollbackModal] = useState<ReleaseRecord | null>(null);
  const [rollbackConfirmation, setRollbackConfirmation] = useState("");
  const [isRollingBack, setIsRollingBack] = useState(false);

  const [showExportModal, setShowExportModal] = useState<ReleaseRecord | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);

  // ---------------------------------------------------------------------------
  // FILTERING LOGIC
  // ---------------------------------------------------------------------------
  const filteredReleases = useMemo(() => {
    return releases.filter((r) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          r.version.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.commitHash.toLowerCase().includes(q) ||
          r.dockerImage.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.items.some((i) => i.text.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Product
      if (selectedProduct !== "all" && r.product !== selectedProduct) {
        return false;
      }

      // Channel
      if (selectedChannel !== "all" && r.channel !== selectedChannel) {
        return false;
      }

      return true;
    });
  }, [releases, searchQuery, selectedProduct, selectedChannel]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Registry scanning test
  const handleScanRegistry = () => {
    setIsScanningRegistry(true);
    setTimeout(() => {
      setIsScanningRegistry(false);
      setGlobalToast("Docker Registry & GitHub CI/CD senkronize edildi. Tüm konteyner tag'leri ve digest'ler güncel (0 anomali) ✓");
      setTimeout(() => setGlobalToast(null), 4500);
    }, 900);
  };

  // Publish new release handler
  const handlePublishRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersion.trim() || !newTitle.trim()) return;

    setIsPublishing(true);
    setTimeout(() => {
      const randomCommit = Math.random().toString(16).substring(2, 9);
      const generatedItems: ChangelogItem[] = newNotesText
        .split("\n")
        .filter((l) => l.trim().length > 0)
        .map((line, idx) => ({
          id: `new-${idx}`,
          category: line.startsWith("fix:") ? "fix" : line.startsWith("sec:") ? "security" : line.startsWith("imp:") ? "improvement" : "feature",
          categoryLabel: line.startsWith("fix:") ? "Hata Çözümü" : line.startsWith("sec:") ? "Güvenlik" : line.startsWith("imp:") ? "İyileştirme" : "Yeni Özellik",
          text: line.replace(/^(fix:|sec:|imp:|feat:)\s*/i, ""),
          impactScore: "medium",
        }));

      if (generatedItems.length === 0) {
        generatedItems.push({
          id: "default-1",
          category: "feature",
          categoryLabel: "Yeni Özellik",
          text: newTitle,
          impactScore: "high",
        });
      }

      const newRecord: ReleaseRecord = {
        id: `REL-${Math.floor(4300 + Math.random() * 900)}`,
        version: newVersion.startsWith("v") ? newVersion : `v${newVersion}`,
        title: newTitle,
        product: newProduct,
        productName:
          newProduct === "erp"
            ? "EfeERP Kurumsal Kaynak Planlama"
            : newProduct === "crm"
            ? "EfeCRM Akıllı Müşteri & Satış"
            : newProduct === "pos"
            ? "EfePOS Yeni Nesil Kasa & Perakende"
            : newProduct === "ai"
            ? "EfeAI Kurumsal Karar Destek"
            : "EfeOS Kernel & Güvenlik Çekirdeği",
        productTheme:
          newProduct === "erp"
            ? "#0071e3"
            : newProduct === "crm"
            ? "#8b5cf6"
            : newProduct === "pos"
            ? "#10b981"
            : newProduct === "ai"
            ? "#f59e0b"
            : "#0284c7",
        channel: newChannel,
        channelLabel:
          newChannel === "lts"
            ? "Long Term Support (LTS)"
            : newChannel === "stable"
            ? "Kararlı Sürüm (Stable)"
            : newChannel === "hotfix"
            ? "Kritik Hotfix Yaması"
            : "Canary / Beta Release",
        releaseDate: "Az önce",
        commitHash: randomCommit,
        dockerImage: `registry.efesoft.com.tr/efe-${newProduct}:${newVersion}`,
        deployStatus: newChannel === "canary" ? "canary_40" : "deployed_100",
        deployStatusLabel: newChannel === "canary" ? "Canary Dağıtımda (%40)" : "Canlı Üretimde (%100)",
        rolloutProgress: newChannel === "canary" ? 40 : 100,
        activeTenantsCount: 1,
        author: "Emirhan Demir",
        authorRole: "Kurucu & Baş Mimar",
        summary: newSummary || "Yeni sürüm paketi dağıtım hattına alındı ve imzalama tamamlandı.",
        breakingChangesCount: 0,
        items: generatedItems,
      };

      setReleases([newRecord, ...releases]);
      setIsPublishing(false);
      setShowPublishModal(false);
      setExpandedReleaseId(newRecord.id);

      // Reset
      setNewTitle("");
      setNewSummary("");
      setNewNotesText("");

      setGlobalToast(`🚀 Yeni sürüm (${newRecord.version}) başarıyla oluşturuldu ve registry'e pushlandı!`);
      setTimeout(() => setGlobalToast(null), 5000);
    }, 1000);
  };

  // Rollout progress update handler
  const handleUpdateRollout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRolloutModal) return;

    setIsUpdatingRollout(true);
    setTimeout(() => {
      setReleases((prev) =>
        prev.map((r) =>
          r.id === showRolloutModal.id
            ? {
                ...r,
                rolloutProgress: rolloutPercentage,
                deployStatus: rolloutPercentage === 100 ? "deployed_100" : "canary_85",
                deployStatusLabel: rolloutPercentage === 100 ? "Canlı Üretimde (%100)" : `Canary Dağıtımda (%${rolloutPercentage})`,
              }
            : r
        )
      );

      setIsUpdatingRollout(false);
      setShowRolloutModal(null);
      setGlobalToast(`${showRolloutModal.version} sürümünün canlı dağıtım oranı %${rolloutPercentage} olarak güncellendi ✓`);
      setTimeout(() => setGlobalToast(null), 4000);
    }, 800);
  };

  // Rollback handler
  const handleConfirmRollback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRollbackModal) return;
    if (rollbackConfirmation.trim().toUpperCase() !== "GERI-AL") {
      alert("Lütfen onay kutusuna 'GERI-AL' yazın.");
      return;
    }

    setIsRollingBack(true);
    setTimeout(() => {
      setReleases((prev) =>
        prev.map((r) =>
          r.id === showRollbackModal.id
            ? {
                ...r,
                deployStatus: "deprecated",
                deployStatusLabel: "Geri Alındı (Rollback)",
                rolloutProgress: 0,
              }
            : r
        )
      );

      setIsRollingBack(false);
      setShowRollbackModal(null);
      setRollbackConfirmation("");
      setGlobalToast(`⚠️ ${showRollbackModal.version} sürümü başarıyla önceki kararlı LTS tag'ine geri alındı (0 kesinti).`);
      setTimeout(() => setGlobalToast(null), 5000);
    }, 1200);
  };

  return (
    <div className="adm-content adm-tab-transition">
      {/* -------------------------------------------------------------------- */}
      {/*  HEADER & HERO ACTION BAR                                            */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-header">
        <div className="adm-header__title-group">
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
              EfeOS Release Pipeline v4.2
            </span>
            <span style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>·</span>
            <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)", fontWeight: 500 }}>
              Canlı Üretim &amp; Dağıtım Takipçisi
            </span>
          </div>

          <h1 className="adm-header__title">Sürümler &amp; Changelog Yönetimi</h1>
          <p className="adm-header__subtitle">
            Efesoft tescilli kurumsal ürünlerinin (EfeOS, EfeERP, EfeCRM, EfePOS, EfeAI) sürüm geçmişi, semantic versiyonlama takvimi ve yayın notları.
          </p>
        </div>

        <div className="adm-header__controls">
          <button
            type="button"
            className="adm-topbar__btn"
            onClick={handleScanRegistry}
            disabled={isScanningRegistry}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            title="Docker registry ve GitHub CI/CD boru hattındaki sürüm tag'lerini kontrol eder"
          >
            <RefreshCw size={13} className={isScanningRegistry ? "spin-animate" : ""} />
            <span>{isScanningRegistry ? "Registry Taranıyor..." : "Registry & CI/CD Tara"}</span>
          </button>

          <button
            type="button"
            className="adm-topbar__btn adm-topbar__btn--primary"
            onClick={() => setShowPublishModal(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={13} />
            <span>+ Yeni Sürüm &amp; Not Yayınla</span>
          </button>
        </div>
      </div>

      {/* Global Toast */}
      {globalToast && (
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
          <span>{globalToast}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/*  KPI METRIC CARDS                                                    */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-kpi-grid">
        {/* KPI 1 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Canlı Üretim Sürümü (Prod)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(22, 163, 74, 0.1)", color: "#16a34a" }}>
              <CheckCircle2 size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">v4.2.0 LTS</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>%100 Kararlı</span> · Son Dağıtım: 2 Gün Önce
          </div>
        </div>

        {/* KPI 2 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Toplam Yayınlanan Sürüm</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <GitBranch size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">38 Sürüm</div>
          <div className="adm-kpi-card__sub">
            4 LTS · 18 Minor · 16 Hotfix Yaması
          </div>
        </div>

        {/* KPI 3 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Aktif Kademeli Dağıtım</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
              <Activity size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%85 Canary</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#8b5cf6", fontWeight: 600 }}>Frankfurt &amp; İzmir</span> DC Devrede
          </div>
        </div>

        {/* KPI 4 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Ortalama Yama Süresi (MTTR)</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
              <Zap size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">14.2 Dakika</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>Sıfır Kesinti</span> · Canlı Rollback Korumalı
          </div>
        </div>

        {/* KPI 5 */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Geriye Dönük API Uyumluluğu</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
              <ShieldCheck size={13} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%100 Uyumlu</div>
          <div className="adm-kpi-card__sub">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>0 Kritik</span> Kırıcı Değişiklik
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "1 1 340px", flexWrap: "wrap" }}>
          {/* Search Box */}
          <div className="adm-search" style={{ width: "280px" }}>
            <Search size={13} className="adm-search__icon" />
            <input
              type="text"
              placeholder="Sürüm no (v4.2.0), commit veya özellik ara..."
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

          {/* Product Filter Segment */}
          <div className="adm-seg">
            {[
              { id: "all", label: "Tüm Ürünler" },
              { id: "erp", label: "EfeERP" },
              { id: "crm", label: "EfeCRM" },
              { id: "pos", label: "EfePOS" },
              { id: "ai", label: "EfeAI" },
              { id: "kernel", label: "EfeOS Kernel" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`adm-seg__btn ${selectedProduct === tab.id ? "adm-seg__btn--active" : ""}`}
                onClick={() => setSelectedProduct(tab.id as ReleaseProduct)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Channel Dropdown Filter */}
          <select
            className="adm-input"
            style={{ width: "175px", height: "30px", fontSize: "12px", padding: "0 10px" }}
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value as typeof selectedChannel)}
          >
            <option value="all">Tüm Kanallar ({releases.length})</option>
            <option value="lts">🛡️ Long Term Support (LTS)</option>
            <option value="stable">🟢 Kararlı Sürümler</option>
            <option value="canary">🟣 Canary / Beta</option>
            <option value="hotfix">🔴 Hotfix Yamaları</option>
          </select>
        </div>

        {/* View Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="adm-seg">
            <button
              type="button"
              className={`adm-seg__btn ${viewMode === "timeline" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("timeline")}
            >
              Timeline &amp; Detay
            </button>
            <button
              type="button"
              className={`adm-seg__btn ${viewMode === "table" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              Kompakt Tablo
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*  VIEW MODE 1: TIMELINE & DETAILED RELEASES (ACCORDION TABLE)         */}
      {/* -------------------------------------------------------------------- */}
      <div className="adm-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="adm-table-wrap">
          <table className="adm-table" style={{ width: "100%", minWidth: "1120px" }}>
            <thead>
              <tr>
                <th style={{ width: "36px", textAlign: "center" }}></th>
                <th style={{ width: "140px", whiteSpace: "nowrap" }}>Sürüm (Tag)</th>
                <th style={{ width: "240px", whiteSpace: "nowrap" }}>Yayın Başlığı &amp; Kapsam</th>
                <th style={{ width: "160px", whiteSpace: "nowrap" }}>İlgili Ürün</th>
                <th style={{ width: "130px", whiteSpace: "nowrap" }}>Kanal</th>
                <th style={{ width: "150px", whiteSpace: "nowrap" }}>Dağıtım Durumu</th>
                <th style={{ width: "110px", whiteSpace: "nowrap" }}>Tarih</th>
                <th style={{ width: "90px", whiteSpace: "nowrap" }}>Commit</th>
                <th style={{ width: "150px", textAlign: "right", whiteSpace: "nowrap" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody key={`${selectedProduct}-${selectedChannel}`} className="adm-data-switch">
              {filteredReleases.map((rel) => {
                const isExpanded = expandedReleaseId === rel.id;

                return (
                  <Fragment key={rel.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                        cursor: "pointer",
                      }}
                      onClick={() => setExpandedReleaseId(isExpanded ? null : rel.id)}
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
                          title={isExpanded ? "Detayları Kapat" : "Changelog Detaylarını İncele"}
                        >
                          <ChevronDown size={14} />
                        </button>
                      </td>

                      {/* Version Tag */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontWeight: 700,
                              fontSize: "12.5px",
                              color: "var(--adm-text)",
                              background: "var(--adm-surface-2)",
                              border: "1px solid var(--adm-border)",
                              padding: "2px 8px",
                              borderRadius: "6px",
                            }}
                          >
                            {rel.version}
                          </span>
                          {rel.channel === "lts" && (
                            <span
                              className="adm-badge adm-badge--blue"
                              style={{ fontSize: "10px", padding: "1px 5px" }}
                            >
                              LTS
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title & Summary Snippet */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: 600, color: "var(--adm-text)", fontSize: "12.5px", whiteSpace: "nowrap" }}>
                          {rel.title}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                          <span>{rel.items.length} Değişiklik Maddesi</span>
                          <span>·</span>
                          <span>{rel.author}</span>
                        </div>
                      </td>

                      {/* Product */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background: rel.productTheme,
                            }}
                          />
                          <span style={{ fontWeight: 500, color: "var(--adm-text)", fontSize: "12px" }}>
                            {rel.product === "erp"
                              ? "EfeERP"
                              : rel.product === "crm"
                              ? "EfeCRM"
                              : rel.product === "pos"
                              ? "EfePOS"
                              : rel.product === "ai"
                              ? "EfeAI"
                              : "EfeOS Kernel"}
                          </span>
                        </div>
                      </td>

                      {/* Channel Badge */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <span
                          className="adm-badge"
                          style={{
                            fontSize: "10.5px",
                            background:
                              rel.channel === "lts"
                                ? "rgba(0, 113, 227, 0.08)"
                                : rel.channel === "stable"
                                ? "rgba(22, 163, 74, 0.08)"
                                : rel.channel === "hotfix"
                                ? "rgba(239, 68, 68, 0.08)"
                                : "rgba(139, 92, 246, 0.08)",
                            color:
                              rel.channel === "lts"
                                ? "#0071e3"
                                : rel.channel === "stable"
                                ? "#16a34a"
                                : rel.channel === "hotfix"
                                ? "#ef4444"
                                : "#7c3aed",
                          }}
                        >
                          {rel.channelLabel}
                        </span>
                      </td>

                      {/* Deploy Status & Progress */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background:
                                rel.deployStatus === "deployed_100"
                                  ? "#16a34a"
                                  : rel.deployStatus === "canary_40" || rel.deployStatus === "canary_85"
                                  ? "#8b5cf6"
                                  : "#64748b",
                            }}
                          />
                          <span style={{ fontWeight: 600, fontSize: "11.5px", color: "var(--adm-text)" }}>
                            {rel.deployStatusLabel}
                          </span>
                        </div>
                        {rel.rolloutProgress < 100 && (
                          <div
                            style={{
                              width: "100px",
                              height: "4px",
                              background: "rgba(0,0,0,0.06)",
                              borderRadius: "2px",
                              overflow: "hidden",
                              marginTop: "4px",
                            }}
                          >
                            <div
                              style={{
                                width: `${rel.rolloutProgress}%`,
                                height: "100%",
                                background: "#8b5cf6",
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Release Date */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: "11.5px", color: "var(--adm-text-secondary)" }}>
                          {rel.releaseDate}
                        </span>
                      </td>

                      {/* Git Commit Hash */}
                      <td style={{ whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#0284c7",
                            background: "rgba(2, 132, 199, 0.06)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {rel.commitHash}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right", whiteSpace: "nowrap" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "6px", whiteSpace: "nowrap" }}>
                          {/* Rollout Button */}
                          <button
                            type="button"
                            className="adm-topbar__btn"
                            style={{ height: "26px", padding: "0 8px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            onClick={() => {
                              setShowRolloutModal(rel);
                              setRolloutPercentage(rel.rolloutProgress);
                            }}
                            title="Canary / kademeli dağıtım oranını güncelle"
                          >
                            <SlidersHorizontal size={11} />
                            <span>Dağıtım</span>
                          </button>

                          {/* Share / Export Changelog */}
                          <button
                            type="button"
                            className="adm-topbar__btn"
                            style={{ width: "26px", height: "26px", padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            onClick={() => setShowExportModal(rel)}
                            title="Yayın notlarını kopyala veya duyuru olarak paylaş"
                          >
                            <Share2 size={11} />
                          </button>

                          {/* Rollback Button */}
                          <button
                            type="button"
                            className="adm-topbar__btn"
                            style={{ width: "26px", height: "26px", padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#dc2626" }}
                            onClick={() => setShowRollbackModal(rel)}
                            title="Acil canlı geri alma (Emergency Rollback)"
                          >
                            <RotateCcw size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* ------------------------------------------------------------ */}
                    {/*  SMOOTH EXPANDABLE CHANGELOG DRAWER                          */}
                    {/* ------------------------------------------------------------ */}
                    <tr className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}>
                      <td colSpan={9} className="adm-expand-cell">
                        <div className="adm-expand-grid">
                          <div className="adm-expand-inner">
                            <div className="adm-expand-body">
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1.6fr 1fr",
                                  gap: "16px",
                                  background: "#ffffff",
                                  padding: "16px 18px",
                                  borderRadius: "10px",
                                  border: "1px solid var(--adm-border)",
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                                  borderLeft: `3px solid ${rel.productTheme}`,
                                }}
                              >
                                {/* Left Column: Detailed Changelog Items */}
                                <div>
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: 700,
                                      color: "var(--adm-text-secondary)",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.04em",
                                      marginBottom: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span>Yayınlanan Değişiklik Maddeleri ({rel.items.length})</span>
                                    <span style={{ fontSize: "10.5px", textTransform: "none", color: "var(--adm-text-muted)" }}>
                                      {rel.author} ({rel.authorRole})
                                    </span>
                                  </div>

                                  <div style={{ display: "grid", gap: "8px" }}>
                                    {rel.items.map((item) => (
                                      <div
                                        key={item.id}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "8px",
                                          background: "var(--adm-surface-2)",
                                          padding: "8px 10px",
                                          borderRadius: "6px",
                                          border: "1px solid var(--adm-border-subtle)",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            flexShrink: 0,
                                            background:
                                              item.category === "feature"
                                                ? "rgba(0, 113, 227, 0.1)"
                                                : item.category === "fix"
                                                ? "rgba(245, 158, 11, 0.1)"
                                                : item.category === "security"
                                                ? "rgba(16, 185, 129, 0.1)"
                                                : item.category === "improvement"
                                                ? "rgba(139, 92, 246, 0.1)"
                                                : "rgba(239, 68, 68, 0.1)",
                                            color:
                                              item.category === "feature"
                                                ? "#0071e3"
                                                : item.category === "fix"
                                                ? "#b45309"
                                                : item.category === "security"
                                                ? "#166534"
                                                : item.category === "improvement"
                                                ? "#7c3aed"
                                                : "#dc2626",
                                          }}
                                        >
                                          {item.categoryLabel}
                                        </span>
                                        <span style={{ color: "var(--adm-text)", lineHeight: 1.4 }}>
                                          {item.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Column: Artifacts, Docker & Quick Actions */}
                                <div>
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: 700,
                                      color: "var(--adm-text-secondary)",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.04em",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Konteyner İmajı &amp; Dağıtım Bilgileri
                                  </div>

                                  <div style={{ display: "grid", gap: "8px", fontSize: "11.5px" }}>
                                    <div>
                                      <span style={{ color: "var(--adm-text-secondary)" }}>Docker Registry URI:</span>
                                      <div
                                        style={{
                                          fontFamily: "var(--font-mono)",
                                          fontSize: "11px",
                                          background: "var(--adm-surface-2)",
                                          padding: "6px 8px",
                                          borderRadius: "6px",
                                          border: "1px solid var(--adm-border)",
                                          marginTop: "3px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{rel.dockerImage}</span>
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(`docker pull ${rel.dockerImage}`, `docker-${rel.id}`)}
                                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--adm-text-secondary)" }}
                                          title="Komutu Kopyala"
                                        >
                                          {copiedKey === `docker-${rel.id}` ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                                        </button>
                                      </div>
                                    </div>

                                    <div>
                                      <span style={{ color: "var(--adm-text-secondary)" }}>Git Commit SHA:</span>
                                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
                                        {rel.commitHash} (main branch)
                                      </div>
                                    </div>

                                    <div>
                                      <span style={{ color: "var(--adm-text-secondary)" }}>Aktif Lisanslı Tenant:</span>
                                      <div style={{ fontWeight: 600, color: "var(--adm-text)", marginTop: "2px" }}>
                                        {rel.activeTenantsCount} Şirket Kümesi
                                      </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                                      <button
                                        type="button"
                                        className="adm-topbar__btn adm-topbar__btn--primary"
                                        style={{ height: "26px", fontSize: "11px" }}
                                        onClick={() => setShowExportModal(rel)}
                                      >
                                        Duyuruyu Kopyala ↗
                                      </button>
                                      <button
                                        type="button"
                                        className="adm-topbar__btn"
                                        style={{ height: "26px", fontSize: "11px" }}
                                        onClick={() => {
                                          setShowRolloutModal(rel);
                                          setRolloutPercentage(rel.rolloutProgress);
                                        }}
                                      >
                                        Rollout Ayarla
                                      </button>
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

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 1: PUBLISH NEW RELEASE & CHANGELOG                            */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        maxWidth="560px"
      >
        <form onSubmit={handlePublishRelease}>
          <div className="adm-modal-head">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={16} color="var(--adm-primary)" />
              <span className="adm-modal-title">Yeni Sürüm &amp; Changelog Yayınla</span>
            </div>
            <button
              type="button"
              className="adm-modal-close"
              onClick={() => setShowPublishModal(false)}
              aria-label="Kapat"
            >
              <X size={15} />
            </button>
          </div>

          <div className="adm-modal-body" style={{ display: "grid", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
              <div className="adm-form-group">
                <label className="adm-label">
                  Sürüm Numarası (SemVer) <span className="adm-label-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Örn: v4.2.1 veya v4.3.0"
                  className="adm-input"
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Dağıtım Kanalı</label>
                <select
                  className="adm-input"
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as ReleaseChannel)}
                >
                  <option value="stable">Kararlı Sürüm (Stable)</option>
                  <option value="lts">Long Term Support (LTS)</option>
                  <option value="canary">Canary / Kademeli Beta</option>
                  <option value="hotfix">Kritik Hotfix Yaması</option>
                </select>
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">İlgili Ürün</label>
              <select
                className="adm-input"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value as ReleaseProduct)}
              >
                <option value="erp">EfeERP Kurumsal Kaynak Planlama</option>
                <option value="crm">EfeCRM Akıllı Müşteri &amp; Satış</option>
                <option value="pos">EfePOS Yeni Nesil Kasa &amp; Perakende</option>
                <option value="ai">EfeAI Kurumsal Karar Destek</option>
                <option value="kernel">EfeOS Kernel &amp; Güvenlik Çekirdeği</option>
              </select>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">
                Yayın Başlığı <span className="adm-label-required">*</span>
              </label>
              <input
                type="text"
                placeholder="Örn: PostgreSQL 17 Desteği & e-İrsaliye Hızlandırması"
                className="adm-input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Kısa Özet &amp; Açıklama</label>
              <input
                type="text"
                placeholder="Bu sürümün çözdüğü temel problemler ve öne çıkan yenilikler..."
                className="adm-input"
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">
                Değişiklik Maddeleri (Her satıra bir madde yazın)
              </label>
              <textarea
                className="adm-input"
                placeholder={`feat: Yeni WMS barkodlu sayım sihirbazı eklendi\nimp: Stok sorgulama sorguları %30 hızlandırıldı\nfix: e-Fatura iptal onay kuyruğu düzeltildi\nsec: JWT token şifrelemesi güçlendirildi`}
                value={newNotesText}
                onChange={(e) => setNewNotesText(e.target.value)}
                rows={4}
              />
              <span style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                İpucu: Satır başına <code>feat:</code>, <code>fix:</code>, <code>imp:</code>, <code>sec:</code> ön ekleri koyabilirsiniz.
              </span>
            </div>
          </div>

          <div className="adm-modal-foot">
            <button
              type="button"
              className="adm-topbar__btn"
              onClick={() => setShowPublishModal(false)}
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="adm-topbar__btn adm-topbar__btn--primary"
              disabled={isPublishing}
            >
              {isPublishing ? "Yayınlanıyor & Pushlanıyor..." : "Sürümü Canlıya Al"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 2: ROLLOUT CONFIGURATION                                      */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showRolloutModal}
        onClose={() => setShowRolloutModal(null)}
        maxWidth="480px"
      >
        {showRolloutModal && (
          <form onSubmit={handleUpdateRollout}>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <SlidersHorizontal size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">Kademeli Dağıtım (Rollout) Ayarla</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowRolloutModal(null)}
                aria-label="Kapat"
              >
                <X size={15} />
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
                  {showRolloutModal.version} — {showRolloutModal.title}
                </div>
                <div style={{ color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                  Mevcut Durum: {showRolloutModal.deployStatusLabel}
                </div>
              </div>

              <div className="adm-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label className="adm-label">Trafik Yönlendirme Oranı</label>
                  <span style={{ fontWeight: 700, color: "var(--adm-primary)", fontFamily: "var(--font-mono)" }}>
                    %{rolloutPercentage}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={rolloutPercentage}
                  onChange={(e) => setRolloutPercentage(parseInt(e.target.value, 10))}
                  style={{ width: "100%", accentColor: "var(--adm-primary)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--adm-text-secondary)", marginTop: "4px" }}>
                  <span>%10 Canary</span>
                  <span>%50 Beta Kümeleri</span>
                  <span>%100 Tam Prodüksiyon</span>
                </div>
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
                🛡️ Dağıtım esnasında 5xx hata oranı %0.1&apos;in üzerine çıkarsa sistem otomatik olarak önceki stabil sürüme geri döner.
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowRolloutModal(null)}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="adm-topbar__btn adm-topbar__btn--primary"
                disabled={isUpdatingRollout}
              >
                {isUpdatingRollout ? "Güncelleniyor..." : "Oranı Uygula"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 3: EMERGENCY ROLLBACK                                         */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showRollbackModal}
        onClose={() => setShowRollbackModal(null)}
        maxWidth="460px"
      >
        {showRollbackModal && (
          <form onSubmit={handleConfirmRollback}>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RotateCcw size={16} color="#dc2626" />
                <span className="adm-modal-title" style={{ color: "#dc2626" }}>
                  Acil Canlı Geri Alma (Rollback)
                </span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowRollbackModal(null)}
                aria-label="Kapat"
              >
                <X size={15} />
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "14px" }}>
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#991b1b",
                  lineHeight: 1.45,
                }}
              >
                <strong>Dikkat:</strong> <strong>{showRollbackModal.version}</strong> sürümü üretim hattından çekilecek ve tüm aktif tenantlar otomatik olarak önceki kararlı LTS tag&apos;ine aktarılacaktır.
              </div>

              <div className="adm-form-group">
                <label className="adm-label">
                  Onaylamak için <strong>GERI-AL</strong> yazın:
                </label>
                <input
                  type="text"
                  placeholder="GERI-AL"
                  className="adm-input"
                  value={rollbackConfirmation}
                  onChange={(e) => setRollbackConfirmation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => setShowRollbackModal(null)}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="adm-topbar__btn"
                style={{ background: "#dc2626", color: "#ffffff", borderColor: "#dc2626" }}
                disabled={isRollingBack || rollbackConfirmation.trim().toUpperCase() !== "GERI-AL"}
              >
                {isRollingBack ? "Geri Alınıyor..." : "Rollback'i Başlat"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* -------------------------------------------------------------------- */}
      {/*  MODAL 4: EXPORT / SHARE RELEASE NOTES                               */}
      {/* -------------------------------------------------------------------- */}
      <AdminModal
        isOpen={!!showExportModal}
        onClose={() => setShowExportModal(null)}
        maxWidth="540px"
      >
        {showExportModal && (
          <div>
            <div className="adm-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Share2 size={16} color="var(--adm-primary)" />
                <span className="adm-modal-title">Sürüm Notlarını Dışa Aktar</span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setShowExportModal(null)}
                aria-label="Kapat"
              >
                <X size={15} />
              </button>
            </div>

            <div className="adm-modal-body" style={{ display: "grid", gap: "12px" }}>
              <div style={{ fontSize: "12px", color: "var(--adm-text-secondary)" }}>
                Müşterilere veya GitHub / Slack duyuru kanallarına iletilmek üzere formatlanmış sürüm bülteni:
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
                  maxHeight: "320px",
                  overflowY: "auto",
                }}
              >
{`🚀 Efesoft ${showExportModal.productName} — ${showExportModal.version} Yayınlandı!

Tarih: ${showExportModal.releaseDate}
Kanal: ${showExportModal.channelLabel}
Commit: ${showExportModal.commitHash}

Özet:
${showExportModal.summary}

Yenilikler & Düzeltmeler:
${showExportModal.items.map((i) => `• [${i.categoryLabel}] ${i.text}`).join("\n")}

Docker İmajı:
${showExportModal.dockerImage}

Daha fazla bilgi için Efesoft Geliştirici Portalı:
https://developer.efesoft.com.tr/releases/${showExportModal.version}`}
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-topbar__btn"
                onClick={() => {
                  const text = `🚀 Efesoft ${showExportModal.productName} — ${showExportModal.version} Yayınlandı!\n\n${showExportModal.summary}\n\n${showExportModal.items.map((i) => `• [${i.categoryLabel}] ${i.text}`).join("\n")}`;
                  navigator.clipboard.writeText(text);
                  setCopiedExport(true);
                  setTimeout(() => setCopiedExport(false), 2000);
                }}
              >
                {copiedExport ? "Panoya Kopyalandı ✓" : "Metni Kopyala"}
              </button>

              <button
                type="button"
                className="adm-topbar__btn adm-topbar__btn--primary"
                onClick={() => {
                  setShowExportModal(null);
                  setGlobalToast("Sürüm notları duyuru panosuna aktarıldı ✓");
                  setTimeout(() => setGlobalToast(null), 3000);
                }}
              >
                Tamam
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
