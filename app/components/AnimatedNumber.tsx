"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 550,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(value);
  const currentRef = useRef(value);
  const startValRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // If value hasn't changed, do nothing
    if (currentRef.current === value) return;

    startValRef.current = currentRef.current;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextVal = startValRef.current + (value - startValRef.current) * ease;

      currentRef.current = nextVal;
      setCurrent(nextVal);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        currentRef.current = value;
        setCurrent(value);
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [value, duration]);

  // Format value with Turkish locale formatting
  const formatted = decimals > 0
    ? current.toLocaleString("tr-TR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.round(current).toLocaleString("tr-TR");

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
