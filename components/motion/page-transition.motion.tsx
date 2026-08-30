import React, { ViewTransition } from "react";

/* ==================================================================== *
 * PAGE TRANSITION
 * --------------------------------------------------------------------
 * Route-level choreography, handled by React's `<ViewTransition>` rather
 * than by `AnimatePresence`.
 *
 * The reason is structural: in the App Router the outgoing page is
 * unmounted before the incoming one commits, so a Framer exit animation
 * has nothing left to animate. `<ViewTransition>` snapshots both sides at
 * the browser level, which is the only way to get a true exit — and the
 * only way to morph an element *across* a route boundary.
 *
 * The animations themselves live in globals.css against the class names
 * declared here (`nav-forward` / `nav-back`), and the direction is chosen
 * per-link with `transitionTypes`, since only the author knows which links
 * go deeper into the site and which come back out.
 *
 * `default: "none"` matters: without it, every named transition on the page
 * animates on every unrelated navigation.
 * ==================================================================== */

const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export type PageTransitionPropsType = {
  children: React.ReactNode;
};

/**
 * Wraps a page's content. Must live in `page.tsx`, never in a layout —
 * layouts persist across navigation, so enter and exit never fire there.
 */
export function PageTransition({ children }: PageTransitionPropsType) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      {children}
    </ViewTransition>
  );
}

export type SharedElementPropsType = {
  /** Must match on both routes for the morph to pair up. */
  name: string;
  children: React.ReactNode;
};

/**
 * Shared-element morph. The same `name` on a grid thumbnail and on the detail
 * hero makes the browser animate one object between the two positions instead
 * of cross-fading two unrelated ones.
 */
export function SharedElement({ name, children }: SharedElementPropsType) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
