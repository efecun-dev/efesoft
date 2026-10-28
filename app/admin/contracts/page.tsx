"use client";

import { Fragment, useState } from "react";
import {
  FileSignature,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  Send,
  Download,
  Eye,
  PhoneCall,
  Mail,
  Sparkles,
  Scale,
  CalendarClock,
  Stamp,
  Layers,
  Copy,
  Check,
} from "lucide-react";

type ContractCategory = "proposal" | "msa" | "sla" | "nda";
type ContractStatus = "awaiting_signature" | "legal_review" | "signed" | "renewal_due";

interface ContractLineItem {
  name: string;
  qty: string;
  price: string;
}

interface ContractRecord {
  id: string;
  docType: ContractCategory;
  docTypeLabel: string;
  docBadge: "info" | "purple" | "success" | "warning" | "neutral";
  version: string;
  company: string;
  industry: string;
  city: string;
  title: string;
  clientSigner: string;
  clientRole: string;
  email: string;
  phone: string;
  efesoftSigner: string;
  netAmount: number;
  netAmountFormatted: string;
  vatIncludedFormatted: string;
  paymentPlan: string;
  issueDate: string;
  expiryDate: string;
  remainingText: string;
  status: ContractStatus;
  statusLabel: string;
  signatureProgress: number;
  signatureStepsText: string;
  slaTerms: string;
  ipClause: string;
  sha256Hash: string;
  kepAddress: string;
  notes: string;
  lineItems: ContractLineItem[];
}

const INITIAL_CONTRACTS: ContractRecord[] = [
  {
    id: "CNT-2026-842",
    docType: "msa",
    docTypeLabel: "Master Yazılım Sözleşmesi",
    docBadge: "purple",
    version: "v2.4 Final",
    company: "Borusan Lojistik A.Ş.",
    industry: "Lojistik & Tedarik Zinciri",
    city: "İstanbul",
    title: "Akıllı Filo Telemetri, Rota Optimizasyonu & SAP S/4HANA Entegrasyon Sözleşmesi",
    clientSigner: "Kerem Arslan",
    clientRole: "IT Direktörü & İcra Kurulu Üyesi",
    email: "kerem.arslan@borusan.com.tr",
    phone: "+90 532 890 12 44",
    efesoftSigner: "Emirhan Demir (Baş Mimar)",
    netAmount: 2450000,
    netAmountFormatted: "₺2.450.000",
    vatIncludedFormatted: "₺2.940.000 (KDV Dahil)",
    paymentPlan: "%40 İmza Peşinatı • %30 UAT Test • %30 Go-Live",
    issueDate: "24 Ekim 2026",
    expiryDate: "24 Ekim 2028 (24 Ay)",
    remainingText: "Son İmza Bekleniyor (2/3)",
    status: "awaiting_signature",
    statusLabel: "E-İmza Bekliyor",
    signatureProgress: 75,
    signatureStepsText: "Efesoft Onayladı • Hukuk Onayladı • Müşteri E-İmzada",
    slaTerms: "%99.98 Uptime • Seviye-1 Kritik Müdahale: 15 Dakika (7/24 Dedicated SRE)",
    ipClause: "Özel geliştirilen lojistik algoritmaları müşteriye devredilir; EfeOS çekirdek kütüphanesi süresiz lisanslanır.",
    sha256Hash: "9f84b2c71a04e981d32c8b07f4a66e41c",
    kepAddress: "borusanlojistik@hs01.kep.tr",
    notes:
      "SAP S/4HANA RFC köprüsü ve 1.450 tır/çekici için gerçek zamanlı telemetri modüllerini kapsayan ana proje sözleşmesi. Hukuk müşavirliği son parafı tamamlandı.",
    lineItems: [
      { name: "EfeOS Mikroservis Çekirdeği & SAP S/4HANA Çift Yönlü Konnektör", qty: "1 Paket", price: "₺1.150.000" },
      { name: "Gerçek Zamanlı Filo Telemetri & AI Rota Optimizasyon Motoru", qty: "1.450 Araç", price: "₺920.000" },
      { name: "Yüksek Erişilebilirlikli (HA) Kubernetes Kurulumu & 1 Yıl Kritik SLA", qty: "12 Ay", price: "₺380.000" },
    ],
  },
  {
    id: "PRP-2026-519",
    docType: "proposal",
    docTypeLabel: "Kurumsal Fiyat Teklifi",
    docBadge: "info",
    version: "v1.3 Revize",
    company: "Ege Perakende Mağazacılık A.Ş.",
    industry: "Perakende & Mağazacılık",
    city: "İzmir",
    title: "65 Mağaza EfePOS Offline-First Kasa, El Terminali & Merkez ERP Dağıtım Teklifi",
    clientSigner: "Ahmet Bulut",
    clientRole: "Genel Müdür (CEO)",
    email: "ahmet@egeperakende.com",
    phone: "+90 542 334 91 22",
    efesoftSigner: "Burak Yılmaz (Kurumsal Satış)",
    netAmount: 1640000,
    netAmountFormatted: "₺1.640.000",
    vatIncludedFormatted: "₺1.968.000 (KDV Dahil)",
    paymentPlan: "%50 Sipariş Onayı • %50 65 Mağaza Kurulum Teslimi",
    issueDate: "25 Ekim 2026",
    expiryDate: "10 Kasım 2026 (13 Gün Kaldı)",
    remainingText: "Geçerlilik: 13 Gün",
    status: "awaiting_signature",
    statusLabel: "E-İmza Bekliyor",
    signatureProgress: 65,
    signatureStepsText: "Teklif Sunuldu • %8 Kurumsal İskonto Onaylandı",
    slaTerms: "%99.95 Uptime • Mağaza Kasa Kesintisiz Offline Çalışma Garantisi",
    ipClause: "65 mağaza (toplam 195 kasa) için EfePOS Enterprise lisansı ve ÖKC GMP-3 donanım sürücü lisansı.",
    sha256Hash: "3c41e8a92b70f114a90d2e84b11c77a20",
    kepAddress: "egeperakende@hs03.kep.tr",
    notes:
      "Yönetim kurulu toplantısında çoklu mağaza iskonto oranı %8 olarak revize edildi. İzmir merkez ofiste ıslak/elektronik imza için randevu oluşturuldu.",
    lineItems: [
      { name: "EfePOS Enterprise Offline-First Mağaza Lisansı (195 Kasa Terminali)", qty: "65 Mağaza", price: "₺980.000" },
      { name: "Ingenico / Beko ÖKC GMP-3 & Terazi Donanım Entegrasyon Paketi", qty: "65 Mağaza", price: "₺390.000" },
      { name: "Saha Kurulum, Kasiyer Eğitimi & Veri Göçü Hizmeti", qty: "1 Paket", price: "₺270.000" },
    ],
  },
  {
    id: "CNT-2026-839",
    docType: "msa",
    docTypeLabel: "Master Yazılım Sözleşmesi",
    docBadge: "purple",
    version: "v2.0 Hukuk",
    company: "Akdeniz Finans Faktoring A.Ş.",
    industry: "Finans & Faktoring",
    city: "İstanbul",
    title: "BDDK Uyumlu Açık Bankacılık, AI Kredi Skorlama & Otomatik Temlik Platformu",
    clientSigner: "Hakan Çelik",
    clientRole: "CIO / Bilgi Teknolojileri GMY",
    email: "h.celik@akdenizfinans.com.tr",
    phone: "+90 532 710 44 19",
    efesoftSigner: "Emirhan Demir (Baş Mimar)",
    netAmount: 3200000,
    netAmountFormatted: "₺3.200.000",
    vatIncludedFormatted: "₺3.840.000 (KDV Dahil)",
    paymentPlan: "4 Eşit Sprint Hak Edişi (%25 x 4 Faz)",
    issueDate: "19 Ekim 2026",
    expiryDate: "19 Ekim 2029 (36 Ay)",
    remainingText: "BDDK Uyum İncelemesinde",
    status: "legal_review",
    statusLabel: "Hukuk & Revizyon",
    signatureProgress: 45,
    signatureStepsText: "Teknik Ek-1 Onaylandı • BDDK Bilgi Güvenliği Maddesi İnceleniyor",
    slaTerms: "%99.99 Tier-4 Finansal SLA • Sızma Testi (Pentest) & HSM İmza Garantili",
    ipClause: "Kaynak kodları (Source Code Escrow) banka lehine emanet hesabında tutulur; tüm finansal modeller kuruma aittir.",
    sha256Hash: "7a19d0f44e82c310b65e91f20c44d819b",
    kepAddress: "akdenizfaktoring@hs02.kep.tr",
    notes:
      "BDDK bağımsız denetim kriterleri kapsamında Ek-3 Veri Lokalizasyonu ve Felaket Kurtarma (DRP < 5 dk RTO) maddeleri müşteri hukuk departmanıyla son haline getiriliyor.",
    lineItems: [
      { name: "AI Kredi Karar Motoru & KKB / Findeks / Мерnis Sorgu Orkestrasyonu", qty: "1 Sistem", price: "₺1.650.000" },
      { name: "14 Banka Gerçek Zamanlı Açık Bankacılık & DBS Mutabakat Modülü", qty: "14 Banka", price: "₺1.050.000" },
      { name: "Air-Gapped On-Premise Kurulum, HSM Entegrasyonu & Pentest Sertifikasyonu", qty: "1 Paket", price: "₺500.000" },
    ],
  },
  {
    id: "SLA-2026-304",
    docType: "sla",
    docTypeLabel: "Yıllık SLA & Lisans",
    docBadge: "success",
    version: "v3.1 Aktif",
    company: "Atlas Holding A.Ş.",
    industry: "Holding & Çoklu İştirak",
    city: "İstanbul",
    title: "280 Kurumsal Kullanıcı EfeERP Multi-Tenant Bulut Lisansı & 7/24 Gold SLA Anlaşması",
    clientSigner: "Selin Yalçın",
    clientRole: "Grup Satın Alma Direktörü",
    email: "selin@atlasholding.com",
    phone: "+90 533 112 40 80",
    efesoftSigner: "Emirhan Demir (Baş Mimar)",
    netAmount: 1960000,
    netAmountFormatted: "₺1.960.000",
    vatIncludedFormatted: "₺2.352.000 (KDV Dahil)",
    paymentPlan: "Yıllık Peşin Lisanslama (12 Ay Garantili)",
    issueDate: "15 Kasım 2025",
    expiryDate: "15 Kasım 2026 (18 Gün Kaldı)",
    remainingText: "Yenilemeye 18 Gün",
    status: "renewal_due",
    statusLabel: "Yenileme Yaklaşıyor",
    signatureProgress: 100,
    signatureStepsText: "2025-2026 Dönemi Aktif • 2027 Yenileme Zeyilnamesi Hazır",
    slaTerms: "%99.98 Uptime • İzmir & Frankfurt Çift Aktif Veri Merkezi • 15 dk Müdahale",
    ipClause: "8 grup şirketi ve 280 eşzamanlı kurumsal kullanıcı için EfeERP Enterprise + BI Konsolidasyon lisansı.",
    sha256Hash: "5e92c1b08f33a741d60e29c48a11f032e",
    kepAddress: "atlasholding@hs01.kep.tr",
    notes:
      "Mevcut yıllık lisans sözleşmesi 15 Kasım 2026'da doluyor. Yeni dönemde +50 ek kullanıcı talebiyle birlikte 330 kullanıcılık 2027 yenileme teklifi hazırlandı.",
    lineItems: [
      { name: "EfeERP Enterprise Bulut Lisansı (280 Kurumsal Kullanıcı + 8 İştirak)", qty: "12 Ay", price: "₺1.420.000" },
      { name: "Holding Finansal Konsolidasyon & UFRS Raporlama Paketi", qty: "12 Ay", price: "₺320.000" },
      { name: "7/24 Gold SLA, Dedicated Müşteri Başarı Yöneticisi & Günlük Yedekleme", qty: "12 Ay", price: "₺220.000" },
    ],
  },
  {
    id: "PRP-2026-515",
    docType: "proposal",
    docTypeLabel: "Kurumsal Fiyat Teklifi",
    docBadge: "info",
    version: "v1.1 Sunuldu",
    company: "Medikal Park Sağlık Grubu",
    industry: "Sağlık & Hastane Zinciri",
    city: "Ankara",
    title: "Tele-Tıp Görüntülü Muayene, e-Nabız & HBYS Mobil Hasta Takip Platformu Teklifi",
    clientSigner: "Dr. Zeynep Koç",
    clientRole: "Medikal Dijitalleşme Direktörü",
    email: "zeynep.koc@medikalpark.com",
    phone: "+90 530 678 99 10",
    efesoftSigner: "Zeynep Kaya (Mobil & AI Mimarı)",
    netAmount: 1180000,
    netAmountFormatted: "₺1.180.000",
    vatIncludedFormatted: "₺1.416.000 (KDV Dahil)",
    paymentPlan: "%40 Başlangıç • %30 iOS/Android Beta • %30 HBYS Canlı",
    issueDate: "22 Ekim 2026",
    expiryDate: "15 Kasım 2026 (18 Gün Kaldı)",
    remainingText: "Geçerlilik: 18 Gün",
    status: "awaiting_signature",
    statusLabel: "E-İmza Bekliyor",
    signatureProgress: 60,
    signatureStepsText: "PoC Demosu Onaylandı • Satın Alma Komitesi İmzasında",
    slaTerms: "%99.95 Uptime • Sağlık Bakanlığı e-Nabız & KVKK Özel Nitelikli Veri Uyumlu",
    ipClause: "iOS/Android native uygulama mağaza hesapları ve hasta portalı arayüzleri hastane grubuna aittir.",
    sha256Hash: "1b74f0e83c29a651e84d09b32c77a540d",
    kepAddress: "medikalpark@hs02.kep.tr",
    notes:
      "WebRTC tabanlı uçtan uca şifreli görüntülü muayene ve laboratuvar sonuç bildirim sistemi teklifi. 29 Ekim PoC demosu sonrası e-imza tamamlanacak.",
    lineItems: [
      { name: "iOS & Android Native Hasta Takip + WebRTC Tele-Tıp Görüntülü Muayene", qty: "2 Platform", price: "₺680.000" },
      { name: "HL7 / FHIR Standartlarında HBYS & e-Nabız Entegrasyon Katmanı", qty: "1 Paket", price: "₺320.000" },
      { name: "KVKK Özel Nitelikli Sağlık Verisi Şifreleme & Yıllık Bakım", qty: "12 Ay", price: "₺180.000" },
    ],
  },
  {
    id: "CNT-2026-831",
    docType: "msa",
    docTypeLabel: "Master Yazılım Sözleşmesi",
    docBadge: "purple",
    version: "v1.0 İmzalı",
    company: "Nova Tekstil İhracat A.Ş.",
    industry: "Tekstil & Konfeksiyon",
    city: "Denizli",
    title: "Avrupa B2B Müşteri Sipariş, 3D Kumaş Kartelası & İhracat Portalı Sözleşmesi",
    clientSigner: "Cemal Kaya",
    clientRole: "Yönetim Kurulu Üyesi",
    email: "cemal@novatekstil.com",
    phone: "+90 532 994 55 12",
    efesoftSigner: "Burak Yılmaz (Kurumsal Satış)",
    netAmount: 740000,
    netAmountFormatted: "₺740.000",
    vatIncludedFormatted: "₺888.000 (KDV Dahil)",
    paymentPlan: "%50 İmza (Tahsil Edildi) • %50 Canlıya Geçiş (Tahsil Edildi)",
    issueDate: "10 Eylül 2026",
    expiryDate: "10 Eylül 2028 (24 Ay)",
    remainingText: "Yürürlükte ✓",
    status: "signed",
    statusLabel: "İmzalandı & Aktif",
    signatureProgress: 100,
    signatureStepsText: "TÜBİTAK Zaman Damgalı Çift Taraflı E-İmza Tamamlandı ✓",
    slaTerms: "%99.95 Uptime • Frankfurt CDN Edge Üzerinden Avrupa Düşük Gecikme Garantisi",
    ipClause: "B2B portalı ve 3D kumaş görüntüleyici lisansları 2 yıl süreyle sınırsız bayi kullanımına açıktır.",
    sha256Hash: "8d20a6f91e47c382b50d14e99a32c611f",
    kepAddress: "novatekstil@hs01.kep.tr",
    notes:
      "Sözleşme çift taraflı nitelikli elektronik imza ile imzalandı, sistem canlıya alındı ve tüm hak ediş ödemeleri tamamlandı.",
    lineItems: [
      { name: "Çok Dilli (DE/EN/NL/TR) B2B İhracat Sipariş & Koleksiyon Portalı", qty: "1 Sistem", price: "₺440.000" },
      { name: "WebGL 3D Kumaş Doku & Kartela Önizleme Modülü", qty: "1 Modül", price: "₺180.000" },
      { name: "EfeERP Üretim Planlama & SEPA/Swift Ödeme Köprüsü", qty: "1 Paket", price: "₺120.000" },
    ],
  },
  {
    id: "SLA-2026-298",
    docType: "sla",
    docTypeLabel: "Yıllık SLA & Lisans",
    docBadge: "success",
    version: "v2.0 İmzalı",
    company: "Kalyon Enerji Yatırımları A.Ş.",
    industry: "Enerji & Altyapı",
    city: "Ankara",
    title: "GES & RES Santralleri IoT SCADA Veri Toplama & Kurumsal Bakım SLA Sözleşmesi",
    clientSigner: "Sinan Aydın",
    clientRole: "Enerji Sistemleri Direktörü",
    email: "s.aydin@kalyonenerji.com.tr",
    phone: "+90 532 611 90 20",
    efesoftSigner: "Emirhan Demir (Baş Mimar)",
    netAmount: 1460000,
    netAmountFormatted: "₺1.460.000",
    vatIncludedFormatted: "₺1.752.000 (KDV Dahil)",
    paymentPlan: "3 Aylık Dönemsel SLA Faturalama (₺365.000 / Çeyrek)",
    issueDate: "01 Ağustos 2026",
    expiryDate: "01 Ağustos 2027 (9 Ay Kaldı)",
    remainingText: "Yürürlükte ✓",
    status: "signed",
    statusLabel: "İmzalandı & Aktif",
    signatureProgress: 100,
    signatureStepsText: "Çift Taraflı E-İmzalı • Q3 & Q4 SLA Faturaları Ödendi",
    slaTerms: "%99.99 Kritik Enerji Altyapı SLA • 10 Dakika Uzaktan Müdahale Garantisi",
    ipClause: "EPİAŞ şeffaflık platformu entegrasyonu ve saha SCADA telemetri motoru kurumsal kullanım hakkı.",
    sha256Hash: "4f11c9e20a83b752d19f64e08b23a904c",
    kepAddress: "kalyonenerji@hs01.kep.tr",
    notes:
      "18 güneş ve rüzgar santralinden saniyede 40.000 sensör verisi toplayan EfeOS IoT kümesinin yıllık bakım ve 7/24 SRE izleme sözleşmesi.",
    lineItems: [
      { name: "EfeOS Time-Series IoT Veri Kümesi & SCADA Telemetri Lisansı", qty: "18 Santral", price: "₺880.000" },
      { name: "EPİAŞ Otomatik Üretim Tahminleme & Raporlama Köprüsü", qty: "12 Ay", price: "₺310.000" },
      { name: "7/24 Dedicated SRE Nöbetçi Mühendis & Felaket Kurtarma SLA", qty: "12 Ay", price: "₺270.000" },
    ],
  },
  {
    id: "NDA-2026-118",
    docType: "nda",
    docTypeLabel: "NDA & KVKK Protokolü",
    docBadge: "warning",
    version: "v1.0 İmzalı",
    company: "Anadolu Sağlık & Biyoteknoloji A.Ş.",
    industry: "Biyoteknoloji & İlaç",
    city: "İstanbul",
    title: "Çift Taraflı Ticari Sır, Ar-Ge Algoritmaları & KVKK Veri İşleyen Gizlilik Sözleşmesi",
    clientSigner: "Prof. Dr. Levent Ersoy",
    clientRole: "Ar-Ge İcra Kurulu Başkanı",
    email: "l.ersoy@anadolubio.com.tr",
    phone: "+90 533 408 11 75",
    efesoftSigner: "Emirhan Demir (Baş Mimar)",
    netAmount: 1120000,
    netAmountFormatted: "₺1.120.000",
    vatIncludedFormatted: "₺1.344.000 (Proje Bütçesi)",
    paymentPlan: "NDA Kapsamında Ön PoC & Faz-1 Bütçesi",
    issueDate: "12 Ekim 2026",
    expiryDate: "12 Ekim 2031 (5 Yıl Gizlilik)",
    remainingText: "5 Yıl Koruma Aktif",
    status: "signed",
    statusLabel: "İmzalandı & Aktif",
    signatureProgress: 100,
    signatureStepsText: "KEP Üzerinden Islak + Elektronik İmza Tamamlandı ✓",
    slaTerms: "6698 Sayılı KVKK Madde 12 Veri Güvenliği & ISO/IEC 27701 Gizlilik Taahhüdü",
    ipClause: "Paylaşılan tüm klinik veri setleri ve moleküler analiz çıktıları münhasıran müşteriye aittir.",
    sha256Hash: "6b83e2d19f04a573c18e42b90d15f723a",
    kepAddress: "anadolubiyoteknoloji@hs03.kep.tr",
    notes:
      "Faz-1 yapay zeka destekli laboratuvar görüntü analizi projesi öncesi imzalanan 500.000€ cezai şartlı çift taraflı gizlilik ve veri güvenliği protokolü.",
    lineItems: [
      { name: "Çift Taraflı Ticari Sır & Kaynak Kod Gizlilik Taahhütnamesi (NDA)", qty: "5 Yıl", price: "Protokol Dahili" },
      { name: "KVKK Veri İşleyen & Anonimleştirme Güvenlik Katmanı Kurulumu", qty: "1 Faz", price: "₺420.000" },
      { name: "Biyomedikal Görüntü İşleme AI PoC Geliştirme Paketi", qty: "1 Faz", price: "₺700.000" },
    ],
  },
  {
    id: "PRP-2026-511",
    docType: "proposal",
    docTypeLabel: "Kurumsal Fiyat Teklifi",
    docBadge: "info",
    version: "v1.0 Taslak",
    company: "Folkart Yapı & Gayrimenkul A.Ş.",
    industry: "İnşaat & Gayrimenkul",
    city: "İzmir",
    title: "3D Mimari Kat Planı Rezervasyon, Yatırımcı CRM & Senet/Tahsilat Sistemi Teklifi",
    clientSigner: "Canan Erdem",
    clientRole: "Pazarlama ve Satış GMY",
    email: "c.erdem@folkart.com.tr",
    phone: "+90 532 409 81 70",
    efesoftSigner: "Zeynep Kaya (Çözüm Mimarı)",
    netAmount: 930000,
    netAmountFormatted: "₺930.000",
    vatIncludedFormatted: "₺1.116.000 (KDV Dahil)",
    paymentPlan: "%40 Sözleşme • %30 3D WebGL Teslim • %30 CRM Canlı",
    issueDate: "27 Ekim 2026",
    expiryDate: "20 Kasım 2026 (23 Gün Kaldı)",
    remainingText: "Hukuk & Mali Kontrol",
    status: "legal_review",
    statusLabel: "Hukuk & Revizyon",
    signatureProgress: 50,
    signatureStepsText: "Teknik Kapsam Onaylandı • Döviz/TL Sabitleme Maddesi Ekleniyor",
    slaTerms: "%99.95 Uptime • Yurt Dışı Yatırımcı Portalı Çoklu Dil & CDN Desteği",
    ipClause: "EfeCRM Gayrimenkul modülü kurumsal lisansı ve projeye özel 3D WebGL bina modelleri.",
    sha256Hash: "2e55a9c14d80b362f71e08c49a66d108e",
    kepAddress: "folkartyapi@hs01.kep.tr",
    notes:
      "Yurt dışı satış ofisleri için İngilizce/Rusça/Arapça yatırımcı portalı ve interaktif 3D daire seçimi içeren kapsamlı teklif dökümü.",
    lineItems: [
      { name: "EfeCRM Gayrimenkul & Yurt Dışı Yatırımcı Satış Yönetimi (60 Lisans)", qty: "1 Paket", price: "₺460.000" },
      { name: "WebGL 3D İnteraktif Rezidans / Kat Planı Rezervasyon Motoru", qty: "3 Proje", price: "₺310.000" },
      { name: "Çok Para Birimli Senet, Tapu & Banka Kredi Takip Modülü", qty: "1 Modül", price: "₺160.000" },
    ],
  },
];

const LEGAL_TEMPLATES = [
  {
    code: "TPL-MSA-01",
    title: "Master Özel Yazılım Geliştirme & Fikri Mülkiyet Sözleşmesi (MSA v4.2)",
    desc: "Agile sprint hak edişleri, kaynak kod devri, UAT kabul kriterleri ve 6698 KVKK maddelerini içerir.",
    docType: "msa" as ContractCategory,
    defaultAmount: "1850000",
    badge: "En Çok Kullanılan",
    badgeClass: "adm-badge--purple",
  },
  {
    code: "TPL-PRP-02",
    title: "EfeOS Kurumsal Ürün Lisanslama & Donanım Kurulum Teklifi (CPQ v3.8)",
    desc: "EfeERP, EfeCRM ve EfePOS çoklu şube lisans kademeleri, kurumsal iskonto ve eğitim kalemleri şablonu.",
    docType: "proposal" as ContractCategory,
    defaultAmount: "960000",
    badge: "Standart Teklif",
    badgeClass: "adm-badge--info",
  },
  {
    code: "TPL-SLA-03",
    title: "7/24 Kritik Sunucu, Kubernetes & Yıllık SLA Bakım Anlaşması (v2.9)",
    desc: "15 dakika kritik müdahale süresi, %99.98 uptime taahhüdü ve İzmir/Frankfurt DRP yedekleme şartnamesi.",
    docType: "sla" as ContractCategory,
    defaultAmount: "640000",
    badge: "Yıllık Gelir (ARR)",
    badgeClass: "adm-badge--success",
  },
  {
    code: "TPL-NDA-04",
    title: "Çift Taraflı Ticari Sır, Kaynak Kod & KVKK Veri İşleyen Gizlilik Protokolü",
    desc: "Kurumsal PoC ve keşif çalışmaları öncesi KEP üzerinden imzalanan cezai şartlı NDA sözleşmesi.",
    docType: "nda" as ContractCategory,
    defaultAmount: "450000",
    badge: "Hukuk Onaylı",
    badgeClass: "adm-badge--warning",
  },
];

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState<ContractRecord[]>(INITIAL_CONTRACTS);
  const [docTypeFilter, setDocTypeFilter] = useState<"all" | ContractCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ContractStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("CNT-2026-842");
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [previewContract, setPreviewContract] = useState<ContractRecord | null>(null);
  const [kepSentIds, setKepSentIds] = useState<Record<string, boolean>>({});
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  // Quick-Create Form State
  const [newCompany, setNewCompany] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSigner, setNewSigner] = useState("");
  const [newDocType, setNewDocType] = useState<ContractCategory>("proposal");
  const [newAmount, setNewAmount] = useState("");
  const [newPaymentPlan, setNewPaymentPlan] = useState("%40 İmza Peşinatı • %30 UAT • %30 Canlıya Geçiş");

  const handleStatusChange = (id: string, nextStatus: ContractStatus) => {
    const statusMap: Record<
      ContractStatus,
      { label: string; progress: number; stepText: string; remaining: string }
    > = {
      legal_review: {
        label: "Hukuk & Revizyon",
        progress: 45,
        stepText: "Müşteri Hukuk & Satın Alma İncelemesinde",
        remaining: "Revizyon Aşamasında",
      },
      awaiting_signature: {
        label: "E-İmza Bekliyor",
        progress: 75,
        stepText: "Efesoft E-İmzaladı • Müşteri KEP / E-İmzası Bekleniyor",
        remaining: "Son İmza Bekleniyor",
      },
      signed: {
        label: "İmzalandı & Aktif",
        progress: 100,
        stepText: "TÜBİTAK Zaman Damgalı Çift Taraflı E-İmza Tamamlandı ✓",
        remaining: "Yürürlükte ✓",
      },
      renewal_due: {
        label: "Yenileme Yaklaşıyor",
        progress: 100,
        stepText: "Aktif Dönem Sonu • Yeni Dönem Zeyilnamesi Hazırlandı",
        remaining: "Yenileme Dönemi",
      },
    };

    const meta = statusMap[nextStatus];
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
            ...c,
            status: nextStatus,
            statusLabel: meta.label,
            signatureProgress: meta.progress,
            signatureStepsText: meta.stepText,
            remainingText: meta.remaining,
          }
          : c
      )
    );
  };

  const handleSendKepSignature = (id: string) => {
    setKepSentIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopyHash = (id: string, hash: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hash).catch(() => { });
    }
    setCopiedHashId(id);
    window.setTimeout(() => setCopiedHashId(null), 1800);
  };

  const handleUseTemplate = (tpl: (typeof LEGAL_TEMPLATES)[number]) => {
    setNewDocType(tpl.docType);
    setNewTitle(tpl.title);
    setNewAmount(tpl.defaultAmount);
    setShowCreateDrawer(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newTitle.trim()) return;

    const numericNet =
      Number(newAmount.replace(/[^0-9]/g, "")) > 0
        ? Number(newAmount.replace(/[^0-9]/g, ""))
        : 1250000;
    const vatIncluded = Math.round(numericNet * 1.2);

    const typeMeta: Record<
      ContractCategory,
      { prefix: string; label: string; badge: ContractRecord["docBadge"] }
    > = {
      proposal: { prefix: "PRP-2026", label: "Kurumsal Fiyat Teklifi", badge: "info" },
      msa: { prefix: "CNT-2026", label: "Master Yazılım Sözleşmesi", badge: "purple" },
      sla: { prefix: "SLA-2026", label: "Yıllık SLA & Lisans", badge: "success" },
      nda: { prefix: "NDA-2026", label: "NDA & KVKK Protokolü", badge: "warning" },
    };

    const meta = typeMeta[newDocType];
    const created: ContractRecord = {
      id: `${meta.prefix}-${850 + contracts.length}`,
      docType: newDocType,
      docTypeLabel: meta.label,
      docBadge: meta.badge,
      version: "v1.0 Yeni",
      company: newCompany.trim(),
      industry: "Kurumsal B2B",
      city: "İstanbul / İzmir",
      title: newTitle.trim(),
      clientSigner: newSigner.trim() || "Kurumsal İmza Yetkilisi",
      clientRole: "Yönetim Kurulu / Satın Alma",
      email: "hukuk@kurumsal.com.tr",
      phone: "+90 532 000 00 00",
      efesoftSigner: "Emirhan Demir (Baş Mimar)",
      netAmount: numericNet,
      netAmountFormatted: `₺${numericNet.toLocaleString("tr-TR")}`,
      vatIncludedFormatted: `₺${vatIncluded.toLocaleString("tr-TR")} (KDV Dahil)`,
      paymentPlan: newPaymentPlan,
      issueDate: "28 Ekim 2026",
      expiryDate: "28 Ekim 2027 (12 Ay)",
      remainingText: "Yeni Oluşturuldu",
      status: "awaiting_signature",
      statusLabel: "E-İmza Bekliyor",
      signatureProgress: 65,
      signatureStepsText: "Efesoft Elektronik Mührü Basıldı • Müşteri İmzasında",
      slaTerms: "%99.98 Uptime • İzmir & Frankfurt HA Kümesi • 15 Dakika Kritik Müdahale",
      ipClause: "6698 Sayılı KVKK, ISO/IEC 27001 Bilgi Güvenliği ve Kurumsal Lisans Şartnamesi dahildir.",
      sha256Hash: "e491a0c82f17b634d90e12c88f43b719a",
      kepAddress: "kurumsal@hs01.kep.tr",
      notes:
        "Yönetim panelinden oluşturulan resmi sözleşme/teklif dökümü. TÜBİTAK zaman damgalı PDF paketi imzacıya iletildi.",
      lineItems: [
        {
          name: `${newTitle.trim()} — Ana Yazılım & Kurumsal Lisans Paketi`,
          qty: "1 Paket",
          price: `₺${Math.round(numericNet * 0.75).toLocaleString("tr-TR")}`,
        },
        {
          name: "Kurumsal Entegrasyon, Devreye Alma & 1 Yıllık Kritik SLA Desteği",
          qty: "12 Ay",
          price: `₺${Math.round(numericNet * 0.25).toLocaleString("tr-TR")}`,
        },
      ],
    };

    setContracts((prev) => [created, ...prev]);
    setExpandedId(created.id);
    setNewCompany("");
    setNewTitle("");
    setNewSigner("");
    setNewAmount("");
    setShowCreateDrawer(false);
  };

  const filteredContracts = contracts.filter((c) => {
    if (docTypeFilter !== "all" && c.docType !== docTypeFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.clientSigner.toLowerCase().includes(q) ||
        c.docTypeLabel.toLowerCase().includes(q) ||
        c.kepAddress.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPortfolioNet = contracts.reduce((acc, c) => acc + c.netAmount, 0);
  const awaitingSignatureNet = contracts
    .filter((c) => c.status === "awaiting_signature" || c.status === "legal_review")
    .reduce((acc, c) => acc + c.netAmount, 0);
  const signedActiveNet = contracts
    .filter((c) => c.status === "signed" || c.status === "renewal_due")
    .reduce((acc, c) => acc + c.netAmount, 0);

  return (
    <div className="adm-content">
      {/* Page Header */}
      <div className="adm-header">
        <div className="adm-header__title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="adm-header__title">Sözleşmeler & Kurumsal Teklifler</h1>
            <span className="adm-badge adm-badge--success">
              TÜBİTAK Zaman Damgalı E-İmza & KEP Entegreli
            </span>
          </div>
          <p className="adm-header__subtitle">
            Master yazılım geliştirme sözleşmeleri (MSA), kurumsal fiyat teklifleri (CPQ), yıllık SLA bakım anlaşmaları ve KVKK/NDA gizlilik protokolleri
          </p>
        </div>

        <div className="adm-header__controls">
          <div className="adm-seg">
            <button
              className={`adm-seg__btn ${docTypeFilter === "all" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDocTypeFilter("all")}
            >
              Tüm Evraklar ({contracts.length})
            </button>
            <button
              className={`adm-seg__btn ${docTypeFilter === "proposal" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDocTypeFilter("proposal")}
            >
              Fiyat Teklifleri ({contracts.filter((c) => c.docType === "proposal").length})
            </button>
            <button
              className={`adm-seg__btn ${docTypeFilter === "msa" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDocTypeFilter("msa")}
            >
              Yazılım Sözleşmesi ({contracts.filter((c) => c.docType === "msa").length})
            </button>
            <button
              className={`adm-seg__btn ${docTypeFilter === "sla" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDocTypeFilter("sla")}
            >
              Yıllık SLA ({contracts.filter((c) => c.docType === "sla").length})
            </button>
            <button
              className={`adm-seg__btn ${docTypeFilter === "nda" ? "adm-seg__btn--active" : ""}`}
              onClick={() => setDocTypeFilter("nda")}
            >
              NDA ({contracts.filter((c) => c.docType === "nda").length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateDrawer((v) => !v)}
            className="adm-topbar__btn adm-topbar__btn--primary"
          >
            <Plus size={14} />
            <span>Yeni Sözleşme / Teklif Hazırla</span>
          </button>
        </div>
      </div>

      {/* Animated Quick-Create Contract / Proposal Drawer */}
      <div className={`adm-collapse ${showCreateDrawer ? "adm-collapse--open" : ""}`}>
        <div className="adm-collapse__inner">
          <form
            onSubmit={handleCreateContract}
            className="adm-card"
            style={{
              padding: "13px 16px",
              borderColor: "rgba(0, 113, 227, 0.35)",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-primary)" }}>
              Resmi Evrak & Teklif Oluştur:
            </span>

            <select
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value as ContractCategory)}
              style={{
                height: "30px",
                padding: "0 8px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                fontWeight: 600,
              }}
            >
              <option value="proposal">Kurumsal Fiyat Teklifi (PRP)</option>
              <option value="msa">Master Yazılım Sözleşmesi (CNT)</option>
              <option value="sla">Yıllık SLA & Lisans Anlaşması (SLA)</option>
              <option value="nda">NDA & KVKK Gizlilik Protokolü (NDA)</option>
            </select>

            <input
              type="text"
              placeholder="Şirket / Kurum Ünvanı *"
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
              placeholder="Sözleşme veya Teklif Başlığı *"
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
                flex: "2 1 240px",
              }}
            />

            <input
              type="text"
              placeholder="Müşteri İmzacı Yetkili"
              value={newSigner}
              onChange={(e) => setNewSigner(e.target.value)}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                width: "155px",
              }}
            />

            <input
              type="text"
              placeholder="Net Bedel ₺ (Örn: 1450000)"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
                width: "155px",
              }}
            />

            <select
              value={newPaymentPlan}
              onChange={(e) => setNewPaymentPlan(e.target.value)}
              style={{
                height: "30px",
                padding: "0 8px",
                borderRadius: "6px",
                border: "1px solid var(--adm-border)",
                fontSize: "12px",
                background: "#ffffff",
              }}
            >
              <option value="%40 İmza Peşinatı • %30 UAT • %30 Canlıya Geçiş">
                %40 Peşin • %30 UAT • %30 Go-Live
              </option>
              <option value="Yıllık Peşin Lisanslama (12 Ay Garantili)">
                Yıllık Peşin Lisans (12 Ay)
              </option>
              <option value="%50 Sözleşme Onayı • %50 Anahtar Teslim">
                %50 Başlangıç • %50 Teslim
              </option>
              <option value="4 Eşit Sprint Hak Edişi (%25 x 4 Faz)">
                4 Eşit Sprint Hak Edişi
              </option>
            </select>

            <button type="submit" className="adm-topbar__btn adm-topbar__btn--primary">
              Evrak Oluştur & E-Mühürle
            </button>
            <button
              type="button"
              onClick={() => setShowCreateDrawer(false)}
              className="adm-topbar__btn"
            >
              İptal
            </button>
          </form>
        </div>
      </div>

      {/* 5-Column High-Density KPI Row */}
      <div key={docTypeFilter} className="adm-kpi-grid adm-data-switch">
        <div className="adm-kpi-card" style={{ borderColor: "rgba(0, 113, 227, 0.28)" }}>
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Toplam Sözleşme & Teklif Hacmi</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071e3" }}>
              <FileSignature size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺{totalPortfolioNet.toLocaleString("tr-TR")}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--info">{contracts.length} Resmi Evrak</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>+KDV: ₺{Math.round(totalPortfolioNet * 1.2).toLocaleString("tr-TR")}</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">İmza & Hukuk Onayı Bekleyen</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(154, 92, 245, 0.1)", color: "#9a5cf5" }}>
              <Scale size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺{awaitingSignatureNet.toLocaleString("tr-TR")}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--purple">
              {contracts.filter((c) => c.status === "awaiting_signature" || c.status === "legal_review").length} Açık Süreç
            </span>
            <span style={{ color: "var(--adm-text-secondary)" }}>Ort. İmza: 2.8 Gün</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">İmzalanan & Yürürlükteki Portföy</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <CheckCircle2 size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">₺{signedActiveNet.toLocaleString("tr-TR")}</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">%100 Tahsilat Güvenceli</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>KEP & Zaman Damgalı</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Teklif → Sözleşme Dönüşümü</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
              <Sparkles size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">%68.5 Onay</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--warning">Son 90 Gün: 18/26</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>+6.4% artış</span>
          </div>
        </div>

        <div className="adm-kpi-card">
          <div className="adm-kpi-card__top">
            <span className="adm-kpi-card__label">Hukuki & KVKK Uyumluluk</span>
            <span className="adm-kpi-card__icon" style={{ background: "rgba(26, 158, 75, 0.1)", color: "#1a9e4b" }}>
              <ShieldCheck size={15} />
            </span>
          </div>
          <div className="adm-kpi-card__val">5070 E-İmza</div>
          <div className="adm-kpi-card__sub">
            <span className="adm-badge adm-badge--success">ISO 27001 & KVKK</span>
            <span style={{ color: "var(--adm-text-secondary)" }}>0 Hukuki İhtilaf</span>
          </div>
        </div>
      </div>

      {/* Main Contracts & Proposals Table Card */}
      <div className="adm-card">
        <div className="adm-card__head" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card__title">
              <FileSignature size={15} color="var(--adm-primary)" />
              Resmi Sözleşmeler, Fiyat Teklifleri & E-İmza Takip Listesi
            </span>
            <span className="adm-badge adm-badge--info">{filteredContracts.length} Kayıt</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: "9px", color: "var(--adm-text-muted)", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Evrak no, şirket, yetkili veya KEP ara..."
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
                  width: "235px",
                }}
              />
            </div>

            <div className="adm-seg">
              <button
                className={`adm-seg__btn ${statusFilter === "all" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                Tümü ({contracts.length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "awaiting_signature" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("awaiting_signature")}
              >
                E-İmza Bekleyen ({contracts.filter((c) => c.status === "awaiting_signature").length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "legal_review" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("legal_review")}
              >
                Hukuk & Revizyon ({contracts.filter((c) => c.status === "legal_review").length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "signed" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("signed")}
              >
                İmzalı & Aktif ({contracts.filter((c) => c.status === "signed").length})
              </button>
              <button
                className={`adm-seg__btn ${statusFilter === "renewal_due" ? "adm-seg__btn--active" : ""}`}
                onClick={() => setStatusFilter("renewal_due")}
              >
                Yenileme ({contracts.filter((c) => c.status === "renewal_due").length})
              </button>
            </div>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Evrak Kodu & Tür</th>
                <th>Müşteri / Kurum & Sözleşme Başlığı</th>
                <th>İmzacı Yetkililer</th>
                <th>Sözleşme Bedeli & Ödeme Planı</th>
                <th>Tanzim & Geçerlilik</th>
                <th>E-İmza & Hukuki Durum</th>
                <th style={{ textAlign: "right" }}>İncele & PDF</th>
              </tr>
            </thead>
            <tbody key={`${docTypeFilter}-${statusFilter}`} className="adm-data-switch">
              {filteredContracts.map((item) => {
                const isExpanded = expandedId === item.id;
                const isKepSent = kepSentIds[item.id];
                const isHashCopied = copiedHashId === item.id;

                const statusBadgeClass =
                  item.status === "signed"
                    ? "adm-badge--success"
                    : item.status === "awaiting_signature"
                      ? "adm-badge--info"
                      : item.status === "legal_review"
                        ? "adm-badge--purple"
                        : "adm-badge--warning";

                const progressColor =
                  item.status === "signed"
                    ? "#1a9e4b"
                    : item.status === "awaiting_signature"
                      ? "#0071e3"
                      : item.status === "legal_review"
                        ? "#9a5cf5"
                        : "#d97706";

                return (
                  <Fragment key={item.id}>
                    <tr
                      style={{
                        background: isExpanded ? "rgba(0, 113, 227, 0.03)" : undefined,
                      }}
                    >
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "var(--adm-text-muted)",
                              }}
                            >
                              {item.version}
                            </span>
                          </div>
                          <span className={`adm-badge adm-badge--${item.docBadge}`}>
                            {item.docTypeLabel}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="adm-table__client">
                          <div className="adm-table__client-avatar">{item.company.charAt(0)}</div>
                          <div className="adm-table__client-meta">
                            <div className="adm-table__client-name">{item.company}</div>
                            <div
                              className="adm-table__client-sub"
                              style={{ fontWeight: 500, color: "var(--adm-text-secondary)" }}
                            >
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "11.5px" }}>
                          <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>
                            {item.clientSigner}
                          </span>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                            {item.clientRole} • {item.city}
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
                            {item.netAmountFormatted}{" "}
                            <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--adm-text-muted)" }}>
                              + KDV
                            </span>
                          </span>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-secondary)" }}>
                            {item.paymentPlan}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px" }}>
                            {item.expiryDate}
                          </span>
                          <span style={{ fontSize: "10.5px", color: "var(--adm-primary)", fontWeight: 600 }}>
                            {item.remainingText}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "160px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                            <span className={`adm-badge ${statusBadgeClass}`}>
                              {item.statusLabel}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10.5px",
                                fontWeight: 700,
                                color: progressColor,
                              }}
                            >
                              %{item.signatureProgress}
                            </span>
                          </div>
                          <div className="adm-progress">
                            <div
                              className="adm-progress__fill"
                              style={{
                                width: `${item.signatureProgress}%`,
                                background: progressColor,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="adm-table__actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            onClick={() => setPreviewContract(item)}
                            className="adm-table__action-btn"
                            title="Mühürlü Sözleşme Önizlemesi"
                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <Eye size={12} />
                            <span>PDF</span>
                          </button>
                          <button
                            type="button"
                            className="adm-table__action-btn"
                            onClick={() => setExpandedId(isExpanded ? null : item.id)}
                            style={{
                              background: isExpanded ? "var(--adm-primary)" : "#ffffff",
                              color: isExpanded ? "#ffffff" : "var(--adm-text-secondary)",
                              borderColor: isExpanded ? "var(--adm-primary)" : "var(--adm-border)",
                            }}
                          >
                            {isExpanded ? "Detayı Kapat" : "Sözleşme & Kalemler"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Animated Expandable Contract Inspector Row */}
                    <tr className={`adm-expand-row ${isExpanded ? "adm-expand-row--open" : ""}`}>
                      <td colSpan={7} className="adm-expand-cell">
                        <div className="adm-expand-grid">
                          <div className="adm-expand-inner">
                            <div
                              className="adm-expand-body"
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1.35fr 1.05fr 0.95fr",
                                gap: "12px",
                                borderLeft: "3px solid var(--adm-primary)",
                              }}
                            >
                              {/* Col 1: Itemized Financial Deliverables & Breakdown */}
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
                                      Sözleşme Kalemleri & Finansal Kapsam ({item.id})
                                    </span>
                                    <span className="adm-badge adm-badge--neutral">{item.vatIncludedFormatted}</span>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "5px",
                                      background: "var(--adm-surface-2)",
                                      padding: "8px 10px",
                                      borderRadius: "6px",
                                      border: "1px solid var(--adm-border-subtle)",
                                    }}
                                  >
                                    {item.lineItems.map((li, idx) => (
                                      <div
                                        key={idx}
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          gap: "10px",
                                          fontSize: "11.5px",
                                          paddingBottom: idx < item.lineItems.length - 1 ? "4px" : 0,
                                          borderBottom:
                                            idx < item.lineItems.length - 1
                                              ? "1px dashed var(--adm-border-subtle)"
                                              : "none",
                                        }}
                                      >
                                        <span style={{ color: "var(--adm-text)", fontWeight: 500 }}>
                                          {idx + 1}. {li.name}
                                        </span>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                          <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>
                                            {li.qty}
                                          </span>
                                          <span
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              fontWeight: 700,
                                              color: "var(--adm-text)",
                                            }}
                                          >
                                            {li.price}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", lineHeight: 1.4 }}>
                                  <b>Yönetici Notu:</b> {item.notes}
                                </div>
                              </div>

                              {/* Col 2: Legal Clauses, SLA, SHA-256 Hash & Status Controls */}
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
                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                  <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                    Hukuki Şartname, SLA & E-İmza Doğrulama
                                  </span>

                                  <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", lineHeight: 1.4 }}>
                                    <div>
                                      <b>SLA Taahhüdü:</b> {item.slaTerms}
                                    </div>
                                    <div style={{ marginTop: "3px" }}>
                                      <b>Fikri Mülkiyet:</b> {item.ipClause}
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      gap: "6px",
                                      background: "var(--adm-surface-2)",
                                      padding: "5px 8px",
                                      borderRadius: "6px",
                                      border: "1px solid var(--adm-border-subtle)",
                                      marginTop: "2px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10.5px",
                                        color: "var(--adm-text-secondary)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      SHA-256: {item.sha256Hash}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyHash(item.id, item.sha256Hash)}
                                      className="adm-table__action-btn"
                                      style={{ padding: "2px 7px", fontSize: "10px" }}
                                    >
                                      {isHashCopied ? <Check size={11} color="#1a9e4b" /> : <Copy size={11} />}
                                      <span>{isHashCopied ? "Kopyalandı" : "Hash"}</span>
                                    </button>
                                  </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                  <span style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--adm-text-muted)" }}>
                                    Evrak Durumunu Güncelle:
                                  </span>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                    {(
                                      [
                                        { key: "legal_review", label: "Hukuk İnceleme" },
                                        { key: "awaiting_signature", label: "E-İmza Bekliyor" },
                                        { key: "signed", label: "İmzalandı ✓" },
                                        { key: "renewal_due", label: "Yenileme" },
                                      ] as const
                                    ).map((st) => (
                                      <button
                                        key={st.key}
                                        type="button"
                                        onClick={() => handleStatusChange(item.id, st.key)}
                                        className="adm-table__action-btn"
                                        style={{
                                          background: item.status === st.key ? "var(--adm-primary)" : "#ffffff",
                                          color: item.status === st.key ? "#ffffff" : "var(--adm-text-secondary)",
                                          borderColor:
                                            item.status === st.key ? "var(--adm-primary)" : "var(--adm-border)",
                                        }}
                                      >
                                        {st.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Col 3: E-Signature, KEP Dispatch & Official PDF Actions */}
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
                                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                  <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--adm-text)" }}>
                                    KEP & Elektronik İmza Aksiyonları
                                  </span>
                                  <span style={{ fontSize: "11px", color: "var(--adm-text-muted)" }}>
                                    Resmi KEP: <b style={{ fontFamily: "var(--font-mono)" }}>{item.kepAddress}</b>
                                  </span>
                                  <span style={{ fontSize: "10.5px", color: "var(--adm-primary)", fontWeight: 600 }}>
                                    {item.signatureStepsText}
                                  </span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  <button
                                    type="button"
                                    onClick={() => handleSendKepSignature(item.id)}
                                    className="adm-topbar__btn adm-topbar__btn--primary"
                                    style={{
                                      width: "100%",
                                      justifyContent: "center",
                                      background: isKepSent ? "#1a9e4b" : undefined,
                                      borderColor: isKepSent ? "#1a9e4b" : undefined,
                                    }}
                                  >
                                    <Send size={13} />
                                    <span>
                                      {isKepSent
                                        ? "KEP & E-İmza Paketi Gönderildi ✓"
                                        : "KEP / E-İmza Bağlantısı Gönder"}
                                    </span>
                                  </button>

                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <button
                                      type="button"
                                      onClick={() => setPreviewContract(item)}
                                      className="adm-topbar__btn"
                                      style={{ flex: 1, justifyContent: "center" }}
                                    >
                                      <Eye size={12} />
                                      <span>Resmi Önizleme</span>
                                    </button>
                                    <a
                                      href={`mailto:${item.email}?subject=${encodeURIComponent(
                                        `Efesoft Resmi Sözleşme & E-İmza Süreci (${item.id}) - ${item.company}`
                                      )}`}
                                      className="adm-topbar__btn"
                                      style={{ flex: 1, justifyContent: "center" }}
                                    >
                                      <Mail size={12} />
                                      <span>Hukuk E-Posta</span>
                                    </a>
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

      {/* Bottom 3-Column Row: SLA Renewals, Legal Template Library & Milestone Schedule */}
      <div className="adm-grid-3col">
        {/* Col 1: Upcoming Contract & SLA Renewals */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <CalendarClock size={15} color="#0071e3" />
              Yaklaşan Yıllık SLA & Lisans Yenilemeleri
            </span>
            <span className="adm-badge adm-badge--warning">30 Gün İçinde</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                company: "Atlas Holding A.Ş.",
                contract: "SLA-2026-304 • 280 EfeERP Lisansı + Gold SLA",
                date: "15 Kasım 2026 (18 Gün Kaldı)",
                amount: "₺1.960.000 / yıl",
                badge: "+50 Ek Lisans Talebi",
                badgeClass: "adm-badge--info",
              },
              {
                company: "Ege Perakende Mağazacılık A.Ş.",
                contract: "PRP-2026-519 • 65 Mağaza EfePOS Teklif Opsiyonu",
                date: "10 Kasım 2026 (13 Gün Kaldı)",
                amount: "₺1.640.000",
                badge: "İmza Randevusu Hazır",
                badgeClass: "adm-badge--success",
              },
              {
                company: "Medikal Park Sağlık Grubu",
                contract: "PRP-2026-515 • Tele-Tıp & HBYS Kurumsal Teklif",
                date: "15 Kasım 2026 (18 Gün Kaldı)",
                amount: "₺1.180.000",
                badge: "Komite Onayında",
                badgeClass: "adm-badge--purple",
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "12px", color: "var(--adm-text)" }}>
                    {rn.company}
                  </span>
                  <span className={`adm-badge ${rn.badgeClass}`}>{rn.badge}</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)" }}>{rn.contract}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                  <span style={{ fontSize: "10.5px", color: "var(--adm-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    ⏰ {rn.date}
                  </span>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--adm-text)" }}>
                    {rn.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Standard Legal Contract & Proposal Templates */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Layers size={15} color="#9a5cf5" />
              Kurumsal Sözleşme & Şartname Şablonları
            </span>
            <span className="adm-badge adm-badge--purple">Hukuk Onaylı v4</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {LEGAL_TEMPLATES.map((tpl) => (
              <div
                key={tpl.code}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "var(--adm-surface-2)",
                  border: "1px solid var(--adm-border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: "11.5px", color: "var(--adm-text)" }}>
                      {tpl.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>{tpl.desc}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleUseTemplate(tpl)}
                  className="adm-table__action-btn"
                  style={{ color: "var(--adm-primary)", borderColor: "rgba(0, 113, 227, 0.28)" }}
                >
                  Şablonu Kullan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Contracted Milestone & Payment Plan Breakdown */}
        <div className="adm-card">
          <div className="adm-card__head">
            <span className="adm-card__title">
              <Stamp size={15} color="#1a9e4b" />
              Sözleşme Hak Ediş & Ödeme Planı Dağılımı
            </span>
            <span className="adm-badge adm-badge--success">Tahsilat Planı</span>
          </div>

          <div className="adm-card__body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                label: "Sözleşme İmza Peşinatları (%40 Başlangıç)",
                amount: "₺5.480.000",
                sub: "6 Aktif Sözleşme • %100 Fatura Kesildi",
                pct: 88,
                color: "#0071e3",
              },
              {
                label: "Sprint & UAT Test Kabul Hak Edişleri (%30)",
                amount: "₺3.920.000",
                sub: "4 Kurumsal Proje • Kasım-Aralık Tahsilat",
                pct: 68,
                color: "#9a5cf5",
              },
              {
                label: "Canlıya Geçiş (Go-Live) & Anahtar Teslim (%30)",
                amount: "₺3.860.000",
                sub: "Kabul Tutanağı Sonrası Otomatik Fatura",
                pct: 64,
                color: "#1a9e4b",
              },
              {
                label: "Yıllık Peşin SLA & Bulut Lisans Yenilemeleri",
                amount: "₺3.420.000",
                sub: "Yıllık Tekrarlayan Sözleşmeli Gelir (ARR)",
                pct: 94,
                color: "#f59e0b",
              },
            ].map((ms, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", gap: "8px" }}>
                  <span style={{ fontWeight: 600, color: "var(--adm-text)" }}>{ms.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: ms.color }}>
                    {ms.amount}
                  </span>
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--adm-text-muted)" }}>{ms.sub}</div>
                <div className="adm-progress">
                  <div className="adm-progress__fill" style={{ width: `${ms.pct}%`, background: ms.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Official Contract / Proposal Document Preview Modal */}
      <div
        className={`adm-modal-overlay ${previewContract ? "adm-modal-overlay--open" : ""}`}
        onClick={() => setPreviewContract(null)}
      >
        <div
          className="adm-modal-card"
          style={{ maxWidth: "680px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {previewContract && (
            <>
              <div className="adm-card__head" style={{ background: "#f8fafc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText size={15} color="var(--adm-primary)" />
                  <span className="adm-card__title">
                    Resmi Evrak Önizleme — {previewContract.id} ({previewContract.version})
                  </span>
                </div>
                <span className="adm-badge adm-badge--success">
                  5070 Sayılı E-İmza & KEP Uyumlu
                </span>
              </div>

              <div
                className="adm-card__body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  maxHeight: "76vh",
                  overflowY: "auto",
                }}
              >
                {/* Document Header Banner */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    background: "var(--adm-surface-2)",
                    border: "1px solid var(--adm-border)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "14px", color: "var(--adm-text)" }}>
                      EFESOFT YAZILIM & KURUMSAL TEKNOLOJİ A.Ş.
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--adm-text-secondary)", marginTop: "2px" }}>
                      {previewContract.docTypeLabel} • Tanzim: {previewContract.issueDate}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--adm-text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                      KEP: {previewContract.kepAddress} • SHA-256: {previewContract.sha256Hash}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="adm-badge adm-badge--info">{previewContract.id}</span>
                    <div style={{ fontSize: "12.5px", fontWeight: 800, fontFamily: "var(--font-mono)", marginTop: "4px", color: "var(--adm-text)" }}>
                      {previewContract.vatIncludedFormatted}
                    </div>
                  </div>
                </div>

                {/* Parties */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "11.5px" }}>
                  <div style={{ padding: "9px 11px", borderRadius: "7px", border: "1px solid var(--adm-border-subtle)" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase" }}>
                      Hizmet Veren / Lisansör
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--adm-text)", marginTop: "2px" }}>
                      Efesoft Kurumsal Yazılım Teknolojileri
                    </div>
                    <div style={{ color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                      İmzacı: {previewContract.efesoftSigner}
                    </div>
                  </div>

                  <div style={{ padding: "9px 11px", borderRadius: "7px", border: "1px solid var(--adm-border-subtle)" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase" }}>
                      Müşteri / Kurum (Lisans Alan)
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--adm-text)", marginTop: "2px" }}>
                      {previewContract.company}
                    </div>
                    <div style={{ color: "var(--adm-text-secondary)", fontSize: "11px" }}>
                      İmzacı: {previewContract.clientSigner} ({previewContract.clientRole})
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div style={{ border: "1px solid var(--adm-border)", borderRadius: "8px", overflow: "hidden" }}>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Hizmet / Yazılım Lisans Kalemi</th>
                        <th>Miktar / Süre</th>
                        <th style={{ textAlign: "right" }}>Net Tutar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewContract.lineItems.map((li, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500 }}>{li.name}</td>
                          <td style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>{li.qty}</td>
                          <td style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                            {li.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legal & SLA Clauses */}
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--adm-text-secondary)",
                    lineHeight: 1.5,
                    padding: "10px 12px",
                    borderRadius: "7px",
                    background: "#f8fafc",
                    border: "1px solid var(--adm-border-subtle)",
                  }}
                >
                  <div>
                    <b>Madde 4 (Ödeme & Hak Ediş Planı):</b> {previewContract.paymentPlan}
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    <b>Madde 7 (SLA & Servis Seviyesi):</b> {previewContract.slaTerms}
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    <b>Madde 9 (Fikri Mülkiyet & KVKK):</b> {previewContract.ipClause}
                  </div>
                </div>

                {/* Footer Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#1a9e4b", fontWeight: 600 }}>
                    ✓ {previewContract.signatureStepsText}
                  </span>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setPreviewContract(null)}
                      className="adm-topbar__btn"
                    >
                      Kapat
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleSendKepSignature(previewContract.id);
                        setPreviewContract(null);
                      }}
                      className="adm-topbar__btn adm-topbar__btn--primary"
                    >
                      <Download size={13} />
                      <span>Mühürlü PDF İndir & KEP İlet</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
