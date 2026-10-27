"use client";

import { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("3D Ortam hazırlanıyor...");
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const is3DReadyRef = useRef(false);

  useEffect(() => {
    // Check if 3D scene was already marked ready
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __efesoft_3d_ready?: boolean }).__efesoft_3d_ready
    ) {
      is3DReadyRef.current = true;
    }

    const on3DReady = () => {
      is3DReadyRef.current = true;
    };

    window.addEventListener("efesoft:3d-ready", on3DReady);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const is3DReady = is3DReadyRef.current;

      setProgress((prev) => {
        let next: number;
        if (is3DReady) {
          // Accelerate to 100% once 3D is ready
          next = prev + Math.floor(Math.random() * 8) + 6;
        } else {
          // Smooth progressive loading up to 88% while waiting
          if (prev < 40) {
            next = prev + Math.floor(Math.random() * 4) + 2;
          } else if (prev < 75) {
            next = prev + Math.floor(Math.random() * 3) + 1;
          } else if (prev < 88) {
            next = prev + 1;
          } else {
            next = 88; // Hold briefly at 88% until 3D engine fires ready
          }
        }

        // Safety fallback: if 2000ms have elapsed, force complete
        if (elapsed > 2000) {
          next = 100;
        }

        if (next >= 100) {
          next = 100;
          clearInterval(interval);
          setStatusText("Hazır!");
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
              setShouldRender(false);
            }, 500);
          }, 240);
        } else if (next > 75) {
          setStatusText("3D Liquid Glass ve gölgelendiriciler derleniyor...");
        } else if (next > 40) {
          setStatusText("WebGL 3D motoru başlatılıyor...");
        } else {
          setStatusText("Sistem bileşenleri yükleniyor...");
        }

        return next;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("efesoft:3d-ready", on3DReady);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <aside
      className={`ef-loader ${isLoaded ? "ef-loader--exit" : ""}`}
      aria-label="Sayfa yükleniyor"
      aria-live="polite"
    >
      {/* Background blur & ambient glow */}
      <div className="ef-loader__backdrop" />
      <div className="ef-loader__ambient" aria-hidden />

      <div className="ef-loader__card glass">
        {/* Animated 3D Glass Symbol */}
        <div className="ef-loader__symbol" aria-hidden>
          <div className="ef-loader__ring ef-loader__ring--1" />
          <div className="ef-loader__ring ef-loader__ring--2" />
          <div className="ef-loader__orb">
            <span className="ef-loader__logo-text">E</span>
          </div>
        </div>

        {/* Brand & Title */}
        <div className="ef-loader__brand">
          <div className="ef-loader__logo">
            EFESOFT
            <span className="ef-loader__badge">3D STUDIO</span>
          </div>
          <p className="ef-loader__status">{statusText}</p>
        </div>

        {/* Progress bar container */}
        <div className="ef-loader__progress-wrap">
          <div className="ef-loader__bar">
            <div
              className="ef-loader__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ef-loader__meta">
            <span className="ef-loader__substatus">Liquid Glass WebGL</span>
            <span className="ef-loader__percent">{progress}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
