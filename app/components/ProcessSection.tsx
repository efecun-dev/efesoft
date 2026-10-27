"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    num: "01",
    title: "Keşif & Mimari Planlama",
    text: "İş süreçlerinizi, hedeflerinizi ve teknik kısıtlarınızı analiz eder; ölçeklenebilir sistem mimarisini ve veri modelini çıkarırız.",
    time: "1 - 2 Hafta",
  },
  {
    num: "02",
    title: "UI/UX & Prototipleme",
    text: "Apple ve modern web standartlarında sezgisel arayüzler tasarlar, tıklanabilir prototiplerle ekibinizin onayına sunarız.",
    time: "2 - 3 Hafta",
  },
  {
    num: "03",
    title: "Çevik Kodlama & Test (QA)",
    text: "İki haftalık çevik sprintlerle kodlar, otomatik testler ve güvenlik denetimleriyle hatasız bir kod tabanı inşa ederiz.",
    time: "4 - 8 Hafta",
  },
  {
    num: "04",
    title: "Canlıya Alma & 7/24 Destek",
    text: "Sıfır veri kaybı ve kesintiyle canlıya alır; lisanslı ürünlerimiz ve özel projeleriniz için 7/24 kesintisiz destek veririz.",
    time: "Sürekli Destek",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) {
        gsap.set(".process__progress", { scaleX: 1 });
        return;
      }

      gsap.to(".process__progress", {
        scrollTrigger: {
          trigger: ".process__track",
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.8,
        },
        scaleX: 1,
        ease: "none",
      });

      gsap.from(".step", {
        scrollTrigger: {
          trigger: ".process__track",
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="surec" className="section process">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow">ÇALIŞMA METODOLOJİMİZ</span>
          <h2 className="h2">
            Fikirden canlı ürüne, <br />
            <span className="text-gradient">şeffaf ve çevik süreç.</span>
          </h2>
          <p className="lead">
            Yazılım geliştirme sürecini bir kara kutu olmaktan çıkarıyoruz. Canlı demo
            ortamları, sprint raporları ve düzenli toplantılarla her adımdan haberdar olursunuz.
          </p>
        </div>

        <div className="process__track">
          <div className="process__line">
            <div className="process__progress" />
          </div>

          {STEPS.map((s, idx) => (
            <div key={idx} className="step glass glass--refract" data-spot>
              <div className="step__header">
                <div className="step__num">
                  {s.num}
                </div>
                <span className="step__time">{s.time}</span>
              </div>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
