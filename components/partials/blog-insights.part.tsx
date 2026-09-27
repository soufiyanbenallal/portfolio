import React from "react";
import { articlesData } from "@/data/articles.data";
import { ChapterHead } from "@/components/shared/chapter.shared";
import { ArticleCard } from "@/components/shared/article-card.shared";
import { ArrowLink } from "@/components/ui/arrow-link.ui";

/** Writing — the three latest articles as cells sharing one edge. */
export function BlogInsightsPart() {
  const latest = articlesData.slice(0, 3);

  return (
    <div className="w-full">
      <ChapterHead
        eyebrow="Writing"
        title={["Notes from the work.", "Architecture, Shopify and AI."]}
        action={<ArrowLink href="/blog">All articles</ArrowLink>}
      />
      <ul className="cells border-line border-t md:grid-cols-3">
        {latest.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}
