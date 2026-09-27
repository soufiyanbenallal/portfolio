"use client";

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { projectsData } from "@/data/projects.data";
import { Container } from "@/components/shared/container.shared";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { useMediaQuery, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { PERSPECTIVE, SCROLL, SCROLL_OFFSETS, SPRINGS } from "@/lib/motion.config";
import { HeroCopy } from "./hero/hero-copy.part";
import { HeroMobile } from "./hero/hero-mobile.part";
import { WorkAside } from "./hero/work-aside.part";
import { WorkCard } from "@/components/shared/work-card.shared";
import {
  STAGES,
  buildCardTrack,
  getActiveIndex,
  getCardZIndex,
  getSpreadLayout,
  isCardInteractive,
  ramp,
  sampleTrack,
  type CardTrackType,
  type SpreadLayoutType,
} from "./hero/work-deck.timeline";
import type { ProjectDetailType } from "@/types";

/* ==================================================================== *
 * HERO + SELECTED WORK
 * --------------------------------------------------------------------
 * One pinned stage, read top to bottom by the scrollbar:
 *
 *   hero     the statement on the left, four real projects fanned on the
 *            right (the deck tilts gently toward the pointer)
 *   gather   the copy leaves; the fan folds into a stack in the showcase
 *            column, with the label column on the left
 *   cycle    each front card flicks away to reveal the next
 *   spread   all four laid out side by side, then the way onward
 *
 * The choreography lives in hero/work-deck.timeline.ts as data. This file
 * only wires scroll progress into it. Lenis already smooths the scroll, so
 * progress is used raw — a spring on top would add lag, not smoothness.
 * ==================================================================== */

const FEATURED = projectsData.filter((project) => project.featured).slice(0, 4);

/** Scroll depth of the whole rig. */
const RIG_HEIGHT_VH = 500;

/** Card's horizontal padding inside its slot (px-2). */
const CARD_GUTTER = 16;
const CARD_MAX_WIDTH = 720;
/** Card height from its width: a 16:10 cover plus the footer strip. */
const cardHeightFor = (width: number) => (width * 10) / 16 + 66;

type PhaseType = "hero" | "cycle" | "spread";

const phaseAt = (progress: number): PhaseType =>
  progress <= STAGES.heroEnd + 0.03 ? "hero" : progress >= STAGES.spreadStart ? "spread" : "cycle";

/* -------------------------------------------------------------------- *
 * A card on the deck
 * -------------------------------------------------------------------- */

function DeckCard({
  project,
  index,
  track,
  progress,
  focusable,
}: {
  project: ProjectDetailType;
  index: number;
  track: CardTrackType;
  progress: MotionValue<number>;
  focusable: boolean;
}) {
  const x = useTransform(progress, (p) => sampleTrack(track.x, p));
  const y = useTransform(progress, (p) => sampleTrack(track.y, p));
  const z = useTransform(progress, (p) => sampleTrack(track.z, p));
  const rotate = useTransform(progress, (p) => sampleTrack(track.rotate, p));
  const rotateX = useTransform(progress, (p) => sampleTrack(track.rotateX, p));
  const rotateY = useTransform(progress, (p) => sampleTrack(track.rotateY, p));
  const scale = useTransform(progress, (p) => sampleTrack(track.scale, p));
  const opacity = useTransform(progress, (p) => sampleTrack(track.opacity, p));
  const zIndex = useTransform(progress, (p) => getCardZIndex(index, p));
  const pointerEvents = useTransform(progress, (p) =>
    isCardInteractive(index, p) ? "auto" : "none"
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform select-none"
      style={{
        x,
        y,
        z,
        rotate,
        rotateX,
        rotateY,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        transformPerspective: 2400,
      }}
    >
      <div className="ease-entrance w-full max-w-[720px] px-2 transition-transform duration-300 hover:-translate-y-1.5">
        <WorkCard project={project} focusable={focusable} priority={index === 0} />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- *
 * The pinned rig (desktop)
 * -------------------------------------------------------------------- */

function HeroWorkRig() {
  const rigRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const { scrollYProgress: progress } = useScroll({
    target: rigRef,
    offset: SCROLL_OFFSETS.pinned,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<PhaseType>("hero");
  useMotionValueEvent(progress, "change", (p) => {
    const nextIndex = getActiveIndex(p);
    const nextPhase = phaseAt(p);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    setPhase((current) => (current === nextPhase ? current : nextPhase));
  });

  // The spread fits four cards to the measured frame, so it holds at any width.
  const [layout, setLayout] = useState<SpreadLayoutType>(() => {
    const cardWidth = CARD_MAX_WIDTH - CARD_GUTTER;
    return getSpreadLayout(1118, 844, cardWidth, cardHeightFor(cardWidth));
  });
  useLayoutEffect(() => {
    const element = measureRef.current;
    if (!element) return;
    const measure = () => {
      const style = getComputedStyle(element);
      const inner =
        element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const cardWidth = Math.min(CARD_MAX_WIDTH, inner) - CARD_GUTTER;
      setLayout(getSpreadLayout(inner, element.clientHeight, cardWidth, cardHeightFor(cardWidth)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const tracks = useMemo(() => FEATURED.map((_, index) => buildCardTrack(index, layout)), [layout]);

  // Pointer tilt, hero only: fades out as the copy leaves.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const yaw = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), SPRINGS.tilt);
  const pitch = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), SPRINGS.tilt);
  const heroBlend = useTransform(progress, ramp([0, STAGES.heroEnd], [1, 0]));
  const rigRotateY = useTransform([yaw, heroBlend], ([value, blend]: number[]) => value * blend);
  const rigRotateX = useTransform([pitch, heroBlend], ([value, blend]: number[]) => value * blend);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );
  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  // Copy out, showcase in, spread in.
  const copyOpacity = useTransform(progress, ramp([0.03, 0.11], [1, 0]));
  const copyY = useTransform(progress, ramp([0, 0.12], [0, -48]));
  const showcaseOpacity = useTransform(progress, ramp([0.16, 0.26, 0.86, 0.92], [0, 1, 1, 0]));
  const showcaseY = useTransform(progress, ramp([0.16, 0.26], [32, 0]));
  const spreadOpacity = useTransform(progress, ramp([0.9, 0.96], [0, 1]));
  const spreadY = useTransform(progress, ramp([0.9, 0.96], [16, 0]));

  // The deck's column: right half in the hero, 70% in the showcase, all of it in the spread.
  const stageWidth = useTransform(progress, (p) => {
    if (p <= STAGES.heroEnd) return "50%";
    if (p <= STAGES.gatherEnd)
      return `${50 + 20 * ((p - STAGES.heroEnd) / (STAGES.gatherEnd - STAGES.heroEnd))}%`;
    if (p >= STAGES.spreadStart)
      return `${70 + 30 * Math.min(1, (p - STAGES.spreadStart) / 0.08)}%`;
    return "70%";
  });

  // Jump to a project: each lands mid-hold, between flicks.
  const handleSelect = useCallback(
    (index: number) => {
      const rig = rigRef.current;
      if (!rig) return;
      const targets = [0.34, 0.54, 0.7, 0.85];
      const top = rig.getBoundingClientRect().top + window.scrollY;
      const distance = rig.offsetHeight - window.innerHeight;
      const destination = top + distance * targets[index];
      if (lenis) lenis.scrollTo(destination, { duration: SCROLL.jumpDuration });
      else window.scrollTo({ top: destination });
    },
    [lenis]
  );

  const inShowcase = phase === "cycle";
  const showcaseInteractive = useTransform(progress, (p) =>
    p >= 0.2 && p < 0.88 ? "auto" : "none"
  );
  const spreadInteractive = useTransform(progress, (p) => (p >= 0.9 ? "auto" : "none"));
  const copyInteractive = useTransform(progress, (p) => (p < 0.1 ? "auto" : "none"));

  return (
    <div
      ref={rigRef}
      id="hero"
      className="relative w-full"
      style={{ height: `${RIG_HEIGHT_VH}vh` }}
    >
      {/* Anchor for "See the work": lands with the first project at the front. */}
      <div id="projects" className="pointer-events-none absolute top-[28%]" aria-hidden="true" />

      <div
        className="sticky top-(--nav-h) h-[calc(100vh-var(--nav-h))] w-full overflow-hidden"
        style={{ perspective: PERSPECTIVE.far }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* 1 · Statement */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center"
          style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyInteractive }}
        >
          <Container>
            <div className="w-1/2 pr-8">
              <HeroCopy />
            </div>
          </Container>
        </motion.div>

        {/* 2 · Showcase: heading row + label column */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col"
          style={{ opacity: showcaseOpacity, y: showcaseY, pointerEvents: showcaseInteractive }}
          aria-hidden={!inShowcase}
        >
          <Container className="border-line flex items-end justify-between gap-6 border-b pt-8 pb-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-ink-faint">Selected work</span>
              <h2 className="text-ink text-[32px] leading-[1.08] font-medium tracking-[-0.035em]">
                Built and published. <span className="text-ink-soft">Open any of it.</span>
              </h2>
            </div>
            <span className="text-ink-faint font-mono text-[11px]">
              {FEATURED.length} of {projectsData.length} projects · npm, GitHub &amp; live
            </span>
          </Container>
          <Container className="flex flex-1 items-center">
            <div className="w-[30%] shrink-0">
              <WorkAside
                projects={FEATURED}
                activeIndex={activeIndex}
                progress={progress}
                onSelect={handleSelect}
              />
            </div>
          </Container>
        </motion.div>

        {/* 3 · Spread: heading */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-10 z-20"
          style={{ opacity: spreadOpacity, y: spreadY }}
        >
          <Container className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-label text-ink-faint">Selected work</span>
            <h2 className="text-ink text-[28px] leading-[1.1] font-medium tracking-[-0.035em]">
              Four projects, all public. <span className="text-ink-soft">Open any of them.</span>
            </h2>
          </Container>
        </motion.div>

        {/* 4 · The deck */}
        <motion.div
          className="stage-3d absolute inset-0 z-10"
          style={{ rotateX: rigRotateX, rotateY: rigRotateY }}
        >
          <Container className="flex h-full items-center">
            <div ref={measureRef} className="absolute inset-0 px-4 sm:px-10" aria-hidden="true" />
            <motion.div
              className="relative ml-auto flex h-full items-center justify-center"
              style={{ width: stageWidth }}
            >
              {FEATURED.map((project, index) => (
                <DeckCard
                  key={project.id}
                  project={project}
                  index={index}
                  track={tracks[index]}
                  progress={progress}
                  focusable={phase !== "cycle" || index === activeIndex}
                />
              ))}
            </motion.div>
          </Container>
        </motion.div>

        {/* 5 · Spread: the way onward */}
        <motion.div
          className="absolute inset-x-0 bottom-8 z-30"
          style={{ opacity: spreadOpacity, y: spreadY, pointerEvents: spreadInteractive }}
        >
          <Container className="flex items-center justify-center gap-2">
            <Link
              href="/projects"
              transitionTypes={["nav-forward"]}
              className="btn-primary inline-flex h-10 items-center gap-2 px-4 text-[13px] font-medium"
            >
              All projects
              <Icons.ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-config='{"layout":"month_view"}'
              data-cursor="grow"
              className="btn-secondary inline-flex h-10 cursor-pointer items-center gap-2 px-4 text-[13px] font-medium"
            >
              <Icons.Calendar className="h-3.5 w-3.5" />
              Start a project
            </button>
          </Container>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Entry
 * -------------------------------------------------------------------- */

export function HeroProjectsUnifiedPart() {
  const prefersReducedMotion = useReducedMotionSafe();
  const hasRoom = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");

  if (prefersReducedMotion || !hasRoom) return <HeroMobile projects={FEATURED} />;
  return <HeroWorkRig />;
}
