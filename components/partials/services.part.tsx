"use client";

import React from "react";
import { engagementModelsData, servicesData, SERVICE_THEME_CLASS } from "@/data/services.data";
import { Section } from "@/components/shared/section.shared";
import { Chapter, ChapterHead } from "@/components/shared/chapter.shared";
import { ButtonUi } from "@/components/ui/button.ui";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { ShopifyServicePoster } from "./services/shopify-service-panel.part";
import { SHOPIFY_CHAPTERS, ShopifyServiceStory } from "./services/shopify-service-detail.part";
import { ProductServicePoster } from "./services/product-service-panel.part";
import { PRODUCT_CHAPTERS, ProductServiceStory } from "./services/product-service-detail.part";
import { AiServicePoster } from "./services/ai-service-panel.part";
import { AI_CHAPTERS, AiServiceStory } from "./services/ai-service-detail.part";
import { ServiceShowcase } from "@/components/motion/service-showcase.motion";
import type { PosterChapterType } from "./services/service-kit.part";
import type { ServiceItemType, ServiceThemeType } from "@/types";
import { ChevronsDownIcon } from "lucide-react";

/* ==================================================================== *
 * SERVICES
 * --------------------------------------------------------------------
 * A chapter in five sections, each with its own seam:
 *
 *   intro      — a spine chapter: the promise, and an index of the three
 *   ×3 showcases — one per service. The service arrives as a full-screen
 *                dark poster in its own palette, shrinks into the frame's
 *                left column, and stays docked there — with an index of its
 *                chapters — while its story scrolls natively on the right.
 *                Poster and story live in each service's own files, so
 *                every service keeps its own design.
 *   engage     — how an engagement can be shaped, and the call to action
 *
 * Renders its own Sections (the one exception to "pages compose
 * Sections"), because each stack needs a seam of its own. The wrapper's
 * background is what slides over the pinned quote above it.
 * ==================================================================== */

type ServiceViewsType = {
  Poster: React.ComponentType<{
    service: ServiceItemType;
    index: number;
    total: number;
    chapters?: readonly PosterChapterType[];
  }>;
  Story: React.ComponentType<{ service: ServiceItemType; next?: ServiceItemType }>;
  chapters: readonly PosterChapterType[];
};

// Each service owns its poster (motif, palette) and its story (diagram,
// vectors, copy); the showcase that choreographs them is shared.
const SERVICE_VIEWS: Record<ServiceThemeType, ServiceViewsType> = {
  product: { Poster: ProductServicePoster, Story: ProductServiceStory, chapters: PRODUCT_CHAPTERS },
  commerce: {
    Poster: ShopifyServicePoster,
    Story: ShopifyServiceStory,
    chapters: SHOPIFY_CHAPTERS,
  },
  ai: { Poster: AiServicePoster, Story: AiServiceStory, chapters: AI_CHAPTERS },
};

/* -------------------------------------------------------------------- *
 * Intro — chapter with a spine, and the index of services
 * -------------------------------------------------------------------- */

function ServicesIntro() {
  return (
    <Chapter
      label="Services"
      summary="Three disciplines, one engineer — from storefront to backend to AI."
      accent
    >
      <ChapterHead
        id="services-title"
        title={["Three ways I help teams ship.", "Each one end to end."]}
        lede="Seven years of building for merchants, SaaS teams and the businesses behind them — from Laravel platforms in 2019 to leading an engineering team today. Most projects touch more than one of these."
      />

      <ul className="cells border-line border-t md:grid-cols-3">
        {servicesData.map((service) => (
          <li key={service.id} className={SERVICE_THEME_CLASS[service.theme]}>
            <a
              href={`#${service.slug}`}
              className="group hover:bg-raised flex h-full flex-col gap-3 p-6 transition-colors sm:p-8"
            >
              <span className="text-label flex items-center gap-2 text-(--svc-deep)">
                <span className="h-1.5 w-1.5 bg-(--svc-hue)" aria-hidden="true" />
                {service.kicker}
              </span>
              <span className="text-ink text-[15px] font-medium tracking-[-0.01em]">
                {service.title}
              </span>
              <span className="text-ink-muted text-[13px] leading-relaxed">{service.summary}</span>
              <span className="text-ink-faint group-hover:text-ink mt-auto pt-2 text-[13px] transition-colors">
                See how it works{" "}
                <span className="ease-entrance inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  <ChevronsDownIcon className="size-3.5" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}

/* -------------------------------------------------------------------- *
 * Engagement models — cells, then the call to action
 * -------------------------------------------------------------------- */

function EngagementModels() {
  return (
    <div>
      <div className="flex flex-col gap-6 px-4 py-12 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:py-16">
        <div className="flex flex-col gap-2">
          <span className="text-label text-ink-faint">Working together</span>
          <h3 className="text-ink text-[28px] leading-[1.1] font-medium tracking-[-0.035em] text-balance sm:text-[32px]">
            Pick the shape that fits. <span className="text-ink-soft">Change it as you grow.</span>
          </h3>
        </div>
        <ButtonUi
          type="button"
          data-cal-link={CAL_LINK}
          data-cal-config='{"layout":"month_view"}'
          data-cursor="grow"
          className="self-start lg:self-auto"
          leftIcon={<Icons.Calendar className="h-3.5 w-3.5" />}
        >
          Book a discovery call
        </ButtonUi>
      </div>

      <ul className="cells border-line border-t md:grid-cols-3">
        {engagementModelsData.map((model) => (
          <li key={model.id} className="flex flex-col gap-2 p-6 sm:p-8">
            <span className="text-ink text-[14px] font-medium">{model.title}</span>
            <span className="text-ink-muted text-[13px] leading-relaxed">{model.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Section
 * -------------------------------------------------------------------- */

export function ServicesPart() {
  return (
    <div className="bg-bg relative z-10 w-full">
      <Section id="services" aria-labelledby="services-title" hatchedMargins>
        <ServicesIntro />
      </Section>

      {servicesData.map((service, index) => {
        const { Poster, Story, chapters } = SERVICE_VIEWS[service.theme];
        return (
          <Section
            key={service.id}
            id={service.slug}
            aria-label={service.title}
            className={SERVICE_THEME_CLASS[service.theme]}
            hatchedMargins
          >
            <ServiceShowcase
              panel={
                <Poster
                  service={service}
                  index={index}
                  total={servicesData.length}
                  chapters={chapters}
                />
              }
            >
              <Story service={service} next={servicesData[index + 1]} />
            </ServiceShowcase>
          </Section>
        );
      })}

      {/* <Section aria-label="Working together">
        <EngagementModels />
      </Section> */}
    </div>
  );
}
