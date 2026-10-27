"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";

export default function CtaSection() {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setContact("");
    }, 800);
  };

  return (
    <section id="iletisim" className="section cta">
      <div className="wrap">
        <div className="cta__panel glass glass--refract" data-spot>
          {/* Internal ambient glowing orbs */}
          <div className="ambient" aria-hidden>
            <div
              className="ambient__orb"
              style={
                {
                  "--c1": "#2997ff",
                  "--c2": "#5e5ce6",
                  "--s": "520px",
                  "--o": "0.55",
                  top: "-20%",
                  left: "10%",
                  "--dx": "60px",
                  "--dy": "40px",
                } as React.CSSProperties
              }
            />
            <div
              className="ambient__orb"
              style={
                {
                  "--c1": "#9a5cf5",
                  "--c2": "#ff6b5a",
                  "--s": "480px",
                  "--o": "0.45",
                  bottom: "-25%",
                  right: "15%",
                  "--dx": "-50px",
                  "--dy": "-30px",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="cta__inner">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              BİRLİKTE ÜRETELİM
            </span>
            <h2 className="cta__title">
              Şirketinizin dijital geleceğini <br />
              <span className="text-gradient">bugün inşa edelim.</span>
            </h2>
            <p className="cta__text">
              İster sıfırdan kurumsal özel yazılım projeniz için teklif alın,
              ister lisanslı hazır ürünlerimizin canlı demosunu şirketinizde deneyimleyin.
            </p>

            {status === "success" ? (
              <div className="cta__success glass">
                <div className="cta__success-icon">
                  <Check />
                </div>
                <span>Talebiniz alındı! Uzmanımız 15 dakika içinde sizi arayacak.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cta__form glass" id="lead-form">
                <input
                  type="text"
                  required
                  placeholder="İş e-postanız veya telefon numaranız"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  aria-label="İletişim adresi"
                  disabled={status === "submitting"}
                />
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status === "submitting"}
                  id="lead-submit-btn"
                >
                  {status === "submitting" ? "Gönderiliyor..." : "Görüşme Başlat"}
                  <ArrowRight />
                </button>
              </form>
            )}

            <p className="cta__fine" data-state={status === "success" ? "ok" : undefined}>
              {status === "success"
                ? "Bilgileriniz KVKK kapsamında %100 güvende saklanır."
                : "Bilgileriniz KVKK kapsamında saklanır, spam e-posta göndermeyiz."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
