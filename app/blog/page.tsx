import React from "react";
import type { Metadata } from "next";
import { articlesData } from "@/data/articles.data";
import { Section } from "@/components/shared/section.shared";
import { ChapterHead } from "@/components/shared/chapter.shared";
import { ArticleCard } from "@/components/shared/article-card.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on architecture, Shopify apps on Polaris web components, AI workflows in production, and web performance.",
};

/** Article index — every article a cell; covers morph into the article hero. */
export default function BlogIndexPage() {
  return (
    <PageTransition>
      <Section as="div" seam={false} hatchedMargins>
        <ChapterHead
          as="h1"
          eyebrow="Writing"
          title={["Notes from the work.", "Architecture, Shopify and AI."]}
          lede="Short, practical write-ups from building Shopify apps, SaaS products and AI features — what worked, and why."
        />
        <ul className="cells border-line border-t md:grid-cols-2">
          {articlesData.map((article, index) => (
            <li key={article.id}>
              <ArticleCard article={article} priority={index < 2} />
            </li>
          ))}
        </ul>
      </Section>
    </PageTransition>
  );
}
