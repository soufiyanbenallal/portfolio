import React from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials.data";
import { ChapterHead } from "@/components/shared/chapter.shared";
import type { TestimonialItemType } from "@/types";

// Six fills the grid exactly at every width (1, 2 and 3 columns).
const TESTIMONIALS = testimonialsData.slice(0, 6);

function TestimonialCell({ testimonial }: { testimonial: TestimonialItemType }) {
  return (
    <li>
      <figure className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
        <blockquote className="text-ink-2 text-[15px] leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {testimonial.avatar && (
            <span className="ring-line-2 relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1">
              <Image src={testimonial.avatar} alt="" fill sizes="28px" className="object-cover" />
            </span>
          )}
          <span className="flex flex-col">
            <span className="text-ink text-[13px] font-medium">{testimonial.author}</span>
            <span className="text-ink-faint text-[12px]">
              {testimonial.role}, {testimonial.company}
            </span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * Testimonials — quotes as cells sharing one edge, no carousel. Every quote
 * is readable at once, keyboard-reachable, and costs nothing to animate.
 *
 * NOTE: the data is placeholder content (see data/testimonials.data.ts)
 * until real recommendations replace it.
 */
export function TestimonialsPart() {
  return (
    <div className="w-full">
      <ChapterHead eyebrow="Testimonials" title={["What people I've worked with say."]} />
      <ul className="cells border-line border-t md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCell key={testimonial.id} testimonial={testimonial} />
        ))}
      </ul>
    </div>
  );
}
