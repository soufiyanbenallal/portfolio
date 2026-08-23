import { motion } from "motion/react";

/**
 * Static registry of motion-wrapped elements.
 *
 * The obvious implementation of a polymorphic `as` prop is
 * `motion.create(as)` inside the component — but that mints a brand new
 * component type on every render, which remounts the subtree and throws away
 * any state or in-flight animation it held. React's compiler lint rejects it
 * for exactly that reason.
 *
 * Declaring the handful of tags we actually animate at module scope keeps the
 * component identity stable for the life of the app, and makes the supported
 * set explicit rather than implicit.
 */
export const MOTION_ELEMENTS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  blockquote: motion.blockquote,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  ul: motion.ul,
  li: motion.li,
  nav: motion.nav,
  header: motion.header,
  footer: motion.footer,
} as const;

export type MotionTagType = keyof typeof MOTION_ELEMENTS;
