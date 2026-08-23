import type { Transition, Variants, UseScrollOptions } from "motion/react";

/* ==================================================================== *
 * MOTION DESIGN SYSTEM
 * --------------------------------------------------------------------
 * Every animation in the portfolio pulls its timing, curve and spring
 * from this file. Nothing hardcodes a duration or a bezier inline — that
 * is what keeps 40+ animated surfaces feeling like one continuous piece
 * of choreography instead of a pile of independent effects.
 *
 * Reading order:
 *   1. Primitives  — durations, easings, springs, perspective
 *   2. Variants    — reusable enter/exit choreography
 *   3. Scroll      — offsets + spring presets for scroll-linked motion
 * ==================================================================== */

/* -------------------------------------------------------------------- *
 * 1. PRIMITIVES
 * -------------------------------------------------------------------- */

export type CubicBezierType = readonly [number, number, number, number];

/**
 * Duration scale. Anything under `fast` reads as "instant feedback",
 * anything over `slow` reads as "cinematic" and must be scroll-linked
 * (never time-linked) so the user stays in control of the pacing.
 */
export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  base: 0.5,
  slow: 0.75,
  slower: 1,
  cinematic: 1.4,
} as const;

export const EASINGS = {
  /** Signature curve — hangs, then snaps. Headlines and section titles. */
  editorial: [0.68, 0, 0.22, 0.83] as const,
  /** Neutral UI curve for hovers, toggles and colour changes. */
  standard: [0.4, 0, 0.2, 1] as const,
  /** Expo-out. Default for anything entering the viewport. */
  entrance: [0.16, 1, 0.3, 1] as const,
  /** Expo-in. Default for anything leaving. Fast off-screen, no lingering. */
  exit: [0.7, 0, 0.84, 0] as const,
  /** Gentle overshoot for pills, badges and counters. */
  overshoot: [0.34, 1.56, 0.64, 1] as const,
  /** Symmetrical — only for looping ambient motion so it never "lands". */
  mirror: [0.44, 0, 0.56, 1] as const,
  /** Long calm drift for parallax layers and 3D rigs. */
  drift: [0.22, 1, 0.36, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
} satisfies Record<string, CubicBezierType>;

/**
 * Springs are used wherever motion is driven by a continuous input
 * (pointer, scroll, drag). Time-based easing is used wherever motion is
 * driven by a discrete event (mount, click, route change).
 */
export const SPRINGS = {
  /** Follows the pointer. Fast enough to feel attached, damped enough not to jitter. */
  pointer: { stiffness: 350, damping: 30, mass: 0.6 },
  /** Magnetic buttons — softer, with a touch of trailing weight. */
  magnetic: { stiffness: 260, damping: 22, mass: 0.5 },
  /** 3D card rigs reacting to pointer position. */
  tilt: { stiffness: 220, damping: 26, mass: 0.7 },
  /** Snappy scroll smoothing that tracks the viewport in real time. */
  scroll: { stiffness: 380, damping: 40, mass: 0.2, restDelta: 0.0005 },
  /** Crisp scroll smoothing for large rigs without delayed trailing. */
  scrollHeavy: { stiffness: 300, damping: 36, mass: 0.25, restDelta: 0.0005 },
  /** The project deck hand-off between hero and showcase. */
  deck: { stiffness: 1000, damping: 130, mass: 1 },
  page: { stiffness: 500, damping: 60, mass: 1 },
  nav: { type: "spring" as const, duration: 0.6, bounce: 0.15 },
  dialog: { type: "spring" as const, duration: 0.4, bounce: 0.1 },
  accordion: { type: "spring" as const, duration: 0.45, bounce: 0.05 },
  /** Shared-layout indicator pills (`layoutId`). */
  indicator: { type: "spring" as const, duration: 0.45, bounce: 0.2 },
  /** Carousel slots — enough weight that a flick overshoots and settles. */
  carousel: { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.9 },
} as const;

/** Perspective depth used by every 3D surface, so parallel planes agree. */
export const PERSPECTIVE = {
  /** Tight — small cards, buttons, badges. Exaggerated depth. */
  near: 800,
  /** Default for project cards and detail panels. */
  base: 1200,
  /** Wide — full section rigs, where a tight perspective would skew edges. */
  far: 2000,
} as const;

/* -------------------------------------------------------------------- *
 * 2. VARIANTS
 * -------------------------------------------------------------------- */

/** Standard in-view trigger. Fires once, a quarter of the way in. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

/** Earlier trigger for tall blocks that would otherwise animate off-screen. */
export const VIEWPORT_EARLY = { once: true, margin: "-10% 0px -20% 0px" } as const;

export const transitionOf = (
  duration: number = DURATIONS.base,
  ease: CubicBezierType = EASINGS.entrance,
  delay = 0,
): Transition => ({ duration, ease, delay });

/**
 * Parent orchestrator. Children with the matching variant names inherit
 * the `animate` state and fire in sequence.
 */
export const staggerContainer = (
  stagger = 0.07,
  delayChildren = 0,
): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren: stagger, delayChildren } },
  exit: { transition: { staggerChildren: stagger / 2, staggerDirection: -1 } },
});

/** The workhorse: rise + fade + de-blur. Used for most copy blocks. */
export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionOf(DURATIONS.slow, EASINGS.entrance),
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(6px)",
    transition: transitionOf(DURATIONS.fast, EASINGS.exit),
  },
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitionOf(DURATIONS.base) },
  exit: { opacity: 0, transition: transitionOf(DURATIONS.fast, EASINGS.exit) },
};

/**
 * Line-by-line headline reveal. The parent clips overflow, the child
 * starts fully below the clip and rotates up on the X axis so the text
 * reads as a physical strip turning towards the reader.
 */
export const maskLineVariants: Variants = {
  initial: { y: "115%", rotateX: 55, opacity: 0 },
  animate: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: transitionOf(DURATIONS.slower, EASINGS.editorial),
  },
  exit: {
    y: "-115%",
    rotateX: -35,
    opacity: 0,
    transition: transitionOf(DURATIONS.base, EASINGS.exit),
  },
};

/** Word-level variant — shorter throw than lines so long headlines stay legible. */
export const maskWordVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: "0%",
    opacity: 1,
    transition: transitionOf(DURATIONS.slow, EASINGS.editorial),
  },
};

/** Cards arriving from below the picture plane, tilted away from the viewer. */
export const card3DVariants: Variants = {
  initial: {
    opacity: 0,
    y: 64,
    rotateX: -14,
    scale: 0.94,
    transformPerspective: PERSPECTIVE.base,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transformPerspective: PERSPECTIVE.base,
    transition: transitionOf(DURATIONS.slower, EASINGS.entrance),
  },
  exit: {
    opacity: 0,
    y: -40,
    rotateX: 10,
    scale: 0.96,
    transition: transitionOf(DURATIONS.fast, EASINGS.exit),
  },
};

/** Detail cards that swing in around their left edge, like a hinged panel. */
export const hingeVariants: Variants = {
  initial: {
    opacity: 0,
    rotateY: -22,
    x: 40,
    transformPerspective: PERSPECTIVE.near,
    transformOrigin: "left center",
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transformPerspective: PERSPECTIVE.near,
    transformOrigin: "left center",
    transition: transitionOf(DURATIONS.slow, EASINGS.entrance),
  },
  exit: {
    opacity: 0,
    rotateY: 14,
    x: -24,
    transition: transitionOf(DURATIONS.fast, EASINGS.exit),
  },
};

export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitionOf(DURATIONS.slow, EASINGS.entrance),
  },
  exit: { opacity: 0, scale: 0.96, transition: transitionOf(DURATIONS.fast, EASINGS.exit) },
};

/** Vertical swap used by rotating words and stat read-outs. */
export const swapVariants: Variants = {
  initial: { y: "-70%", opacity: 0, filter: "blur(6px)" },
  animate: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: transitionOf(DURATIONS.base, EASINGS.entrance),
  },
  exit: {
    y: "70%",
    opacity: 0,
    filter: "blur(6px)",
    transition: transitionOf(DURATIONS.fast, EASINGS.exit),
  },
};

/** Modal / dialog choreography. */
export const dialogVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 16, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: SPRINGS.dialog,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    filter: "blur(8px)",
    transition: transitionOf(DURATIONS.fast, EASINGS.exit),
  },
};

/** Ambient float. Never lands, never draws focus. */
export const floatingMirrorTransition: Transition = {
  duration: 7,
  ease: EASINGS.mirror,
  repeat: Infinity,
  repeatType: "mirror",
};

/* -------------------------------------------------------------------- *
 * 3. SCROLL
 * -------------------------------------------------------------------- */

/**
 * Named `useScroll` offsets. Naming them keeps the intent readable at the
 * call site — `SCROLL_OFFSETS.throughViewport` says far more than
 * `["start end", "end start"]`.
 *
 * Typed as `ScrollOffsetType` rather than `as const`: `useScroll` takes a
 * mutable array, so a readonly tuple is rejected at every call site.
 */
type ScrollOffsetType = NonNullable<UseScrollOptions["offset"]>;

export const SCROLL_OFFSETS = {
  /** 0 when the target's top hits the bottom of the viewport, 1 when its bottom hits the top. */
  throughViewport: ["start end", "end start"] as ScrollOffsetType,
  /** 0 when the target enters, 1 when it is fully settled at the top. Entrance choreography. */
  entering: ["start end", "start start"] as ScrollOffsetType,
  /** 0 when the target locks to the top, 1 when it has fully scrolled past. Exit choreography. */
  leaving: ["start start", "end start"] as ScrollOffsetType,
  /** 0 → 1 across a pinned section's full scroll distance. */
  pinned: ["start start", "end end"] as ScrollOffsetType,
  /** 0 when the target's bottom reaches the viewport bottom, 1 when it exits the top. */
  settling: ["end end", "end start"] as ScrollOffsetType,
};

/** Legacy alias kept so existing imports keep resolving. */
export const pageVariants = fadeUpVariants;
export const textRevealVariants = fadeUpVariants;
export const containerStaggerVariants = staggerContainer(0.08, 0.05);
export const heroFadeVariants = fadeUpVariants;
export const projectSectionEntranceVariants = card3DVariants;

export const getTestimonialStagger = (index: number) => ({
  initial: { opacity: 0, y: 28, rotateX: -10 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: transitionOf(DURATIONS.slow, EASINGS.entrance, (index % 3) * 0.09),
  },
});
