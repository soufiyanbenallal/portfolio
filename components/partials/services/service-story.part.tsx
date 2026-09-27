"use client";

import React from "react";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { cn } from "@/lib/utils";
import { DetailFigure, DetailKicker, type PosterChapterType } from "./service-kit.part";
import type { ServiceItemType } from "@/types";
import { AArrowDownIcon, ArrowDownToDot, ChevronsDown } from "lucide-react";

/* ==================================================================== *
 * SERVICE STORY — the right column of a service section
 * --------------------------------------------------------------------
 * Not a card: the explanation runs straight down the column as ordinary
 * page content, read by scrolling while the service's panel stays docked
 * on the left. Each chapter is a different drawn pattern, built from the
 * same lines, nodes, hatch and dots as the rest of the page:
 *
 *   figure     the service's own diagram, on a dots canvas
 *   build      vector cells — each capability drawn, then named
 *   process    a numbered pipeline (a real sequence)
 *   stack      a layer diagram; delivery is a hatched column beside the
 *              layers, because it runs through all of them
 *
 * Each service supplies its figure, its four vectors and its copy; the
 * shape of the story is shared so the three services read as one system.
 * ==================================================================== */

/** The story's four chapters, anchored by service — the docked panel indexes them. */
export function getStoryChapters(slug: string, figureLabel: string): readonly PosterChapterType[] {
  return [
    { id: `${slug}-figure`, label: figureLabel },
    { id: `${slug}-build`, label: "What I build" },
    { id: `${slug}-process`, label: "How a project runs" },
    { id: `${slug}-stack`, label: "The stack" },
  ];
}

function StoryBlock({
  chapter,
  children,
  className,
}: {
  chapter: PosterChapterType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={chapter.id}
      aria-label={chapter.label}
      className={cn("border-line scroll-mt-24 border-t px-6 py-10 sm:px-10", className)}
    >
      <div className="text-label text-ink-faint mb-6">{chapter.label}</div>
      {children}
    </section>
  );
}

export type ServiceStoryPropsType = {
  service: ServiceItemType;
  /** The service after this one — the close links on to it. */
  next?: ServiceItemType;
  chapters: readonly PosterChapterType[];
  /** The service's diagram for the first chapter. */
  figure: React.ReactNode;
  /** One small drawing per capability, in the same order. */
  vectors: React.ComponentType[];
  /** The closing line: claim in ink, invitation in faint. */
  close: readonly [string, string];
};

export function ServiceStory({
  service,
  next,
  chapters,
  figure,
  vectors,
  close,
}: ServiceStoryPropsType) {
  const deepDive = service.deepDive;
  if (!deepDive) return null;
  const [lead, tail] = service.headline;
  const layers = deepDive.stackGroups.slice(0, -1);
  const delivery = deepDive.stackGroups[deepDive.stackGroups.length - 1];
  const [figureChapter, buildChapter, processChapter, stackChapter] = chapters;

  return (
    <article className="flex flex-col">
      <section className="px-6 pt-2 pb-10 sm:px-10">
        <DetailKicker service={service} />
        <p className="text-ink mt-5 text-[30px] leading-[1.1] font-medium tracking-[-0.04em] text-balance xl:text-[36px]">
          {lead} <span className="text-ink-soft">{tail}</span>
        </p>
        <p className="text-ink-muted mt-5 max-w-[58ch] text-[16px] leading-relaxed">
          {service.description}
        </p>
      </section>

      <StoryBlock chapter={figureChapter}>
        <DetailFigure label={figureChapter.label}>{figure}</DetailFigure>
      </StoryBlock>

      <StoryBlock chapter={buildChapter} className="pb-0">
        <ul className="cells border-line -mx-6 border-t sm:-mx-10 sm:grid-cols-2">
          {deepDive.capabilities.map((capability, index) => {
            const Vector = vectors[index % vectors.length];
            return (
              <li key={capability.title} className="flex flex-col gap-4 p-6 sm:p-7">
                <div className="relative flex h-[88px] items-center">
                  <div
                    className="dots fade-edges pointer-events-none absolute -inset-2"
                    aria-hidden="true"
                  />
                  <div className="relative h-full">
                    <Vector />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-ink text-[15px] font-medium tracking-[-0.01em]">
                    {capability.title}
                  </span>
                  <span className="text-ink-muted text-[13px] leading-relaxed">
                    {capability.description}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </StoryBlock>

      {/* A real sequence on one track — numbered, the first stage lit. */}
      <StoryBlock chapter={processChapter}>
        <ol className="relative grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          <span
            className="bg-line-2 absolute top-3.75 right-0 left-0 hidden h-px xl:block"
            aria-hidden="true"
          />
          <span
            className="absolute top-3.75 left-0 hidden h-px w-[12.5%] bg-(--svc-hue) xl:block"
            aria-hidden="true"
          />
          {deepDive.process.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-3">
              <span
                className={cn(
                  "bg-bg relative flex size-7.75 items-center justify-center rounded-full border font-mono text-[11px] tabular-nums",
                  index === 0
                    ? "border-(--svc-hue) text-(--svc-deep)"
                    : "border-line-3 text-ink-faint"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-ink text-[14px] font-medium">{step.title}</span>
              <span className="text-ink-muted text-[13px] leading-relaxed">{step.description}</span>
            </li>
          ))}
        </ol>
      </StoryBlock>

      {/* Layers stacked as cells; delivery a hatched column beside them. */}
      <StoryBlock chapter={stackChapter}>
        <div className="border-line-2 rounded-media grid grid-cols-[1fr_auto] overflow-hidden border">
          <div className="divide-line divide-y">
            {layers.map((group, index) => (
              <div
                key={group.label}
                className="bg-surface flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5"
              >
                <span className="flex w-24 shrink-0 items-center gap-2">
                  <span
                    className={cn(
                      "h-1.5 w-1.5",
                      index === 0 ? "bg-(--svc-hue)" : "border-line-3 border"
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-ink-faint font-mono text-[10.5px] tracking-[0.06em] uppercase">
                    {group.label}
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border-line-2 bg-bg text-ink-2 rounded-[5px] border px-1.5 py-0.5 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
          {delivery && (
            <div className="border-line-2 relative flex w-[120px] flex-col justify-center gap-2 border-l px-3 py-3 sm:w-[140px]">
              <div
                className="hatch pointer-events-none absolute inset-0 opacity-70"
                aria-hidden="true"
              />
              <span className="text-ink-faint relative font-mono text-[10.5px] tracking-[0.06em] uppercase">
                {delivery.label}
              </span>
              <span className="relative flex flex-col gap-1">
                {delivery.items.map((item) => (
                  <span
                    key={item}
                    className="border-line-2 bg-bg text-ink-2 w-fit rounded-[5px] border px-1.5 py-0.5 font-mono text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </span>
              <span className="text-ink-faint relative font-mono text-[9.5px]">
                across every layer
              </span>
            </div>
          )}
        </div>
      </StoryBlock>

      <section className="border-line relative border-t px-6 py-10 sm:px-10">
        <div className="dots fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex flex-col gap-5">
          <p className="text-ink text-[24px] leading-[1.15] font-medium tracking-[-0.035em] text-balance">
            {close[0]} <span className="text-ink-soft">{close[1]}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-config='{"layout":"month_view"}'
              data-cursor="grow"
              className="btn-primary inline-flex h-10 cursor-pointer items-center gap-2 px-4 text-[13px] font-medium"
            >
              <Icons.Calendar className="h-3.5 w-3.5" />
              Book a discovery call
            </button>
            {next ? (
              <a
                href={`#${next.slug}`}
                className="btn-secondary inline-flex h-10 items-center gap-2 px-4 text-[13px] font-medium"
              >
                Next: {next.title}
                <span aria-hidden="true">↓</span>
              </a>
            ) : (
              <a
                href="#about"
                className="btn-secondary inline-flex h-10 items-center gap-2 px-4 text-[13px] font-medium"
              >
                About me
                {/* <span aria-hidden="true">↓</span> */}
                <ChevronsDown className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
