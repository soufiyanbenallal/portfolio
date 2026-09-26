"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PERSPECTIVE } from "@/lib/motion.config";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==================================================================== *
 * SERVICE STACK
 * --------------------------------------------------------------------
 * A pinned scroll rig in two acts, scrubbed by one GSAP timeline so both
 * stay in lockstep with the scrollbar rather than drifting against it:
 *
 *   1. Dock   — the full-bleed panel shrinks and slides into a card
 *               docked at the left, exactly like a window being resized
 *               into a thumbnail.
 *   2. Switch — the remaining items advance through a 3D deck: the active
 *               card sits flat and forward; the next card waits just
 *               behind it, small and nearly-transparent, as a depth cue
 *               rather than a second readable layer. On advance the active
 *               card peels forward-and-out while the next rises into its
 *               place.
 *
 * Every card except the active one is held at (near) zero opacity. Two
 * cards occupy the same screen rectangle by design — the switch only reads
 * cleanly if exactly one of them is ever legible at a time, so each card's
 * own timeline slice (arrive → hold → depart) never overlaps its neighbour's
 * hold window; only the fully-transparent lead-in touches it.
 *
 * GSAP's scrubbed timeline (rather than Motion's `useScroll` + per-value
 * `useTransform`) is what makes this practical for N cards: one timeline
 * owns every card's tween across the whole scroll range, so nothing has to
 * reverse-engineer "am I 2 cards behind the active one" from a single
 * progress value.
 * ==================================================================== */

const DOCK = {
  left: 4,
  right: 50,
  radius: 24,
  dockPhase: 0.26,
  get width() {
    return 100 - this.left - this.right;
  },
  get scale() {
    return this.width / 100;
  },
  get verticalInset() {
    return (100 - this.width) / 2;
  },
  get originX() {
    const targetCentre = this.left + this.width / 2;
    return (targetCentre - this.scale * 50) / (1 - this.scale);
  },
} as const;

export type ServiceStackItemStateType = {
  index: number;
  isActive: boolean;
};

export type ServiceStackPropsType<T> = {
  panel: React.ReactNode;
  panelOverlay?: React.ReactNode;
  items: readonly T[];
  renderItem: (item: T, state: ServiceStackItemStateType) => React.ReactNode;
  /** Viewport heights of scroll spent per card during the switch phase. */
  scrollPerItem?: number;
  className?: string;
  id?: string;
};

export function ServiceStack<T>({
  panel,
  panelOverlay,
  items,
  renderItem,
  scrollPerItem = 0.62,
  className,
  id,
}: ServiceStackPropsType<T>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelWindowRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReducedMotion = useReducedMotionSafe();
  const isDesktop = useIsDesktop();
  const rigEnabled = isDesktop && !prefersReducedMotion;

  const total = items.length;
  const sectionHeightVh = useMemo(
    () => (total * scrollPerItem + 1.15) * 100,
    [total, scrollPerItem]
  );

  useGSAP(
    () => {
      if (!rigEnabled) return;
      const section = sectionRef.current;
      const panelWindow = panelWindowRef.current;
      const panelInner = panelInnerRef.current;
      if (!section || !panelWindow || !panelInner) return;

      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      gsap.set(cards, { transformPerspective: PERSPECTIVE.base });

      // The stage is held by CSS `position: sticky` rather than GSAP's `pin`.
      // Pinning swaps the stage to `position: fixed` and back on the main
      // thread, which reads as a one-frame jolt at both ends under smooth
      // scroll; sticky is resolved by the compositor, so there is no swap.
      // `scrub: true` because Lenis has already smoothed the scroll — a
      // numeric scrub would stack a second lag and drift behind the hero rig.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress < DOCK.dockPhase) {
              setActiveIndex((current) => (current === 0 ? current : 0));
              return;
            }
            const span = (1 - DOCK.dockPhase) / total;
            const next = Math.min(total - 1, Math.floor((self.progress - DOCK.dockPhase) / span));
            setActiveIndex((current) => (current === next ? current : next));
          },
        },
      });

      /* -- Act 1: dock -- */
      timeline.fromTo(
        panelWindow,
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
        },
        {
          clipPath: `inset(${DOCK.verticalInset}% ${DOCK.right}% ${DOCK.verticalInset}% ${DOCK.left}% round ${DOCK.radius}px)`,
          ease: "none",
          duration: DOCK.dockPhase,
        },
        0
      );
      timeline.fromTo(
        panelInner,
        { scale: 1, transformOrigin: `${DOCK.originX}% 50%` },
        { scale: DOCK.scale, ease: "none", duration: DOCK.dockPhase },
        0
      );

      /* -- Act 2: switch — each card owns a slice of the remaining timeline -- */
      const switchSpan = 1 - DOCK.dockPhase;
      const perCard = switchSpan / total;
      // Fraction of a card's own slice spent arriving / holding / departing.
      const ARRIVE = 0.3;
      const DEPART = 0.26;
      // How much of the *next* card's arrive overlaps this card's depart —
      // short enough that the outgoing card is already near-invisible
      // before the incoming one becomes legible.
      const CROSSFADE = 0.12;

      cards.forEach((card, index) => {
        const cardStart = DOCK.dockPhase + index * perCard;
        const departStart = cardStart + perCard - perCard * DEPART - perCard * CROSSFADE;

        // Every card starts fully hidden a beat behind the deck, so the
        // pre-arrive state never competes for legibility with whichever
        // card is currently active.
        gsap.set(card, {
          z: -140,
          y: 40,
          scale: 0.88,
          opacity: 0,
          rotateX: 6,
          filter: "blur(5px)",
        });

        // Arrive: rises from behind the deck into the active slot.
        timeline.to(
          card,
          {
            z: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: perCard * ARRIVE,
          },
          cardStart
        );

        // Hold at full legibility, then depart forward-and-away, fully
        // transparent well before the next card's own hold begins.
        if (index < total - 1) {
          timeline.to(
            card,
            {
              z: 200,
              y: -32,
              scale: 1.05,
              opacity: 0,
              rotateX: -5,
              filter: "blur(7px)",
              ease: "power1.in",
              duration: perCard * DEPART,
            },
            departStart
          );
        }
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef, dependencies: [rigEnabled, total, scrollPerItem] }
  );

  useLayoutEffect(() => {
    if (!rigEnabled) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [rigEnabled, total]);

  if (!rigEnabled) {
    return (
      <section id={id} className={cn("relative w-full", className)}>
        <div className="border-gray-30 rounded-panel relative min-h-[62vh] w-full overflow-hidden border">
          {panel}
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index}>{renderItem(item, { index, isActive: true })}</div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative w-full", className)}
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={panelWindowRef}
          className="absolute inset-0 z-10 will-change-[clip-path]"
          style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        >
          <div ref={panelInnerRef} className="h-full w-full">
            {panel}
          </div>
        </div>

        {panelOverlay && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${DOCK.left}%`,
              right: `${DOCK.right}%`,
              top: `${DOCK.verticalInset}%`,
              bottom: `${DOCK.verticalInset}%`,
            }}
          >
            {panelOverlay}
          </div>
        )}

        <div
          className="absolute inset-y-0 z-30 flex flex-col justify-center"
          style={{
            left: `${100 - DOCK.right + 3}%`,
            right: "4%",
            perspective: PERSPECTIVE.base,
          }}
        >
          <div className="relative h-[64%] w-full" style={{ transformStyle: "preserve-3d" }}>
            {items.map((item, index) => (
              <div
                key={index}
                className="absolute inset-x-0 top-1/2 flex -translate-y-1/2"
                style={{ transformStyle: "preserve-3d", pointerEvents: "none" }}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="w-full will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: activeIndex === index ? "auto" : "none",
                  }}
                  aria-hidden={activeIndex !== index}
                >
                  {renderItem(item, { index, isActive: activeIndex === index })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
