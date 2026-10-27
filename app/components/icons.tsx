import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Logo(props: P) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden fill="none" {...props}>
      <defs>
        <linearGradient id="nav-efe-grad" x1="256" y1="50" x2="256" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00b4ff" />
          <stop offset="35%" stopColor="#0084ff" />
          <stop offset="100%" stopColor="#0055e5" />
        </linearGradient>
      </defs>
      <path
        d="M 116 256 H 396 A 140 140 0 0 0 116 256 A 140 140 0 0 0 374.73 330.19"
        stroke="url(#nav-efe-grad)"
        strokeWidth="54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
);

export const CheckCircle = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.12" stroke="none" />
    <path d="M8 12.3l2.7 2.7L16.2 9.5" />
  </svg>
);

export const Globe = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    <path d="M8 14l-2 1.5L8 17M16 14l2 1.5-2 1.5M13 13l-2 5" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
    <path d="M10.5 5.5h3M11 18.5h2" />
  </svg>
);

export const Layers = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
  </svg>
);

export const Cloud = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0118 9a4.5 4.5 0 01-.5 9H7z" />
    <path d="M12 11v5M9.8 13.2L12 11l2.2 2.2" />
  </svg>
);

export const Chart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0113 0" />
    <path d="M16 4.5a3.5 3.5 0 010 7M18 14a6.5 6.5 0 013.5 6" />
  </svg>
);

export const Cart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 4h2.5l2.2 11h10.6L20.5 7H7" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);

export const IdCard = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="9" cy="11" r="2.2" />
    <path d="M5.8 16a3.4 3.4 0 016.4 0M14.5 10h3.5M14.5 13.5h2.5" />
  </svg>
);

export const Doc = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const Rocket = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 4.5c2.8-1 5.2-1 6.5-.9.1 1.3.1 3.7-.9 6.5-1 2.7-3.4 5.4-6.6 7.4l-3.5-3.5c2-3.2 4.7-5.6 7.4-6.6" />
    <path d="M10 13.5L6.5 13l-2 2 4 1M10.5 14l.5 3.5-2 2-1-4" />
    <circle cx="15.5" cy="8.5" r="1.3" />
  </svg>
);

export const Quote = (p: P) => (
  <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden {...p}>
    <path d="M27 14C15.4 17.6 8 26.6 8 38.6 8 46 12.4 51 18.6 51c5.2 0 9-3.8 9-8.8 0-4.8-3.4-8.4-8-8.6 1-5.6 5-10.4 10.8-13L27 14zm27 0c-11.6 3.6-19 12.6-19 24.6C35 46 39.4 51 45.6 51c5.2 0 9-3.8 9-8.8 0-4.8-3.4-8.4-8-8.6 1-5.6 5-10.4 10.8-13L54 14z" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6l8-3z" />
    <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
  </svg>
);
