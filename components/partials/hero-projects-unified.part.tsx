"use client";

import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { projectsData } from "@/data/projects.data";
import { AvailabilityBadgeUi } from "@/components/ui/badge.ui";
import { ClientTickerShared } from "@/components/shared/client-ticker.shared";
import { Container } from "@/components/shared/container.shared";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Magnetic } from "@/components/motion/magnetic.motion";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { SharedElement } from "@/components/motion/page-transition.motion";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { DURATIONS, EASINGS, SPRINGS, SCROLL_OFFSETS, PERSPECTIVE } from "@/lib/motion.config";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { cn } from "@/lib/utils";
import type { DeckCardConfigType, ProjectDetailType } from "@/types";

const FEATURED = projectsData.slice(0, 4);

/* -------------------------------------------------------------------- *
 * Hero 3D Balanced Fanned Deck Placement
 * -------------------------------------------------------------------- */
const HERO_DECK_CONFIGS: DeckCardConfigType[] = [
  {
    x: 0,
    y: -30,
    z: 120,
    rotate: -6,
    exit: { x: -160, y: -50, rotate: -20 },
    drift: 0,
  },
  {
    x: 90,
    y: 15,
    z: 40,
    rotate: 5,
    exit: { x: 160, y: -50, rotate: 20 },
    drift: 1.2,
  },
  {
    x: -60,
    y: 60,
    z: -40,
    rotate: 8,
    exit: { x: -160, y: -50, rotate: -20 },
    drift: 2.4,
  },
  {
    x: 60,
    y: 105,
    z: -120,
    rotate: -4,
    exit: { x: 160, y: -50, rotate: 20 },
    drift: 3.2,
  },
];

/* ==================================================================== *
 * 1. UNIFIED PROJECT CARD (FLAWLESS 3D FLICK-EXIT & Z-POP ENTRANCE)
 * --------------------------------------------------------------------
 * - Consistent container-aligned geometry.
 * - Outgoing card: Stays on top (zIndex: 40/30/20) while executing 3D flick.
 * - Incoming card: Surges from underneath along Z-axis (z: -35px -> 0px).
 * - Stage 4: Centered 4-card horizontal gallery spread.
 * ==================================================================== */

type UnifiedCardPropsType = {
  project: ProjectDetailType;
  index: number;
  config: DeckCardConfigType;
  progress: MotionValue<number>;
  activeIndex: number;
};

function UnifiedCard({ project, index, config, progress, activeIndex }: UnifiedCardPropsType) {
  const isActive = activeIndex === index;

  // Hover target for Hero 3D depth lift
  const hoverTarget = useMotionValue(config.z);
  const cardZSpring = useSpring(hoverTarget, SPRINGS.tilt);

  // Dynamic cursor specular glare highlight
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glareX.set(x);
      glareY.set(y);
      glareOpacity.set(0.2);
    },
    [glareX, glareY, glareOpacity]
  );

  const handleCardMouseLeave = useCallback(() => {
    glareOpacity.set(0);
    hoverTarget.set(config.z);
  }, [glareOpacity, hoverTarget, config.z]);

  // Alternating flick direction: Card 0 left (-1), Card 1 right (+1), Card 2 left (-1), Card 3 right (+1)
  const flickDir = index % 2 === 0 ? -1 : 1;

  // ── 1. Position X (Hero -> Stack -> 3D Parabolic Flick -> Stage 4 Spread) ──
  const x = useTransform(progress, (p) => {
    // Stage 1: Hero
    if (p <= 0.12) return `${config.x}px`;

    // Stage 2: Gathering Morph into 70% column
    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      const easeT = t * t * (3 - 2 * t);
      return `${config.x * (1 - easeT)}px`;
    }

    // Stage 4: Balanced 4-Card Horizontal Gallery Spread (centered in Container)
    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      const easeT = t * t * (3 - 2 * t);
      // Clean offsets scaled to standard container width (~1152px)
      const spreadOffsets = [-390, -130, 130, 390];
      return `${spreadOffsets[index] * easeT}px`;
    }

    // Stage 3: Asymmetric 3D Outgoing Flick Arc
    if (index === 0) {
      if (p <= 0.42) return "0px";
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        const throwX = flickDir * 160 * (t * t);
        return `${throwX}px`;
      }
      return `${flickDir * 160}px`;
    }

    if (index === 1) {
      if (p < 0.58) return "0px";
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        const throwX = flickDir * 160 * (t * t);
        return `${throwX}px`;
      }
      return `${flickDir * 160}px`;
    }

    if (index === 2) {
      if (p < 0.74) return "0px";
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        const throwX = flickDir * 160 * (t * t);
        return `${throwX}px`;
      }
      return `${flickDir * 160}px`;
    }

    return "0px";
  });

  // ── 2. Position Y (Hero -> Stack Y -> 3D Arc Throw / Z-Pop Surge) ──
  const y = useTransform(progress, (p) => {
    // Stage 1: Hero (Centered in right 50% column)
    if (p <= 0.12) return `${config.y}px`;

    const stackY = index * 16;

    // Stage 2: Gathering Morph into stack
    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      const easeT = t * t * (3 - 2 * t);
      return `${config.y * (1 - easeT) + stackY * easeT}px`;
    }

    // Stage 4: Spread (Centered vertically between top header and bottom capsule)
    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      const easeT = t * t * (3 - 2 * t);
      return `${-10 * easeT}px`;
    }

    // Stage 3: Asymmetric Exit Arc vs Incoming Z-Pop
    if (index === 0) {
      if (p <= 0.42) return "0px";
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        const arcY = -45 * Math.sin(t * Math.PI * 0.8);
        return `${arcY}px`;
      }
      return "-40px";
    }

    if (index === 1) {
      if (p < 0.42) return "16px";
      // Incoming Card: Z-Pop entrance to active 0px
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        const easeT = t * t * (3 - 2 * t);
        return `${16 * (1 - easeT)}px`;
      }
      if (p <= 0.58) return "0px";
      // Outgoing Flick
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        const arcY = -45 * Math.sin(t * Math.PI * 0.8);
        return `${arcY}px`;
      }
      return "-40px";
    }

    if (index === 2) {
      if (p < 0.42) return "32px";
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return `${32 - 16 * t}px`;
      }
      if (p <= 0.58) return "16px";
      // Incoming Card: Z-Pop entrance to 0px
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        const easeT = t * t * (3 - 2 * t);
        return `${16 * (1 - easeT)}px`;
      }
      if (p <= 0.74) return "0px";
      // Outgoing Flick
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        const arcY = -45 * Math.sin(t * Math.PI * 0.8);
        return `${arcY}px`;
      }
      return "-40px";
    }

    // index === 3
    if (p < 0.42) return "48px";
    if (p <= 0.5) {
      const t = (p - 0.42) / 0.08;
      return `${48 - 16 * t}px`;
    }
    if (p <= 0.58) return "32px";
    if (p <= 0.66) {
      const t = (p - 0.58) / 0.08;
      return `${32 - 16 * t}px`;
    }
    if (p <= 0.74) return "16px";
    // Incoming Card: Z-Pop entrance to 0px
    if (p <= 0.82) {
      const t = (p - 0.74) / 0.08;
      const easeT = t * t * (3 - 2 * t);
      return `${16 * (1 - easeT)}px`;
    }
    return "0px";
  });

  // ── 3. Rotation (2D Tilt: Hero -> Flat -> 3D Flick ±20° -> Subtle Fan) ──
  const rotate = useTransform(progress, (p) => {
    if (p <= 0.12) return config.rotate;

    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      const easeT = t * t * (3 - 2 * t);
      return config.rotate * (1 - easeT);
    }

    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      const fanAngles = [-3, -1, 1, 3];
      return fanAngles[index] * t;
    }

    // Stage 3: Outgoing Flick Rotation
    if (index === 0) {
      if (p <= 0.42) return 0;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return flickDir * 20 * (t * t);
      }
      return flickDir * 20;
    }

    if (index === 1) {
      if (p < 0.42) return -flickDir * 2;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return -flickDir * 2 * (1 - t);
      }
      if (p <= 0.58) return 0;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return flickDir * 20 * (t * t);
      }
      return flickDir * 20;
    }

    if (index === 2) {
      if (p < 0.58) return -flickDir * 2;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return -flickDir * 2 * (1 - t);
      }
      if (p <= 0.74) return 0;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return flickDir * 20 * (t * t);
      }
      return flickDir * 20;
    }

    if (index === 3) {
      if (p < 0.74) return -flickDir * 2;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return -flickDir * 2 * (1 - t);
      }
      return 0;
    }

    return 0;
  });

  // ── 4. RotateY (3D Edge Card Turn on Flick) ──
  const rotateY = useTransform(progress, (p) => {
    if (p <= 0.28 || p >= 0.88) return 0;

    if (index === 0) {
      if (p <= 0.42) return 0;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return flickDir * -26 * t;
      }
      return flickDir * -26;
    }

    if (index === 1) {
      if (p < 0.42) return flickDir * 6;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return flickDir * 6 * (1 - t);
      }
      if (p <= 0.58) return 0;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return flickDir * -26 * t;
      }
      return flickDir * -26;
    }

    if (index === 2) {
      if (p < 0.58) return flickDir * 6;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return flickDir * 6 * (1 - t);
      }
      if (p <= 0.74) return 0;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return flickDir * -26 * t;
      }
      return flickDir * -26;
    }

    if (index === 3) {
      if (p < 0.74) return flickDir * 6;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return flickDir * 6 * (1 - t);
      }
      return 0;
    }

    return 0;
  });

  // ── 5. RotateX (Incoming Pitch Up vs Outgoing Dip) ──
  const rotateX = useTransform(progress, (p) => {
    if (p <= 0.28 || p >= 0.88) return 0;

    if (index === 0) {
      if (p <= 0.42) return 0;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return 14 * t;
      }
      return 14;
    }

    if (index === 1) {
      if (p < 0.42) return -12;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return -12 * (1 - t);
      }
      if (p <= 0.58) return 0;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return 14 * t;
      }
      return 14;
    }

    if (index === 2) {
      if (p < 0.58) return -12;
      if (p <= 0.66) {
        const t = (p - 0.58) / 0.08;
        return -12 * (1 - t);
      }
      if (p <= 0.74) return 0;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return 14 * t;
      }
      return 14;
    }

    if (index === 3) {
      if (p < 0.74) return -12;
      if (p <= 0.82) {
        const t = (p - 0.74) / 0.08;
        return -12 * (1 - t);
      }
      return 0;
    }

    return 0;
  });

  // ── 6. Scale (Continuous scale: Hero 0.54 -> Stack 0.95 -> Active 1.0 -> Outro 0.40) ──
  const scale = useTransform(progress, (p) => {
    if (p <= 0.12) return 0.54;

    const stackScale = 1.0 - index * 0.04;

    // Stage 2 Gathering
    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      const easeT = t * t * (3 - 2 * t);
      return 0.54 + (stackScale - 0.54) * easeT;
    }

    // Stage 4 Gallery Spread (Compact 0.40 scale to sit side-by-side with zero overlap)
    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      const easeT = t * t * (3 - 2 * t);
      return 1.0 - 0.6 * easeT; // 0.40 scale
    }

    // Stage 3
    if (index === 0) {
      if (p <= 0.42) return 1.0;
      if (p <= 0.5) return 1.0 - 0.12 * ((p - 0.42) / 0.08);
      return 0.88;
    }

    if (index === 1) {
      if (p < 0.42) return 0.96;
      if (p <= 0.5) {
        const t = (p - 0.42) / 0.08;
        return 0.96 + 0.04 * t;
      }
      if (p <= 0.58) return 1.0;
      if (p <= 0.66) return 1.0 - 0.12 * ((p - 0.58) / 0.08);
      return 0.88;
    }

    if (index === 2) {
      if (p < 0.42) return 0.92;
      if (p <= 0.5) return 0.92 + 0.04 * ((p - 0.42) / 0.08);
      if (p <= 0.58) return 0.96;
      if (p <= 0.66) return 0.96 + 0.04 * ((p - 0.58) / 0.08);
      if (p <= 0.74) return 1.0;
      if (p <= 0.82) return 1.0 - 0.12 * ((p - 0.74) / 0.08);
      return 0.88;
    }

    // index === 3
    if (p < 0.42) return 0.88;
    if (p <= 0.5) return 0.88 + 0.04 * ((p - 0.42) / 0.08);
    if (p <= 0.58) return 0.92;
    if (p <= 0.66) return 0.92 + 0.04 * ((p - 0.58) / 0.08);
    if (p <= 0.74) return 0.96;
    if (p <= 0.82) return 0.96 + 0.04 * ((p - 0.74) / 0.08);
    return 1.0;
  });

  // ── 7. Opacity ──
  const opacity = useTransform(progress, (p) => {
    if (p <= 0.12) return 1.0;

    const stackOpacity = Math.max(0.3, 1.0 - index * 0.25);

    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      return 1.0 - (1.0 - stackOpacity) * t;
    }

    // Stage 4: Full opacity for all 4 cards
    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      return Math.min(1, 0.4 + 0.6 * t);
    }

    if (index === 0) {
      if (p <= 0.42) return 1.0;
      if (p <= 0.5) return Math.max(0, 1.0 - (p - 0.42) / 0.08);
      return 0;
    }

    if (index === 1) {
      if (p < 0.42) return 0.75;
      if (p <= 0.5) return 0.75 + 0.25 * ((p - 0.42) / 0.08);
      if (p <= 0.58) return 1.0;
      if (p <= 0.66) return Math.max(0, 1.0 - (p - 0.58) / 0.08);
      return 0;
    }

    if (index === 2) {
      if (p < 0.42) return 0.5;
      if (p <= 0.5) return 0.5 + 0.25 * ((p - 0.42) / 0.08);
      if (p <= 0.58) return 0.75;
      if (p <= 0.66) return 0.75 + 0.25 * ((p - 0.58) / 0.08);
      if (p <= 0.74) return 1.0;
      if (p <= 0.82) return Math.max(0, 1.0 - (p - 0.74) / 0.08);
      return 0;
    }

    // index === 3
    if (p < 0.42) return 0.3;
    if (p <= 0.5) return 0.3 + 0.2 * ((p - 0.42) / 0.08);
    if (p <= 0.58) return 0.5;
    if (p <= 0.66) return 0.5 + 0.25 * ((p - 0.58) / 0.08);
    if (p <= 0.74) return 0.75;
    if (p <= 0.82) return 0.75 + 0.25 * ((p - 0.74) / 0.08);
    return 1.0;
  });

  // ── 8. Dynamic Z (Z-Pop Surge Forward) ──
  const z = useTransform([progress, cardZSpring], ([p, springZ]: number[]) => {
    if (p <= 0.12) return springZ;
    const stackZ = -index * 30;
    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      return springZ * (1 - t) + stackZ * t;
    }
    if (p >= 0.88) return 0;

    // Active Card is at Z = 0
    if (index === 0) {
      if (p <= 0.42) return 0;
      return -80 * ((p - 0.42) / 0.08);
    }
    if (index === 1) {
      if (p < 0.42) return -30;
      if (p <= 0.5) return -30 * (1 - (p - 0.42) / 0.08);
      if (p <= 0.58) return 0;
      return -80 * ((p - 0.58) / 0.08);
    }
    if (index === 2) {
      if (p < 0.42) return -60;
      if (p <= 0.5) return -60 + 30 * ((p - 0.42) / 0.08);
      if (p <= 0.58) return -30;
      if (p <= 0.66) return -30 * (1 - (p - 0.58) / 0.08);
      if (p <= 0.74) return 0;
      return -80 * ((p - 0.74) / 0.08);
    }
    if (index === 3) {
      if (p < 0.42) return -90;
      if (p <= 0.5) return -90 + 30 * ((p - 0.42) / 0.08);
      if (p <= 0.58) return -60;
      if (p <= 0.66) return -60 + 30 * ((p - 0.58) / 0.08);
      if (p <= 0.74) return -30;
      if (p <= 0.82) return -30 * (1 - (p - 0.74) / 0.08);
      return 0;
    }
    return 0;
  });

  // ── 9. Seamless Continuous Z-Index ──
  const zIndex = useTransform(progress, (p) => {
    if (p >= 0.88) return 20 + index;

    if (index === 0) {
      return p <= 0.5 ? 40 : 10;
    }
    if (index === 1) {
      return p <= 0.66 ? 30 : 11;
    }
    if (index === 2) {
      return p <= 0.82 ? 20 : 12;
    }
    return 15;
  });

  // ── 10. Pointer Events ──
  const pointerEvents = useTransform(progress, (p) => {
    if (p <= 0.15 || p >= 0.88) return "auto";
    if (index === 0 && p <= 0.44) return "auto";
    if (index === 1 && p > 0.44 && p <= 0.6) return "auto";
    if (index === 2 && p > 0.6 && p <= 0.76) return "auto";
    if (index === 3 && p > 0.76 && p < 0.88) return "auto";
    return "none";
  });

  // ── 11. Soft Depth Blur ──
  const filter = useTransform(progress, (p) => {
    if (p <= 0.12 || p >= 0.88) return "blur(0px)";
    if (isActive) return "blur(0px)";
    return `blur(${Math.min(5, (index + 1) * 1.4)}px)`;
  });

  const isHeroPhase = progress.get() <= 0.15;
  const isOutroPhase = progress.get() >= 0.88;

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
        filter,
        zIndex,
        pointerEvents: pointerEvents as unknown as "auto" | "none",
        transformPerspective: 2400,
        transformOrigin: "50% 50%", // Centered origin prevents dropping to bottom edge on scale
      }}
      onPointerEnter={() => {
        hoverTarget.set(config.z + 90);
      }}
      onPointerLeave={handleCardMouseLeave}
      onMouseMove={handleCardMouseMove}
    >
      <div className="w-full max-w-[720px] p-2 lg:p-4">
        <Tilt3D
          intensity={isHeroPhase ? 0 : isOutroPhase ? 5 : 7}
          lift={isHeroPhase ? 0 : 8}
          className="w-full"
        >
          <Link
            href={`/projects/${project.slug}`}
            transitionTypes={["nav-forward"]}
            tabIndex={isActive || isHeroPhase || isOutroPhase ? 0 : -1}
            data-cursor="project"
            data-cursor-text="View case"
            className="group relative block w-full outline-none"
          >
            {/* Specular 3D Glass Shell */}
            <div
              className="relative overflow-hidden rounded-[26px] bg-white p-3.5 transition-all duration-300 hover:shadow-2xl sm:p-4"
              style={{
                boxShadow:
                  "0 24px 48px -12px rgba(0, 0, 0, 0.12), 0 12px 24px -8px rgba(0, 0, 0, 0.08), inset 0 1px 1.5px rgba(255, 255, 255, 0.9), inset 0 0 0 1px rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Dynamic Cursor Glare Highlight */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[26px] transition-opacity duration-300"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]: number[]) =>
                      `radial-gradient(500px circle at ${gx}% ${gy}%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 60%)`
                  ),
                  opacity: glareOpacity,
                }}
              />

              {/* Media Preview Container */}
              <SharedElement name={`project-media-${project.slug}`}>
                <div className="bg-gray-10 relative aspect-16/10 w-full overflow-hidden rounded-[20px] shadow-inner">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 92vw, 720px"
                    priority={index === 0}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Glassmorphic Project Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-white shadow-md backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span>{project.category}</span>
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  {/* Center Hover Action Pill */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex scale-95 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold text-black shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                      <span>View case study</span>
                      <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </SharedElement>

              {/* Card Footer Details */}
              <div className="flex items-end justify-between gap-4 px-1 pt-3 pb-0.5 sm:gap-6 sm:pt-4">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="group-hover:text-gray-60 truncate text-base font-semibold tracking-tight text-black transition-colors sm:text-lg">
                      {project.title}
                    </span>
                    <span className="text-gray-30 font-mono text-xs">/</span>
                    <span className="text-gray-60 truncate text-xs font-medium sm:text-sm">
                      {project.typeOfWork}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {project.stats.slice(0, 2).map((stat) => (
                      <span
                        key={stat.label}
                        className="text-gray-60 bg-gray-10 border-gray-20 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[11px] sm:text-xs"
                      >
                        <span className="font-semibold text-black">{stat.value}</span>{" "}
                        <span>{stat.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <span className="border-gray-30 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-black shadow-xs transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white sm:h-10 sm:w-10">
                  <Icons.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Tilt3D>
      </div>
    </motion.div>
  );
}

/* ==================================================================== *
 * 2. 30% STICKY ASIDE PANEL (SHOWCASE PHASE)
 * ==================================================================== */

type StickyAsidePropsType = {
  activeIndex: number;
  progress: MotionValue<number>;
  onSelectProject?: (index: number) => void;
};

function StickyAside({ activeIndex, progress, onSelectProject }: StickyAsidePropsType) {
  const project = FEATURED[activeIndex] ?? FEATURED[0];
  const railProgress = useTransform(progress, [0.28, 0.88], [0, 1]);

  return (
    <div className="flex w-full flex-col justify-center py-6 pr-6 select-none lg:pr-8">
      <div className="flex flex-col gap-6">
        {/* Status Badge */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="bg-availability-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-availability-green relative inline-flex h-2 w-2 rounded-full shadow-[0_0_8px_rgba(33,179,11,0.6)]" />
          </span>
          <span className="text-label text-gray-50">Selected work</span>
        </div>

        {/* Counter & Step Dots */}
        <div className="flex items-center justify-between">
          <div className="relative h-[34px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: DURATIONS.base, ease: EASINGS.entrance }}
                className="flex items-center font-mono text-2xl font-semibold text-black lg:text-3xl"
              >
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-gray-30 mx-1.5 font-light">/</span>
                <span className="text-gray-40 text-lg">
                  {String(FEATURED.length).padStart(2, "0")}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Step Dots */}
          <div className="flex items-center gap-1.5">
            {FEATURED.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProject?.(idx)}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all duration-400",
                  idx === activeIndex ? "w-6 bg-black" : "bg-gray-30 w-2 hover:bg-gray-50"
                )}
                aria-label={`Jump to project ${p.title}`}
              />
            ))}
          </div>
        </div>

        {/* Project Title & Tagline with smooth morph */}
        <div className="relative min-h-[140px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: DURATIONS.base, ease: EASINGS.entrance }}
              className="absolute inset-0 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl font-medium tracking-tight text-black lg:text-3xl">
                  {project.title}
                </h3>
                <span className="bg-gray-10 text-gray-60 border-gray-30 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium">
                  {project.category}
                </span>
              </div>
              <p className="text-gray-60 max-w-[290px] text-sm leading-relaxed lg:text-base">
                {project.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Key stats pill strip */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stats.slice(0, 2).map((stat) => (
            <div
              key={stat.label}
              className="border-gray-20 rounded-lg border bg-white/90 px-3 py-1.5 text-xs shadow-xs backdrop-blur-sm"
            >
              <span className="font-semibold text-black">{stat.value}</span>{" "}
              <span className="text-gray-60">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Progress Rail */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="bg-gray-20 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full">
            <motion.div
              className="h-full origin-left rounded-full bg-black"
              style={{ scaleX: railProgress }}
            />
          </div>
          <div className="flex max-w-[220px] items-center justify-between">
            <span className="text-gray-60 font-mono text-[11px] font-medium">
              Scroll to explore
            </span>
            <span className="text-gray-40 font-mono text-[11px]">
              {Math.round((activeIndex + 1) * 25)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================== *
 * 3. STAGE 4: NATIVE HORIZONTAL GALLERY SPREAD & OUTRO
 * ==================================================================== */

type Stage4OutroPropsType = {
  progress: MotionValue<number>;
};

function Stage4Outro({ progress }: Stage4OutroPropsType) {
  const outroOpacity = useTransform(progress, [0.88, 0.95], [0, 1]);
  const outroY = useTransform(progress, [0.88, 0.95], [20, 0]);
  const outroBlur = useTransform(progress, [0.88, 0.95], ["blur(8px)", "blur(0px)"]);
  const outroPointerEvents = useTransform(progress, (p) => (p >= 0.9 ? "auto" : "none"));

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center justify-center gap-4 px-3 md:px-6"
      style={{
        opacity: outroOpacity,
        y: outroY,
        filter: outroBlur,
        pointerEvents: outroPointerEvents as unknown as "auto" | "none",
      }}
    >
      <div className="border-gray-30 flex flex-col items-center gap-4 rounded-full border bg-white/95 px-6 py-3 shadow-xl backdrop-blur-md sm:flex-row">
        <div className="text-gray-60 flex items-center gap-4 font-mono text-xs">
          <span>
            <strong className="font-semibold text-black">6+</strong> Featured Cases
          </span>
          <span className="text-gray-30">•</span>
          <span>
            <strong className="font-semibold text-black">$40M+</strong> Value Created
          </span>
          <span className="text-gray-30">•</span>
          <span>
            <strong className="font-semibold text-black">99.8%</strong> Satisfaction
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.4}>
            <Link
              href="/projects"
              transitionTypes={["nav-forward"]}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-neutral-800"
            >
              <span>Explore all projects</span>
              <Icons.ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href={CAL_LINK}
              className="border-gray-30 bg-gray-10 hover:bg-gray-20 inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold text-black transition-colors"
            >
              Start a project
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================================================================== *
 * 4. MASTER HERO & PROJECTS UNIFIED SECTION
 * ==================================================================== */

export function HeroProjectsUnifiedPart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse 3D tilt tracking for Hero phase
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const pointerYaw = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), SPRINGS.tilt);
  const rigRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), SPRINGS.tilt);

  // Unified Scroll Progress across master track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSETS.pinned,
  });

  // Smooth spring damping for fluid scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.22,
    restDelta: 0.0005,
  });

  // All transforms declared unconditionally at top level
  const heroBlend = useTransform(smoothProgress, [0, 0.14], [1, 0]);
  const activeRigRotateX = useTransform([rigRotateX, heroBlend], ([rx, b]: number[]) => rx * b);
  const activeRigRotateY = useTransform([pointerYaw, heroBlend], ([py, b]: number[]) => py * b);

  // Hero Copy Transforms (Fade + slide + blur out)
  const heroCopyOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);
  const heroCopyY = useTransform(smoothProgress, [0, 0.14], [0, -60]);
  const heroCopyScale = useTransform(smoothProgress, [0, 0.14], [1, 0.98]);
  const heroCopyBlur = useTransform(smoothProgress, [0, 0.14], ["blur(0px)", "blur(8px)"]);
  const heroCopyPointerEvents = useTransform(smoothProgress, (p) => (p < 0.12 ? "auto" : "none"));

  // Showcase Header and 30% Aside Transforms
  const showcaseOpacity = useTransform(smoothProgress, (p) => {
    if (p < 0.16) return 0;
    if (p <= 0.28) return (p - 0.16) / 0.12;
    if (p <= 0.86) return 1;
    if (p <= 0.94) return Math.max(0, 1 - (p - 0.86) / 0.08);
    return 0;
  });
  const showcaseY = useTransform(smoothProgress, [0.16, 0.28], [40, 0]);
  const showcaseBlur = useTransform(smoothProgress, [0.16, 0.28], ["blur(8px)", "blur(0px)"]);
  const showcasePointerEvents = useTransform(smoothProgress, (p) =>
    p >= 0.2 && p < 0.88 ? "auto" : "none"
  );

  // Final Stage 4 Spread Header ("Curated Showcase / All 4 Featured Projects")
  const spreadHeaderOpacity = useTransform(smoothProgress, [0.88, 0.95], [0, 1]);
  const spreadHeaderY = useTransform(smoothProgress, [0.88, 0.95], [-16, 0]);

  // Shared 4-Card Stage Width Transform: smoothly transitions from 50% in Hero to 70% in Showcase, then 100% in Stage 4 spread
  const stageWidth = useTransform(smoothProgress, (p) => {
    if (p <= 0.12) return "50%";
    if (p <= 0.28) {
      const t = (p - 0.12) / 0.16;
      return `${50 + 20 * t}%`;
    }
    if (p >= 0.88) {
      const t = Math.min(1, (p - 0.88) / 0.08);
      return `${70 + 30 * t}%`;
    }
    return "70%";
  });

  // Track active index synchronized with reveal thresholds
  useMotionValueEvent(smoothProgress, "change", (p) => {
    if (p < 0.42) {
      if (activeIndex !== 0) setActiveIndex(0);
    } else if (p < 0.58) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else if (p < 0.74) {
      if (activeIndex !== 2) setActiveIndex(2);
    } else {
      if (activeIndex !== 3) setActiveIndex(3);
    }
  });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [prefersReducedMotion, pointerX, pointerY]
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  // Click on step dots to smoothly scroll to target project reveal point
  const handleSelectProject = useCallback((index: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    const targets = [0.32, 0.48, 0.64, 0.78];
    const targetScroll = top + height * targets[index];
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  /* ── Responsive Fallback for Mobile / Reduced Motion ── */
  if (prefersReducedMotion || !isDesktop) {
    return (
      <div className="relative flex w-full flex-col items-center">
        {/* Mobile Hero */}
        <section id="hero" className="w-full pt-28 pb-12">
          <Container className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <AvailabilityBadgeUi text="Available for new projects" />
              <h1 className="text-4xl font-medium tracking-tight text-black">
                Engineering that delivers results.
              </h1>
              <p className="text-gray-60 text-base">
                <strong className="font-semibold text-black">
                  Senior Full Stack &amp; Shopify Developer.
                </strong>{" "}
                Architecting high-performance React 19, TypeScript, Node.js, Laravel platforms &amp;
                AI integrations that scale businesses.
              </p>
              <div>
                <button
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view"}'
                  data-cursor="grow"
                  className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg"
                >
                  Book a call with me
                </button>
              </div>
            </div>

            {/* Mobile Project Cards List */}
            <div className="mt-8 flex flex-col gap-6">
              {FEATURED.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="border-gray-30 card-shadow block rounded-2xl border bg-white p-3.5"
                >
                  <div className="bg-gray-10 relative aspect-16/10 w-full overflow-hidden rounded-xl">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-medium text-black">{project.title}</span>
                    <span className="font-mono text-xs text-gray-50">{project.typeOfWork}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
          <div className="mt-12">
            <ClientTickerShared withHappyClientsCluster={true} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="hero"
      className="border-gray-30 relative w-full border-b"
      style={{ height: "500vh" }}
    >
      <div id="projects" className="pointer-events-none absolute top-[28%]" />

      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ perspective: PERSPECTIVE.far }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* ── 1. Hero Left Copy Column (Visible when p < 0.20) ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center"
          style={{
            opacity: heroCopyOpacity,
            y: heroCopyY,
            scale: heroCopyScale,
            filter: heroCopyBlur,
            pointerEvents: heroCopyPointerEvents as unknown as "auto" | "none",
          }}
        >
          <Container className="w-full">
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="flex max-w-[500px] flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATIONS.slow,
                    delay: 0.1,
                    ease: EASINGS.entrance,
                  }}
                >
                  <AvailabilityBadgeUi text="Available for new projects" />
                </motion.div>

                <h1
                  className="leading-[0.95] font-medium tracking-[-0.03em]"
                  style={{ fontSize: "clamp(42px, 5.5vw, 72px)" }}
                >
                  <TextReveal
                    as="span"
                    by="word"
                    text="Engineering that"
                    trigger="mount"
                    delay={0.18}
                    className="block text-gray-50"
                  />
                  <span className="block min-h-[1.1em] text-black">
                    <TextReveal
                      as="span"
                      by="word"
                      text="delivers"
                      trigger="mount"
                      delay={0.32}
                      className="inline-block pr-[0.25em]"
                    />
                    <AnimatedTextCycle
                      words={["results.", "scale.", "growth.", "impact."]}
                      interval={3200}
                      className="font-medium text-black"
                    />
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: DURATIONS.slower,
                    delay: 0.55,
                    ease: EASINGS.entrance,
                  }}
                  className="text-gray-60 text-[16px] leading-[1.4] tracking-[-0.02em] sm:text-[18px]"
                >
                  <strong className="font-semibold text-black">
                    Senior Full Stack &amp; Shopify Developer.
                  </strong>{" "}
                  Architecting high-performance React 19, TypeScript, Node.js, Laravel platforms
                  &amp; AI integrations that scale businesses.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATIONS.slow,
                    delay: 0.7,
                    ease: EASINGS.entrance,
                  }}
                  className="flex flex-col items-start gap-2 pt-2"
                >
                  <Magnetic strength={0.5} innerStrength={0.3}>
                    <button
                      type="button"
                      data-cal-link={CAL_LINK}
                      data-cal-config='{"layout":"month_view"}'
                      data-cursor="grow"
                      className="group inline-flex cursor-pointer items-center rounded-full bg-black py-2 pr-5 pl-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
                      style={{
                        boxShadow:
                          "inset 0 1.5px 3px rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/20">
                        <Image
                          src="/images/profile.jpeg"
                          alt="Soufiyan Benallal"
                          fill
                          sizes="28px"
                          className="relative z-1 object-cover"
                        />
                      </span>

                      <span className="w-0 text-center text-xs leading-none font-semibold text-white/70 opacity-0 transition-all duration-400 group-hover:w-6 group-hover:opacity-100">
                        +
                      </span>

                      <span className="flex h-7 w-0 shrink-0 -translate-x-7 scale-0 items-center justify-center rounded-full bg-white text-[10px] font-bold tracking-tight text-black transition-all duration-400 group-hover:w-7 group-hover:translate-x-0 group-hover:scale-100">
                        You
                      </span>

                      <span className="pl-3 text-sm font-medium tracking-tight whitespace-nowrap text-white">
                        Book a call with me
                      </span>
                    </button>
                  </Magnetic>
                </motion.div>
              </div>
            </div>
          </Container>
        </motion.div>

        {/* ── 2. Showcase Mode Stage: 30% Sticky Aside (Left) + Header ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between py-10"
          style={{
            opacity: showcaseOpacity,
            y: showcaseY,
            filter: showcaseBlur,
            pointerEvents: showcasePointerEvents as unknown as "auto" | "none",
          }}
        >
          {/* Top Header */}
          <Container className="w-full">
            <div className="border-gray-30 flex items-end justify-between border-b pb-4">
              <div>
                <span className="text-label mb-1 block text-gray-50">Selected portfolio</span>
                <h2 className="text-h2-sm font-medium text-black">Latest projects</h2>
              </div>
              <span className="font-mono text-xs text-gray-50">
                {String(FEATURED.length).padStart(2, "0")} /{" "}
                {String(projectsData.length).padStart(2, "0")} cases
              </span>
            </div>
          </Container>

          {/* 30% Left Aside Column */}
          <Container className="flex h-full items-center">
            <div className="w-[30%] shrink-0">
              <StickyAside
                activeIndex={activeIndex}
                progress={smoothProgress}
                onSelectProject={handleSelectProject}
              />
            </div>
            <div className="w-[70%]" />
          </Container>

          <div className="h-6" />
        </motion.div>

        {/* ── 3. Stage 4 Final Spread Top Header ── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-20 z-20 flex flex-col items-center justify-center px-3 text-center md:px-6"
          style={{
            opacity: spreadHeaderOpacity,
            y: spreadHeaderY,
          }}
        >
          <Container className="flex w-full flex-col items-center">
            <span className="text-label text-gray-60 bg-gray-10 border-gray-30 mb-2.5 rounded-full border px-3.5 py-1 shadow-xs">
              Selected Portfolio Archive
            </span>
            <h3 className="mb-1 text-2xl font-medium tracking-tight text-black lg:text-3xl">
              Explore All 4 Featured Case Studies
            </h3>
            <p className="font-mono text-xs text-gray-50">
              Click any project card below to open the complete case study
            </p>
          </Container>
        </motion.div>

        {/* ── 4. THE MASTER ALL-CARD 3D RIG (CONTAINER ALIGNED) ── */}
        <motion.div
          className="stage-3d pointer-events-auto absolute inset-0 z-10"
          style={{
            rotateX: activeRigRotateX,
            rotateY: activeRigRotateY,
          }}
        >
          <Container className="flex h-full items-center">
            <motion.div
              className="relative ml-auto flex h-full items-center justify-center will-change-transform"
              style={{
                width: stageWidth,
              }}
            >
              {FEATURED.map((project, index) => (
                <UnifiedCard
                  key={project.id}
                  project={project}
                  index={index}
                  config={HERO_DECK_CONFIGS[index]}
                  progress={smoothProgress}
                  activeIndex={activeIndex}
                />
              ))}
            </motion.div>
          </Container>
        </motion.div>

        {/* ── 5. STAGE 4: NATIVE DOCKED SUMMARY OUTRO & EXIT ── */}
        <Stage4Outro progress={smoothProgress} />
      </div>
    </div>
  );
}
