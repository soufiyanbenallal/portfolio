"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { faqsData } from "@/data/faqs.data";
import { Chapter, ChapterHead } from "@/components/shared/chapter.shared";
import { ButtonUi } from "@/components/ui/button.ui";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { SPRINGS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

/**
 * FAQ — a spine chapter. Questions are rows split by lines, not cards; the
 * answer opens with a spring so long and short answers move like the same
 * hinge. Beside them, the booking card floats on a dots canvas — the one
 * live object in the section, and the one place it carries a shadow.
 *
 * A real <button> with `aria-expanded` / `aria-controls` does the semantic
 * work; the animation is layered on top and never gates the content.
 */
export function FaqPart() {
  const [openId, setOpenId] = useState<string>(faqsData[0]?.id ?? "");
  const panelPrefix = useId();

  return (
    <Chapter label="FAQ" summary="How engagements work, before we ever talk.">
      <ChapterHead title={["Questions, answered.", "Before the first call."]} />

      <div className="border-line grid border-t lg:grid-cols-12">
        <div className="divide-line divide-y lg:col-span-7">
          {faqsData.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${panelPrefix}-${item.id}`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group hover:bg-raised flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-5 text-left transition-colors sm:px-10"
                  >
                    <span
                      className={cn(
                        "text-[15px] leading-snug",
                        isOpen ? "text-ink font-medium" : "text-ink-2"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "border-line-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[15px] leading-none transition-colors duration-300",
                        isOpen ? "bg-ink border-transparent text-white" : "text-ink-muted"
                      )}
                      aria-hidden="true"
                    >
                      {/* The glyph turns into ×; the box stays square. */}
                      <span
                        className={cn("transition-transform duration-300", isOpen && "rotate-45")}
                      >
                        +
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRINGS.accordion}
                      className="overflow-hidden"
                    >
                      <p className="text-ink-muted max-w-[62ch] px-4 pb-6 text-[14px] leading-relaxed sm:px-10">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* The live object: a booking card on a dots canvas. */}
        <div className="bg-surface relative px-4 py-12 sm:px-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:px-8">
          <div
            className="dots fade-edges pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-5 p-6 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <span className="ring-line-2 relative h-10 w-10 overflow-hidden rounded-full ring-1">
              <Image src="/images/profile.jpeg" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-ink text-[17px] leading-snug font-medium tracking-[-0.02em]">
                Still deciding? <span className="text-ink-faint">Book a free discovery call.</span>
              </p>
              <p className="text-ink-muted text-[13px] leading-relaxed">
                Thirty minutes on what you&apos;re building, where it&apos;s stuck, and whether
                I&apos;m the right person to help.
              </p>
            </div>
            <ButtonUi
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-config='{"layout":"month_view"}'
              data-cursor="grow"
              className="w-full"
              leftIcon={<Icons.Calendar className="h-3.5 w-3.5" />}
            >
              Schedule a call
            </ButtonUi>
            <span className="text-ink-faint font-mono text-[11px]">Scheduling by Cal.com</span>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
