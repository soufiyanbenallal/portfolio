"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section currently owns the viewport.
 *
 * An IntersectionObserver with a band-shaped root margin is used instead of a
 * scroll listener: the callback only fires when a boundary is actually
 * crossed, so idle scrolling costs nothing. The band sits in the upper third
 * of the viewport, which matches where a reader's attention is — anchoring on
 * the exact centre makes the indicator flip late on tall sections.
 */
export function useActiveSection(sectionIds: string[], enabled = true): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return activeId;
}
