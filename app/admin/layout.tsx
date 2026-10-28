"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";
import Image from "next/image";

// SVG Icons for clean, low-dependency Apple-like admin UI
function IconDashboard() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1.5" />
      <rect width="7" height="5" x="14" y="3" rx="1.5" />
      <rect width="7" height="9" x="14" y="12" rx="1.5" />
      <rect width="7" height="5" x="3" y="16" rx="1.5" />
    </svg>
  );
}

function IconAnalytics() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconDeals() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconContracts() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconProducts() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 2-2 2m-1.5 1.5L14 9l-4-4-6 6a5.66 5.66 0 0 0 8 8l6-6 3.5 3.5 2-2-2-2 3.5-3.5Z" />
    </svg>
  );
}

function IconDemo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function IconReleases() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 15 2 2 4-4" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

function IconProjects() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function IconInvoices() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function IconFinance() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconSecurity() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string;
  badgeType?: "blue" | "amber" | "green";
  active?: boolean;
}

interface NavGroup {
  category: string;
  items: NavItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // On mobile/tablet (<=960px): false = 60px icon rail, true = 270px expanded drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // On desktop (>960px): false = 270px expanded sidebar, true = 64px icon rail
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [isPageLeaving, setIsPageLeaving] = useState(false);
  const [railTooltip, setRailTooltip] = useState<{
    label: string;
    badge?: string;
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    setIsPageLeaving(false);
  }, [pathname]);

  const triggerRouteBlur = (targetHref?: string) => {
    if (targetHref && targetHref !== pathname) {
      setIsPageLeaving(true);
      window.setTimeout(() => setIsPageLeaving(false), 260);
    } else if (!targetHref) {
      setIsPageLeaving(true);
      window.setTimeout(() => setIsPageLeaving(false), 180);
    }
  };

  const handleToggleSidebar = () => {
    setRailTooltip(null);
    if (typeof window !== "undefined" && window.innerWidth <= 960) {
      setSidebarOpen((prev) => !prev);
    } else {
      setDesktopCollapsed((prev) => !prev);
    }
  };

  const handleNavItemHover = (
    e: React.MouseEvent<HTMLElement>,
    item: NavItem
  ) => {
    const isMobileRail =
      typeof window !== "undefined" && window.innerWidth <= 960 && !sidebarOpen;
    const isDesktopRail =
      typeof window !== "undefined" && window.innerWidth > 960 && desktopCollapsed;

    if (isMobileRail || isDesktopRail) {
      const rect = e.currentTarget.getBoundingClientRect();
      setRailTooltip({
        label: item.label,
        badge: item.badge,
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
      });
    } else {
      setRailTooltip(null);
    }
  };

  const isAnalyticsRoute = pathname?.startsWith("/admin/analytics");
  const isSystemHealthRoute = pathname?.startsWith("/admin/system-health");
  const isLeadsRoute = pathname?.startsWith("/admin/leads");
  const isClientsRoute = pathname?.startsWith("/admin/clients");
  const isPipelineRoute = pathname?.startsWith("/admin/pipeline");
  const currentTab = isAnalyticsRoute
    ? "analytics"
    : isSystemHealthRoute
    ? "system-health"
    : isLeadsRoute
    ? "leads"
    : isClientsRoute
    ? "clients"
    : isPipelineRoute
    ? "pipeline"
    : activeTab;

  // Full operational scope covering every aspect of Efesoft software business
  const navGroups: NavGroup[] = [
    {
      category: "GENEL & ANALİTİK",
      items: [
        {
          id: "dashboard",
          label: "Dashboard (Genel Bakış)",
          icon: <IconDashboard />,
          href: "/admin",
          active:
            !isAnalyticsRoute &&
            !isSystemHealthRoute &&
            !isLeadsRoute &&
            !isClientsRoute &&
            !isPipelineRoute &&
            currentTab === "dashboard",
        },
        {
          id: "analytics",
          label: "Canlı Trafik & Ziyaretçiler",
          icon: <IconAnalytics />,
          href: "/admin/analytics",
          badge: "42 Canlı",
          badgeType: "green",
          active: isAnalyticsRoute || currentTab === "analytics",
        },
        {
          id: "system-health",
          label: "Sunucu & Sistem Sağlığı",
          icon: <IconServer />,
          href: "/admin/system-health",
          badge: "99.98%",
          badgeType: "green",
          active: isSystemHealthRoute || currentTab === "system-health",
        },
      ],
    },
    {
      category: "MÜŞTERİ & SATIŞ (CRM)",
      items: [
        {
          id: "leads",
          label: "Gelen Teklif Talepleri",
          icon: <IconInbox />,
          href: "/admin/leads",
          badge: "8 Yeni",
          badgeType: "blue",
          active: isLeadsRoute || currentTab === "leads",
        },
        {
          id: "clients",
          label: "Müşteriler & Şirketler (CRM)",
          icon: <IconUsers />,
          href: "/admin/clients",
          active: isClientsRoute || currentTab === "clients",
        },
        {
          id: "pipeline",
          label: "Satış Görüşmeleri & Pipeline",
          icon: <IconDeals />,
          href: "/admin/pipeline",
          badge: "10 Fırsat",
          badgeType: "blue",
          active: isPipelineRoute || currentTab === "pipeline",
        },
        { id: "contracts", label: "Sözleşmeler & Teklifler", icon: <IconContracts /> },
      ],
    },
    {
      category: "ÜRÜNLER & LİSANSLAR",
      items: [
        { id: "products", label: "Ürün Yönetimi (ERP, CRM, POS)", icon: <IconProducts /> },
        { id: "licenses", label: "Lisans Anahtarları (1.248)", icon: <IconKey /> },
        { id: "demos", label: "Canlı Demo İstekleri", icon: <IconDemo />, badge: "3", badgeType: "amber" },
        { id: "releases", label: "Sürümler & Changelog", icon: <IconReleases /> },
      ],
    },
    {
      category: "ÖZEL YAZILIM PROJELERİ",
      items: [
        { id: "custom-projects", label: "Aktif Projeler (18)", icon: <IconProjects /> },
        { id: "sprints", label: "Sprintler & Görevler (Kanban)", icon: <IconTasks /> },
      ],
    },
    {
      category: "DESTEK & İLETİŞİM",
      items: [
        { id: "tickets", label: "Destek Biletleri (Tickets)", icon: <IconSupport />, badge: "4" },
        { id: "livechat", label: "Canlı Görüşme Mesajları", icon: <IconChat /> },
      ],
    },
    {
      category: "İÇERİK (CMS) & PAZARLAMA",
      items: [
        { id: "blog", label: "Blog & Vaka Analizleri", icon: <IconBlog /> },
      ],
    },
    {
      category: "FİNANS & MUHASEBE",
      items: [
        { id: "invoices", label: "Faturalar & Ödemeler", icon: <IconInvoices /> },
        { id: "revenue", label: "Aylık Ciro & MRR Raporları", icon: <IconFinance /> },
      ],
    },
    {
      category: "SİSTEM & AYARLAR",
      items: [
        { id: "team", label: "Ekip Üyeleri & Roller", icon: <IconUsers /> },
        { id: "settings", label: "Genel Sistem Ayarları", icon: <IconSettings /> },
        { id: "audit", label: "Güvenlik & Denetim Günlüğü", icon: <IconSecurity /> },
      ],
    },
  ];

  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="adm-shell">
      {/* Mobile Backdrop when Sidebar is Expanded over Content */}
      <div
        className={`adm-sidebar-backdrop ${sidebarOpen ? "adm-sidebar-backdrop--visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar (Icon Rail when Closed, Full 270px when Open) */}
      <aside
        className={`adm-sidebar ${sidebarOpen ? "adm-sidebar--open" : ""} ${
          desktopCollapsed ? "adm-sidebar--collapsed" : ""
        }`}
      >
        {/* Brand Header & Collapse/Expand Button */}
        <div className="adm-sidebar__brand">
          <Link href="/admin" className="adm-sidebar__logo-link">
            <Image
              src="/logo/efesoft-logo-light-4k.png"
              alt="Efesoft Logo"
              width={124}
              height={39}
              priority
              className="adm-sidebar__logo-img"
            />
          </Link>

          <button
            type="button"
            onClick={handleToggleSidebar}
            className="adm-sidebar__collapse-btn"
            title={desktopCollapsed && !sidebarOpen ? "Menüyü Genişlet" : "Menüyü Daralt (İkon Görünümü)"}
            aria-label="Menüyü Daralt veya Genişlet"
          >
            {desktopCollapsed && !sidebarOpen ? <IconChevronRight /> : <IconChevronLeft />}
          </button>
        </div>

        {/* Search / Filter Navigation */}
        <div className="adm-sidebar__search">
          <div className="adm-sidebar__search-input-wrap">
            <input
              type="text"
              placeholder="Sayfa veya modül ara..."
              className="adm-sidebar__search-input"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
            <span className="adm-sidebar__search-key">⌘/</span>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav
          className="adm-sidebar__nav"
          onScroll={() => setRailTooltip(null)}
        >
          {filteredGroups.map((group) => (
            <div key={group.category} className="adm-nav-group">
              <div className="adm-nav-group__title">{group.category}</div>
              {group.items.map((item) => {
                const badgeClass = `adm-nav-item__badge ${
                  item.badgeType === "blue"
                    ? "adm-nav-item__badge--blue"
                    : item.badgeType === "amber"
                    ? "adm-nav-item__badge--amber"
                    : item.badgeType === "green"
                    ? "adm-nav-item__badge--green"
                    : ""
                }`;
                const inner = (
                  <>
                    <div className="adm-nav-item__left">
                      <span className="adm-nav-item__icon">{item.icon}</span>
                      <span className="adm-nav-item__label">{item.label}</span>
                    </div>
                    {item.badge && <span className={badgeClass}>{item.badge}</span>}
                  </>
                );

                return item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    title={item.badge ? `${item.label} (${item.badge})` : item.label}
                    onMouseEnter={(e) => handleNavItemHover(e, item)}
                    onMouseLeave={() => setRailTooltip(null)}
                    onClick={() => {
                      triggerRouteBlur(item.href);
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                      setRailTooltip(null);
                    }}
                    className={`adm-nav-item ${item.active ? "adm-nav-item--active" : ""}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={item.id}
                    title={item.badge ? `${item.label} (${item.badge})` : item.label}
                    onMouseEnter={(e) => handleNavItemHover(e, item)}
                    onMouseLeave={() => setRailTooltip(null)}
                    onClick={() => {
                      triggerRouteBlur();
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                      setRailTooltip(null);
                    }}
                    className={`adm-nav-item ${item.active ? "adm-nav-item--active" : ""}`}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="adm-sidebar__footer">
          <div className="adm-sidebar__quota">
            <div className="adm-sidebar__quota-head">
              <span>Lisans Dağıtım Kotası</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>1.248 / 2.000</span>
            </div>
            <div className="adm-sidebar__quota-bar">
              <div className="adm-sidebar__quota-fill" style={{ width: "62.4%" }} />
            </div>
          </div>

          <div className="adm-sidebar__user">
            <div className="adm-sidebar__user-left">
              <div className="adm-sidebar__avatar" title="Emirhan Demir — Kurucu & Baş Mimar">
                ED
                <span className="adm-sidebar__avatar-dot" />
              </div>
              <div className="adm-sidebar__user-meta">
                <div className="adm-sidebar__user-name">Emirhan Demir</div>
                <div className="adm-sidebar__user-role">Kurucu & Baş Mimar</div>
              </div>
            </div>
            <Link href="/" className="adm-sidebar__site-link" title="Web Sitesine Dön">
              <span className="adm-sidebar__site-link-text">Siteye Git</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Floating Tooltip for Collapsed Icon Rail */}
      {railTooltip && (
        <div
          className="adm-rail-tooltip"
          style={{
            top: `${railTooltip.top}px`,
            left: `${railTooltip.left}px`,
          }}
        >
          <span>{railTooltip.label}</span>
          {railTooltip.badge && (
            <span
              style={{
                background: "rgba(255, 255, 255, 0.16)",
                color: "#34d399",
                padding: "1px 6px",
                borderRadius: "999px",
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
              }}
            >
              {railTooltip.badge}
            </span>
          )}
        </div>
      )}

      {/* Main Container */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar__left">
            <button
              onClick={handleToggleSidebar}
              className="adm-topbar__toggle-btn"
              title="Yan Menüyü Daralt / Genişlet"
              aria-label="Yan Menüyü Daralt veya Genişlet"
            >
              <IconMenu />
            </button>

            <div className="adm-topbar__breadcrumb">
              <span className="adm-topbar__breadcrumb-prefix">Efesoft</span>
              <span className="adm-topbar__breadcrumb-sep adm-topbar__breadcrumb-prefix">/</span>
              <span className="adm-topbar__breadcrumb-prefix">Yönetim</span>
              <span className="adm-topbar__breadcrumb-sep adm-topbar__breadcrumb-prefix">/</span>
              <span className="adm-topbar__breadcrumb-current">
                {isAnalyticsRoute
                  ? "Canlı Trafik & Ziyaretçiler"
                  : isSystemHealthRoute
                  ? "Sunucu & Sistem Sağlığı"
                  : isLeadsRoute
                  ? "Gelen Teklif Talepleri"
                  : isClientsRoute
                  ? "Müşteriler & Şirketler (CRM)"
                  : isPipelineRoute
                  ? "Satış Görüşmeleri & Pipeline"
                  : "Dashboard"}
              </span>
            </div>

            <div className="adm-topbar__status-pill">
              <span className="adm-topbar__status-dot" />
              <span>Tüm Servisler Operasyonel (İzmir & Frankfurt DC)</span>
            </div>
          </div>

          <div className="adm-topbar__right">
            <button
              className="adm-topbar__icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Bildirimler"
              aria-label="Bildirimler"
            >
              <IconBell />
              <span className="adm-topbar__notif-badge" />
            </button>

            <Link
              href="/"
              className="adm-topbar__btn adm-topbar__btn--secondary-hide"
              target="_blank"
            >
              Canlı Siteyi Gör ↗
            </Link>

            <button
              type="button"
              onClick={() => {
                setQuoteSent(false);
                setShowQuoteModal(true);
              }}
              className="adm-topbar__btn adm-topbar__btn--primary"
            >
              + Yeni Teklif Oluştur
            </button>
          </div>
        </header>

        {/* Animated Notifications Dropdown Modal */}
        <div
          className={`adm-dropdown-modal ${
            showNotifications ? "adm-dropdown-modal--open" : ""
          }`}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: 600, fontSize: "13px" }}>Son Bildirimler (3)</span>
            <span
              style={{ fontSize: "11px", color: "var(--adm-primary)", cursor: "pointer", fontWeight: 600 }}
              onClick={() => setShowNotifications(false)}
            >
              Kapat
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
            <div style={{ padding: "8px 10px", background: "var(--adm-surface-2)", borderRadius: "6px", border: "1px solid var(--adm-border-subtle)" }}>
              <b>Yeni Teklif Talebi:</b> Borusan Lojistik ERP Entegrasyonu (4 dk önce)
            </div>
            <div style={{ padding: "8px 10px", background: "var(--adm-surface-2)", borderRadius: "6px", border: "1px solid var(--adm-border-subtle)" }}>
              <b>Lisans Yenileme:</b> Atlas Holding 50 kullanıcı paketi yeniledi (22 dk önce)
            </div>
            <div style={{ padding: "8px 10px", background: "var(--adm-surface-2)", borderRadius: "6px", border: "1px solid var(--adm-border-subtle)" }}>
              <b>Sistem:</b> Frankfurt veritabanı yedeklemesi tamamlandı (1 saat önce)
            </div>
          </div>
        </div>

        {/* Animated Global Quick-Quote Modal */}
        <div
          className={`adm-modal-overlay ${showQuoteModal ? "adm-modal-overlay--open" : ""}`}
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="adm-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-card__head">
              <span className="adm-card__title">Hızlı Kurumsal Teklif & Sözleşme Oluştur</span>
              <span className="adm-badge adm-badge--info">EfeOS PDF Motoru</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setQuoteSent(true);
                window.setTimeout(() => setShowQuoteModal(false), 900);
              }}
              className="adm-card__body"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                    Şirket / Kurum Ünvanı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: KoçSistem A.Ş."
                    style={{
                      height: "32px",
                      padding: "0 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--adm-border)",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                    Çözüm Paketi / Modül
                  </label>
                  <select
                    style={{
                      height: "32px",
                      padding: "0 8px",
                      borderRadius: "6px",
                      border: "1px solid var(--adm-border)",
                      fontSize: "12px",
                      background: "#ffffff",
                    }}
                  >
                    <option>Özel Kurumsal Yazılım & AI</option>
                    <option>EfeERP Enterprise Bulut Lisansı</option>
                    <option>EfeCRM & B2B Bayi Portalı</option>
                    <option>EfePOS Perakende Zincir Paketi</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                    Yetkili E-Posta *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yetkili@sirket.com.tr"
                    style={{
                      height: "32px",
                      padding: "0 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--adm-border)",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--adm-text-secondary)" }}>
                    Teklif Bedeli (₺ + KDV) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: ₺750.000"
                    style={{
                      height: "32px",
                      padding: "0 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--adm-border)",
                      fontSize: "12px",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="adm-topbar__btn"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="adm-topbar__btn adm-topbar__btn--primary"
                  style={{
                    background: quoteSent ? "#1a9e4b" : undefined,
                    borderColor: quoteSent ? "#1a9e4b" : undefined,
                  }}
                >
                  {quoteSent ? "PDF Teklif Hazırlandı & Gönderildi ✓" : "PDF Oluştur & Müşteriye Gönder"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Animated Page Stage (Blur-Out on Leave, Blur-In + Lift on Enter) */}
        <div className={`adm-page-stage ${isPageLeaving ? "adm-page-stage--leaving" : ""}`}>
          <div key={`${pathname}-${activeTab}`} className="adm-page-transition">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
