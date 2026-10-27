import { Shield } from "./icons";

const PARTNERS = [
  "TURKCELL",
  "GARANTI BBVA",
  "TRENDYOL",
  "BORUSAN",
  "SIEMENS",
  "GETIR",
  "EFE HOLDING",
  "ASELSAN",
  "KORDSA",
  "ECZACIBAŞI",
];

export default function TrustSection() {
  return (
    <section className="trust" aria-label="Referanslarımız ve Partnerler">
      <div className="wrap">
        <p className="trust__label">
          TÜRKİYE&apos;NİN VE DÜNYANIN ÖNCÜ KURUMLARI EFESOFT ALTYAPISINA GÜVENİYOR
        </p>
      </div>

      <div className="marquee">
        <div className="marquee__track" aria-hidden="true">
          {PARTNERS.map((name, i) => (
            <div key={`p1-${i}`} className="marquee__item">
              <Shield />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="marquee__track" aria-hidden="true">
          {PARTNERS.map((name, i) => (
            <div key={`p2-${i}`} className="marquee__item">
              <Shield />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
