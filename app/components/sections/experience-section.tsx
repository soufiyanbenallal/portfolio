"use client";

import FlowArt from "@/components/ui/story-scroll";
import { experienceStories } from "@/app/data/experience-stories";
import { ExperienceCardPart } from "./experience-card.part";

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full relative">
      <FlowArt aria-label="Professional Experience Story Scroll">
        {experienceStories.map((story) => (
          <ExperienceCardPart
            key={story.id}
            item={story}
            totalCount={experienceStories.length}
          />
        ))}
      </FlowArt>
    </section>
  );
}

export default ExperienceSection;
