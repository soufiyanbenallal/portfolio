import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SharedElement } from "@/components/motion/page-transition.motion";
import type { ArticleItemType } from "@/types";

/**
 * An article as a cell: cover on top (split from the text by the cell's own
 * hairline), then meta, title and excerpt. The cover is a view-transition
 * participant, so it grows into the article's hero when opened.
 */
export function ArticleCard({ article, priority = false }: { article: ArticleItemType; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      transitionTypes={["nav-forward"]}
      data-cursor="project"
      data-cursor-text="Read"
      className="group hover:bg-raised flex h-full flex-col transition-colors"
    >
      <SharedElement name={`article-media-${article.slug}`}>
        <div className="border-line bg-raised relative aspect-16/10 w-full overflow-hidden border-b">
          <Image
            src={article.coverImage}
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(max-width: 768px) 100vw, 400px"
            className="ease-entrance object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </SharedElement>

      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <span className="text-ink-faint font-mono text-[11px] tracking-[0.03em]">
          {article.category} · {article.publishedAt} · {article.readTime}
        </span>
        <span className="text-ink text-[17px] leading-snug font-medium tracking-[-0.02em] text-balance">
          {article.title}
        </span>
        <span className="text-ink-muted line-clamp-2 text-[13px] leading-relaxed">{article.excerpt}</span>
        <span className="text-ink-faint group-hover:text-ink mt-auto pt-2 text-[13px] transition-colors">
          Read article{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
