"use client";

import React from "react";
import { type Variants } from "motion/react";
import { MOTION_ELEMENTS, type MotionTagType } from "@/components/motion/motion-elements";
import {
  VIEWPORT,
  fadeUpVariants,
  fadeVariants,
  scaleInVariants,
  card3DVariants,
  hingeVariants,
  staggerContainer,
} from "@/lib/motion.config";

const VARIANT_MAP = {
  fadeUp: fadeUpVariants,
  fade: fadeVariants,
  scale: scaleInVariants,
  card3D: card3DVariants,
  hinge: hingeVariants,
} satisfies Record<string, Variants>;

export type RevealPresetType = keyof typeof VARIANT_MAP;

export type RevealPropsType = {
  children: React.ReactNode;
  preset?: RevealPresetType;
  delay?: number;
  className?: string;
  as?: MotionTagType;
  once?: boolean;
  /** How much of the element must be visible before it fires. */
  amount?: number;
};

/**
 * In-view reveal. Wraps a block and plays one of the shared presets when it
 * scrolls into range. Prefer this over hand-rolled `initial`/`whileInView`
 * pairs — the presets are what keep unrelated sections feeling related.
 */
export function Reveal({
  children,
  preset = "fadeUp",
  delay = 0,
  className,
  as = "div",
  once = true,
  amount,
}: RevealPropsType) {
  const MotionComponent = MOTION_ELEMENTS[as];

  return (
    <MotionComponent
      className={className}
      variants={VARIANT_MAP[preset]}
      initial="initial"
      whileInView="animate"
      viewport={{ ...VIEWPORT, once, ...(amount ? { amount } : {}) }}
      transition={{ delay }}
    >
      {children}
    </MotionComponent>
  );
}

export type StaggerPropsType = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: MotionTagType;
  once?: boolean;
  amount?: number;
};

/**
 * Orchestrating parent. Children rendered as `<StaggerItem>` inherit the
 * animation state and fire in sequence — no per-child delay arithmetic.
 */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
  as = "div",
  once = true,
  amount,
}: StaggerPropsType) {
  const MotionComponent = MOTION_ELEMENTS[as];
  const variants = React.useMemo(
    () => staggerContainer(stagger, delayChildren),
    [stagger, delayChildren],
  );

  return (
    <MotionComponent
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ ...VIEWPORT, once, ...(amount ? { amount } : {}) }}
    >
      {children}
    </MotionComponent>
  );
}

export type StaggerItemPropsType = {
  children: React.ReactNode;
  preset?: RevealPresetType;
  className?: string;
  as?: MotionTagType;
};

export function StaggerItem({
  children,
  preset = "fadeUp",
  className,
  as = "div",
}: StaggerItemPropsType) {
  const MotionComponent = MOTION_ELEMENTS[as];

  return (
    <MotionComponent className={className} variants={VARIANT_MAP[preset]}>
      {children}
    </MotionComponent>
  );
}
