/* ==================================================================== *
 * WORK DECK — timeline
 * --------------------------------------------------------------------
 * The whole hero → showcase choreography as data. One table of stages,
 * from which every card's keyframe track is built; the rig samples those
 * tracks against scroll progress. Nothing here touches the DOM.
 *
 *   hero     0.00–0.12  cards fanned in the right half, beside the copy
 *   gather   0.12–0.28  they fold into a stack in the showcase column
 *   cycle    0.28–0.88  the front card flicks away three times; the ones
 *                      behind step forward one depth each time
 *   spread   0.88–0.96  all four come back, laid out as a 2 × 2 grid
 *
 * Only transform and opacity are produced — no filters — so a frame is a
 * compositor-only update.
 * ==================================================================== */

export type CardStateType = {
  x: number;
  y: number;
  z: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  opacity: number;
};

export type CardPropertyType = keyof CardStateType;

type EaseType = "linear" | "smooth" | "in";

type KeyframeType = { at: number; state: CardStateType; ease: EaseType };

export type CardTrackType = Record<CardPropertyType, { at: number[]; values: number[]; ease: EaseType[] }>;

export const STAGES = {
  heroEnd: 0.12,
  gatherEnd: 0.28,
  /** [start, end] of each flick — card n leaves during flicks[n]. */
  flicks: [
    [0.42, 0.5],
    [0.58, 0.66],
    [0.74, 0.82],
  ] as const,
  spreadStart: 0.88,
  spreadEnd: 0.96,
} as const;

/** Resting fan in the hero: offset, depth and tilt per card. */
export const HERO_FAN = [
  { x: 0, y: -30, z: 120, rotate: -6 },
  { x: 90, y: 15, z: 40, rotate: 5 },
  { x: -60, y: 60, z: -40, rotate: 8 },
  { x: 60, y: 105, z: -120, rotate: -4 },
] as const;

const HERO_SCALE = 0.54;

/** Alternate throws: even cards leave left, odd cards right. */
const flickDirection = (index: number) => (index % 2 === 0 ? -1 : 1);

const heroState = (index: number): CardStateType => ({
  ...HERO_FAN[index],
  rotateX: 0,
  rotateY: 0,
  scale: HERO_SCALE,
  opacity: 1,
});

/** A card `depth` places behind the front of the stack. */
const stackState = (depth: number, index: number): CardStateType => {
  const direction = flickDirection(index);
  const waiting = depth > 0;
  return {
    x: 0,
    y: depth * 16,
    z: -depth * 30,
    rotate: waiting ? -1.5 * direction : 0,
    rotateX: waiting ? -6 : 0,
    rotateY: waiting ? 4 * direction : 0,
    scale: 1 - depth * 0.04,
    // Opaque, like a real stack: the cards behind only peek out below the
    // front one. A translucent stack shows every card through the next.
    opacity: depth <= 2 ? 1 : 0.6,
  };
};

/** Mid-throw and thrown poses: arcs up, turns on its edge, fades out. */
const flickState = (index: number, t: 0.5 | 1): CardStateType => {
  const direction = flickDirection(index);
  return {
    x: direction * 160 * t * t,
    y: -45 * Math.sin(t * Math.PI * 0.8),
    z: -80 * t,
    rotate: direction * 20 * t * t,
    rotateX: 14 * t,
    rotateY: -26 * direction * t,
    scale: 1 - 0.12 * t,
    // Fades ahead of the throw, so the card rising behind reads cleanly
    // instead of through a half-transparent one.
    opacity: 1 - Math.sqrt(t),
  };
};

export type SpreadLayoutType = { pitchX: number; pitchY: number; scale: number; offsetY: number };

/** Space the spread leaves for its heading above and its actions below. */
const SPREAD_CHROME = { top: 150, bottom: 110 };
const SPREAD_GUTTER = 20;

/**
 * Fits the four cards as a 2 × 2 grid into the stage — the biggest scale
 * that clears both the width and the height left between the heading and
 * the actions. `cardWidth` / `cardHeight` are the card's unscaled size.
 */
export function getSpreadLayout(
  stageWidth: number,
  stageHeight: number,
  cardWidth: number,
  cardHeight: number
): SpreadLayoutType {
  const availableHeight = stageHeight - SPREAD_CHROME.top - SPREAD_CHROME.bottom;
  const scale = Math.min(
    0.6,
    (stageWidth - SPREAD_GUTTER) / (2 * cardWidth),
    (availableHeight - SPREAD_GUTTER) / (2 * cardHeight)
  );
  return {
    pitchX: cardWidth * scale + SPREAD_GUTTER,
    pitchY: cardHeight * scale + SPREAD_GUTTER,
    scale,
    offsetY: (SPREAD_CHROME.top - SPREAD_CHROME.bottom) / 2,
  };
}

const spreadState = (index: number, layout: SpreadLayoutType): CardStateType => ({
  x: ((index % 2) - 0.5) * layout.pitchX,
  y: (Math.floor(index / 2) - 0.5) * layout.pitchY + layout.offsetY,
  z: 0,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: layout.scale,
  opacity: 1,
});

function buildKeyframes(index: number, layout: SpreadLayoutType): KeyframeType[] {
  const frames: KeyframeType[] = [
    { at: 0, state: heroState(index), ease: "linear" },
    { at: STAGES.heroEnd, state: heroState(index), ease: "linear" },
    { at: STAGES.gatherEnd, state: stackState(index, index), ease: "smooth" },
  ];

  let last = stackState(index, index);
  STAGES.flicks.forEach(([start, end], flick) => {
    if (flick < index) {
      // A card ahead is leaving: step one depth forward.
      const depth = index - flick;
      frames.push({ at: start, state: stackState(depth, index), ease: "linear" });
      last = stackState(depth - 1, index);
      frames.push({ at: end, state: last, ease: "smooth" });
    } else if (flick === index) {
      // This card's turn to leave.
      frames.push({ at: start, state: stackState(0, index), ease: "linear" });
      frames.push({ at: (start + end) / 2, state: flickState(index, 0.5), ease: "in" });
      last = flickState(index, 1);
      frames.push({ at: end, state: last, ease: "linear" });
    }
  });

  frames.push({ at: STAGES.spreadStart, state: last, ease: "linear" });
  frames.push({ at: STAGES.spreadEnd, state: spreadState(index, layout), ease: "smooth" });
  return frames;
}

const PROPERTIES: CardPropertyType[] = ["x", "y", "z", "rotate", "rotateX", "rotateY", "scale", "opacity"];

export function buildCardTrack(index: number, layout: SpreadLayoutType): CardTrackType {
  const frames = buildKeyframes(index, layout);
  const track = {} as CardTrackType;
  for (const property of PROPERTIES) {
    track[property] = {
      at: frames.map((frame) => frame.at),
      values: frames.map((frame) => frame.state[property]),
      ease: frames.map((frame) => frame.ease),
    };
  }
  return track;
}

const EASE: Record<EaseType, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  in: (t) => t * t,
};

/** Piecewise sample; each segment uses the ease of the keyframe it ends on. */
export function sampleTrack(track: CardTrackType[CardPropertyType], progress: number): number {
  const { at, values, ease } = track;
  if (progress <= at[0]) return values[0];
  for (let i = 1; i < at.length; i++) {
    if (progress <= at[i]) {
      const span = at[i] - at[i - 1];
      const t = span === 0 ? 1 : (progress - at[i - 1]) / span;
      return values[i - 1] + (values[i] - values[i - 1]) * EASE[ease[i]](t);
    }
  }
  return values[values.length - 1];
}

/**
 * Piecewise-linear map as a plain function. Rig values go through functions
 * rather than `useTransform(value, [range], [output])`: given array ranges on
 * a `useScroll` value, Motion hands the animation to a native ScrollTimeline,
 * which measures a target-based scroll differently from the JS progress —
 * so those layers drift out of step with everything else.
 */
export function ramp(stops: readonly number[], values: readonly number[]) {
  return (progress: number) => {
    if (progress <= stops[0]) return values[0];
    for (let i = 1; i < stops.length; i++) {
      if (progress <= stops[i]) {
        const t = (progress - stops[i - 1]) / (stops[i] - stops[i - 1] || 1);
        return values[i - 1] + (values[i] - values[i - 1]) * t;
      }
    }
    return values[values.length - 1];
  };
}

/** Index of the card at the front, switching at the middle of each flick. */
export function getActiveIndex(progress: number): number {
  return STAGES.flicks.filter(([start, end]) => progress >= (start + end) / 2).length;
}

/**
 * Stacking order: the card leaving stays on top until it is gone, then drops
 * beneath everything; in the spread, left to right.
 */
export function getCardZIndex(index: number, progress: number): number {
  if (progress >= STAGES.spreadStart) return 20 + index;
  const flick = STAGES.flicks[index];
  if (flick && progress > flick[1]) return 10 + index;
  return 40 - index * 5;
}

/** Only the front card takes pointer input mid-cycle; all do in hero and spread. */
export function isCardInteractive(index: number, progress: number): boolean {
  if (progress <= STAGES.heroEnd + 0.03 || progress >= STAGES.spreadStart) return true;
  return getActiveIndex(progress) === index;
}
