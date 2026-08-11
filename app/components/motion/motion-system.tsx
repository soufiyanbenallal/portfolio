"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

const signatureEase = [0.2, 0, 0, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.56, ease: signatureEase }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

export function PageProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  });

  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={{ scaleX, transformOrigin: "0 50%" }}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.56, delay, ease: signatureEase }}
    >
      {children}
    </m.div>
  );
}

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.05,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: signatureEase },
  },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -5% 0px" }}
      variants={staggerParent}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={staggerChild}>
      {children}
    </m.div>
  );
}

export function MagneticLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 360, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 360, damping: 24, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.a
      className={className}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </m.a>
  );
}

export function ParallaxLayer({
  children,
  className,
  distance = 36,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <m.div ref={ref} className={className} style={reduceMotion ? undefined : { y }}>
      {children}
    </m.div>
  );
}
