import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * SF Pro is Apple's system font: it renders natively on macOS / iOS via the
 * `-apple-system` stack in globals.css. Inter (metrically very close to SF Pro)
 * is self-hosted as the fallback for Windows / Android / Linux.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Efesoft — Özel Yazılım Geliştirme & Lisanslı Kurumsal Yazılımlar",
  description:
    "Efesoft; kurumlara özel web, mobil ve yapay zeka çözümleri geliştirir. EfeERP, EfeCRM, EfePOS gibi lisanslı hazır yazılımlarıyla işletmenizi dijitalde büyütür.",
  keywords: [
    "özel yazılım",
    "yazılım şirketi",
    "ERP yazılımı",
    "CRM",
    "POS",
    "lisanslı yazılım",
    "mobil uygulama",
    "İzmir yazılım",
  ],
  openGraph: {
    title: "Efesoft — Yazılımı işinize göre şekillendiriyoruz",
    description:
      "Özel yazılım geliştirme ve lisanslı kurumsal ürünler. 250+ proje, 1.200+ aktif lisans.",
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>
        <noscript>
          <style>{`.hero [data-hero],.hero [data-hero-widget]{opacity:1!important}.hero__title{visibility:visible!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
