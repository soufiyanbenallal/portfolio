import React from "react";
import { FlowSection } from "@/components/ui/story-scroll";
import type { ExperienceStoryItemType } from "@/types";
import { SectionHeading } from "./section-heading";
import { ExperienceGridPart } from "./experience-grid.part";
import { ArrowUpRight } from "lucide-react";

export type ExperienceCardPartPropsType = {
  item: ExperienceStoryItemType;
  totalCount: number;
};

export function ExperienceCardPart({ item, totalCount }: ExperienceCardPartPropsType) {
  const headlineWords = item.headline.split(" ");

  return (
    <FlowSection
      aria-label={`${item.company} — ${item.role}`}
      style={{
        backgroundColor: item.theme.backgroundColor,
        color: item.theme.textColor,
      }}
      className="transition-colors duration-500"
    >
      {/* 1. Standard SectionHeading duplicated for each experience */}
      <div className="w-full">
        <SectionHeading
          index={item.index}
          eyebrow={item.eyebrow}
          title={item.headingTitle}
          body={item.headingBody}
          inverse={item.theme.isDark}
        />
      </div>

      <hr
        className="my-[1.5vw] border-none border-t w-full transition-opacity"
        style={{ borderColor: item.theme.dividerColor }}
      />

      {/* 2. Bold Display Typographic Headline */}
      {/* <div className="w-full">
        <h2 className="text-[clamp(2.5rem,8.5vw,9.5rem)] font-black leading-[0.88] uppercase tracking-tighter select-none">
          {headlineWords.map((word, idx) => (
            <React.Fragment key={idx}>
              <span>{word}</span>
              {idx < headlineWords.length - 1 && (
                <>
                  <br className="hidden md:inline" />{" "}
                </>
              )}
            </React.Fragment>
          ))}
        </h2>
      </div> */}

      <hr
        className="my-[1.5vw] border-none border-t w-full"
        style={{ borderColor: item.theme.dividerColor }}
      />

      {/* 3. Narrative Story Copy */}
      <div className="w-full max-w-4xl">
        <p className="max-w-[55ch] text-[clamp(1rem,1.8vw,1.5rem)] font-normal leading-relaxed opacity-90">
          {item.narrative}
        </p>
      </div>

      <hr
        className="my-[1.5vw] border-none border-t w-full"
        style={{ borderColor: item.theme.dividerColor }}
      />

      {/* 4. Structured Facts / Grid Columns */}
      <div className="w-full">
        <ExperienceGridPart item={item} />
      </div>

      {/* 5. Bottom Status / Milestone Rail */}
      <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono opacity-65 w-full border-t border-current/15">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>
            STAGE {item.index} OF {String(totalCount).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline font-bold">{item.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{item.period}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </FlowSection>
  );
}
