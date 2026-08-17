import type { Transition, Variants } from "motion/react";

export const EASINGS = {
  editorial: [0.68, 0, 0.22, 0.83] as const,
  standard: [0.4, 0, 0.2, 1] as const,
  mirror: [0.44, 0, 0.56, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

export const SPRINGS = {
  page: { stiffness: 500, damping: 60, mass: 1 },
  scrollCard: { stiffness: 1000, damping: 130, mass: 1 },
  nav: { type: "spring" as const, duration: 0.6, bounce: 0.15 },
  dialog: { type: "spring" as const, duration: 0.4, bounce: 0.1 },
  bottomPill: { type: "spring" as const, duration: 0.6, bounce: 0.2 },
  accordion: { type: "spring" as const, duration: 0.4, bounce: 0.05 },
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASINGS.editorial,
    },
  },
  exit: {
    opacity: 0,
    y: "-30%",
    transition: {
      duration: 0.5,
      ease: EASINGS.editorial,
    },
  },
};

export const textRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASINGS.standard,
    },
  },
};

export const containerStaggerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const heroFadeVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: (delay: number = 0.4) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: EASINGS.standard,
    },
  }),
};

export const projectSectionEntranceVariants: Variants = {
  initial: {
    opacity: 0,
    y: 200,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASINGS.standard,
    },
  },
};

export const getTestimonialStagger = (index: number) => {
  const xOffsets = [-5, -10, -15, -5, -10, -15];
  const offset = xOffsets[index % xOffsets.length];
  return {
    initial: {
      opacity: 0,
      x: offset,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: EASINGS.standard,
      },
    },
  };
};


export const floatingMirrorTransition: Transition = {
  duration: 7,
  ease: EASINGS.mirror,
  repeat: Infinity,
  repeatType: "mirror",
};
