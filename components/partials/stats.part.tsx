"use client";

import React from "react";
import { Counter } from "@/components/motion/counter.motion";
import { profileFactsData } from "@/data/profile.data";

/**
 * Line Grid stats row: cells on the page background, the number first and
 * the words after it — no labels above, no icons. Every figure is countable
 * from the resume or the npm profile.
 */
export function StatsPart() {
  return (
    <dl className="cells grid-cols-2 lg:grid-cols-4 [&>*]:bg-bg!">
      {profileFactsData.map((fact) => (
        <div key={fact.id} className="flex flex-col gap-2 p-6 sm:p-8">
          <dt className="text-ink-muted order-2 max-w-[22ch] text-[13px] leading-snug">{fact.label}</dt>
          <dd className="text-ink order-1 text-[36px] leading-none font-medium tracking-[-0.04em] tabular-nums">
            <Counter value={fact.value} suffix={fact.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
