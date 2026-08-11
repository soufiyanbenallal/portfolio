"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Flat3DFallback } from "./flat-3d-fallback";

const Flat3DIsland = dynamic(
  () => import("./flat-3d-island").then((module) => module.Flat3DIsland),
  {
    ssr: false,
    loading: () => <Flat3DFallback />,
  },
);

export function Flat3DLoader({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      const loadFrame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(loadFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    if (hostRef.current) observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {shouldLoad ? <Flat3DIsland /> : <Flat3DFallback />}
    </div>
  );
}
