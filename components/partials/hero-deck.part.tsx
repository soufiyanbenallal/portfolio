"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "motion/react";
import { projectsData } from "@/data/projects.data";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS, EASINGS } from "@/lib/motion.config";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import type { DeckCardConfigType, ProjectDetailType } from "@/types";

/* ==================================================================== *
 * HERO DECK
 * --------------------------------------------------------------------
 * 3D Project Showcase Deck in Hero Section.
 *
 * Connected with ProjectsShowcasePart:
 *   1. Initial Entry: Cards animate in with 3D fanned orientation,
 *      interactive cursor 3D yaw/pitch, and individual magnetic Z-lift.
 *   2. Scroll Down: Cards disperse smoothly into the Projects Showcase
 *      native position where the 30% aside and 70% column take over.
 * ==================================================================== */

const DECK: DeckCardConfigType[] = [
  {
    x: 8,
    y: -6,
    z: 120,
    rotate: -7,
    exit: { x: -220, y: 420, rotate: -26 },
    drift: 0,
  },
  {
    x: 140,
    y: 44,
    z: 40,
    rotate: 5,
    exit: { x: 260, y: -520, rotate: 22 },
    drift: 1.2,
  },
  {
    x: -70,
    y: 120,
    z: -60,
    rotate: 9,
    exit: { x: -320, y: -300, rotate: 30 },
    drift: 2.4,
  },
  {
    x: 96,
    y: 186,
    z: -150,
    rotate: -4,
    exit: { x: 300, y: -240, rotate: -20 },
    drift: 3.1,
  },
];

type DeckCardPropsType = {
  project: ProjectDetailType;
  config: DeckCardConfigType;
  index: number;
  scrollProgress: MotionValue<number>;
  priority: boolean;
};

function DeckCard({
  project,
  config,
  index,
  scrollProgress,
  priority,
}: DeckCardPropsType) {
  const stagger = index * 0.08;
  const range = [Math.min(0.35 + stagger, 0.75), 1];

  const x = useTransform(scrollProgress, range, [config.x, config.exit.x]);
  const y = useTransform(scrollProgress, range, [config.y, config.exit.y]);
  const rotate = useTransform(scrollProgress, range, [
    config.rotate,
    config.exit.rotate,
  ]);
  const opacity = useTransform(scrollProgress, [range[0], 0.92], [1, 0]);

  const hoverTarget = useMotionValue(config.z);
  const cardZ = useSpring(hoverTarget, SPRINGS.tilt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85, rotate: config.rotate - 5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: config.rotate }}
      transition={{
        duration: 0.85,
        delay: 0.2 + index * 0.12,
        ease: EASINGS.entrance,
      }}
      className="absolute left-1/2 top-1/2 w-[clamp(240px,22vw,320px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ x, y, z: cardZ, rotate, opacity, zIndex: 10 + index }}
      onPointerEnter={() => hoverTarget.set(config.z + 90)}
      onPointerLeave={() => hoverTarget.set(config.z)}
    >
      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={["nav-forward"]}
        data-cursor="project"
        data-cursor-text="View case"
        className="block cursor-pointer outline-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1.6, 0] }}
          transition={{
            duration: 7 + config.drift,
            ease: EASINGS.mirror,
            repeat: Infinity,
            repeatType: "mirror",
            delay: config.drift,
          }}
          className="group rounded-[20px] border border-gray-30 bg-white p-3 card-shadow-3d transition-shadow duration-300 hover:card-shadow-hover"
        >
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[14px] bg-gray-10">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="320px"
              priority={priority}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-between px-0.5 pt-2.5 text-xs">
            <span className="font-medium tracking-tight text-black transition-colors group-hover:text-gray-60">
              {project.title}
            </span>
            <span className="font-mono text-[10px] text-gray-50">
              {project.typeOfWork}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export type HeroDeckPropsType = {
  /** The hero section, used to measure the scroll-away progress. */
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroDeck({ sectionRef }: HeroDeckPropsType) {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const isDesktop = useIsDesktop();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const pointerYaw = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-16, 16]),
    SPRINGS.tilt,
  );
  const rigRotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [12, -12]),
    SPRINGS.tilt,
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: SCROLL_OFFSETS.leaving,
  });
  const scrollProgress = useSpring(scrollYProgress, SPRINGS.scroll);

  const rigRotateY = useTransform(
    [pointerYaw, scrollProgress],
    ([yaw, progress]: number[]) => yaw + progress * -22,
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [prefersReducedMotion, pointerX, pointerY],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const featured = projectsData.slice(0, DECK.length);

  /* Mobile and reduced motion fallback */
  if (!isDesktop || prefersReducedMotion) {
    return (
      <div
        className="relative mt-10 flex h-[300px] w-full items-center justify-center select-none sm:h-[340px] md:hidden"
      >
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 - index * 0.05 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.09 }}
            style={{
              zIndex: DECK.length - index,
              rotate: DECK[index].rotate,
              x: DECK[index].x * 0.35,
              y: DECK[index].y * 0.35,
            }}
            className="absolute w-[240px] rounded-[18px] border border-gray-30 bg-white p-2.5 card-shadow sm:w-[280px]"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[12px] bg-gray-10">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="280px"
                  className="object-cover object-center"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      className="relative hidden h-[440px] w-full select-none md:block lg:h-[500px]"
      style={{ perspective: PERSPECTIVE.far }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="stage-3d absolute inset-0"
        style={{ rotateX: rigRotateX, rotateY: rigRotateY }}
      >
        {featured.map((project, index) => (
          <DeckCard
            key={project.id}
            project={project}
            config={DECK[index]}
            index={index}
            scrollProgress={scrollProgress}
            priority={index === 0}
          />
        ))}
      </motion.div>
    </div>
  );
}
