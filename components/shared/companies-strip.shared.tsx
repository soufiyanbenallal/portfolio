import React from "react";
import { workHistoryData } from "@/data/work-history.data";
import { cn } from "@/lib/utils";

/**
 * Where I've worked — a Line Grid peer row. Equal cells, split by fading
 * dividers (peers, not boxes), each company with its years. Static on
 * purpose: the page's one ambient motion is the beam, so this is no
 * longer a marquee.
 */
export function CompaniesStrip() {
  const companies = workHistoryData.map((item) => ({
    id: item.id,
    name: item.company,
    years: item.period.replace(/[A-Za-z]{3} /g, ""),
  }));

  return (
    <div className="w-full">
      <div className="border-line flex items-baseline justify-between border-b px-4 py-4 sm:px-10">
        <span className="text-label text-ink-faint">Where I&apos;ve worked</span>
        <span className="text-ink-faint hidden font-mono text-[11px] sm:inline">Morocco · United States (remote)</span>
      </div>

      <ul className="grid grid-cols-2 lg:grid-cols-5">
        {companies.map((company, index) => (
          <li
            key={company.id}
            className={cn(
              "border-line relative flex flex-col gap-1 px-5 py-6 sm:px-8 lg:border-0",
              index % 2 === 0 && "border-r lg:border-r-0",
              index < companies.length - 1 && "border-b lg:border-b-0",
              // An odd last cell spans the row on small screens — no orphan.
              index === companies.length - 1 && companies.length % 2 === 1 && "col-span-2 border-r-0 lg:col-span-1"
            )}
          >
            <span className="text-ink text-[15px] font-medium tracking-[-0.01em]">{company.name}</span>
            <span className="text-ink-faint font-mono text-[11px] tabular-nums">{company.years}</span>
            {index < companies.length - 1 && (
              <span className="fade-y absolute inset-y-0 right-0 hidden lg:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
