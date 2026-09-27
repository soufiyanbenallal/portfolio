"use client";

import React from "react";
import Image from "next/image";
import { educationData, languagesData, workHistoryData } from "@/data/work-history.data";
import { socialLinksData } from "@/data/client-logos.data";
import { Chapter, ChapterHead } from "@/components/shared/chapter.shared";
import { ScrollDimmedText } from "@/components/motion/text-reveal.motion";
import { cn } from "@/lib/utils";

// Written from the resume: roles, dates and scope are the resume's own.
const BIO_PARAGRAPHS = [
  "I'm a senior full-stack developer and technical lead. Today I lead the engineering team at Ader Solutions, where I set the technical architecture and product roadmap and bring AI features into production systems.",
  "Before that I spent two years inside a remote U.S. team at Le Ventures, building Shopify apps, custom themes and SaaS tools for merchants — React and TypeScript in front, Node.js and Laravel services wired into Shopify's APIs and webhooks.",
  "What I care about most is what keeps a product healthy after launch: architecture that scales, honest code review, CI/CD, and a team that can move quickly without breaking things.",
];

/* -------------------------------------------------------------------- *
 * Experience — the Line Grid timeline
 * -------------------------------------------------------------------- */

function ExperienceTimeline() {
  return (
    <div className="border-line border-t">
      <div className="border-line flex items-baseline justify-between border-b px-4 py-4 sm:px-10">
        <span className="text-label text-ink-faint">Experience</span>
        <span className="text-ink-faint font-mono text-[11px] tabular-nums">2019 — today</span>
      </div>

      <ol className="relative px-4 py-8 sm:px-10">
        {/* The spine of the timeline: a dash, because it measures time. */}
        <span
          className="dash-y absolute top-10 bottom-10 left-4.75 sm:left-10.75"
          aria-hidden="true"
        />
        {workHistoryData.map((item) => (
          <li key={item.id} className="relative pb-7 pl-8 last:pb-0">
            {/* Outline for a past role, filled for the current one. */}
            <span
              className={cn(
                "absolute top-1.75 left-0 size-1.75 rounded-[1px] border",
                item.isCurrent ? "border-brand bg-brand" : "border-line-3 bg-bg"
              )}
              aria-hidden="true"
            />
            <details open={item.isCurrent} className="group">
              <summary className="flex cursor-pointer list-none flex-col gap-1 outline-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px]">
                    <span className="text-ink font-medium">{item.role}</span>
                    <span className="text-ink-muted"> · {item.company}</span>
                  </span>
                  <span className="text-ink-faint text-[12px]">{item.location}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-ink-faint font-mono text-[11px] tabular-nums">
                    {item.period}
                  </span>
                  <span
                    className="border-line-2 text-ink-faint group-hover:text-ink flex h-5 w-5 items-center justify-center rounded-full border text-[13px] leading-none"
                    aria-hidden="true"
                  >
                    <span className="transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </span>
              </summary>
              <ul className="mt-3 flex max-w-[64ch] flex-col gap-1.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-ink-muted flex gap-2.5 text-[13px] leading-relaxed"
                  >
                    <span className="bg-line-3 mt-2.25 h-px w-2.5 shrink-0" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * About
 * -------------------------------------------------------------------- */

/**
 * About — a spine chapter. Portrait and bio share a cell edge; the bio
 * lights up word by word as it crosses the viewport, so scroll speed
 * becomes reading pace. Then the career as a timeline, and the resume's
 * education and languages as two cells.
 */
export function AboutHistoryPart() {
  return (
    <Chapter
      label="About"
      summary="Seven years, five companies — building first, now leading."
      accent
    >
      <ChapterHead
        title={["From Laravel platforms to leading the team.", "Seven years of shipping."]}
      />

      <div className="cells border-line border-t lg:grid-cols-12">
        <div className="relative min-h-85 overflow-hidden lg:col-span-5">
          <Image
            src="/images/full-profile.jpeg"
            alt="Soufiyan Benallal"
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover"
          />
          <div className="bg-bg/85 absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-3 backdrop-blur-md">
            <span className="text-ink-muted flex items-center gap-2 text-[12px]">
              <span className="bg-green h-1.5 w-1.5 rounded-full" aria-hidden="true" />
              Meknes, Morocco
            </span>
            <span className="text-ink-faint font-mono text-[11px]">MSc Computer Science</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-col gap-5">
            {BIO_PARAGRAPHS.map((paragraph, index) => (
              <ScrollDimmedText
                key={index}
                text={paragraph}
                className="text-[16px] leading-[1.6] tracking-[-0.01em]"
                dimClassName={index === 0 ? "text-ink" : "text-ink-muted"}
              />
            ))}
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label="Profiles">
            {socialLinksData.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex h-8 items-center px-3 text-[12px] font-medium"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ExperienceTimeline />

      <div className="cells border-line [&>*]:bg-bg! border-t md:grid-cols-2">
        <div className="p-6 sm:p-8">
          <div className="text-label text-ink-faint mb-4">Education</div>
          <ul className="divide-line divide-y">
            {educationData.map((item) => (
              <li key={item.id} className="flex flex-col gap-0.5 py-3 first:pt-0">
                <span className="text-ink text-[13px] font-medium">{item.degree}</span>
                <span className="flex justify-between gap-4 text-[12px]">
                  <span className="text-ink-muted">{item.school}</span>
                  <span className="text-ink-faint shrink-0 font-mono text-[11px] tabular-nums">
                    {item.period}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 sm:p-8">
          <div className="text-label text-ink-faint mb-4">Languages</div>
          <dl className="divide-line divide-y">
            {languagesData.map((language) => (
              <div
                key={language.id}
                className="flex justify-between gap-4 py-3 text-[13px] first:pt-0"
              >
                <dt className="text-ink font-medium">{language.name}</dt>
                <dd className="text-ink-muted">{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Chapter>
  );
}
