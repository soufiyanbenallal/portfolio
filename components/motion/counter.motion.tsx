"use client";

import React, { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

export type CounterPropsType = {
  value: number;
  /** Decimal places to hold — keeps "3.2m" from flickering to "3m". */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Number that counts up the first time it is seen.
 *
 * The digits are rendered into a `tabular-nums` span so the element never
 * changes width mid-count — a counter that reflows its own row is worse than
 * no animation at all. The accessible value is the final number, announced
 * once, rather than every intermediate frame.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.6,
}: CounterPropsType) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(latest);
  });

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
