"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductsScene from "./ProductsScene";
import { ArrowRight, CheckCircle, Chart, Users, Cart, IdCard } from "./icons";

gsap.registerPlugin(ScrollTrigger);

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  desc: string;
  color: string;
  icon: typeof Chart;
  features: string[];
  licenseType: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "efe-erp",
    name: "EfeERP Enterprise",
    tagline: "Uçtan Uca Kurumsal Kaynak Planlama",
    category: "LİSANSLI KURUMSAL YAZILIM",
    desc: "Üretimden finansa, stok takibinden e-Dönüşüm (e-Fatura, e-İrsaliye) entegrasyonlarına kadar tüm şirket operasyonlarınızı tek bir merkezi bulut panelinden yönetin.",
    color: "#0071e3",
    icon: Chart,
    features: [
      "Gerçek zamanlı depo ve çoklu şube stok senkronizasyonu",
      "GİB onaylı tam e-Fatura, e-Arşiv ve e-Defter modülü",
      "Üretim reçeteleri, MRP ve maliyet analitiği",
      "Açık API mimarisi ve banka/pazaryeri entegrasyonları",
    ],
    licenseType: "Yıllık SaaS veya Süresiz On-Premise Lisans",
  },
  {
    id: "efe-crm",
    name: "EfeCRM Omni",
    tagline: "360° Müşteri & Satış Otomasyonu",
    category: "LİSANSLI SATIŞ YAZILIMI",
    desc: "Müşteri adaylarınızı sadık müşterilere dönüştürün. WhatsApp Business, IP Santral ve e-Posta kanallarını birleştiren omnichannel iletişim platformu.",
    color: "#ff2d55",
    icon: Users,
    features: [
      "Görsel Kanban satış hattı (Deal Pipeline) yönetimi",
      "Tek tıkla WhatsApp ve SMS üzerinden teklif gönderme",
      "Yapay zeka destekli müşteri kayıp (churn) tahminleme",
      "Detaylı satış ekibi KPI ve prim raporlama motoru",
    ],
    licenseType: "Kullanıcı Başına Lisanslama & Ekip Planları",
  },
  {
    id: "efe-pos",
    name: "EfePOS Cloud",
    tagline: "Yeni Nesil Perakende & Restoran Otomasyonu",
    category: "LİSANSLI PERAKENDE SİSTEMİ",
    desc: "Restoranlar, kafeler ve perakende mağazaları için tasarlanmış yüksek hızlı bulut kasa. İnternet kopsa dahi kesintisiz satış yapabilen offline-first mimari.",
    color: "#30d158",
    icon: Cart,
    features: [
      "Dokunmatik ekran ve el terminali uyumlu ultra hızlı arayüz",
      "Mutfak sipariş ekranı (KDS) ve QR menü entegrasyonu",
      "Yemeksepeti, Trendyol Yemek ve Getir tek ekranda",
      "Gün sonu Z raporu ve anlık ciro bildirimleri",
    ],
    licenseType: "Cihaz Başına Aylık/Yıllık Lisanslama",
  },
  {
    id: "efe-hr",
    name: "EfeHR Portal",
    tagline: "Modern İnsan Kaynakları & Bordro",
    category: "LİSANSLI İK ÇÖZÜMÜ",
    desc: "Çalışanlarınızın izin, masraf, zimmet ve bordro süreçlerini dijitalleştirin. Şirket içi iletişimi ve performans değerlendirmelerini tek merkezde toplayın.",
    color: "#af52de",
    icon: IdCard,
    features: [
      "Mobil izin talep, onay ve kalan izin takibi",
      "SGK uyumlu otomatik bordro hesaplama ve dağıtımı",
      "360 derece çalışan performans değerlendirme anketleri",
      "Akıllı vardiya planlama ve parmak izi/yüz tanıma entegrasyonu",
    ],
    licenseType: "Kişi Sayısına Göre Esnek Kurumsal Lisans",
  },
];

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gsap.utils.toArray<HTMLElement>(".product");

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const activeProduct = PRODUCTS[activeIndex];

  return (
    <section ref={sectionRef} id="urunler" className="section products">
      <div className="wrap">
        <div className="section__head section__head--center">
          <span className="eyebrow">HAZIR &amp; LİSANSLI YAZILIMLAR</span>
          <h2 className="h2">
            Kanıtlanmış altyapı, <br />
            <span className="text-gradient">anında devreye alma.</span>
          </h2>
          <p className="lead">
            Aylar süren geliştirme süreçlerini beklemek zorunda değilsiniz. Sektörünüzde yüzlerce
            şirket tarafından test edilmiş, lisanslı ve tam uyumlu hazır yazılım paketlerimizle
            hemen bugün kullanmaya başlayın.
          </p>
        </div>

        <div className="products__grid">
          {/* Sticky 3D Interactive Stage */}
          <div className="products__stage glass glass--refract">
            <div
              className="products__stage-bg"
              style={{ "--accent": activeProduct.color } as React.CSSProperties}
            />
            {/* Three.js 3D Interactive Morphing Artifacts */}
            <ProductsScene activeIndex={activeIndex} />

            {/* Stage Floating HUD */}
            <div className="products__hud glass" data-spot>
              <div>
                <div className="products__hud-name">{activeProduct.name}</div>
                <div className="products__hud-sub">{activeProduct.tagline}</div>
              </div>

              <div className="products__dots" role="tablist" aria-label="Ürün seçimi">
                {PRODUCTS.map((p, idx) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-label={p.name}
                    aria-selected={activeIndex === idx}
                    aria-current={activeIndex === idx ? "true" : undefined}
                    onClick={() => {
                      setActiveIndex(idx);
                      const el = document.getElementById(p.id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling Product Cards */}
          <div className="products__list">
            {PRODUCTS.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeIndex === idx;

              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="product"
                  data-active={isActive}
                  style={{ "--pc": item.color } as React.CSSProperties}
                >
                  <div className="product__badge">
                    <div className="product__logo">
                      <IconComp />
                    </div>
                    <div>
                      <span className="product__label">{item.category}</span>
                      <h3 className="product__name">{item.name}</h3>
                    </div>
                  </div>

                  <p className="product__tagline">{item.tagline}</p>
                  <p className="product__desc">{item.desc}</p>

                  <ul className="product__features">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="product__actions">
                    <a
                      href="#iletisim"
                      className="btn btn--primary"
                      id={`demo-btn-${item.id}`}
                    >
                      Canlı Demo Talep Edin
                      <ArrowRight />
                    </a>
                    <span className="product__license">
                      Lisans Modeli: <b>{item.licenseType}</b>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
