import { Logo } from "./icons";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="nav__logo" style={{ marginBottom: "8px" }}>
              <Logo />
              <span>Efesoft<span style={{ color: "#00a2ff", fontWeight: 900 }}>.</span></span>
            </a>
            <p>
              Kurumlara özel yazılım geliştirme ve yeni nesil lisanslı kurumsal
              yazılım ürünleri. İzmir &amp; İstanbul Ar-Ge Merkezleri.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "18px",
                fontSize: "12px",
                color: "#1a9e4b",
                background: "rgba(48, 209, 88, 0.12)",
                padding: "4px 10px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#30d158",
                }}
              />
              Tüm Bulut Sistemleri Operasyonel (%99.98)
            </div>
          </div>

          <div className="footer__col">
            <h3>ÖZEL YAZILIM</h3>
            <ul>
              <li>
                <a href="#hizmetler">Web &amp; Kurumsal Portallar</a>
              </li>
              <li>
                <a href="#hizmetler">iOS &amp; Android Mobil Uygulamalar</a>
              </li>
              <li>
                <a href="#hizmetler">ERP &amp; Süreç Entegrasyonları</a>
              </li>
              <li>
                <a href="#hizmetler">Yapay Zeka &amp; LLM Ajanları</a>
              </li>
              <li>
                <a href="#hizmetler">DevSecOps &amp; Bulut Mimarisi</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>LİSANSLI ÜRÜNLER</h3>
            <ul>
              <li>
                <a href="#urunler">EfeERP Enterprise</a>
              </li>
              <li>
                <a href="#urunler">EfeCRM Omni</a>
              </li>
              <li>
                <a href="#urunler">EfePOS Cloud</a>
              </li>
              <li>
                <a href="#urunler">EfeHR Portal</a>
              </li>
              <li>
                <a href="#lisanslama">Lisans &amp; Fiyatlandırma</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>KURUMSAL</h3>
            <ul>
              <li>
                <a href="#surec">Çalışma Sürecimiz</a>
              </li>
              <li>
                <a href="#top">Ar-Ge &amp; İnovasyon</a>
              </li>
              <li>
                <a href="#iletisim">Teklif Talebi</a>
              </li>
              <li>
                <a href="#top">ISO 27001 Güvenlik</a>
              </li>
              <li>
                <a href="#top">Kariyer (Açık Pozisyonlar)</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Efesoft Yazılım Teknolojileri A.Ş. Tüm hakları saklıdır.</p>
          <nav aria-label="Yasal bağlantılar">
            <a href="#top">Gizlilik Politikası</a>
            <a href="#top">Kullanım Koşulları</a>
            <a href="#top">KVKK Aydınlatma Metni</a>
            <a href="#top">Çerez Tercihleri</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
